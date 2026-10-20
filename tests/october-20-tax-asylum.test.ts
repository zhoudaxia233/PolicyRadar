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

test('Ukraine temporary protection separates the military condition from the extension period',()=>{
 const p=revision('eu-temporary-protection-ukraine-2028',1);
 assert.equal(p.effectiveDate,'2026-08-05');assert.equal(p.nextDate,'2027-03-05');assert.equal(p.status,'phased');
 assert.match(p.summary,/2028年3月4日/);assert.match(p.summary,/2026年7月31日起/);
 // Existing holders are exempt; the extension does not settle national benefits.
 assert.match(p.summary,/不受新条件影响/);assert.match(p.limits,/仍由各国法律规定/);
});

test('safe-country amendments are two acts in one matter and apply with the asylum pact',()=>{
 const t=topics.find(t=>t.id==='eu-asylum-safe-country-concepts-2026')!;
 assert.deepEqual([...t.policyIds].sort(),['eu-safe-countries-of-origin-list-2026','eu-safe-third-country-concept-2026']);
 for(const id of t.policyIds){const p=revision(id,1);assert.equal(p.effectiveDateKind,'application');assert.equal(p.effectiveDate,'2026-06-12');}
 // A listed country is a presumption with accelerated examination, not automatic refusal.
 assert.match(revision('eu-safe-countries-of-origin-list-2026',1).impact,/不等于这些国家的申请一律被拒/);
});

test('European Council migration conclusions are not presented as law',()=>{
 const p=revision('eu-euco-migration-conclusions-2026-10',1);
 assert.equal(p.effectiveDate,null);assert.match(p.limits,/不是法律/);
});

test('diesel relief records the IRS penalty relief without claiming a tax waiver',()=>{
 const v1=revision('us-diesel-emergency-relief-2026',1),v2=revision('us-diesel-emergency-relief-2026',2);
 for(const e of v1.events)assert.deepEqual(v2.events.find(x=>x.id===e.id),e);
 assert.equal(v2.status,'temporary');assert.equal(v2.effectiveDate,'2026-10-01');assert.equal(v2.nextDate,'2026-12-31');assert.equal(v2.nextKind,'expiry');
 assert.match(v2.limits,/不是已确定的免税/);
 assert(topics.find(t=>t.id==='us-diesel-emergency-relief-2026')!.recordIds.includes('us-irs-ir-2026-122'));
});

test('proposed premium tax credit rules and the Dutch tax plan stay pending',()=>{
 assert.equal(revision('us-premium-tax-credit-eligibility-2027',1).phase,'pending');
 const nl=revision('nl-tax-plan-2027',1);
 assert.equal(nl.phase,'pending');assert.match(nl.impact,/不等于月薪增加173欧元/);
 const t=topics.find(t=>t.id==='nl-tax-plan-2027')!;
 assert.deepEqual([...t.policyIds].sort(),['nl-tax-plan-2027','nl-transfer-tax-proposal-2027']);
});

test('Making Tax Digital explains turnover as gross income, not profit',()=>{
 const p=revision('gb-mtd-income-tax-30000-2027',1);
 assert.equal(p.nextDate,'2027-04-06');assert.match(p.impact,/不是利润/);
});

test('every recorded IRS and HMRC item of this run is explained, grouped or reviewed',()=>{
 const ids=['us-irs-ir-2026-118','us-irs-ir-2026-119','us-irs-ir-2026-120','us-irs-ir-2026-121','us-irs-ir-2026-122','us-irs-ir-2026-123','us-irs-ir-2026-124','gb-hmrc-20261001-vaping-duty','gb-hmrc-20261005-mtd-30000','gb-hmrc-20261008-sa-early','gb-hmrc-20261013-tfc-halloween'];
 const records=data.intake.records.filter((r:any)=>ids.includes(r.id));
 assert.equal(records.length,ids.length);
 const explained=new Set(data.policies.map((p:any)=>p.region+'\0'+p.officialId));
 const grouped=new Set(topics.filter(t=>t.policyIds.length).flatMap(t=>t.recordIds));
 const reviewed=new Set(resolveDispositions(JSON.parse(readFileSync('data/dispositions.json','utf8')).dispositions,data.intake.records,data.policies,topics).flatMap((d:any)=>d.recordIds));
 const open=records.filter((r:any)=>!explained.has(r.region+'\0'+(r.officialId??r.url))&&!grouped.has(r.id)&&!reviewed.has(r.id));
 assert.deepEqual(open.map((r:any)=>r.id),[]);
});
