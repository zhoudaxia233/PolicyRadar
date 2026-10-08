import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createStaticData} from '../lib/static-data.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {localizePolicy} from '../lib/i18n/content.ts';
import {resolveTopics,groupRecords} from '../lib/domain/topics.ts';

const read=(p:string)=>JSON.parse(readFileSync(p,'utf8'));
// An as-of fixture: later legislative developments must not be frozen by this test.
const data=createStaticData(read('data/exports/2026-10-08-crypto-alternatives-173843/policy-radar-export.json'));
const green=data.policies.find(p=>p.id==='de-crypto-holding-proposal')!;
const bmf=data.policies.find(p=>p.id==='de-bmf-crypto-tax-reform-2027')!;
const localization=createLocalization(data,read('data/translations/content.json'),read('data/translations/bindings.json'));

test('rejection of one instrument does not close the alternative or enact its proposed date',()=>{
 assert.equal(green.status,'closed');assert.equal(bmf.status,'pending');
 assert.notEqual(green.officialId,bmf.officialId);
 assert.equal(green.effectiveDate,null);assert.equal(bmf.effectiveDate,null);
 assert.equal(bmf.nextKind,'scheduled');assert.equal(bmf.nextDate,'2027-01-01');
 assert(!bmf.events.some(e=>e.kind==='adopted'||e.kind==='effective'));
});

test('each standalone language summary discloses the other version and the continuing current rules',()=>{
 for(const locale of ['zh','en'] as const){
  const g=localizePolicy(green,locale,localization),b=localizePolicy(bmf,locale,localization);
  const ministry=locale==='zh'?/财政部/:/BMF/;
  const opposition=locale==='zh'?/绿党/:/Green/;
  assert.match(g.summary,ministry);assert.match(b.summary,opposition);
  for(const p of [g,b]){
   assert.match(p.summary,/2027/);
   assert.match(p.summary,locale==='zh'?/现行/:/current/i);
   assert.match(p.summary,locale==='zh'?/未通过/:/(not enacted|unenacted)/);
   assert.match(p.impact,/2026/);assert.match(p.impact,/2027/);assert.match(p.impact,/2028/);
   assert.match(p.limits,/25/);
  }
 }
});

test('one concrete question retains separate instrument states even when filtered; reporting obligations stay separate',()=>{
 const definitions=read('data/topics.json').topics;
 const topics=resolveTopics(definitions,data.intake.records,data.policies);
 const topic=topics.find(t=>t.id==='de-crypto-holding-period')!;
 assert.deepEqual([...topic.policyIds].sort(),[green.id,bmf.id].sort());
 const records=data.intake.records.filter(r=>topic.recordIds.includes(r.id));
 // The multi-bill plenary discovery retains its own unverified intake stage.
 assert(records.some(r=>r.id==='de-crypto-vote-with-bmf-alternative-20261008'));
 assert(records.some(r=>r.stage==='pending'));
 const pending=groupRecords(records.filter(r=>r.stage==='pending'),topics);
 assert.equal(pending.length,1);assert(pending[0].policyIds.includes(green.id));
 assert(!records.some(r=>/CARF|DAC8/.test(r.title)));
});
