import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readExport} from '../lib/export-store.ts';
import {createStaticData} from '../lib/static-data.ts';
import {policySchema} from '../lib/domain/model.ts';
import {currentRecords} from '../lib/domain/corrections.ts';
import {resolveTopics} from '../lib/domain/topics.ts';
import {resolveDispositions} from '../lib/domain/dispositions.ts';

const store=readExport('data/store') as any;
const data=createStaticData(store);
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.policy_id===id&&r.version===version).data));
const topics=resolveTopics(JSON.parse(readFileSync('data/topics.json','utf8')).topics,data.intake.records,data.policies);
const dispositions=resolveDispositions(JSON.parse(readFileSync('data/dispositions.json','utf8')).dispositions,data.intake.records,data.policies,topics);
const dismissed=new Set(dispositions.flatMap(d=>d.recordIds));
const groupOf=(id:string)=>topics.find(t=>t.recordIds.includes(id))?.id;
const scan=(id:string)=>JSON.parse(store.tables.scan_runs.find((x:any)=>x.id===id).data);
const keepsEvents=(id:string,from:number,to:number)=>{const a=revision(id,from),b=revision(id,to);for(const e of a.events)assert.deepEqual(b.events.find(x=>x.id===e.id),e,id);};

// The Bundesrat renumbered its 20 November agenda on 10 November. The new number supersedes the
// old scheduled step; the stage and the meeting date stay unchanged.
const renumbered=[['de-social-insurance-ceilings-2027',4,53,48],['de-co2-price-corridor-2027',5,9,10],['de-carf-agreement-2026',11,14,15],['de-emergency-care-reform-2026',4,5,6],['de-cash-register-digital-receipts-2028',3,30,32],['de-tax-adviser-exam-2026',3,31,33],['de-care-insurance-reform-pnog',6,32,34]] as const;

test('a renumbered agenda item supersedes the old step without changing the stage',()=>{
 for(const [id,v,oldN,newN] of renumbered){
  const p=revision(id,v),old=revision(id,v-1);keepsEvents(id,v-1,v);
  assert.equal(p.phase,old.phase,id);assert.equal(p.effectiveDate,old.effectiveDate,id);
  assert.equal(p.nextDate,'2026-11-20',id);assert.equal(p.nextKind,'scheduled',id);
  const e=p.events.find(x=>x.id===`br-1070-1110-top-${newN}`)!;
  assert.equal(e.supersedes,`br-1070-top-${oldN}`,id);assert.equal(e.kind,'scheduled',id);
  const current=currentRecords(p.events);
  assert(!current.some(x=>x.id===`br-1070-top-${oldN}`),id);
  assert.match(p.statusNote!,new RegExp(`11月10日更新版）第${newN}项`),id);
  assert.doesNotMatch(p.statusNote!,new RegExp(`第${oldN}项`),id);
  assert.match(p.nextLabel,new RegExp(`议程第${newN}项`),id);
 }
 // Items 14 and 16 of the new agenda are the other two exchange agreements, not the crypto act.
 assert.match(revision('de-carf-agreement-2026',11).sources.find(s=>s.id==='br-1070-agenda')!.note,/第14、16项是那两项协议/);
 // Committee recommendations are named but not treated as decisions.
 assert.match(revision('de-care-insurance-reform-pnog',6).statusNote!,/587\/1\/26.*本轮未核读/);
});

test('motions dropped from the agenda lose their date but keep their stage',()=>{
 for(const [id,oldN] of [['de-br-pension-trust-motion-2026',17],['de-br-energy-price-relief-motion-2026',20]] as const){
  const p=revision(id,3);keepsEvents(id,2,3);
  assert.equal(p.phase,'pending',id);assert.equal(p.nextDate,null,id);assert.equal(p.nextKind,undefined,id);
  const e=p.events.find(x=>x.id==='br-1070-1110-removed')!;
  assert.equal(e.kind,'correction');assert.equal(e.supersedes,`br-1070-top-${oldN}`);
  assert(!p.events.some(x=>x.kind==='adopted'||x.kind==='withdrawn'),id);
  assert.match(p.statusNote!,/原因未公布/);
  assert(p.sources.some(s=>s.id==='br-procedure'),id);
 }
});

test('laws newly listed for the Bundesrat are scheduled, not adopted by it',()=>{
 for(const [id,v,n] of [['de-fiscal-equalisation-2026',3,5],['de-ukraine-tax-treaty-2026',5,17],['de-albania-tax-protocol-2026',5,18]] as const){
  const p=revision(id,v);keepsEvents(id,v-1,v);
  assert.equal(p.phase,'pending',id);assert.equal(p.nextDate,'2026-11-20',id);
  assert.equal(p.events.find(e=>e.id===`br-1070-1110-top-${n}`)!.kind,'scheduled',id);
  assert(topics.find(t=>t.id===id)!.recordIds.includes(`br-1070-1110-top-${n}`),id);
 }
 // The fiscal equalisation card was behind: the Bundestag adopted it on 5 November.
 const fag=revision('de-fiscal-equalisation-2026',3);
 assert.equal(revision('de-fiscal-equalisation-2026',2).statusNote!.includes('日期未公布'),true);
 assert(fag.events.some(e=>e.id==='bt-adopted-20261105'&&e.kind==='adopted'));
 assert.match(fag.statusNote!,/烟草税法/);assert.match(fag.limits,/21\/8946/);
});

test('scheduled Bundestag votes on 12 November are not results',()=>{
 for(const [id,v] of [['de-annual-tax-act-2026',4],['de-grid-support-proposal-2027',5]] as const){
  const p=revision(id,v);keepsEvents(id,v-1,v);
  assert.equal(p.phase,'pending',id);assert.equal(p.nextDate,'2026-11-12',id);assert.equal(p.nextKind,'scheduled',id);
  assert(p.events.some(e=>e.id==='bt-vote-1112'&&e.kind==='scheduled'),id);
  assert(!p.events.some(e=>e.kind==='adopted'&&e.date>='2026-11-07'),id);
 }
 assert.doesNotMatch(revision('de-annual-tax-act-2026',4).limits,/最终表决日期未经官方确认/);
 assert.match(revision('de-grid-support-proposal-2027',5).statusNote!,/不同意参议院/);
});

test('a ministry draft ordinance is not current law and the parent Act gap is stated',()=>{
 const p=revision('de-pension-contract-information-ordinance-2027',1);
 assert.equal(p.phase,'pending');assert.equal(p.nextDate,'2026-11-20');assert.equal(p.nextKind,'deadline');
 assert.match(p.statusNote!,/部级草案/);assert.match(p.statusNote!,/不是现行规定/);
 assert.match(p.limits,/尚未单独解读母法/);assert.match(p.impact,/数字只是说明/);
 assert(p.sources.some(s=>s.url.endsWith('/bgbl/1/2026/156/VO.html')));
});

test('the Berlin ordinance is planning law, not a rent cap, and not yet in force',()=>{
 const p=revision('de-be-tight-housing-market-2027',1);
 assert.equal(p.phase,'pending');assert.equal(p.effectiveDate,null);
 assert.match(p.summary,/不是租金上限/);assert.match(p.limits,/第250条/);
 assert.match(p.statusNote!,/知悉/);
});

test('provisional Child Benefit amounts are labelled as benefit amounts with a worked example',()=>{
 const p=revision('gb-child-benefit-rates-2027-28',1);
 assert.equal(p.phase,'pending');assert.match(p.summary,/28\.00英镑/);assert.match(p.summary,/18\.55英镑/);
 assert.match(p.summary,/不是收入门槛/);assert.match(p.impact,/46\.55/);assert.match(p.impact,/高收入儿童福利税费/);
 assert.match(p.statusNote!,/暂定/);
});

test('a Council general approach on IOSS is not adoption and is kept apart from customs duty',()=>{
 const p=revision('eu-vat-ioss-threshold-removal-2028',1);
 assert.equal(p.phase,'pending');assert(!p.events.some(e=>e.kind==='adopted'));
 assert.match(p.statusNote!,/不是最终通过/);assert.match(p.limits,/不涉及关税/);
 assert.match(p.summary,/消费者不会多交一种税/);
 assert.equal(groupOf('eu-taxud-20261109-ioss-threshold'),'eu-vat-ioss-threshold-removal-2028');
 assert.notEqual(groupOf('eu-taxud-20261109-ioss-threshold'),groupOf('eu-low-value-parcels-2026'));
});

test('the French working-pensioner rules apply only to new pensioners from 2027',()=>{
 const p=revision('fr-working-pensioner-rules-2027',1);
 assert.equal(p.effectiveDate,'2027-01-01');assert.equal(p.phase,'adopted');
 assert.match(p.summary,/7,000欧元/);assert.match(p.impact,/1,500欧元/);
 assert(p.rules!.some(r=>/旧规则/.test(r.detail)));
});

test('the December gas benchmark updates the card while November stays in history',()=>{
 const p=revision('fr-gas-benchmark-october-2026',4);keepsEvents('fr-gas-benchmark-october-2026',3,4);
 assert.match(p.summary,/206\.26/);assert(p.events.some(e=>e.id==='november-announcement'));
 assert.equal(p.nextDate,'2026-12-01');
 assert.equal(groupOf('fr-20261110-sp-a17956'),'fr-gas-benchmark-october-2026');
});

test('closed days are reconciled and the current day stays partial',()=>{
 for(const id of ['de-20261110-bgbl-1107','de-20261110-bgbl-1108','eu-oj-20261110-1107','eu-oj-20261110-1108']){const s=scan(id);assert.equal(s.status,'complete',id);assert.equal(s.totalListed,0,id);}
 const b=scan('de-20261110-bgbl-1109');assert.equal(b.status,'complete');assert.equal(b.totalListed,4);assert.equal(b.recordIds.length,4);
 const oj=scan('eu-oj-20261110-1109');assert.equal(oj.status,'complete');assert.equal(oj.totalListed,52);assert.equal(oj.recordIds.length,52);
 for(const id of ['de-20261110-bgbl-1110','eu-oj-20261110-1110','de-20261110-hb-gbl-1110'])assert.equal(scan(id).status,'partial',id);
});

test('records needing review are not hidden by bulk dispositions',()=>{
 // A CJEU judgment on German household-cost deductions stays awaiting review.
 assert(!dismissed.has('eu-oj-c-202605601'));
 assert(dismissed.has('eu-oj-c-202605594'));
 // Exam ordinances and the hospital staffing ordinance stay awaiting; the VAT distribution keys are dismissed.
 for(const id of ['de-20261110-bgbl-332','de-20261110-bgbl-333','de-20261110-bgbl-334'])assert(!dismissed.has(id),id);
 assert(dismissed.has('de-20261110-bgbl-331'));
 // Committee recommendations belong to their own bill only.
 assert.equal(groupOf('br-1070-587-1-26'),'de-care-insurance-reform-pnog');
 assert.equal(groupOf('br-1070-620-1-26'),'de-emergency-care-reform-2026');
});
