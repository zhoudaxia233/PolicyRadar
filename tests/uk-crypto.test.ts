import test from 'node:test';
import assert from 'node:assert/strict';
import {readExport} from '../lib/export-store.ts';
import {policySchema} from '../lib/domain/model.ts';

const store=readExport('data/store') as any;
// Immutable first revisions from the 14 October crypto pass.
const revision=(id:string)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===id+':1').data));

test('reporting rules in force keep commencement, first deadline and the user penalty apart',()=>{
 const p=revision('gb-carf-reporting-2026');
 assert.equal(p.effectiveDate,'2026-01-01');assert.equal(p.nextDate,'2027-05-31');
 assert.match(p.after,/用户故意或因未尽合理注意而不提供自我声明，最高罚300英镑/);
 assert.match(p.limits,/不改变加密资产的资本利得税/);
});

test('regulations made but not yet fully in force show the future commencement date',()=>{
 const p=revision('gb-fsma-cryptoasset-regime-2027');
 assert.equal(p.effectiveDate,'2027-10-25');
 assert(p.events.filter(e=>e.date>p.verifiedAt).every(e=>e.kind==='scheduled'));
});

test('draft Finance Bill clauses are not presented as law',()=>{
 const p=revision('gb-defi-loans-pools-cgt-2027');
 assert.equal(p.status,'pending');assert.equal(p.effectiveDate,null);
 assert.match(p.before,/18%.*24%.*3,000英镑/); // Current law comes first.
 assert.match(p.limits,/这是草案，不是法律/);
});
