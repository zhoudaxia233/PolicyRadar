import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readExport} from '../lib/export-store.ts';
import {createStaticData} from '../lib/static-data.ts';
import {policySchema,lifecycle} from '../lib/domain/model.ts';
import {currentRecords} from '../lib/domain/corrections.ts';
import {resolveTopics} from '../lib/domain/topics.ts';
import {resolveDispositions} from '../lib/domain/dispositions.ts';

const store=readExport('data/store') as any;
const data=createStaticData(store);
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.policy_id===id&&r.version===version).data));
const topics=resolveTopics(JSON.parse(readFileSync('data/topics.json','utf8')).topics,data.intake.records,data.policies);
const dispositions=resolveDispositions(JSON.parse(readFileSync('data/dispositions.json','utf8')).dispositions,data.intake.records,data.policies,topics);
const dismissed=new Set(dispositions.flatMap(d=>d.recordIds));
const groupOf=(id:string)=>topics.find(t=>t.recordIds.includes(id))?.id;
const scan=(id:string)=>JSON.parse(store.tables.scan_runs.find((x:any)=>x.id===id).data);
const keepsEvents=(id:string,from:number,to:number)=>{const a=revision(id,from),b=revision(id,to);for(const e of a.events)assert.deepEqual(b.events.find(x=>x.id===e.id),e,id);};

test('a Bundestag adoption is recorded without treating the law as in force',()=>{
 for(const [id,v,date] of [['de-kita-quality-act-2027',4,'2026-11-12'],['de-customs-financial-crime-2026',3,'2026-11-12'],['de-cyber-defence-act-2026',2,'2026-11-12'],['de-bundeswehr-infrastructure-2026',3,'2026-11-12'],['de-knockout-drops-penalty-2026',2,'2026-11-06']] as const){
  const p=revision(id,v);keepsEvents(id,v-1,v);
  assert.equal(p.phase,'pending',id);assert.equal(p.effectiveDate,null,id);
  assert(p.events.some(e=>e.kind==='adopted'&&e.date===date),id);
  assert.match(p.statusNote!,/联邦参议院/,id);assert.match(p.statusNote!,/不是现行法/,id);
  assert.doesNotMatch(p.summary,/草案尚未通过/,id);
  // The planned vote date has passed; no stale next step remains.
  assert.notEqual(p.nextDate,'2026-11-12',id);
 }
 const kita=revision('de-kita-quality-act-2027',4);
 assert.deepEqual(kita.politics!.votes!.at(-1)!.counts,{for:457,against:132,abstain:1});
 assert.equal(groupOf('bt-kw46-kita-quality-adopted'),'de-kita-quality-act-2027');
 assert.equal(groupOf('bt-kw45-knockout-drops-adopted'),'de-knockout-drops-penalty-2026');
 assert.match(revision('de-knockout-drops-penalty-2026',2).limits,/21\/551/);
});

test('a vote removed from the agenda keeps the bill pending and in committee',()=>{
 const p=revision('de-agriculture-bureaucracy-2026',3);keepsEvents('de-agriculture-bureaucracy-2026',2,3);
 assert.equal(p.phase,'pending');assert.equal(p.nextDate,null);
 assert.equal(p.events.find(e=>e.id==='bt-vote-removed-1112')!.kind,'correction');
 assert(!p.events.some(e=>e.kind==='adopted'||e.kind==='withdrawn'));
 assert.equal(groupOf('bt-kw46-building-code-upgrade-removed'),groupOf('bt-kw46-building-code-upgrade-vote'));
});

test('votes held after the check stay scheduled rather than guessed',()=>{
 for(const id of ['de-annual-tax-act-2026','de-grid-support-proposal-2027','de-academic-fixed-term-contracts-2026']){
  const p=data.policies.find(x=>x.id===id)!;
  assert.equal(p.phase,'pending',id);assert(!p.events.some(e=>e.kind==='adopted'&&e.date==='2026-11-12'),id);
 }
 assert.match(scan('de-20261112-textarchiv').note,/结果待下一轮核对/);
});

test('the strategic gas reserve is a cabinet bill with a labelled levy example',()=>{
 const p=revision('de-strategic-gas-reserve-2027',1);
 assert.equal(p.phase,'pending');assert.equal(p.effectiveDate,null);
 assert.match(p.summary,/24太瓦时/);assert.match(p.summary,/尚未通过/);
 assert.match(p.impact,/14,000千瓦时/);assert.match(p.impact,/4\.20至7\.00欧元/);assert.match(p.impact,/假设/);
 assert.match(p.limits,/没有读到草案原文/);assert.match(p.limits,/不防高价/);
 // The abolished levy card now points to the proposed new levy without changing its own outcome.
 const old=revision('de-gas-storage-levy-end-2026',2);keepsEvents('de-gas-storage-levy-end-2026',1,2);
 assert.equal(old.phase,'adopted');assert.match(old.limits,/战略天然气储备/);
 assert.notEqual(groupOf('de-20261111-cabinet-gas-reserve'),undefined);
});

test('the Baden-Württemberg successor ordinances apply from 2027 and the 2026 card points to them',()=>{
 const p=revision('bw-tenant-protection-2027',1);
 assert.equal(p.phase,'adopted');assert.equal(p.effectiveDate,'2027-01-01');assert.equal(p.nextDate,'2029-12-31');assert.equal(p.nextKind,'expiry');
 assert.equal(lifecycle(p,'2026-11-12'),'已通过 · 待生效');
 assert.match(p.summary,/133个市镇/);assert.match(p.summary,/曼海姆、康斯坦茨和凯尔/);assert.match(p.summary,/15%/);assert.match(p.summary,/5年/);
 assert.match(p.impact,/990欧元/);assert.match(p.impact,/920欧元/);
 assert.match(p.limits,/不是每年可涨的幅度/);
 assert.deepEqual(p.rules!.map(r=>r.sourceId),['bw-95','bw-96','bw-97']);
 const old=revision('bw-rent-cap-2026',3);keepsEvents('bw-rent-cap-2026',2,3);
 assert.equal(old.effectiveDate,'2026-01-01');assert.equal(old.nextDate,'2026-12-31');assert.equal(old.status,'adopted');
 assert.doesNotMatch(old.limits,/只进入听证/);
 assert(currentRecords(old.events).some(e=>e.id==='successor-published'));
 const g=topics.find(t=>t.id==='bw-tenant-protection-2027')!;
 for(const n of [95,96,97])assert(g.recordIds.includes(`bw-20261112-gbl-${n}`));
});

test('an unconfirmed report of a later sugar tax start does not move the cabinet date',()=>{
 const p=revision('de-sugary-drinks-tax-2027',2);keepsEvents('de-sugary-drinks-tax-2027',1,2);
 assert.equal(p.nextDate,'2027-07-01');assert.equal(p.phase,'pending');
 assert.match(p.statusNote!,/2028年初/);assert.match(p.statusNote!,/没有找到联邦政府或联邦议院证实/);
 assert.equal(p.events.find(e=>e.id==='ni-statement-1112')!.kind,'correction');
 assert.equal(data.intake.records.find(r=>r.id==='ni-20261112-sugar-tax-delay-statement')!.stage,'unverified');
 assert.equal(groupOf('ni-20261112-sugar-tax-delay-statement'),groupOf('de-20261015-de-sugary-drinks-tax-2027'));
});

test('closed days are reconciled and the current day stays partial',()=>{
 const b10=scan('de-20261112-bgbl-1110');assert.equal(b10.status,'complete');assert.equal(b10.totalListed,0);
 const b11=scan('de-20261112-bgbl-1111');assert.equal(b11.status,'complete');assert.deepEqual(b11.recordIds,['de-20261112-bgbl-335','de-20261112-bgbl-336']);
 for(const [id,n] of [['eu-oj-20261112-1110',23],['eu-oj-20261112-1111',26]] as const){const s=scan(id);assert.equal(s.status,'complete',id);assert.equal(s.totalListed,n,id);assert.equal(s.recordIds.length,n,id);}
 for(const id of ['de-20261112-bgbl-1112','eu-oj-20261112-1112','de-20261112-hb-gbl-1112'])assert.equal(scan(id).status,'partial',id);
});

test('records needing review are not hidden by bulk dispositions',()=>{
 for(const id of ['eu-oj-l-202602487','eu-oj-l-202602522','eu-oj-c-202605778','eu-oj-l-202601436','eu-oj-c-202606005','de-20261112-bgbl2-273'])assert(!dismissed.has(id),id);
 for(const n of [262,271])assert(dismissed.has(`de-20261112-bgbl2-${n}`));
 assert(dismissed.has('eu-oj-c-202605568'));
});
