import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readExport} from '../lib/export-store.ts';
import {createStaticData} from '../lib/static-data.ts';
import {policySchema} from '../lib/domain/model.ts';
import {resolveTopics} from '../lib/domain/topics.ts';
import {resolveDispositions} from '../lib/domain/dispositions.ts';

const store=readExport('data/store') as any;
const data=createStaticData(store);
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===`${id}:${version}`).data));
const topics=resolveTopics(JSON.parse(readFileSync('data/topics.json','utf8')).topics,data.intake.records,data.policies);

test('every Official Journal entry of 12–16 October is explained, grouped or reviewed',()=>{
 const records=data.intake.records.filter((r:any)=>r.id.startsWith('eu-oj-')&&r.date>='2026-10-12'&&r.date<='2026-10-16');
 assert.equal(records.length,217);
 const explained=new Set(data.policies.map((p:any)=>p.region+'\0'+p.officialId));
 const grouped=new Set(topics.filter(t=>t.policyIds.length).flatMap(t=>t.recordIds));
 const reviewed=new Set(resolveDispositions(JSON.parse(readFileSync('data/dispositions.json','utf8')).dispositions,data.intake.records,data.policies,topics).flatMap((d:any)=>d.recordIds));
 const open=records.filter((r:any)=>!explained.has(r.region+'\0'+r.officialId)&&!grouped.has(r.id)&&!reviewed.has(r.id));
 assert.deepEqual(open.map((r:any)=>r.id),[]);
 for(const day of ['12','13','14','15','16']){
  const row=store.tables.scan_runs.find((s:any)=>s.id===`eu-oj-20261018-${day}`);const s=JSON.parse(row.data);
  assert.equal(s.status,'complete');assert.equal(s.totalListed,s.recordIds.length);
 }
});

test('the published Return Regulation is phased and compared with the directive it replaces',()=>{
 const p=revision('eu-return-regulation-adoption-2026',2);
 assert.equal(p.status,'phased');assert.equal(p.effectiveDate,'2026-10-16');assert.equal(p.nextDate,'2027-10-17');
 assert.match(p.before,/不超过5年/);assert.match(p.after,/最长10年/);
 assert.match(p.impact,/持有效居留许可的外国人/);
});

test('the pharmaceutical reform stays pending after the Council positions are published',()=>{
 const p=revision('eu-pharma-package-council-2026',2);
 assert.equal(p.phase,'pending');assert.match(p.limits,/尚未成为法律/);
 assert.deepEqual(topics.find(t=>t.id==='eu-pharma-package-council-positions')!.policyIds,['eu-pharma-package-council-2026']);
});

test('sanctions decisions and regulations are one matter each',()=>{
 const t=topics.find(t=>t.id==='eu-russia-military-industrial-listing-2026-10-acts')!;
 for(const id of ['eu-oj-l-202602279','eu-oj-l-202602281'])assert(t.recordIds.includes(id),id);
 // The Commission's announcement of the same package joined the group later.
 assert(t.recordIds.includes('eu-news-20261012-russia-listings'));
 assert.match(revision('eu-russia-military-industrial-listing-2026-10',1).summary,/826个实体和743人/);
});

test('mobile driving licence rules do not invent the default-format date',()=>{
 const p=revision('eu-mobile-driving-licence-rules',1);
 assert.equal(p.effectiveDate,'2026-11-03');assert.equal(p.nextDate,'2029-11-26');
 assert.match(p.limits,/不推算/);
});

test('German opposition motions keep their outcome: rejected motions close, referred ones stay pending',()=>{
 assert.equal(revision('de-bt-motion-biodiversity-cop17-2026',1).phase,'closed');
 assert.equal(revision('de-bt-motions-food-supply-2026',1).phase,'closed');
 const referred=revision('de-bt-motion-migration-turn-2026',1);
 assert.equal(referred.phase,'pending');
 const record=data.intake.records.find((r:any)=>r.id==='daily-de-20261009-bt-44')!;
 assert.equal(referred.officialId,record.url);
 assert.match(revision('de-br-energy-price-relief-motion-2026',1).limits,/不能当作已确定的补贴/);
});
