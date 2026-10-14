import test from 'node:test';
import assert from 'node:assert/strict';
import {readExport} from '../lib/export-store.ts';
import {policySchema} from '../lib/domain/model.ts';

const store=readExport('data/store') as any;
// Immutable first revisions from the 14 October crypto pass.
const revision=(id:string)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===id+':1').data));

test('DAC8 application is not presented as national transposition or a tax change',()=>{
 const p=revision('eu-dac8-crypto-reporting-2026');
 assert.equal(p.region,'EU');assert.equal(p.effectiveDateKind,'application');assert.equal(p.effectiveDate,'2026-01-01');
 assert.match(p.limits,/不等于每个国家都已按时完成转化/);
 assert.match(p.summary,/不改变各国的加密资产税率/);
});

test('Council steering notes on ESMA supervision remain a pending proposal',()=>{
 const p=revision('eu-misp-casp-esma-supervision');
 assert.equal(p.status,'pending');assert.equal(p.effectiveDate,null);
 assert(!p.events.some(e=>['adopted','published','effective'].includes(e.kind)));
 assert.match(p.limits,/不是理事会正式立场/);
});
