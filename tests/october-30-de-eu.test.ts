import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readExport} from '../lib/export-store.ts';
import {createStaticData} from '../lib/static-data.ts';
import {policySchema} from '../lib/domain/model.ts';
import {resolveTopics} from '../lib/domain/topics.ts';
import {resolveDispositions} from '../lib/domain/dispositions.ts';
import {createLocalization} from '../lib/i18n/build.ts';

const store=readExport('data/store') as any;
const data=createStaticData(store);
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===`${id}:${version}`).data));
const latest=(id:string)=>revision(id,store.tables.policies.find((p:any)=>p.id===id).version);
const keepsEvents=(id:string)=>{const v=store.tables.policies.find((p:any)=>p.id===id).version;const a=revision(id,v-1),b=revision(id,v);for(const e of a.events)assert.deepEqual(b.events.find(x=>x.id===e.id),e,id);};
const topics=resolveTopics(JSON.parse(readFileSync('data/topics.json','utf8')).topics,data.intake.records,data.policies);
const dispositions=resolveDispositions(JSON.parse(readFileSync('data/dispositions.json','utf8')).dispositions,data.intake.records,data.policies,topics);
const scan=(id:string)=>JSON.parse(store.tables.scan_runs.find((x:any)=>x.id===id).data);

test('Hessen tenant protection keeps the statutory expiry and does not present the plan as adopted',()=>{
 const p=revision('he-rent-protection-2025',4);keepsEvents('he-rent-protection-2025');
 assert.equal(p.status,'adopted');assert.equal(p.nextKind,'expiry');assert.equal(p.nextDate,'2026-11-25');
 assert.match(p.after,/尚未通过/);assert.match(p.after,/从8年缩短为6年/);assert.match(p.limits,/名单未公布/);
 // The study's 76 is not the plan's 71, and neither is the published list.
 assert.match(p.impact,/评估不等于最终名单/);
});

test('the 2027 average supplementary rate is an average, not a frozen insurer rate',()=>{
 const p=latest('de-gkv-average-supplement-2027');keepsEvents('de-gkv-average-supplement-2027');
 assert.equal(p.phase,'adopted');assert.equal(p.effectiveDate,'2027-01-01');assert.match(p.summary,/2\.9%/);assert.match(p.limits,/不是每家公司的费率/);
 assert.match(p.impact,/每月保费700欧元，员工和雇主各付350欧元/);
});

test('published regulations leave their Bundesrat stage and join one matter',()=>{
 for(const [id,date,n] of [['de-benefits-in-kind-values-2027','2027-01-01',324],['de-foreign-health-qualifications-2026','2026-11-01',326]] as const){
  const p=latest(id);keepsEvents(id);assert.equal(p.effectiveDate,date,id);assert.equal(p.phase,'adopted',id);
  const t=topics.find(x=>x.id===id)!;assert.equal(t.recordIds.length,2,id);assert(t.recordIds.includes(`de-20261030-bgbl-${n}`),id);assert.deepEqual(t.policyIds,[id]);}
 assert.match(latest('de-foreign-health-qualifications-2026').limits,/只读了医生部分/);
});

test('the anti-money-laundering act and the cash-register bill stay pending, with their planned steps',()=>{
 const a=revision('de-aml-act-2027',1);assert.equal(a.phase,'pending');assert.equal(a.effectiveDate,null);assert.equal(a.nextDate,'2026-12-16');
 assert.match(a.limits,/1万欧元上限来自欧盟条例/);assert.match(a.before,/第16a条/);
 const k=revision('de-cash-register-digital-receipts-2028',1);assert.equal(k.nextDate,'2026-11-06');assert.match(k.after,/1\.2万欧元/);
 assert.equal(topics.find(x=>x.id==='de-cash-register-digital-receipts-2028')!.recordIds.length,2);
});

test('Hessen fast-track responsibility moves in two steps and keeps earlier applications',()=>{
 const p=revision('he-skilled-immigration-central-office-2026',1);
 assert.equal(p.status,'phased');assert.equal(p.effectiveDate,'2026-09-29');assert.equal(p.nextDate,'2026-12-01');assert.match(p.limits,/10月1日前/);
});

test('tax treaties have a scheduled vote and no adopted status',()=>{
 for(const id of ['de-ukraine-tax-treaty-2026','de-albania-tax-protocol-2026']){const p=latest(id);keepsEvents(id);assert.equal(p.phase,'pending',id);assert.equal(p.nextDate,'2026-11-05',id);assert.equal(p.nextKind,'scheduled',id);}
});

test('withdrawing never-adopted proposals is not reported as ending the policy question',()=>{
 const p=revision('eu-withdrawn-commission-proposals-2026',1);
 assert.equal(p.phase,'closed');assert.match(p.summary,/22项/);assert.match(p.limits,/撤回不等于这些政策目标被放弃/);assert.match(p.impact,/现有的税负不变/);
 const d=revision('eu-carcinogens-workplace-directive-2026',1);
 assert.equal(d.effectiveDate,'2026-11-19');assert.equal(d.nextDate,'2028-11-20');assert.equal(d.nextKind,'deadline');assert.match(d.summary,/转化后才约束雇主/);
});

test('Official Journal 28 and 29 October are reconciled and today stays partial',()=>{
 const a=scan('eu-oj-20261030-1028'),b=scan('eu-oj-20261030-1029'),c=scan('eu-oj-20261030-1030');
 assert.equal(a.status,'complete');assert.equal(a.totalListed,50);assert.equal(b.status,'complete');assert.equal(b.totalListed,41);
 assert.equal(c.status,'partial');assert.equal(c.recordIds.length,40);
 assert(store.tables.scan_runs.filter((r:any)=>r.id.startsWith('de-20261030-state-')).every((r:any)=>JSON.parse(r.data).status!=='complete'));
});

test('Official Journal items are explained, dismissed or left open, and the hybrid-car inquiry is not hidden',()=>{
 const dismissed=new Set(dispositions.flatMap(d=>d.recordIds));
 for(const id of ['eu-oj-c-202605780','eu-oj-l-202602393'])assert(!dismissed.has(id),id);
 assert(dismissed.has('eu-oj-c-202605178'));
 assert(topics.find(t=>t.id==='eu-union-handling-fee-2026')!.recordIds.includes('eu-oj-l-202602403'));
});

test('this round is bound to reviewed English translations',()=>{
 const l=createLocalization(data,JSON.parse(readFileSync('data/translations/content.json','utf8')),JSON.parse(readFileSync('data/translations/bindings.json','utf8')));
 for(const id of ['he-rent-protection-2025','de-gkv-average-supplement-2027','de-aml-act-2027','de-cash-register-digital-receipts-2028','de-civil-status-tax-id-2026','he-skilled-immigration-central-office-2026','eu-withdrawn-commission-proposals-2026','eu-carcinogens-workplace-directive-2026'])assert.equal(l.policies[id],'current',id);
});
