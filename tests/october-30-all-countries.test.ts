import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readExport} from '../lib/export-store.ts';
import {createStaticData} from '../lib/static-data.ts';
import {policySchema} from '../lib/domain/model.ts';
import {resolveTopicRegistry} from '../lib/domain/topics.ts';
import {resolveDispositionRegistry} from '../lib/domain/dispositions.ts';
import {explainsRecord} from '../lib/domain/listing.ts';
import {createLocalization} from '../lib/i18n/build.ts';

const store=readExport('data/store') as any;
const data=createStaticData(store);
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===`${id}:${version}`).data));
const policy=(id:string)=>data.policies.find(p=>p.id===id)!;
const ids=['es-rent-renewal-compensation-2026','es-housing-social-function-2026','es-social-protection-rdl-31-2026','gb-high-value-council-tax-surcharge-2028','gb-property-savings-income-tax-2027','gb-badr-limit-500k-2027','gb-two-child-limit-removed-2026','gb-salary-sacrifice-nic-2029','gb-renters-rights-tenancy-reform-2026','gb-refugee-sponsorship-routes-2026','nl-lodger-rental-bill-36992','nl-pension-wtp-promises-bill-36957','nl-single-permit-directive-bill-36958','us-cftc-crypto-transactions-anpr','fr-agirc-arrco-november-2026','de-green-skilled-immigration-motions-2026'];

test('every new explanation has a matching record, a current translation and an area',()=>{
 const localization=createLocalization(data,JSON.parse(readFileSync('data/translations/content.json','utf8')),JSON.parse(readFileSync('data/translations/bindings.json','utf8')));
 const areas=JSON.parse(readFileSync('data/areas.json','utf8'));
 for(const id of ids){
  const p=policy(id);
  assert.ok(data.intake.records.some(r=>explainsRecord(p,r)),id);
  assert.equal(localization.policies[id],'current',id);
  assert.ok(areas.topics[p.topic],p.topic);
 }
});

test('Spanish decree-laws keep their stages apart',()=>{
 const rent=policy('es-rent-renewal-compensation-2026');
 assert.equal(rent.effectiveDate,'2026-11-15');
 assert.equal(rent.nextKind,'deadline');
 assert.match(rent.statusNote!,/仍须国会/);
 assert.match(rent.limits,/27\/2026/);
 assert.equal(revision('es-rdl-25-2026-casp-aml',2).lastEventDate,'2026-10-20');
 const crypto=policy('es-rdl-25-2026-casp-aml');
 assert.match(crypto.title,/已获国会常设委员会确认/);
 assert.doesNotMatch(crypto.statusNote!,/未查到/);
 assert.ok(crypto.events.some(e=>e.id==='es-rdl-25-2026-validated'&&e.date==='2026-10-16'));
});

test('Budget measures stay proposals until the Finance Bill passes',()=>{
 for(const id of ['gb-high-value-council-tax-surcharge-2028','gb-property-savings-income-tax-2027','gb-badr-limit-500k-2027']){
  const p=policy(id);
  assert.equal(p.phase,'pending');
  assert.equal(p.effectiveDate,null);
 }
});

test('an elapsed date is cleared without claiming the step happened',()=>{
 const p=policy('nl-self-employed-consultation-2026');
 assert.equal(p.nextDate,null);
 assert.match(p.limits,/没有核实/);
 assert.equal(p.status,'pending');
});

test('routine dispositions leave the awaiting list but keep rights-related records open',()=>{
 const topics=resolveTopicRegistry(JSON.parse(readFileSync('data/topics.json','utf8')),data);
 const dispositions=resolveDispositionRegistry(JSON.parse(readFileSync('data/dispositions.json','utf8')),data,topics);
 const dismissed=new Set(dispositions.flatMap(d=>d.recordIds));
 const find=(id:string)=>data.intake.records.filter(r=>r.officialId===id);
 assert.ok(data.intake.records.filter(r=>r.region==='GB'&&r.title.includes('Air Navigation (Restriction of Flying)')).every(r=>dismissed.has(r.id)));
 for(const id of ['S.I. 2026/1008','UKPGA 2026/22','Kamerstuk 37024','BOE-A-2026-12519'])assert.ok(find(id).length&&!find(id).some(r=>dismissed.has(r.id)),id);
 assert.ok(!data.intake.records.some(r=>dismissed.has(r.id)&&r.region==='GB-SCT'&&r.discoveredAt>'2026-10-30T22:00:00.000Z'));
});
