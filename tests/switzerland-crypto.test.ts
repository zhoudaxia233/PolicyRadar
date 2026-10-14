import test from 'node:test';
import assert from 'node:assert/strict';
import {readExport} from '../lib/export-store.ts';
import {policySchema} from '../lib/domain/model.ts';

const store=readExport('data/store') as any;
// Immutable first revisions from the 14 October crypto pass.
const revision=(id:string)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===id+':1').data));

test('a law in force whose crypto provisions are suspended is not presented as active exchange',()=>{
 const p=revision('ch-crypto-aeoi-activation');
 assert.equal(p.status,'pending');assert.equal(p.effectiveDate,null);
 assert.match(p.summary,/2026年不适用/);
 assert.match(p.limits,/伙伴国名单和启动日期尚未确定/);
 // Reader text cites only archived sources; the unarchivable debate page stays in the review record.
 assert(!p.sources.some(s=>s.url.includes('amtliches-bulletin')));
});

test('a closed consultation is not presented as a bill before Parliament',()=>{
 const p=revision('ch-finig-stablecoin-crypto-institutes');
 assert.equal(p.status,'pending');
 assert.match(p.limits,/不是法律/);assert.match(p.statusNote!,/尚无对应议案/);
});
