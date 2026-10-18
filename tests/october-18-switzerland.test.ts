import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readExport} from '../lib/export-store.ts';
import {createStaticData} from '../lib/static-data.ts';
import {policySchema} from '../lib/domain/model.ts';
import {resolveTopics} from '../lib/domain/topics.ts';

const store=readExport('data/store') as any;
const data=createStaticData(store);
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===`${id}:${version}`).data));
const topics=resolveTopics(JSON.parse(readFileSync('data/topics.json','utf8')).topics,data.intake.records,data.policies);

test('federal releases use archived pages from the issuing office, not the blocked portal',()=>{
 for(const id of ['ch-jet-fuel-stock-release-2026','ch-platforms-law-youth-protection-2026','ch-efta-malaysia-referendum-2026']){
  const p=revision(id,1);
  assert.match(p.officialId,/^https:\/\/www\.admin\.ch\/de\/newnsb\//,id);
  for(const s of p.sources){
   assert.doesNotMatch(s.url,/^https:\/\/www\.admin\.ch\//,id);
   const check=store.tables.checks.find((c:any)=>c.url===s.url);
   assert.ok(check?.snapshot_key&&!check.error,id+' '+s.url);
  }
 }
});

test('the jet fuel release is temporary and ends on 1 November',()=>{
 const p=revision('ch-jet-fuel-stock-release-2026',1);
 assert.equal(p.status,'temporary');assert.equal(p.nextDate,'2026-11-01');assert.equal(p.nextKind,'expiry');
});

test('a qualified referendum and consultations are not presented as adopted law',()=>{
 for(const id of ['ch-efta-malaysia-referendum-2026','ch-customs-ordinances-consultation-2026','ch-political-rights-disabilities-consultation-2026','ch-be-property-transfer-tax-consultation-2026','ch-vs-arolla-wolf-pack-request-2026'])assert.equal(revision(id,1).phase,'pending',id);
 assert.match(revision('ch-political-rights-disabilities-consultation-2026',1).limits,/双重多数/);
});

test('the health insurer report keeps the current voluntary system',()=>{
 const p=revision('ch-insurer-capital-income-premiums-2026',1);
 assert.equal(p.status,'existing');assert.match(p.limits,/不是法律修改/);
});

test('consultation notices join the existing groups that the new explanations cover',()=>{
 for(const [topic,policy] of [['ch-customs-ordinances-consultation-2026','ch-customs-ordinances-consultation-2026'],['ch-food-ordinances-consultation-2026','ch-food-law-revision-consultation-2026'],['ch-critical-device-shortage-consultation-2026','ch-medical-device-shortage-reporting-2027']]){
  const t=topics.find(t=>t.id===topic)!;
  assert.deepEqual(t.policyIds,[policy]);assert.equal(t.recordIds.length,2);
 }
 assert.deepEqual(topics.find(t=>t.id==='ch-finig-stablecoins-2026')!.policyIds,['ch-finig-stablecoin-crypto-institutes']);
});

test('Geneva records from one weekly communiqué stay separate matters',()=>{
 const ids=['ch-ge-status-s-b-permit-social-aid-2027','ch-ge-rental-value-index-2026','ch-ge-inclusive-school-initiative-206'];
 const official=ids.map(id=>revision(id,1).officialId);
 assert.equal(new Set(official).size,3);
 for(const t of topics)assert.ok(ids.filter(id=>t.policyIds.includes(id)).length<2,t.id);
});

test('composite cantonal digests are dispositioned, not explained as one policy',()=>{
 const d=JSON.parse(readFileSync('data/dispositions.json','utf8')).dispositions.find((x:any)=>x.id==='ch-cantonal-bulletins-2026-10-18');
 assert.ok(d.documents.length>=10);assert.match(d.basis,/were not explained in this run/);
});
