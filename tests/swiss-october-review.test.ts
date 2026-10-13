import test from 'node:test';
import assert from 'node:assert/strict';
import {readExport} from '../lib/export-store.ts';
const rows=readExport('data/store').tables.revisions;
// Retained review revisions protect source distinctions without freezing future law.
const reviewed=(id:string,event?:string)=>rows.filter(r=>r.policy_id===id).map(r=>JSON.parse(r.data)).find(p=>event?p.events.some((e:{id:string})=>e.id===event):p.verifiedAt==='2026-10-13');
test('Vaud review keeps statutory area boundary, distinct deadlines and permit transitions',()=>{
 const p=reviewed('ch-vd-energy-law','commencement-review-20261013');
 assert.equal(p.effectiveDate,'2027-01-01');
 for(const s of ['至少750','G级','10年','F级','15年','2037年','2042年'])assert(p.after.includes(s),s);
 for(const s of ['六个月','2006年法','一年'])assert(p.limits.includes(s),s);
 assert.equal(p.events.at(-1).kind,'correction');
 assert(p.sources.some((s:{id:string})=>s.id==='law-final'));
});
test('Geneva indexation retains distinct sector rates and the prior effective event',()=>{
 const p=reviewed('ch-ge-minimum-wage-2026','indexation-2027-announced');
 assert.equal(p.effectiveDate,'2027-01-01');
 for(const s of ['24.59','24.73','18.07','18.17'])assert(p.summary.includes(s),s);
 assert(p.events.some((e:{date:string;kind:string})=>e.date==='2026-01-01'&&e.kind==='effective'));
 assert(p.limits.includes('75%'));
});
test('Swiss proposals and contingent implementation are not converted to commenced law',()=>{
 const fr=reviewed('ch-fr-premium-counterproposal-2026');assert.equal(fr.phase,'pending');assert.equal(fr.effectiveDate,null);
 assert(fr.limits.includes('失效'));assert(fr.summary.includes('10%公民倡议'));assert(fr.impact.includes('不等于'));
 const sg=reviewed('ch-sg-home-assistance-el-2026');assert.equal(sg.phase,'pending');assert.equal(sg.nextDate,'2026-12-13');assert.equal(sg.effectiveDate,null);
 const bs=reviewed('ch-bs-payroll-tax-deduction-2026');assert.equal(bs.effectiveDate,null);assert.equal(bs.nextDate,null);assert.equal(bs.disputed,true);
});
