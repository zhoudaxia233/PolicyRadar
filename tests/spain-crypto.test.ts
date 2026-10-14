import test from 'node:test';
import assert from 'node:assert/strict';
import {readExport} from '../lib/export-store.ts';
import {policySchema} from '../lib/domain/model.ts';

const store=readExport('data/store') as any;
// Immutable first revisions from the 14 October crypto pass.
const revision=(id:string)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===id+':1').data));

test('a tabled amendment and a stalled bill are not presented as current tax law',()=>{
 const p=revision('es-dac8-tax-bill-121-60');
 assert.equal(p.status,'pending');assert.equal(p.effectiveDate,null);
 assert(!p.events.some(e=>['adopted','published','effective'].includes(e.kind)));
 assert.match(p.summary,/仍按储蓄所得计税/);
 assert.match(p.impact,/47%.*本轮未核实/); // Press figure, not in the amendment text.
});

test('a decree-law in force still shows pending parliamentary confirmation',()=>{
 const p=revision('es-rdl-25-2026-casp-aml');
 assert.equal(p.effectiveDate,'2026-10-01');
 assert.match(p.statusNote!,/未查到确认表决结果/);
 assert.match(p.limits,/不改变税率/);
});
