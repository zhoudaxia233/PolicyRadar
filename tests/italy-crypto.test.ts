import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readExport} from '../lib/export-store.ts';
import {createStaticData} from '../lib/static-data.ts';
import {policySchema} from '../lib/domain/model.ts';
import {resolveTopics} from '../lib/domain/topics.ts';

const store=readExport('data/store') as any;
const data=createStaticData(store);
// Immutable first revisions from the 14 October crypto pass.
const revision=(id:string)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===id+':1').data));

test('the 2027 repeal into the new code does not invent a new rate',()=>{
 const p=revision('it-crypto-gains-tax-33-2026');
 assert.equal(p.effectiveDate,'2026-01-01');assert.equal(p.nextDate,'2027-01-01');
 assert.match(p.limits,/不推断2027年起的税率是否变化/);
 assert.match(p.after,/美元稳定币等不以欧元计价的代币不适用26%/);
});

test('ISEE crypto provision is not presented as already implemented in the DSU',()=>{
 const p=revision('it-isee-crypto-holdings-2026');
 assert.match(p.statusNote!,/未找到该部令/);
 assert.notEqual(p.topic,'税务与加密资产');
});

test('rate records group together without absorbing the ISEE provision',()=>{
 const topics=resolveTopics(JSON.parse(readFileSync('data/topics.json','utf8')).topics,data.intake.records,data.policies);
 const t=topics.find(t=>t.id==='it-crypto-gains-rate')!;
 assert.deepEqual([...t.recordIds].sort(),['it-dlgs-117-2026-tuir','it-l199-2025-c28-euro-emt','it-l207-2024-c24-crypto-33']);
 assert.deepEqual(t.policyIds,['it-crypto-gains-tax-33-2026']);
});
