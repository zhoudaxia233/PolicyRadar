import test from 'node:test';
import assert from 'node:assert/strict';
import {readExport} from '../lib/export-store.ts';
import {policySchema} from '../lib/domain/model.ts';

const store=readExport('data/store') as any;
// Immutable first revisions from the 14 October crypto pass.
const revision=(id:string)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===id+':1').data));

test('a failed cloture vote is presented as procedural, not as rejection of the bill',()=>{
 const p=revision('us-clarity-act-market-structure');
 assert.equal(p.status,'pending');assert.equal(p.effectiveDate,null);
 assert.match(p.limits,/只是程序表决/);
 assert(p.rules!.some(r=>/复议动议/.test(r.detail)));
});

test('an enacted law keeps its statutory effective date apart from pending agency rules',()=>{
 const p=revision('us-genius-act-stablecoin-implementation');
 assert.equal(p.effectiveDate,'2027-01-18');
 assert.match(p.limits,/推出/); // The date is an inference from section 20, stated as such.
 assert(p.events.some(e=>e.date==='2028-07-18'&&e.kind==='scheduled'));
});

test('an agency interpretation is not presented as law',()=>{
 const p=revision('us-sec-crypto-asset-interpretation-2026');
 assert.match(p.limits,/不是法律或法院判决/);
});

test('broker basis reporting does not claim a tax change',()=>{
 const p=revision('us-1099-da-cost-basis-2026');
 assert.equal(p.effectiveDate,'2026-01-01');assert.match(p.impact,/不改变税率/);
});
