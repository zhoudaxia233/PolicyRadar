import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readExport} from '../lib/export-store.ts';
import {createStaticData} from '../lib/static-data.ts';
import {policySchema} from '../lib/domain/model.ts';
import {explainsRecord} from '../lib/domain/listing.ts';
import {resolveTopics} from '../lib/domain/topics.ts';
import {resolveDispositions} from '../lib/domain/dispositions.ts';
import {createLocalization} from '../lib/i18n/build.ts';

const store=readExport('data/store') as any;
const data=createStaticData(store);
const revision=(id:string,version=1)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===`${id}:${version}`).data));
const scan=(id:string)=>JSON.parse(store.tables.scan_runs.find((x:any)=>x.id===id).data);
const topics=resolveTopics(JSON.parse(readFileSync('data/topics.json','utf8')).topics,data.intake.records,data.policies);
const dispositions=resolveDispositions(JSON.parse(readFileSync('data/dispositions.json','utf8')).dispositions,data.intake.records,data.policies,topics);
const dismissed=new Set(dispositions.flatMap(d=>d.recordIds));
const explained=(r:any)=>data.policies.some(p=>explainsRecord(p,r))||topics.some(t=>t.recordIds.includes(r.id)&&t.policyIds.length>0);

test('every Part I gazette issue of September is recorded once, with Part II left open',()=>{
 const s=scan('de-20261026-bgbl-2026-09');
 assert.equal(s.status,'partial');assert.equal(s.recordIds.length,39);
 // A scanned record may since have been superseded by a corrected row; follow it to the current one.
 const supersededBy=new Map<string,string>(store.tables.intake.map((r:any)=>JSON.parse(r.data)).filter((d:any)=>d.supersedes).map((d:any)=>[d.supersedes,d.id]));
 const current=(id:string)=>{while(supersededBy.has(id))id=supersededBy.get(id)!;return data.intake.records.find(r=>r.id===id)!;};
 const numbers=s.recordIds.map((id:string)=>current(id).officialId);
 assert.deepEqual(numbers,Array.from({length:39},(_,i)=>`BGBl. 2026 I Nr. ${243+i}`));
 const records:ReturnType<typeof current>[]=s.recordIds.map(current);
 for(const r of records)assert(r.date>='2026-09-01'&&r.date<='2026-09-30',r.id);
 // The 15 issues left awaiting explanation on 26 October were explained on 28 October, not dismissed.
 const backlog=[243,244,245,246,247,250,254,255,256,257,259,268,274,275,280];
 const later=records.filter(r=>backlog.includes(+r.officialId!.split(' ').at(-1)!));
 assert.equal(later.length,15);
 assert.deepEqual(later.filter(r=>!explained(r)||dismissed.has(r.id)).map(r=>r.id),[]);
});

test('e-scooter keeper liability applies only to accidents from 1 October',()=>{
 const p=revision('de-escooter-owner-liability-2026');
 assert.equal(p.effectiveDate,'2026-10-01');assert.match(p.before,/20公里/);assert.match(p.after,/2026年10月1日前发生的事故仍按旧规定/);
});

test('the construction winter levy stays at 1% through 2027 and the example separates worker and employer shares',()=>{
 const p=revision('de-construction-winter-levy-2027');
 // Ninth amendment section 3a: 1 January 2026 to 31 December 2027, 0.6% employer, 0.4% employee; 2% from 2028.
 assert.match(p.after,/2027年12月31日/);assert.match(p.after,/2028年1月1日起恢复2%/);
 assert.match(p.impact,/工人承担12欧元、雇主18欧元/);assert.match(p.before,/只适用于2026年/);
});

test('pharmacy opening duties are a scheduled 2027 step and acute-illness supply is not yet usable',()=>{
 const p=revision('de-pharmacy-operations-reform-2026');
 assert.equal(p.status,'phased');assert.equal(p.nextDate,'2027-01-01');assert.equal(p.nextKind,'implementation');
 assert(p.events.some(e=>e.kind==='scheduled'&&e.date==='2027-01-01'));
 assert.match(p.limits,/2027年7月2日/);assert.match(p.limits,/由患者还是医保承担，条例没有写明/);
});

test('wine distillation applications closed by the regulation’s own deadline, with decisions still due',()=>{
 const p=revision('de-wine-crisis-distillation-2026');
 assert.equal(p.status,'application_closed');assert.equal(p.nextDate,'2026-11-30');assert.equal(p.nextKind,'deadline');
 const closed=p.events.find(e=>e.kind==='closed')!;assert.equal(closed.date,'2026-10-15');assert.equal(closed.sourceId,'text');
});

test('the EU–Switzerland PNR agreement is approved but not presented as in force',()=>{
 const p=revision('eu-switzerland-pnr-agreement-2026');
 assert.equal(p.effectiveDate,null);assert.match(p.statusNote!,/生效日期由理事会秘书处另行/);
 assert.deepEqual(topics.find(t=>t.id==='eu-switzerland-pnr-agreement-2026-acts')!.policyIds,['eu-switzerland-pnr-agreement-2026']);
});

test('each sanctions listing keeps its decision and regulation together under one explanation',()=>{
 for(const [topic,policy] of [['eu-russia-destabilisation-listing-2026-09-24-acts','eu-russia-destabilisation-listing-2026-09-24'],['eu-ukraine-children-listing-2026-09-28-acts','eu-ukraine-children-listing-2026-09-28'],['eu-russia-repression-listing-2026-09-28-acts','eu-russia-repression-listing-2026-09-28']]){
  const t=topics.find(x=>x.id===topic)!;assert.equal(t.recordIds.length,2,topic);assert.deepEqual(t.policyIds,[policy]);
 }
});

test('Official Journal days from 24 September to 11 October and 25 October are reconciled',()=>{
 const days=['0924','0925','0926','0927','0928','0929','0930','1001','1002','1003','1004','1005','1006','1007','1009','1010','1011','1025'];
 for(const d of days){const s=scan(`eu-oj-20261026-${d}`);assert.equal(s.status,'complete',d);assert.equal(s.recordIds.length,s.totalListed,d);}
 for(const d of ['0926','0927','1003','1004','1010','1011','1025'])assert.equal(scan(`eu-oj-20261026-${d}`).totalListed,0,d);
 // The Council PE-CONS record dated 1 October is not in that day's Journal and is not counted.
 assert(!scan('eu-oj-20261026-1001').recordIds.some((id:string)=>data.intake.records.find(r=>r.id===id)!.officialId?.startsWith('PE-CONS')));
 assert.equal(scan('eu-oj-20261026-1026').status,'partial');
});

test('no new EU record is left without an explanation or a reviewed reason',()=>{
 const fresh=data.intake.records.filter(r=>r.region==='EU'&&store.tables.intake.find((x:any)=>x.id===r.id).discovered_at.startsWith('2026-10-26'));
 assert(fresh.length>150);
 assert.deepEqual(fresh.filter(r=>!explained(r)&&!dismissed.has(r.id)).map(r=>r.id),[]);
});

test('new explanations and records are bound to reviewed English translations',()=>{
 const l=createLocalization(data,JSON.parse(readFileSync('data/translations/content.json','utf8')),JSON.parse(readFileSync('data/translations/bindings.json','utf8')));
 for(const id of ['de-artists-social-levy-2027','de-escooter-owner-liability-2026','de-construction-winter-levy-2027','de-rsv-clesrovimab-2026','de-ev-plate-low-emission-zones-2026','de-pharmacy-operations-reform-2026','de-wine-crisis-distillation-2026','de-war-weapons-general-permits-2026','de-federal-convention-seats-2027','de-real-estate-tax-notary-e-filing-2026','eu-russia-destabilisation-listing-2026-09-24','eu-ukraine-children-listing-2026-09-28','eu-russia-repression-listing-2026-09-28','eu-pea-protein-china-ad-2026','eu-switzerland-pnr-agreement-2026'])assert.equal(l.policies[id],'current',id);
});
