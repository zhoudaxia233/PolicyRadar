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

test('the rejected 2027 social security bill stays pending and explains the remaining procedure',()=>{
 const v2=revision('fr-social-security-bill-2027',2),v3=revision('fr-social-security-bill-2027',3);
 for(const e of v2.events)assert.deepEqual(v3.events.find(x=>x.id===e.id),e);
 // A first-reading rejection does not end the bill: Article 47-1 allows implementation by ordinance after 50 days.
 assert.equal(v3.phase,'pending');assert.equal(v3.status,'pending');assert.equal(v3.nextDate,null);
 assert.match(v3.summary,/不等于草案中的措施已被放弃/);assert.match(v3.statusNote!,/法令实施/);
 assert(v3.sources.some(s=>s.id==='constitution'));assert(v3.events.some(e=>e.id==='an-rejected-20261023'&&e.date==='2026-10-23'));
});

test('the 2027 social security ceiling is an income cap, not an adopted order yet',()=>{
 const p=revision('fr-social-security-ceiling-2027',1);
 assert.equal(p.phase,'pending');assert.match(p.after,/48,900欧元/);assert.match(p.impact,/11,100欧元不再计入/);
});

test('UK access regulations keep their thresholds, deadlines and penalty caps',()=>{
 const p=revision('gb-trade-union-workplace-access-2026',1);
 assert.equal(p.effectiveDate,'2026-10-30');
 for(const s of ['15个工作日','25个工作日','55个工作日','少于21人','7.5万英镑','50万'])assert.match(p.summary,new RegExp(s));
 assert.deepEqual(topics.find(t=>t.id==='gb-trade-union-workplace-access-2026')!.policyIds,['gb-trade-union-workplace-access-2026']);
});

test('every new UK instrument is recorded with its territory and either explained, dismissed or left awaiting',()=>{
 const recs=data.intake.records.filter((r:any)=>r.id.startsWith('gb-leg-'));
 assert.equal(recs.length,49);
 assert.equal(recs.find((r:any)=>r.id==='gb-leg-nisr-2026-181')!.region,'GB-NIR');
 assert.equal(recs.find((r:any)=>r.id==='gb-leg-wsi-2026-124')!.region,'GB-WLS');
 const dismissed=new Set(dispositions.flatMap(d=>d.recordIds));
 // The teachers' pay order is not explained: its pay figures sit in a separate document this run did not read.
 assert(!dismissed.has('gb-leg-uksi-2026-1096'));assert(!data.policies.some((p:any)=>p.officialId==='S.I. 2026/1096'));
});
