import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readExport} from '../lib/export-store.ts';
import {createStaticData} from '../lib/static-data.ts';
import {policySchema,lifecycle,detailLabels} from '../lib/domain/model.ts';
import {resolveTopicRegistry} from '../lib/domain/topics.ts';
import {resolveDispositionRegistry} from '../lib/domain/dispositions.ts';
import {createLocalization} from '../lib/i18n/build.ts';

const store=readExport('data/store') as any;
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.policy_id===id&&r.version===version).data));
const roundVersion=(id:string)=>Math.max(...store.tables.revisions.filter((r:any)=>r.policy_id===id&&r.recorded_at.startsWith('2026-11-21')).map((r:any)=>r.version));
const round=(id:string)=>revision(id,roundVersion(id));
const scan=(id:string)=>JSON.parse(store.tables.scan_runs.find((x:any)=>x.id===id).data);
const today='2026-11-21';

test('a Bundesrat call for mediation leaves the Kita act unpublished and undated',()=>{
 const p=round('de-kita-quality-act-2027');
 assert.equal(p.phase,'pending');assert.equal(p.effectiveDate,null);assert.equal(p.nextDate,null);
 assert.match(p.statusNote!,/调解委员会/);
 assert(p.events.some(e=>e.id==='br-1120'&&e.kind==='scheduled'),'the scheduled plenary stays in history');
});

test('Bundesrat consent is not promulgation, and income ceilings are not premiums',()=>{
 const p=round('de-social-insurance-ceilings-2027');
 assert.equal(p.phase,'pending');assert.equal(p.effectiveDate,null);assert.equal(p.nextDate,'2027-01-01');
 assert.match(p.summary+p.after,/6,375/);assert.match(p.summary+p.after,/8,850/);assert.match(p.impact,/假设/);
 for(const id of ['de-starter-pension-2027','de-co2-price-corridor-2027','de-grid-support-proposal-2027','de-eudi-wallet-2026','de-cyber-defence-act-2026']){
  const x=round(id);assert.equal(x.effectiveDate,null,id);assert.notEqual(x.nextDate,'2026-11-20',id);
  assert(x.events.some(e=>e.date==='2026-11-20'&&e.kind!=='scheduled'),id);
 }
});

test('a wrong net figure is corrected with an appended event, not rewritten history',()=>{
 const p=round('de-fiscal-equalisation-2026'),old=revision('de-fiscal-equalisation-2026',roundVersion('de-fiscal-equalisation-2026')-1);
 for(const e of old.events)assert.deepEqual(p.events.find(x=>x.id===e.id),e);
 assert(p.events.some(e=>e.kind==='correction'));assert.match(p.title,/1\.25亿/);
});

test('the new Hesse ordinance replaces the old one before its expiry',()=>{
 const old=round('he-rent-protection-2025');
 assert.equal(old.phase,'closed');assert.equal(old.nextDate,null);assert.equal(lifecycle(old,today),'已结束');
 assert(old.events.some(e=>e.kind==='closed'&&e.date==='2026-11-20'));
 assert(old.events.some(e=>e.kind==='correction'&&/36/.test(e.detail)),'the earlier 33-town figure is corrected');
 const next=round('he-rent-protection-proposal-2026');
 assert.equal(next.phase,'adopted');assert.equal(next.status,'adopted');assert.equal(next.effectiveDate,'2026-11-20');
 assert.equal(next.nextDate,'2029-12-31');assert.equal(next.nextKind,'expiry');
 assert.match(next.limits,/201a/);
});

test('Dutch tax-credit figures follow the adopted House text',()=>{
 const p=round('nl-tax-plan-2027');
 assert.equal(p.phase,'pending');assert.match(p.title,/17欧元/);assert.doesNotMatch(p.summary+p.after,/173/);
 assert(p.events.some(e=>e.kind==='correction'&&e.date==='2026-11-21'));
});

test('EU items keep application, commencement and political agreement apart',()=>{
 const credit=revision('eu-consumer-credit-directive-2026',1);
 assert.equal(credit.effectiveDateKind,'application');assert.equal(credit.effectiveDate,'2026-11-20');assert.match(credit.statusNote!,/未核实/);
 const lead=revision('eu-lead-fishing-hunting-reach-2026',1);
 assert.equal(lead.status,'phased');assert.equal(lead.nextDate,'2027-06-03');
 assert.match(lead.rules!.find(r=>r.sourceId==='corrigendum')!.detail,/2027年6月3日/);
 const youth=revision('eu-uk-youth-experience-scheme',1);
 assert.equal(youth.phase,'pending');assert.equal(youth.effectiveDate,null);assert.equal(detailLabels(youth).change,'拟议改变');
 const sfdr=round('eu-sfdr-priips-review');assert.equal(sfdr.phase,'pending');assert.match(sfdr.statusNote!,/政治协议/);
 for(const id of ['eu-pharma-package-council-2026','eu-vat-anti-fraud-tools-2030']){const p=round(id);assert.equal(p.nextDate,'2026-11-25',id);assert.equal(p.nextKind,'scheduled',id);assert.equal(p.phase,'pending',id);}
});

test('closed Official Journal days are complete; pre-midnight checks of 20 November stay partial',()=>{
 for(const id of ['eu-20261120-01','eu-20261120-02','eu-20261120-03','eu-20261120-04'])assert.equal(scan(id).status,'complete',id);
 assert.equal(scan('eu-20261120-05').status,'partial');assert.equal(scan('eu-20261120-10').status,'blocked');
 for(const id of ['de-20261120-st1-03','de-20261120-st1-06','de-20261120-st1-10'])assert.equal(scan(id).status,'partial',id);
 for(const s of store.tables.scan_runs.filter((r:any)=>r.id.startsWith('t2-20261120')))assert.notEqual(JSON.parse(s.data).status,'complete',s.id);
});

test('explained REACH documents are grouped, not disposed, and new explanations have records',()=>{
 const data=createStaticData(store);
 const topics=resolveTopicRegistry(JSON.parse(readFileSync('data/topics.json','utf8')),data);
 const dispositions=resolveDispositionRegistry(JSON.parse(readFileSync('data/dispositions.json','utf8')),data,topics);
 const disposed=new Set(dispositions.flatMap(d=>d.recordIds));
 for(const id of ['eu-oj-l-202602501','eu-oj-l-202690986','eu-oj-l-202602530'])assert(!disposed.has(id),id);
 const lead=topics.find(t=>t.id==='eu-lead-fishing-hunting-reach-2026')!;
 assert.equal(lead.recordIds.length,3);assert(lead.policyIds.includes('eu-lead-fishing-hunting-reach-2026'));
 const kita=topics.find(t=>t.id==='de-st-kita-sibling-rule-2027')!;assert.equal(kita.recordIds.length,5);
 const he=topics.find(t=>t.id==='he-rent-protection-2026-plan')!;
 assert(he.recordIds.includes('he-2026-gvbl-78'));assert(!he.recordIds.includes('he-2026-gvbl-79'),'the Vacancy Act stays a separate act');
});

test('this round is bound to reviewed English translations',()=>{
 const l=createLocalization(createStaticData(store),JSON.parse(readFileSync('data/translations/content.json','utf8')),JSON.parse(readFileSync('data/translations/bindings.json','utf8')));
 for(const r of store.tables.policies.filter((r:any)=>r.updated_at.startsWith('2026-11-21')))assert.equal(l.policies[r.id],'current',r.id);
 for(const r of store.tables.intake.filter((r:any)=>r.discovered_at.startsWith('2026-11-21')))assert.equal(l.intake[r.id],'current',r.id);
});
