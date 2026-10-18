import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readExport} from '../lib/export-store.ts';
import {createStaticData} from '../lib/static-data.ts';
import {policySchema} from '../lib/domain/model.ts';
import {resolveTopics} from '../lib/domain/topics.ts';

const store=readExport('data/store') as any;
const data=createStaticData(store);
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===`${id}:${version}`).data));

test('the rent index explains the cap with an example rather than a guaranteed rise',()=>{
 const p=revision('fr-rent-index-irl-2026q3',1);
 assert.match(p.impact,/812\.56/);assert.match(p.impact,/也可以不涨/);
});

test('the lycée-violence resolution is not confused with the riot-damage bill',()=>{
 const p=revision('fr-an-resolution-lycee-violence-2026',1);
 assert.equal(p.phase,'pending');assert.match(p.limits,/不具法律约束力/);assert.match(p.limits,/第952号/);
});

test('the cadmium trajectory keeps the unverified consultation visible and groups the third-party lead',()=>{
 const p=revision('fr-fertiliser-cadmium-2027',2);
 assert.match(p.limits,/本站未取得征求意见原文/);
 const topics=resolveTopics(JSON.parse(readFileSync('data/topics.json','utf8')).topics,data.intake.records,data.policies);
 const t=topics.find(t=>t.id==='fr-cadmium-trajectory-2026')!;
 assert.deepEqual(t.policyIds,['fr-fertiliser-cadmium-2027']);assert.equal(t.recordIds.length,2);
});

test('Italian cabinet decrees are not presented as published law before the Gazette',()=>{
 for(const id of ['it-ex-ilva-workers-decree-2026','it-campi-flegrei-decree-2026','it-new-highway-code-prelim-2026'])assert.equal(revision(id,1).phase,'pending',id);
 assert.equal(revision('it-environment-cleanup-decree-177-2026',1).phase,'adopted');
});

test('pay agreements report averages and depend on later signature or decrees',()=>{
 assert.match(revision('it-police-armed-forces-pay-2025-2027',1).impact,/平均数/);
 assert.match(revision('it-local-government-contract-2025-2027',1).limits,/正式签署/);
});

test('the Mon soutien psy explanation does not claim general no-up-front payment',()=>{
 const p=revision('fr-mon-soutien-psy-2026',1);
 assert.match(p.statusNote!,/尚未确认/);assert.equal(p.status,'existing');
});
