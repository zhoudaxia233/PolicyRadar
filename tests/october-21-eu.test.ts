import test from 'node:test';
import assert from 'node:assert/strict';
import {readExport} from '../lib/export-store.ts';
import {policySchema} from '../lib/domain/model.ts';

const store=readExport('data/store') as any;
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===`${id}:${version}`).data));

test('passenger rights enforcement stays pending until the Council adopts it',()=>{
 const p=revision('eu-passenger-rights-enforcement-2026',1);
 assert.equal(p.phase,'pending');assert.equal(p.effectiveDate,null);assert.equal(p.officialId,'2023/0437(COD)');
 // The vote result was not published; the explanation must not claim adoption.
 assert.match(p.statusNote!,/未列出结果/);assert.match(p.impact,/215欧元/);assert.match(p.limits,/两部不同的法规/);
});

test('a held plenary vote without a published result clears the elapsed date but keeps the stage',()=>{
 for(const id of ['eu-epr-authorised-representative-suspension','eu-epr-waste-directives-suspension']){
  const v1=revision(id,1),v2=revision(id,2);
  for(const e of v1.events)assert.deepEqual(v2.events.find(x=>x.id===e.id),e);
  assert.equal(v2.phase,'pending');assert.equal(v2.nextDate,null);assert.match(v2.statusNote!,/尚未列出结果/);
 }
});

test('Erasmus+ moves to its scheduled 22 October vote',()=>{
 const p=revision('eu-erasmus-plus-2028-2034',2);
 assert.equal(p.nextDate,'2026-10-22');assert.equal(p.phase,'pending');
});
