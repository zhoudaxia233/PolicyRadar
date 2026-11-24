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
const roundStamp=store.tables.settings.find((s:any)=>s.key==='lastReviewAt:DE').value as string;
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.policy_id===id&&r.version===version).data));
// Each check reads the version this round wrote, so later rounds can move the matter on.
const roundVersion=(id:string)=>Math.max(...store.tables.revisions.filter((r:any)=>r.policy_id===id&&r.recorded_at.startsWith('2026-11-24')).map((r:any)=>r.version));
const round=(id:string)=>revision(id,roundVersion(id));
const scan=(id:string)=>JSON.parse(store.tables.scan_runs.find((x:any)=>x.id===id).data);
const today='2026-11-24';

test('a committee recommendation is not adoption, and a referral back keeps the earlier schedule in history',()=>{
 const p=round('de-budget-accompanying-act-2027'),old=revision('de-budget-accompanying-act-2027',roundVersion('de-budget-accompanying-act-2027')-1);
 assert.equal(p.phase,'pending');assert.equal(p.effectiveDate,null);
 for(const e of old.events)assert.deepEqual(p.events.find(x=>x.id===e.id),e);
 assert(p.events.some(e=>e.id==='bt-vote-scheduled-1127'&&e.kind==='scheduled'),'the 27 November reading stays scheduled');
 assert(p.events.some(e=>e.date==='2026-11-24'&&e.kind==='scheduled'),'the referral back is scheduled, not a result');
 assert.match(p.statusNote!,/原因官方没有说明/);
 assert.match(p.summary,/不再取消/);
 assert.equal(detailLabels(p).change,'拟议改变');
});

test('the sugar tax start follows the committee text, not a minister’s remark, and stays a proposal',()=>{
 const p=round('de-sugary-drinks-tax-2027');
 assert.equal(p.phase,'pending');assert.equal(p.effectiveDate,null);
 for(const rate of ['0.25','0.30','0.35'])assert.match(p.after,new RegExp(rate.replace('.','\\.')));
 assert.match(p.summary,/2028年1月1日/);
 assert(p.events.some(e=>e.kind==='correction'&&e.sourceId==='bt-9241'),'the confirmation cites the Bundestag document');
 assert.doesNotMatch(p.title,/26或32欧分/);
});

test('frozen standard rates are explained as amounts paid, with the inferred SGB II link marked',()=>{
 const p=round('de-standard-rates-freeze-2028');
 assert.equal(p.phase,'pending');assert.equal(p.effectiveDate,null);assert.equal(lifecycle(p,today),'尚未通过');
 assert.match(p.summary,/2028年6月30日/);assert.match(p.impact,/假设/);
 assert.match(p.limits,/本站根据这条引用关系得出的理解/);
 assert(p.sources.some(s=>s.url==='https://www.gesetze-im-internet.de/sgb_2/__20.html'));
});

test('in-force rules without a verified gazette number say so',()=>{
 const p=round('de-consumer-credit-transposition-2026');
 assert.equal(p.phase,'adopted');assert.equal(p.effectiveDate,'2026-11-20');
 assert.match(p.limits,/联邦法律公报编号/);
 const ladg=round('sh-anti-discrimination-act-2026');
 assert.equal(ladg.phase,'adopted');assert.equal(ladg.effectiveDate,null,'adopted by the Landtag, not yet promulgated');
});

test('a published designation replaces the earlier "only planned" wording by an appended correction',()=>{
 const d=round('he-tight-housing-market-201a-2027');
 assert.equal(d.effectiveDate,'2027-01-01');assert.match(d.summary,/不改租金/);
 const rent=round('he-rent-protection-proposal-2026'),old=revision('he-rent-protection-proposal-2026',roundVersion('he-rent-protection-proposal-2026')-1);
 for(const e of old.events)assert.deepEqual(rent.events.find(x=>x.id===e.id),e);
 assert(rent.events.some(e=>e.kind==='correction'&&e.date==='2026-11-23'));
 assert.equal(rent.effectiveDate,'2026-11-20');
});

test('EU items keep provisional agreement, signature and application apart',()=>{
 const m=round('eu-methane-regulation-importer-delay-proposal');assert.equal(m.phase,'pending');assert.equal(m.effectiveDate,null);
 const i=round('eu-indonesia-cepa-ipa-signed-2026');assert.equal(i.phase,'pending');assert.equal(i.effectiveDate,null);
 const w=round('eu-plastic-waste-export-ban-non-oecd-2026');assert.equal(w.phase,'adopted');assert.equal(w.effectiveDate,'2026-11-21');assert.equal(w.effectiveDateKind,'application');
});

test('a gazette that refuses the client stays blocked; closed days need reconciled listings',()=>{
 assert.equal(scan('r20261123-fed-04').status,'blocked');assert.equal(scan('r20261123-fed-05').status,'blocked');
 for(const s of store.tables.scan_runs.filter((r:any)=>r.id.startsWith('r20261123')).map((r:any)=>JSON.parse(r.data))){
  if(s.windowEnd>='2026-11-23')assert.notEqual(s.status,'complete',s.id);
 }
 assert.match(roundStamp,/^2026-11-24T\d{2}:\d{2}:\d{2}/);
});

test('this round groups the committee report with its bill and disposes only technical records',()=>{
 const data=createStaticData(store);
 const topics=resolveTopicRegistry(JSON.parse(readFileSync('data/topics.json','utf8')),data);
 const dispositions=resolveDispositionRegistry(JSON.parse(readFileSync('data/dispositions.json','utf8')),data,topics);
 const budget=topics.find(t=>t.id==='de-budget-accompanying-act-2027')!;
 for(const id of ['bt-drs-21-9241-budget-accompanying-act-committee-report','bt-kw48-budget-accompanying-act-referral-back'])assert(budget.recordIds.includes(id),id);
 const disposed=new Set(dispositions.flatMap(d=>d.recordIds));
 for(const id of ['eu-oj-l-202602616','eu-oj-l-202602605','he-2026-gvbl-83','bb-2026-gvbl2-53'])assert(!disposed.has(id),id+' needs a reader decision, not dismissal');
});

test('this round is bound to reviewed English translations',()=>{
 const l=createLocalization(createStaticData(store),JSON.parse(readFileSync('data/translations/content.json','utf8')),JSON.parse(readFileSync('data/translations/bindings.json','utf8')));
 for(const r of store.tables.policies.filter((r:any)=>r.updated_at===roundStamp))assert.equal(l.policies[r.id],'current',r.id);
 for(const r of store.tables.intake.filter((r:any)=>r.discovered_at===roundStamp))assert.equal(l.intake[r.id],'current',r.id);
});
