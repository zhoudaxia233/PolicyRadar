import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readExport} from '../lib/export-store.ts';
import {createStaticData} from '../lib/static-data.ts';
import {policySchema} from '../lib/domain/model.ts';
import {resolveTopics} from '../lib/domain/topics.ts';
import {resolveDispositions} from '../lib/domain/dispositions.ts';
import {createLocalization} from '../lib/i18n/build.ts';

const store=readExport('data/store') as any;
const data=createStaticData(store);
// Some legacy revision rows have no id column, so look them up by policy and version.
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.policy_id===id&&r.version===version).data));
const topics=resolveTopics(JSON.parse(readFileSync('data/topics.json','utf8')).topics,data.intake.records,data.policies);
const dispositions=resolveDispositions(JSON.parse(readFileSync('data/dispositions.json','utf8')).dispositions,data.intake.records,data.policies,topics);
const dismissed=new Set(dispositions.flatMap(d=>d.recordIds));
const scan=(id:string)=>JSON.parse(store.tables.scan_runs.find((x:any)=>x.id===id).data);
const keepsEvents=(id:string,from:number,to:number)=>{const a=revision(id,from),b=revision(id,to);for(const e of a.events)assert.deepEqual(b.events.find(x=>x.id===e.id),e,id);};

// Each Bundesrat item is a scheduled step on a draft agenda, never an outcome.
const bundesrat=[['de-social-insurance-ceilings-2027',3,53],['de-starter-pension-2027',4,4],['de-co2-price-corridor-2027',4,9],['de-carf-agreement-2026',10,14],['de-emergency-care-reform-2026',3,5],['de-eudi-wallet-2026',3,3],['de-cash-register-digital-receipts-2028',2,30],['de-tax-adviser-exam-2026',2,31],['de-care-insurance-reform-pnog',5,32],['de-br-pension-trust-motion-2026',2,17],['de-br-energy-price-relief-motion-2026',2,20]] as const;

test('a draft Bundesrat agenda schedules the next step without changing any stage',()=>{
 for(const [id,v,top] of bundesrat){
  const p=revision(id,v),old=revision(id,v-1);keepsEvents(id,v-1,v);
  assert.equal(p.phase,old.phase,id);assert.equal(p.effectiveDate,old.effectiveDate,id);
  assert.equal(p.nextDate,'2026-11-20',id);assert.equal(p.nextKind,'scheduled',id);
  const e=p.events.find(x=>x.id===`br-1070-top-${top}`)!;assert.equal(e.kind,'scheduled',id);assert.match(e.detail,/议程草案/,id);
  assert.match(p.statusNote!,new RegExp(`议程草案（11月3日版）第${top}项`),id);
 }
 // The ordinance keeps its planned 2027 date in the history; the Bundesrat step comes first.
 assert(revision('de-social-insurance-ceilings-2027',3).events.some(e=>e.id==='planned-20270101'));
 // The crypto agreement is item 14; items 13 and 15 are different agreements.
 assert.match(revision('de-carf-agreement-2026',10).statusNote!,/629\/26/);
 assert(topics.find(t=>t.id==='de-crypto-information-exchange')!.recordIds.includes('br-1070-top-14'));
 assert(!topics.some(t=>t.recordIds.includes('br-1070-top-13')||t.recordIds.includes('br-1070-top-15')));
 // A committee recommendation is not a Bundesrat decision.
 assert.match(revision('de-co2-price-corridor-2027',4).statusNote!,/这只是建议/);
});

test('scheduled Bundestag votes are not results',()=>{
 for(const [id,v] of [['de-kita-quality-act-2027',3],['de-customs-financial-crime-2026',2],['de-academic-fixed-term-contracts-2026',2]] as const){
  const p=revision(id,v);keepsEvents(id,v-1,v);
  assert.equal(p.phase,'pending',id);assert.equal(p.nextDate,'2026-11-12',id);assert.equal(p.nextKind,'scheduled',id);
  assert(p.events.some(e=>e.id==='bt-vote-1112'&&e.kind==='scheduled'),id);
  assert(!p.events.some(e=>e.kind==='adopted'&&e.date>='2026-11-07'),id);
 }
});

test('the elapsed first-reading date is replaced by the reading that took place',()=>{
 const p=revision('de-cash-register-digital-receipts-2028',2);
 assert.equal(revision('de-cash-register-digital-receipts-2028',1).nextDate,'2026-11-06');
 assert.equal(p.lastEventDate,'2026-11-06');assert.equal(p.phase,'pending');
 assert(p.events.some(e=>e.id==='bt-first-reading-20261106'&&e.kind==='proposal'));
 const t=topics.find(x=>x.id==='de-cash-register-digital-receipts-2028')!;
 for(const id of ['bt-kw45-cash-register-first-reading','br-1070-top-30'])assert(t.recordIds.includes(id),id);
});

test('HMRC interest follows Bank Rate and the example separates interest from penalties',()=>{
 const p=revision('gb-hmrc-interest-rates-202611',1);
 assert.equal(p.status,'phased');assert.equal(p.effectiveDate,'2026-11-16');assert.equal(p.nextDate,'2026-11-24');assert.equal(p.nextKind,'implementation');
 assert.match(p.summary,/7\.75%升至8\.00%/);assert.match(p.summary,/2\.75%升至3\.00%/);
 assert.match(p.impact,/65\.75英镑/);assert.match(p.impact,/不是罚款/);
 // The release states the method, not the figures; the card says so.
 assert.match(p.limits,/本站按公告的方法推算/);
});

test('the French single-permit decree is explained from the government summary with its gaps stated',()=>{
 const p=revision('fr-single-permit-decree-2026',1);
 assert.equal(p.effectiveDate,'2026-10-30');assert.equal(p.phase,'adopted');
 assert.match(p.summary,/90天/);assert.match(p.summary,/12个月缩短为6个月/);
 assert.match(p.limits,/HTTP 403/);assert.match(p.impact,/2027年6月1日/);
 assert(data.intake.records.some(r=>r.id==='fr-20261106-a19128'&&r.officialId===p.officialId));
});

test('closed days are reconciled and the Bundesrat agenda is fully accounted for',()=>{
 const b=scan('de-20261107-bgbl-1106');assert.equal(b.status,'complete');assert.equal(b.totalListed,3);assert.equal(b.recordIds.length,3);
 assert.equal(scan('de-20261107-bgbl-1107').status,'partial');
 const oj=scan('eu-oj-20261107-1106');assert.equal(oj.status,'complete');assert.equal(oj.totalListed,22);assert.equal(oj.recordIds.length,22);
 const br=scan('de-20261107-bundesrat');assert.equal(br.status,'partial');assert.equal(br.totalListed,65);assert.equal(br.recordIds.length+br.excluded.length,65);
 const ta=scan('de-20261107-textarchiv');assert.equal(ta.recordIds.length+ta.excluded.length,40);
 assert.equal(scan('eu-20261107-council').status,'blocked');
 assert(store.tables.scan_runs.filter((r:any)=>r.id.startsWith('de-20261107-state-')).every((r:any)=>JSON.parse(r.data).status!=='complete'));
});

test('unresolved Spanish decree-laws stay unresolved and an unregistered page is not recorded as intake',()=>{
 for(const id of ['es-rent-renewal-compensation-2026','es-housing-social-function-2026'])assert.equal(data.policyVersions[id],2,id);
 assert(!data.intake.records.some(r=>r.url.startsWith('https://www.congreso.es/')));
});

test('routine records are dismissed only by review; household-relevant ones stay open',()=>{
 assert(dismissed.has('es-boe-a-2026-23341'));
 for(const id of ['br-1070-top-58','br-1070-top-13','bt-kw46-building-code-upgrade-vote','bt-kw46-left-rent-cap-motion','ch-20261106-estv-circular-37a','us-fr-2026-22679'])assert(!dismissed.has(id),id);
});

test('this round is bound to reviewed English translations',()=>{
 const l=createLocalization(data,JSON.parse(readFileSync('data/translations/content.json','utf8')),JSON.parse(readFileSync('data/translations/bindings.json','utf8')));
 for(const [id] of bundesrat)assert.equal(l.policies[id],'current',id);
 for(const id of ['de-kita-quality-act-2027','de-customs-financial-crime-2026','de-academic-fixed-term-contracts-2026','gb-hmrc-interest-rates-202611','fr-single-permit-decree-2026'])assert.equal(l.policies[id],'current',id);
 for(const id of ['br-1070-top-53','bt-kw46-kita-quality-vote','gb-20261106-hmrc-interest-rates','fr-20261106-a19128','es-boe-a-2026-23341','us-fr-2026-22739'])assert.equal(l.intake[id],'current',id);
});
