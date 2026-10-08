import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createStaticData} from '../lib/static-data.ts';
import {validateSelection} from '../lib/update-data.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {localizeIntake} from '../lib/i18n/content.ts';

const read=(p:string)=>JSON.parse(readFileSync(p,'utf8'));
const folder='data/exports/2026-10-07-spain-title-translations';
const manifest=read(folder+'/manifest.json');
const before=read(manifest.baseExport),after=read(folder+'/policy-radar-export.json');
const data=createStaticData(after);
const localization=createLocalization(data,read('data/translations/content.json'),read('data/translations/bindings.json'));

test('Spanish title corrections retain every original row, factual field and review marker',()=>{
 validateSelection(before,after,new Date(after.exportedAt));
 for(const [table,rows] of Object.entries(before.tables)){
  if(table!=='intake')assert.deepEqual(after.tables[table],rows,table);
 }
 assert.deepEqual(after.discoveryRegistry,before.discoveryRegistry);
 assert.deepEqual(after.tables.intake.slice(0,before.tables.intake.length),before.tables.intake);
 const corrections=after.tables.intake.slice(before.tables.intake.length);
 assert.equal(corrections.length,864);
 assert.deepEqual(corrections.map((r:{id:string})=>r.id),manifest.translatedRecordIds);
 for(const row of corrections){
  const {id,titleZh,supersedes,...facts}=JSON.parse(row.data);
  const original=JSON.parse(before.tables.intake.find((r:{id:string})=>r.id===supersedes).data);
  const {id:oldId,...oldFacts}=original;
  assert.deepEqual(facts,oldFacts,oldId);
  assert.match(titleZh,/[\u3400-\u9fff]/u);
  assert.equal(facts.stage,'unverified');
 }
 assert.deepEqual(data.intake.coverage,createStaticData(before).intake.coverage);
});

test('all 874 current Spanish discoveries have current translations in all interface languages',()=>{
 const records=data.intake.records.filter(r=>r.region.startsWith('ES'));
 assert.equal(records.length,874);
 for(const r of records){
  assert.equal(localization.intake[r.id],'current',r.id);
  for(const locale of ['zh','en'] as const){
   const displayed=localizeIntake(r,locale,localization);
   assert(displayed.titleZh&&displayed.titleZh!==r.title,r.id+' '+locale);
   assert.equal(displayed.title,r.title);
   assert.equal(displayed.stage,r.stage);
   if(locale!=='zh')assert(!/[\u3400-\u9fff]/u.test(displayed.titleZh));
  }
 }
 assert.equal(records.filter(r=>r.stage==='unverified').length,864);
});

test('the two reported Spanish originals display translated titles without changing verification state',()=>{
 const election=data.intake.records.find(r=>r.officialId==='BOE-A-2026-20742')!;
 const border=data.intake.records.find(r=>r.officialId==='BOE-A-2026-20743')!;
 assert.match(election.titleZh!,/解散.*选举/);
 assert.match(border.titleZh!,/延长.*意大利.*边境检查/);
 for(const r of [election,border]){
  assert.equal(r.stage,'unverified');assert.equal(r.effectiveDate,null);
  assert.equal(r.adoptionDate,null);assert.equal(r.date,'2026-10-06');
 }
});

test('the selected export cannot publish Spanish discoveries without translated reader titles',()=>{
 const selected=createStaticData(read(read('data/current-export.json').path));
 const l=createLocalization(selected,read('data/translations/content.json'),read('data/translations/bindings.json'));
 for(const r of selected.intake.records.filter(r=>r.region.startsWith('ES'))){
  assert(r.titleZh&&/[\u3400-\u9fff]/u.test(r.titleZh),'Missing Chinese title: '+r.id);
  assert.equal(l.intake[r.id],'current','Missing or stale translations: '+r.id);
 }
});
