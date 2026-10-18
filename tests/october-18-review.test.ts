import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readExport} from '../lib/export-store.ts';
import {createStaticData} from '../lib/static-data.ts';
import {policySchema} from '../lib/domain/model.ts';
import {resolveTopics} from '../lib/domain/topics.ts';

const store=readExport('data/store') as any;
const data=createStaticData(store);
// Immutable revisions from the 18 October DE/FR/IT review.
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===`${id}:${version}`).data));

test('a Bundestag vote alone does not make a bill law while the Bundesrat is still due',()=>{
 for(const [id,v] of [['de-starter-pension-2027',3],['de-co2-price-corridor-2027',3],['de-eudi-wallet-2026',2]] as const){
  const p=revision(id,v);
  assert.equal(p.phase,'pending',id);
  assert.ok(p.events.some(e=>e.kind==='adopted'&&e.date>='2026-10-15'),id);
  assert.match(p.statusNote!,/联邦参议院|参议院/,id);
  assert.equal(p.nextDate,null,id);
 }
});

test('laws cleared by the Bundesrat are adopted but not given an invented commencement date',()=>{
 for(const [id,v] of [['de-tobacco-tax-2027',3],['de-product-liability-2026',2]] as const){
  const p=revision(id,v);
  assert.equal(p.phase,'adopted',id);
  assert.equal(p.effectiveDate,null,id);
  assert.match(p.statusNote!,/公布前不生效/,id);
 }
});

test('first readings and conditional consent stay pending without a stale scheduled date',()=>{
 const bafoeg=revision('de-bafoeg-reform-2027',2),pipeline=revision('de-pipeline-regulation-2026',2),benefits=revision('de-benefits-in-kind-values-2027',2);
 assert.equal(bafoeg.phase,'pending');assert.equal(bafoeg.nextDate,null);
 assert.equal(pipeline.phase,'pending');assert.match(pipeline.statusNote!,/附条件同意/);
 assert.equal(benefits.phase,'adopted');assert.equal(benefits.effectiveDate,null);
});

test('rejecting one care motion does not close the other motions on the same question',()=>{
 const p=revision('de-care-financing-opposition-2026',2);
 assert.equal(p.phase,'pending');
 assert.ok(p.events.some(e=>e.kind==='closed'&&/21\/2216/.test(e.detail)));
 assert.match(p.statusNote!,/21\/5828和21\/8398转交卫生委员会/);
});

test('no German explanation keeps a pending 15–16 October scheduled date after the review',()=>{
 const stale=data.policies.filter((p:any)=>p.region.startsWith('DE')&&p.phase==='pending'&&['2026-10-15','2026-10-16'].includes(p.nextDate));
 assert.deepEqual(stale.map((p:any)=>p.id),[]);
});

test('the riot-damage bill is explained as a Senate bill, not as current law',()=>{
 const p=revision('fr-riot-damage-joint-liability-bill-2026',1);
 assert.equal(p.phase,'pending');assert.equal(p.effectiveDate,null);assert.equal(p.nextDate,'2026-10-27');
 assert.match(p.after,/10,000|1万欧元/);
 assert.match(p.impact,/只是参加合法游行不在条文范围内/);
 assert.match(p.limits,/不是现行法/);
 const record=data.intake.records.find((r:any)=>r.id==='fr-senat-pjl-952-2026')!;
 assert.equal(record.officialId,p.officialId);
});

test('the renewed fuel aid uses the new 27 October application date',()=>{
 const p=revision('fr-fuel-heavy-drivers-renewal-2026',3);
 assert.equal(p.nextDate,'2026-10-27');
 assert.match(p.statusNote!,/未直接核读法令原文/);
});

test('Italian school decree: conversion deadline, phased starts and the narrow explanation scope',()=>{
 const p=revision('it-school-decree-170-2026-foreign-pupils',1);
 assert.equal(p.effectiveDate,'2026-10-01');assert.equal(p.nextDate,'2026-11-29');assert.equal(p.nextKind,'deadline');
 assert.match(p.summary,/2027\/28/);assert.match(p.limits,/自始失效/);
 const topics=resolveTopics(JSON.parse(readFileSync('data/topics.json','utf8')).topics,data.intake.records,data.policies);
 const t=topics.find(t=>t.id==='it-dl-170-2026-school-decree')!;
 assert.deepEqual(t.recordIds,['it-dl-170-2026']);
 assert.deepEqual(t.policyIds,['it-school-decree-170-2026-foreign-pupils']);
});

test('the Bundesrat subsidiarity outcome supersedes the EU housing discovery without changing its identity',()=>{
 const current=data.intake.records.filter((r:any)=>r.url==='https://www.bundesrat.de/SharedDocs/TO/1069/tagesordnung-1069.html?topNr=38');
 assert.equal(current.length,1);
 assert.match(current[0].note,/辅助性原则异议/);
 assert.equal(current[0].officialId,'BR-Drs. 542/26');
});
