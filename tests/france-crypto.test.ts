import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readExport} from '../lib/export-store.ts';
import {createStaticData} from '../lib/static-data.ts';
import {policySchema} from '../lib/domain/model.ts';
import {resolveTopics} from '../lib/domain/topics.ts';

const read=(p:string)=>JSON.parse(readFileSync(p,'utf8'));
const store=readExport('data/store') as any;
const data=createStaticData(store);
const topics=resolveTopics(read('data/topics.json').topics,data.intake.records,data.policies);
// Immutable first revision: later legislative outcomes must not be frozen by this test.
const revision=(id:string)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===id+':1').data));

test('committee-stage stablecoin swap tax is not presented as enacted law',()=>{
 const p=revision('fr-plf2027-crypto-tax-amendments');
 assert.equal(p.status,'pending');assert.equal(p.effectiveDate,null);
 assert.equal(p.nextKind,'scheduled');assert.equal(p.nextDate,'2027-01-01');
 assert(!p.events.some(e=>e.kind==='adopted'||e.kind==='effective'||e.kind==='published'));
 assert.match(p.summary,/未成为法律/);assert.match(p.before,/延后计税/);
 const en=read('data/translations/content.json');
 assert.match(en[p.summary],/None of these is law/);
});

test('crypto amendments group without absorbing the wider budget bill',()=>{
 const t=topics.find(t=>t.id==='fr-plf2027-crypto-tax')!;
 assert.deepEqual([...t.recordIds].sort(),['fr-an-plf2027-i-cf1822','fr-an-plf2027-i-cf1826','fr-an-plf2027-i-cf798','fr-an-plf2027-i-cf821']);
 assert.deepEqual(t.policyIds,['fr-plf2027-crypto-tax-amendments']);
 assert(!t.recordIds.includes('fr-an-3210'));
 assert(!t.policyIds.includes('fr-finance-bill-2027'));
});

test('one Act keeps its general and crypto explanations in one matter',()=>{
 const t=topics.find(t=>t.id==='fr-fraud-law-2026-534')!;
 assert.deepEqual([...t.recordIds].sort(),['fr-fraud-law-2026-534-crypto','fr-social-tax-fraud-safeguards-2026-law']);
 assert.deepEqual([...t.policyIds].sort(),['fr-fraud-law-crypto-2026','fr-social-tax-fraud-safeguards-2026']);
 const law=revision('fr-fraud-law-crypto-2026');
 assert.equal(law.status,'adopted');
 assert(law.rules!.some(r=>/2026年1月1日起的出售/.test(r.detail)));
});
