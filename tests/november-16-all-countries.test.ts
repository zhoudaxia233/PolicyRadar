import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readExport} from '../lib/export-store.ts';
import {policySchema,lifecycle,detailLabels} from '../lib/domain/model.ts';

const store=readExport('data/store') as any;
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.policy_id===id&&r.version===version).data));
const scan=(id:string)=>JSON.parse(store.tables.scan_runs.find((x:any)=>x.id===id).data);
const setting=(k:string)=>store.tables.settings.find((s:any)=>s.key===k)?.value;
const today='2026-11-16';

test('a repealed Spanish decree is closed, never took effect, and points to the decree that survives',()=>{
 const p=revision('es-rent-renewal-compensation-2026',3);
 assert.equal(p.phase,'closed');assert.equal(p.status,'closed');assert.equal(p.effectiveDate,null);
 assert.equal(lifecycle(p,today),'已结束');
 assert.equal(detailLabels(p).change,'原拟议改变');
 assert.match(p.statusNote!,/废除/);assert.match(p.statusNote!,/没有生效/);assert.match(p.summary,/第29\/2026号/);
 assert(p.events.some(e=>e.kind==='closed'&&e.date==='2026-11-12'));
 // The original scheduled start stays in history.
 assert(p.events.some(e=>e.id==='start'&&e.date==='2026-11-15'));
 const rdl29=revision('es-housing-social-function-2026',3);
 assert.match(rdl29.statusNote!,/确认/);assert.doesNotMatch(rdl29.limits,/是否仍有效未核实/);
});

test('Bundestag adoption does not make a bill current law',()=>{
 for(const [id,version,date] of [['de-annual-tax-act-2026',5,'2026-11-12'],['de-academic-fixed-term-contracts-2026',3,'2026-11-12'],['de-intelligence-reform-august-2026',2,'2026-11-13'],['de-eu-mercosur-ratification-2026',2,'2026-11-13'],['de-guardianship-coercive-treatment-2026',2,'2026-11-12'],['de-criminal-mutual-legal-assistance-2026',2,'2026-11-12'],['de-deforestation-free-products-2026',2,'2026-11-12']] as const){
  const p=revision(id,version);
  assert.equal(p.phase,'pending',id);assert.equal(p.effectiveDate,null,id);
  assert(p.politics?.votes?.some(v=>v.date===date&&v.body==='Deutscher Bundestag'),id);
  assert.match(p.statusNote!,/联邦参议院/,id);
 }
 const tax=revision('de-annual-tax-act-2026',5);
 assert.equal(tax.nextDate,null);assert.match(tax.limits,/本轮未核读/);
 assert.deepEqual(revision('de-intelligence-reform-august-2026',2).politics?.votes?.[0].counts,{for:308,against:190,abstain:71});
});

test('bills on the 20 November Bundesrat agenda carry their new item numbers',()=>{
 for(const [id,version,item] of [['de-grid-support-proposal-2027',6,'第63项'],['de-kita-quality-act-2027',5,'第60项'],['de-cyber-defence-act-2026',3,'第61项']] as const){
  const p=revision(id,version);
  assert.equal(p.nextDate,'2026-11-20',id);assert.equal(p.nextKind,'scheduled',id);assert.match(p.nextLabel,new RegExp(item),id);
 }
});

test('new explanations keep cabinet drafts, proposals and adopted law apart',()=>{
 const elterngeld=revision('de-elterngeld-reform-2027',1);
 assert.equal(elterngeld.phase,'pending');assert.equal(elterngeld.effectiveDate,null);
 assert.match(elterngeld.summary,/330欧元/);assert.match(elterngeld.summary,/1,900欧元/);assert.match(elterngeld.before,/65%/);
 assert.match(elterngeld.impact,/假设/);assert.match(elterngeld.limits,/草案原文本轮未读/);
 const pension=revision('de-private-pension-reform-2027',1);
 assert.equal(pension.phase,'adopted');assert.equal(pension.effectiveDate,'2027-01-01');assert.equal(pension.effectiveDateKind,'application');
 assert.equal(lifecycle(pension,today),'已通过 · 待适用');assert.match(pension.impact,/540欧元/);assert.match(pension.impact,/不是投资收益/);
 const dfa=revision('eu-digital-fairness-act-proposal-2026',1);
 assert.equal(dfa.phase,'pending');assert.equal(dfa.effectiveDate,null);assert.match(dfa.limits,/委员会提案/);
 const uk=revision('gb-leasehold-service-charge-regulations-2027',1);
 assert.equal(uk.status,'phased');assert.equal(uk.nextDate,'2027-04-01');assert.match(uk.limits,/只适用于英格兰/);
});

test('a rejected French finance bill leaves its committee amendments without a legislative basis',()=>{
 const crypto=revision('fr-plf2027-crypto-tax-amendments',2);
 assert.equal(crypto.nextDate,null);assert.match(crypto.statusNote!,/不在其中/);assert.match(crypto.statusNote!,/现行规则不变/);
 assert(crypto.events.some(e=>e.id==='cf1826-proposed-application-2027'));
 assert.match(revision('fr-finance-bill-2027',5).statusNote!,/一读否决/);
});

test('corrections replace a wrong identifier instead of hiding it',()=>{
 const it=revision('it-school-decree-170-2026-foreign-pupils',2);
 assert.match(it.statusNote!,/参议院S\.2053/);assert(it.events.some(e=>e.kind==='correction'&&/S\.2053/.test(e.detail)));
 const nl=revision('nl-tax-plan-2027',3);
 assert.deepEqual(nl.politics?.votes?.[0].counts,{for:76,against:74,abstain:0});assert.equal(nl.phase,'pending');
 const sugar=revision('de-sugary-drinks-tax-2027',3);
 assert.equal(sugar.nextDate,'2027-07-01');assert.match(sugar.statusNote!,/没有给出新的开征日期/);
});

test('closed gazette days are reconciled and tier-2 scans stay partial',()=>{
 for(const id of ['de-20261116-bgbl-1112','de-20261116-bgbl-1113','de-20261116-bgbl-1114','eu-oj-20261116-1113','eu-oj-20261116-1114','eu-oj-20261116-1115'])assert.equal(scan(id).status,'complete',id);
 for(const id of ['de-20261116-bgbl-1116','eu-oj-20261116-1116','de-20261116-textarchiv'])assert.equal(scan(id).status,'partial',id);
 for(const id of ['t2-20261116-gov','t2-20261116-boe','t2-20261116-nltk','t2-20261116-usfr'])assert.equal(scan(id).status,'partial',id);
 assert.equal(scan('t2-20261116-it').status,'blocked');assert.equal(scan('de-20261116-state-39').status,'blocked');
 for(const cc of ['DE','EU','FR','NL','CH','IT','GB','ES','US'])assert(setting(`lastReviewAt:${cc}`)>='2026-11-16T',cc);
});

test('new matters are grouped with their records and routine Official Journal items are disposed',()=>{
 const topics=JSON.parse(readFileSync('data/topics.json','utf8')).topics;
 for(const id of ['es-rdl-28-2026-rent-renewal','es-rdl-29-2026-housing','fr-plf-2027','de-elterngeld-reform-2027','de-seelotsgesetz-3'])assert(topics.some((t:any)=>t.id===id),id);
 const dispositions=JSON.parse(readFileSync('data/dispositions.json','utf8')).dispositions;
 const disposed=new Set(dispositions.flatMap((d:any)=>d.documents.map((x:any)=>x.officialId)));
 // Consumer-relevant items stay awaiting review.
 for(const id of ['OJ:L_202602501','OJ:C_202605856','OJ:C_202605862'])assert(!disposed.has(id),id);
});
