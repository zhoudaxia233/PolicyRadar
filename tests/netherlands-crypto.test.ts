import test from 'node:test';
import assert from 'node:assert/strict';
import {readExport} from '../lib/export-store.ts';
import {policySchema} from '../lib/domain/model.ts';

const store=readExport('data/store') as any;
// Immutable first revisions from the 14 October crypto pass.
const revision=(id:string)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===id+':1').data));

test('a bill passed by one chamber and an announced amendment are not presented as law',()=>{
 const p=revision('nl-box3-actual-return-crypto');
 assert.equal(p.status,'pending');assert.equal(p.effectiveDate,null);
 assert(!p.events.some(e=>['adopted','published','effective'].includes(e.kind)));
 assert.match(p.before,/6\.00%.*59,357欧元.*36%/); // Current 2026 law comes first.
 assert.match(p.after,/直接持有的加密资产2028—2029年仍按资产增值税方式征税/);
 assert.match(p.limits,/修订法案尚未提交/);
});

test('a retroactive reporting act keeps its commencement and first deadline apart',()=>{
 const p=revision('nl-dac8-crypto-reporting-law-2026');
 assert.equal(p.effectiveDate,'2026-04-11');assert.equal(p.nextDate,'2027-01-31');
 assert.match(p.statusNote!,/追溯至2026年1月1日/);
 assert.match(p.limits,/不改变加密资产的税负/);
});
