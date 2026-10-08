import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createStaticData} from '../lib/static-data.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {localizePolicy} from '../lib/i18n/content.ts';
const read=(p:string)=>JSON.parse(readFileSync(p,'utf8'));
const data=createStaticData(read('data/exports/2026-10-08-bmf-timeline-213634/policy-radar-export.json'));
const p=data.policies.find(p=>p.id==='de-bmf-crypto-tax-reform-2027')!;
test('BMF implementation targets are not confirmed decisions or commencement',()=>{
 assert.equal(p.phase,'pending');assert.equal(p.effectiveDate,null);
 assert.match(p.statusNote!,/具体日期/);assert.match(p.nextLabel,/通过日期未定/);
 for(const date of ['2027-01-01','2028-01-01']){
  const events=p.events.filter(e=>e.date===date);assert(events.length>0);
  assert(events.every(e=>e.kind==='scheduled'));
 }
 assert(!p.events.some(e=>e.kind==='adopted'||e.kind==='effective'));
});
test('both languages explain the absent decision schedule and conditional milestones',()=>{
 const l=createLocalization(data,read('data/translations/content.json'),read('tests/fixtures/bmf-timeline-bindings.json'));
 assert.equal(l.policies[p.id],'current');
 for(const locale of ['zh','en'] as const){
  const localized=localizePolicy(p,locale,l);
  assert.match(localized.summary,/2027/);assert.match(localized.summary,/2028/);
  assert.match(localized.summary,locale==='zh'?/未查到.*表决日期/:/no Cabinet or final parliamentary vote date was found/);
  assert.match(localized.dateExplanation!,locale==='zh'?/以完成立法/:/depend on completing legislation/);
 }
});
