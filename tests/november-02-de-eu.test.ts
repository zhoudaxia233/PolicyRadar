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
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===`${id}:${version}`).data));
const topics=resolveTopics(JSON.parse(readFileSync('data/topics.json','utf8')).topics,data.intake.records,data.policies);
const dispositions=resolveDispositions(JSON.parse(readFileSync('data/dispositions.json','utf8')).dispositions,data.intake.records,data.policies,topics);
const dismissed=new Set(dispositions.flatMap(d=>d.recordIds));
const scan=(id:string)=>JSON.parse(store.tables.scan_runs.find((x:any)=>x.id===id).data);

test('the 2027 budget accompanying bill stays a draft and keeps the Bundesrat objection visible',()=>{
 const p=revision('de-budget-accompanying-act-2027',1);
 assert.equal(p.phase,'pending');assert.equal(p.effectiveDate,null);
 assert.match(p.after,/1,564欧元/);assert.match(p.before,/1,303欧元/);assert.match(p.summary,/草案尚未通过/);
 // The cabinet reply was not read, so the outcome of the Bundesrat's request stays open.
 assert.match(p.limits,/不知道政府是否接受/);
 // A cut in the federal top-up is not a cut in anyone's pension.
 assert.match(p.impact,/本身不改变个人的养老金金额或缴费率/);
 const t=topics.find(x=>x.id==='de-budget-accompanying-act-2027')!;assert.deepEqual(t.policyIds,['de-budget-accompanying-act-2027']);assert(t.recordIds.includes('kab62-top1-02'));
});

test('an opposition motion is not presented as a tax change',()=>{
 const p=revision('de-afd-minor-taxes-motion-2026',1);
 assert.equal(p.phase,'pending');assert.equal(p.nextDate,'2026-11-04');assert.equal(p.nextKind,'scheduled');
 assert.match(p.summary,/本身不改变任何税/);assert.match(p.after,/税率不会因此自动改变/);
});

test('EU proposals and trade measures keep their own legal stage',()=>{
 const f=revision('eu-frontex-return-proposals-2026',1);assert.equal(f.phase,'pending');assert.match(f.impact,/不改变居留、庇护或入籍规则/);
 assert.deepEqual(topics.find(t=>t.id==='eu-frontex-return-proposals-2026')!.recordIds.sort(),['eu-20261027-com-2026-1030','eu-20261027-com-2026-1037']);
 const d=revision('eu-pet-spunbond-china-ad-2026',1);assert.equal(d.effectiveDate,'2026-10-31');assert.match(d.summary,/48\.1%/);
 const h=revision('eu-hybrid-vehicles-safeguard-2026',1);assert.equal(h.phase,'pending');assert.equal(h.nextKind,'deadline');assert.equal(h.nextDate,'2027-07-30');assert.match(h.summary,/没有任何新关税或配额/);
 assert(!dismissed.has('eu-oj-c-202605780'));
});

test('a lower social-rent tier is not translated into a rent figure the source does not give',()=>{
 const p=revision('rp-social-rent-tiers-2026',1);
 assert.equal(p.effectiveDate,'2026-10-01');assert.match(p.impact,/无法给出具体租金/);
});

test('routine records leave the awaiting list only through reviewed dispositions or groups',()=>{
 for(const id of ['de-20261102-bgbl-327','de-20261102-bgbl2-234','de-20261102-bgbl2-235','kab62-top1-01','kab63-top1-13','kab62-shipping-action-plan','kab62-top1-03','bt-kw45-icc','bt-kw45-swimming','he-20261030-gvbl-65','he-20261030-gvbl-68','he-20261030-gvbl-69','esma-20261020-ptrr'])assert(dismissed.has(id),id);
 const ied=topics.find(t=>t.id==='de-industrial-emissions-ied-2026')!;assert.deepEqual(ied.policyIds,['de-industrial-emissions-ied-2026']);
 for(const id of ['kab63-top1-06','kab63-top1-07'])assert(ied.recordIds.includes(id),id);
 // Not reviewed this round: neither explained nor dismissed.
 for(const id of ['kab63-top1-05','mv-20261029-elterngeld-reaction'])assert(!dismissed.has(id)&&!topics.some(t=>t.recordIds.includes(id)),id);
});

test('gazette days are closed by issue continuity, and today stays partial',()=>{
 const a=scan('de-20261102-bgbl-1026-1029');assert.equal(a.status,'complete');assert.equal(a.totalListed,12);assert.equal(a.recordIds.length,12);
 assert.equal(scan('de-20261102-bgbl-1030-1101').status,'complete');assert.equal(scan('de-20261102-bgbl-1102').status,'partial');
 assert.equal(scan('eu-oj-20261102-1030').status,'complete');assert.equal(scan('eu-oj-20261102-1031-1102').status,'partial');
 assert(store.tables.scan_runs.filter((r:any)=>r.id.startsWith('de-20261102-state-')).every((r:any)=>JSON.parse(r.data).status!=='complete'));
});

test('this round is bound to reviewed English translations',()=>{
 const l=createLocalization(data,JSON.parse(readFileSync('data/translations/content.json','utf8')),JSON.parse(readFileSync('data/translations/bindings.json','utf8')));
 for(const id of ['de-budget-accompanying-act-2027','de-afd-minor-taxes-motion-2026','eu-frontex-return-proposals-2026','eu-pet-spunbond-china-ad-2026','eu-hybrid-vehicles-safeguard-2026','rp-social-rent-tiers-2026'])assert.equal(l.policies[id],'current',id);
 for(const id of ['de-20261102-bgbl-327','de-20261102-bt-8637','mv-20261029-elterngeld-reaction'])assert.equal(l.intake[id],'current',id);
});
