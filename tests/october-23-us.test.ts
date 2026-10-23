import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readExport} from '../lib/export-store.ts';
import {createStaticData} from '../lib/static-data.ts';
import {policySchema} from '../lib/domain/model.ts';
import {scanSchema} from '../lib/domain/intake.ts';
import {resolveTopics} from '../lib/domain/topics.ts';
import {resolveDispositions} from '../lib/domain/dispositions.ts';

const store=readExport('data/store') as any;
const data=createStaticData(store);
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===`${id}:${version}`).data));
const scan=(id:string)=>scanSchema.parse(JSON.parse(store.tables.scan_runs.find((r:any)=>r.id===id).data));
const topics=resolveTopics(JSON.parse(readFileSync('data/topics.json','utf8')).topics,data.intake.records,data.policies);
const dispositions=resolveDispositions(JSON.parse(readFileSync('data/dispositions.json','utf8')).dispositions,data.intake.records,data.policies,topics);

test('the GENIUS Act date now rests on the Comptroller final rule, not an inference',()=>{
 const v1=revision('us-genius-act-stablecoin-implementation',1),v2=revision('us-genius-act-stablecoin-implementation',2);
 for(const e of v1.events)assert.deepEqual(v2.events.find(x=>x.id===e.id),e);
 assert.equal(v2.effectiveDate,'2027-01-18');
 assert(v2.sources.some(s=>s.id==='fr-2026-21706'));
 assert.match(v2.summary,/两个工作日/);assert.match(v2.summary,/利息或收益/);
 // The other primary regulators' rules were still proposals; the card must not imply all rules are final.
 assert.match(v2.limits,/仍是提案/);
 assert(topics.find(t=>t.id==='us-genius-act-implementation-rules')!.policyIds.includes('us-genius-act-stablecoin-implementation'));
});

test('the Graham sanctions act is in force but its duties are waived',()=>{
 const p=revision('us-graham-russia-sanctions-act-waived',1);
 assert.equal(p.phase,'adopted');assert.equal(p.effectiveDate,null);
 assert.match(p.title,/已全部豁免/);assert.match(p.impact,/目前不征收/);
 assert.match(p.after,/原有的对俄制裁/);
});

test('the institutional investor home purchase ban separates the statute from the proposed rules',()=>{
 const p=revision('us-road-act-institutional-investor-ban-2027',1);
 assert.equal(p.effectiveDate,'2027-01-07');assert.equal(p.phase,'adopted');
 assert.equal(p.nextDate,'2026-11-23');assert.equal(p.nextKind,'deadline');
 assert.match(p.statusNote!,/仍是提案/);assert.match(p.summary,/350套/);
});

test('premium tax credit proposal keeps the statutory start years apart from the pending rules',()=>{
 const v2=revision('us-premium-tax-credit-eligibility-2027',2);
 assert.equal(v2.phase,'pending');assert.equal(v2.nextDate,'2026-11-30');
 assert.match(v2.after,/2026纳税年度起：多领的预付抵免须全额补缴/);
 assert.match(v2.limits,/生效年份来自法律本身/);
});

test('White House 1–22 October is a reconciled complete scan, but today stays partial',()=>{
 const closed=scan('us-20261023-wh-closed'),today=scan('us-20261023-wh-today');
 assert.equal(closed.status,'complete');assert.equal(closed.recordIds.length,11);assert.equal(closed.totalListed,11);
 assert.equal(today.status,'partial');
 // Federal Register copies of White House documents are not recorded twice.
 const fr=scan('us-20261023-fr');
 assert.equal(fr.status,'partial');
 assert(fr.excluded.some(x=>x.url.endsWith('/2026-21666.pdf')));
 assert(!data.intake.records.some((r:any)=>r.officialId==='FR Doc. 2026-21666'));
});

test('blocked state portals are recorded as blocked, not as quiet days',()=>{
 for(const st of ['ny','tx','mi'])assert.equal(scan('us-20261023-st-'+st).status,'blocked');
 assert.equal(scan('us-20261023-st-va').status,'partial');
});

test('Florida Amendment 3 stays a pending ballot proposal sourced from the governor',()=>{
 const p=revision('us-fl-amendment-3-homestead-2026',1);
 assert.equal(p.phase,'pending');assert.equal(p.disputed,true);assert.equal(p.nextDate,null);
 assert.match(p.limits,/不是选票文本/);
});

test('reviewed no-explanation decisions and new groups resolve',()=>{
 const dismissed=new Set(dispositions.flatMap(d=>d.recordIds));
 assert(dismissed.has('us-plaw-119-133'));assert(!dismissed.has('us-plaw-119-108'));
 assert.deepEqual(topics.find(t=>t.id==='us-cftc-swap-definition-2026-10')!.policyIds,['us-cftc-casino-gambling-not-swaps']);
 assert.equal(topics.find(t=>t.id==='us-graham-sanctions-act-2026')!.recordIds.length,2);
});
