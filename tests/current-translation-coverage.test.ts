import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createStaticData} from '../lib/static-data.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {localizeIntake,localizePolicy,policyTextFields} from '../lib/i18n/content.ts';
import {validateSelection} from '../lib/update-data.ts';

const read=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const data=createStaticData(read(process.env.POLICY_RADAR_EXPORT??read('data/current-export.json').path));
const localization=createLocalization(data,read('data/translations/content.json'),read('data/translations/bindings.json'));

test('every current discovery has Chinese, German and English reader text',()=>{
 const failures:string[]=[];
 for(const record of data.intake.records){
  if(!/[\u3400-\u9fff]/u.test(record.titleZh??record.title))failures.push(record.id+': Chinese title');
  if(localization.intake[record.id]!=='current')failures.push(record.id+': '+localization.intake[record.id]);
  for(const locale of ['de','en'] as const){
   const rendered=localizeIntake(record,locale,localization);
   if(!rendered.titleZh||/[\u3400-\u9fff]/u.test(rendered.titleZh+' '+rendered.note))failures.push(record.id+': '+locale);
   assert.equal(rendered.title,record.title);
   assert.equal(rendered.stage,record.stage);
  }
 }
 assert.deepEqual(failures,[]);
});

test('all current policy explanations remain translated, including nested details',()=>{
 for(const policy of data.policies){
  assert.equal(localization.policies[policy.id],'current',policy.id);
  for(const locale of ['de','en'] as const){
   for(const text of policyTextFields(localizePolicy(policy,locale,localization)))assert(!/[\u3400-\u9fff]/u.test(text),policy.id+': '+text);
  }
 }
});

test('reader source headings and review/scan notes have translations',()=>{
 const texts=[...data.intake.coverage.flatMap(r=>[r.title,r.latestScan?.note]),
  ...Object.entries(data.status.settings).filter(([key])=>/note/i.test(key)).map(([,value])=>value)];
 for(const text of texts.filter(Boolean))assert(localization.messages[text!],'Missing displayed text: '+text);
});

test('translation corrections preserve the complete history and every factual field',()=>{
 const folder='data/exports/2026-10-08-complete-translations';
 const manifest=read(folder+'/manifest.json'),before=read(manifest.baseExport),after=read(folder+'/policy-radar-export.json');
 validateSelection(before,after,new Date(after.exportedAt));
 for(const [table,rows] of Object.entries(before.tables))if(table!=='intake')assert.deepEqual(after.tables[table],rows,table);
 assert.deepEqual(after.discoveryRegistry,before.discoveryRegistry);
 assert.deepEqual(after.tables.intake.slice(0,before.tables.intake.length),before.tables.intake);
 const oldRows=new Map(before.tables.intake.map((r:{id:string,data:string})=>[r.id,r]));
 const corrections=after.tables.intake.slice(before.tables.intake.length);
 assert.deepEqual(corrections.map((r:{id:string})=>r.id),manifest.translatedRecordIds);
 for(const row of corrections){
  const {id,titleZh,supersedes,...facts}=JSON.parse(row.data);
  const old=oldRows.get(supersedes) as {id:string,data:string,discovered_at:string};
  const {id:oldId,titleZh:oldTitle,supersedes:oldSupersedes,...oldFacts}=JSON.parse(old.data);
  assert.deepEqual(facts,oldFacts,id);
  assert.equal(row.discovered_at,old.discovered_at,id);
  assert.match(titleZh,/[\u3400-\u9fff]/u,id);
 }
 assert.deepEqual(createStaticData(after).intake.coverage,createStaticData(before).intake.coverage);
});

test('translated UK titles preserve identifiers and legally significant qualifiers',()=>{
 const correctedIds=new Set(read('data/exports/2026-10-08-complete-translations/manifest.json').translatedRecordIds);
 for(const record of data.intake.records.filter(r=>r.region.startsWith('GB')&&correctedIds.has(r.id))){
  const texts=[record.titleZh,...(['de','en'] as const).map(locale=>localizeIntake(record,locale,localization).titleZh)];
  for(const text of texts){
   const numbers=new Set(text?.match(/\d+/g));
   for(const number of record.title.match(/\d+/g)??[])assert(numbers.has(number),record.id+': lost '+number);
  }
  if(record.title.includes('(revoked)')){
   assert.match(texts[0]!,/已废止/u,record.id);
   assert.match(texts[1]!,/aufgehoben/u,record.id);
  }
  if(/Saving(?:s)? Provision/.test(record.title)){
   assert.match(texts[0]!,/保留/u,record.id);
   assert.doesNotMatch(texts[0]!,/储蓄/u,record.id);
  }
  if(record.title.includes('Vapes'))assert.match(texts[0]!,/电子烟/u,record.id);
  if(record.title.includes('(Commencement'))assert.match(texts[0]!,/生效/u,record.id);
 }
});
