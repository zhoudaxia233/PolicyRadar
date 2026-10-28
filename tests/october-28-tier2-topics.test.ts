import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readExport} from '../lib/export-store.ts';
import {createStaticData} from '../lib/static-data.ts';
import {policySchema} from '../lib/domain/model.ts';
import {explainsRecord} from '../lib/domain/listing.ts';
import {createLocalization} from '../lib/i18n/build.ts';

const store=readExport('data/store') as any;
const data=createStaticData(store);
const latest=(id:string)=>{const v=store.tables.policies.find((p:any)=>p.id===id).version;return policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===`${id}:${v}`).data));};
const previous=(id:string)=>{const v=store.tables.policies.find((p:any)=>p.id===id).version;return policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===`${id}:${v-1}`).data));};
const newIds=['gb-household-energy-support-2027','gb-minimum-wage-april-2027','gb-pension-tax-allowance-2027','gb-isa-changes-budget-2026','gb-trading-allowance-3000-2027','gb-stablecoins-tax-2027','gb-state-pension-triple-lock-2030','it-budget-bill-2027','ch-bvg-side-income-partial-withdrawal-2026','ch-votes-2027-02-28'];

test('Budget and cabinet announcements stay pending, except the Lifetime ISA charge with its stated operative date',()=>{
 for(const id of newIds){const p=latest(id);assert.equal(p.phase,'pending',id);}
 assert.equal(latest('gb-isa-changes-budget-2026').effectiveDate,'2026-10-29');
 for(const id of newIds.filter(x=>x!=='gb-isa-changes-budget-2026'))assert.equal(latest(id).effectiveDate,null,id);
});

test('the Pension Tax Allowance is described as a small tax reduction with its taper, not a new allowance',()=>{
 const p=latest('gb-pension-tax-allowance-2027');
 assert.match(p.summary,/13,036\.40英镑/);assert.match(p.after,/13,319英镑及以上不减免/);assert.match(p.limits,/约94英镑/);
});

test('the Lifetime ISA example shows the saver keeps exactly their contributions at 20%',()=>{
 assert.match(latest('gb-isa-changes-budget-2026').impact,/剩4,000英镑，正好拿回本金/);
});

test('each new explanation is matched by its own official record',()=>{
 for(const id of newIds){const p=data.policies.find(x=>x.id===id)!;assert.equal(data.intake.records.filter(r=>explainsRecord(p,r)).length,1,id);}
});

test('elapsed dates are cleared or advanced without rewriting history',()=>{
 for(const id of ['fr-property-tax-deadlines-2026','fr-payroll-tax-october-deadline-2026','nl-tax-plan-2027']){const p=latest(id);assert.equal(p.nextDate,null,id);
  for(const e of previous(id).events)assert.deepEqual(p.events.find(x=>x.id===e.id),e,id);}
 assert.equal(latest('it-work-entry-applications-2027').nextDate,'2026-12-07');
 assert.equal(latest('ch-efta-malaysia-referendum-2026').nextDate,'2027-02-28');
 assert.equal(latest('fr-finance-bill-2027').phase,'pending');
});

test('new and revised explanations are bound to reviewed English translations',()=>{
 const l=createLocalization(data,JSON.parse(readFileSync('data/translations/content.json','utf8')),JSON.parse(readFileSync('data/translations/bindings.json','utf8')));
 for(const id of [...newIds,'gb-defi-loans-pools-cgt-2027','fr-finance-bill-2027','fr-property-tax-deadlines-2026','fr-payroll-tax-october-deadline-2026','nl-tax-plan-2027','it-work-entry-applications-2027','ch-efta-malaysia-referendum-2026'])assert.equal(l.policies[id],'current',id);
});
