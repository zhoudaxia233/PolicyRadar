import test from 'node:test';
import assert from 'node:assert/strict';
import {readExport} from '../lib/export-store.ts';
import {createStaticData} from '../lib/static-data.ts';
import {policySchema} from '../lib/domain/model.ts';

const store=readExport('data/store') as any;
const data=createStaticData(store);
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===`${id}:${version}`).data));

test('Lower Saxony wolf hunting is conditional on a management plan and is not presented as open season',()=>{
 const p=revision('ni-wolf-goose-hunting-seasons-2026',1);
 assert.equal(p.effectiveDate,'2026-10-06');
 assert.match(p.limits,/本站未核实下萨克森是否已制定/);
 assert.match(p.before,/7月1日至10月31日/);
});

test('the lawyers’ pension fund merger keeps the treaty date separate from the approval law',()=>{
 const p=revision('ni-lawyers-pension-fund-merger-2027',1);
 assert.equal(p.effectiveDate,'2026-09-16');assert.equal(p.nextDate,'2027-01-01');assert.equal(p.status,'phased');
});

test('T+1 settlement separates the December 2026 requirements from the October 2027 switch',()=>{
 const p=revision('eu-t1-settlement-2027',1);
 assert.equal(p.effectiveDate,'2026-12-07');assert.equal(p.effectiveDateKind,'application');assert.equal(p.nextDate,'2027-10-11');
});

test('the methane proposal does not invent postponed dates',()=>{
 const p=revision('eu-methane-regulation-importer-delay-proposal',1);
 assert.equal(p.phase,'pending');assert.match(p.limits,/本站不推算/);
 const current=data.intake.records.filter((r:any)=>r.url===p.officialId);
 assert.equal(current.length,1);assert.equal(current[0].id,'eu-news-20261014-methane-importers-read');
});

test('the single-wagon resolution records the budget figures from the adopted text',()=>{
 const p=revision('de-br-single-wagon-rail-freight-resolution-2026',1);
 assert.match(p.summary,/3\.84亿欧元/);assert.match(p.summary,/2\.74亿欧元/);
 assert.match(p.limits,/不具约束力/);
});
