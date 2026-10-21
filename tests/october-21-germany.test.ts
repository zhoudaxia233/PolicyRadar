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

test('child benefit without an application is discretionary, birth-based and starts in 2027',()=>{
 const p=revision('de-kindergeld-without-application-2027',1);
 assert.equal(p.effectiveDate,'2027-01-01');assert.equal(p.officialId,'BGBl. 2026 I Nr. 307');
 // "kann" in section 67(2): not every child is paid automatically.
 assert.match(p.after,/裁量/);assert.match(p.limits,/在国外出生后迁入/);assert.match(p.summary,/金额本身不变/);
});

test('the DTZ B1 rule tightens from 1 November without claiming a confirmed transition',()=>{
 const p=revision('de-integration-test-b1-rule-2026',1);
 assert.equal(p.effectiveDate,'2026-11-01');assert.match(p.after,/至少A2/);assert.match(p.limits,/尚未经联邦移民局/);
});

test('published tobacco tax keeps parliamentary history and phases in from 2027',()=>{
 const v3=revision('de-tobacco-tax-2027',3),v4=revision('de-tobacco-tax-2027',4);
 for(const e of v3.events)assert.deepEqual(v4.events.find(x=>x.id===e.id),e);
 assert.equal(v4.status,'phased');assert.equal(v4.effectiveDate,'2026-10-21');assert.equal(v4.nextDate,'2027-01-01');assert.equal(v4.nextKind,'implementation');
 assert(topics.find(t=>t.id==='de-tobacco-tax-2027')!.recordIds.includes('de-20261021-bgbl-309'));
});

test('oil release publication records the stock-day reduction, not an invented end date',()=>{
 const p=revision('de-oil-reserve-release-2026',3);
 assert.equal(p.effectiveDate,'2026-10-22');assert.match(p.after,/90天降至82天/);assert.match(p.limits,/未写降低储备的结束日期/);
});

test('the Annual Tax Act bill stays pending with an explicit interest example and open leads',()=>{
 const p=revision('de-annual-tax-act-2026',1);
 assert.equal(p.phase,'pending');assert.equal(p.effectiveDate,null);assert.equal(p.nextDate,'2026-11-02');
 assert.match(p.impact,/=18欧元/);assert.match(p.impact,/=36欧元/);
 // Children outside the EU/EEA remain subject to the reduction.
 assert.match(p.after,/欧洲经济区以外/);assert.match(p.limits,/内容尚未公开/);
 assert.deepEqual(topics.find(t=>t.id==='de-annual-tax-act-2026')!.recordIds.sort(),['kab62-top1-09','kab62-top1-10']);
});

test('PNOG gains its scheduled first reading without changing the bill stage',()=>{
 const p=revision('de-care-insurance-reform-pnog',3);
 assert.equal(p.phase,'pending');assert.equal(p.nextDate,'2026-11-05');assert.equal(p.nextKind,'scheduled');
});

test('every gazette issue of this run is explained or grouped with its explanation',()=>{
 const explained=new Set(data.policies.map((p:any)=>p.region+'\0'+p.officialId));
 const grouped=new Set(topics.flatMap(t=>t.policyIds.length?t.recordIds:[]));
 for(const n of [290,291,292,293,294,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313]){
  const r=data.intake.records.find((x:any)=>x.id===`de-20261021-bgbl-${n}`)!;
  assert(explained.has('DE\0'+r.officialId)||grouped.has(r.id),`BGBl ${n}`);
 }
});

test('cabinet reports and the NSU debate are reviewed without explanation',()=>{
 const d=resolveDispositions(JSON.parse(readFileSync('data/dispositions.json','utf8')).dispositions,data.intake.records,data.policies,topics);
 const ids=new Set(d.flatMap((x:any)=>x.recordIds));
 for(const id of ['kab62-top1-04','kab62-top1-05','bt-kw45-nsu-debate'])assert(ids.has(id),id);
});
