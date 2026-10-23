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
const dispositions=resolveDispositions(JSON.parse(readFileSync('data/dispositions.json','utf8')).dispositions,data.intake.records,data.policies,topics);

test('price-display fines rise to EUR 100,000 from 2027 and the old EUR 25,000 cap stays visible',()=>{
 const p=revision('de-price-indication-fines-2027',1);
 assert.equal(p.officialId,'BGBl. 2026 I Nr. 314');assert.equal(p.effectiveDate,'2027-01-01');
 assert.match(p.before,/2\.5万欧元/);assert.match(p.after,/10万欧元/);assert.match(p.after,/AFIR/);
});

test('the digital driving licence is proof within Germany only and keeps the card valid',()=>{
 const p=revision('de-digital-driving-licence-2026',1);
 assert.equal(p.effectiveDate,'2026-10-14');assert.equal(p.lastEventDate,'2026-10-22');
 // Section 2(1a) StVG: "im Inland"; card licences from 1999 only.
 assert.match(p.impact,/出境应带实体驾照/);assert.match(p.limits,/1999年1月1日/);assert.match(p.limits,/实体卡继续有效/);
});

test('the parcel handling fee applies from 1 November without rewriting the earlier review-period event',()=>{
 const v2=revision('eu-low-value-parcels-2026',2),v3=revision('eu-low-value-parcels-2026',3);
 for(const e of v2.events)assert.deepEqual(v3.events.find(x=>x.id===e.id),e);
 assert.equal(v3.status,'temporary');assert.equal(v3.effectiveDate,'2026-07-01');
 assert.equal(v3.nextDate,'2026-11-01');assert.equal(v3.nextKind,'implementation');
 assert(v3.sources.some(s=>s.id==='handling-fee-reg'));assert.match(v3.impact,/共10欧元/);
 assert.deepEqual(topics.find(t=>t.id==='eu-union-handling-fee-2026')!.policyIds,['eu-low-value-parcels-2026']);
});

test('Parliament positions are not reported as adopted law',()=>{
 for(const [id,v] of [['eu-passenger-rights-enforcement-2026',2],['eu-epr-authorised-representative-suspension',3],['eu-epr-waste-directives-suspension',3],['eu-erasmus-plus-2028-2034',3],['eu-methane-regulation-importer-delay-proposal',2]] as const){
  const p=revision(id,v);assert.equal(p.phase,'pending',id);assert.equal(p.effectiveDate,null,id);
 }
 assert.equal(revision('eu-erasmus-plus-2028-2034',3).nextDate,null);
 assert.deepEqual(revision('eu-methane-regulation-importer-delay-proposal',2).politics!.votes![0].counts,{for:341,against:225,abstain:6});
 // Parliament limits the EPR suspension to EU small and micro enterprises; the Commission proposal did not.
 assert.match(revision('eu-epr-authorised-representative-suspension',3).after,/小型和微型企业/);
});

test('the Hungary decision is limited to the conditionality measures and has no invented effective date',()=>{
 const p=revision('eu-hungary-conditionality-measures-lifted-2026',1);
 assert.equal(p.effectiveDate,null);assert.match(p.limits,/不能据此认为匈牙利所有被冻结的欧盟资金都已放行/);
});

test('every Official Journal item of 19–22 October is explained, grouped or reviewed',()=>{
 const explained=new Set(data.policies.map((p:any)=>p.region+'\0'+p.officialId));
 const grouped=new Set(topics.flatMap(t=>t.policyIds.length?t.recordIds:[]));
 const dismissed=new Set(dispositions.flatMap(d=>d.recordIds));
 const items=data.intake.records.filter((r:any)=>r.region==='EU'&&r.sourceUrl==='https://eur-lex.europa.eu/oj/direct-access.html'&&r.date>='2026-10-19'&&r.date<='2026-10-22');
 assert.equal(items.length,172);
 for(const r of items)assert(explained.has('EU\0'+r.officialId)||grouped.has(r.id)||dismissed.has(r.id),r.id);
 for(const day of [19,20,21,22]){const s=JSON.parse(store.tables.scan_runs.find((x:any)=>x.id===`eu-oj-20261023-${day}`).data);assert.equal(s.status,'complete');assert.equal(s.totalListed,s.recordIds.length);}
 assert.equal(JSON.parse(store.tables.scan_runs.find((x:any)=>x.id==='eu-oj-20261023-23').data).status,'partial');
});
