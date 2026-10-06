// Fixed historical exports use the reviewed bindings saved before later data updates.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createStaticData} from '../lib/static-data.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {localizePolicy,policyTextFields} from '../lib/i18n/content.ts';
import {validateSelection} from '../lib/update-data.ts';
import {readSnapshot} from '../lib/source-archive.ts';
import {lifecycle} from '../lib/domain/model.ts';
const read=(p:string)=>JSON.parse(readFileSync(p,'utf8'));
const path='data/exports/2026-10-04-eu-backfill-140329/policy-radar-export.json';
const before=read('data/exports/2026-10-04-eu-payment-review-134352/policy-radar-export.json');
const after=read(path),data=createStaticData(after);
const priorIds=new Set(before.tables.policies.map((p:{id:string})=>p.id));
const added=data.policies.filter(p=>!priorIds.has(p.id));
const localization=createLocalization(data,read('data/translations/content.json'),read('tests/fixtures/pre-politics-i18n-bindings.json'));

test('EU backfill preserves existing records and does not claim new monitoring coverage',()=>{
 validateSelection(before,after,new Date(after.exportedAt));
 assert.equal(added.length,8);assert(added.every(p=>p.region==='EU'));
 assert.equal(data.policies.filter(p=>p.region==='EU').length,11);
 for(const table of ['policies','revisions','snapshots','checks'])assert.deepEqual(after.tables[table].slice(0,before.tables[table].length),before.tables[table]);
 for(const table of ['intake','scan_runs'])assert.deepEqual(after.tables[table],before.tables[table]);
 for(const row of before.tables.settings.filter((r:{key:string})=>!r.key.endsWith(':EU')))assert.deepEqual(after.tables.settings.find((r:{key:string})=>r.key===row.key),row);
 assert.deepEqual(data.intake.coverage,createStaticData(before).intake.coverage);
});

test('new records start at version one with complete translations and application dates',()=>{
 for(const p of added){
  assert.equal(data.policyVersions[p.id],1);assert.equal(localization.policies[p.id],'current');
  assert.equal(p.effectiveDateKind,'application');
  for(const locale of ['de','en'] as const){
   const translated=localizePolicy(p,locale,localization);
   for(const text of policyTextFields(translated))assert(!/[\u3400-\u9fff]|\d{4}-\d{2}-\d{2}/u.test(text),p.id+': '+text);
  }
 }
 for(const id of ['eu-accessibility-2019','eu-right-to-repair-2024'])assert(data.policies.find(p=>p.id===id)!.statusNote!.includes('未逐国核查'));
});

test('cloud charge abolition has a sourced future event and an upcoming implementation date',()=>{
 const p=added.find(p=>p.id==='eu-data-act-2023')!;
 assert.equal(p.nextDate,'2027-01-12');assert.equal(p.nextKind,'implementation');
 assert(p.events.some(e=>e.kind==='scheduled'&&e.date===p.nextDate&&e.sourceId==='data'));
 assert.equal(lifecycle(p,'2026-10-04'),'已适用 · 分步实施');
 assert(p.limits.includes('不是全部云服务费用'));
});

test('backfill citations have real archived bytes, while failed legal downloads remain failures',()=>{
 const sources=new Map(added.flatMap(p=>p.sources).map(s=>[s.url,s]));assert.equal(sources.size,12);
 for(const source of sources.values()){
  const check=after.tables.checks.find((c:{url:string})=>c.url===source.url);assert.equal(check.error,null);
  const snapshot=after.tables.snapshots.find((s:{key:string})=>s.key===check.snapshot_key);
  assert.equal(snapshot.url,source.url);assert(readSnapshot(path,snapshot).length>10000);
 }
 const failures=after.tables.checks.slice(before.tables.checks.length).filter((c:{error:string|null})=>c.error);
 assert.equal(failures.length,13);assert(failures.every((c:{snapshot_key:string|null})=>c.snapshot_key===null));
});
