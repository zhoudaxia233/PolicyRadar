import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {migrateExportRegions,countryReviewSettings} from '../lib/export-regions.ts';
import {createStaticData} from '../lib/static-data.ts';
import {validateUpdate} from '../lib/update-data.ts';
import {readFilters,filterSearch} from '../lib/domain/filters.ts';
import {regionName,originalRegionName} from '../lib/i18n/index.ts';
import {frenchRegions,legacyFrenchRegionIds} from '../lib/domain/france.ts';
const read=(name:string)=>JSON.parse(readFileSync(new URL('../data/exports/'+name+'/policy-radar-export.json',import.meta.url),'utf8'));
const old=read('2026-10-03-france-regions'),current=read('2026-10-03-france-iso');
test('v3 export migration only changes version and region identifiers; legacy files remain readable',()=>{
 const original=JSON.stringify(old),migrated=migrateExportRegions(old);
 assert.equal(JSON.stringify(old),original);
 assert.deepEqual(current,{...migrated,exportedAt:current.exportedAt});
 assert.deepEqual(migrateExportRegions(current),current);
 validateUpdate(old,current,new Date(current.exportedAt));
 assert.deepEqual(createStaticData(old).policies,createStaticData(current).policies);
 for(const table of ['policies','revisions','intake'])for(let i=0;i<old.tables[table].length;i++){
  const before=JSON.parse(old.tables[table][i].data),after=JSON.parse(current.tables[table][i].data as string);
  assert.deepEqual(after,{...before,region:legacyFrenchRegionIds[before.region]??before.region});
 }
 assert.deepEqual(old.tables.settings,current.tables.settings); // No fabricated factual review.
 assert.deepEqual(old.tables.snapshots,current.tables.snapshots);
});
test('migration cannot hide changed history or misinterpret ISO department codes',()=>{
 const changed=structuredClone(current),row=changed.tables.intake.find((r:{data:string})=>JSON.parse(r.data).region==='FR-972');
 const record=JSON.parse(row.data);record.note+=' altered';row.data=JSON.stringify(record);
 assert.throws(()=>validateUpdate(old,changed,new Date(current.exportedAt)),/Immutable/);
 const department=structuredClone(current);department.tables.policies[0].data=JSON.stringify({...JSON.parse(department.tables.policies[0].data),region:'FR-75'});
 assert.equal(JSON.parse(migrateExportRegions(department).tables.policies[0].data as string).region,'FR-75');
 assert.throws(()=>createStaticData(department)); // Unsupported, never silently Nouvelle-Aquitaine.
 assert.throws(()=>validateUpdate(current,old,new Date(current.exportedAt)),/regress/);
});
test('legacy bookmarks redirect to ISO URLs without changing stable policy IDs',()=>{
 for(const [legacy,iso] of Object.entries(legacyFrenchRegionIds)){
  const f=readFilters('?lang=en&region='+legacy+'&policy=fr-75-homework-support');
  assert.equal(f.region,iso);assert.equal(f.country,'FR');
  const url=filterSearch('?lang=en&policy=fr-75-homework-support',f);
  assert(url.includes('regionFormat=iso'));assert(url.includes('policy=fr-75-homework-support'));
  assert.deepEqual(readFilters(url),f);
 }
 assert.equal(readFilters('?country=FR&region=FR-75&regionFormat=iso').region,'all');
 assert.equal(frenchRegions.find(r=>r.insee==='75')?.id,'FR-NAQ');
 assert.equal(frenchRegions.find(r=>r.insee==='94')?.id,'FR-20R');
 assert.equal(frenchRegions.find(r=>r.insee==='06')?.id,'FR-976');
});
test('localized region labels and source original language are independent',()=>{
 assert.equal(regionName('FR-20R','en'),'Corsica');
 assert.equal(regionName('FR-BRE','en'),'Brittany');assert.equal(regionName('FR-NOR','en'),'Normandy');
 assert.equal(regionName('FR-973','en'),'French Guiana');
 assert.deepEqual(originalRegionName('FR-973'),{name:'Guyane',language:'fr'});
 assert.deepEqual(originalRegionName('FR'),{name:'Niveau national',language:'fr'});
 assert.deepEqual(originalRegionName('DE-HE'),{name:'Hessen',language:'de'});
});
test('review metadata never crosses countries and legacy fallback stays in the reader',()=>{
 const rows=[{key:'lastReviewAt',value:'DE-date'},{key:'reviewNote',value:'DE-note'}];
 assert.deepEqual(countryReviewSettings(rows),{'lastReviewAt:DE':'DE-date','reviewNote:DE':'DE-note'});
 const withFR=[...rows,{key:'frInitialReviewAt',value:'old-FR'},{key:'frInitialReviewNote',value:'old-note'},{key:'lastReviewAt:FR',value:'new-FR'}];
 assert.equal(countryReviewSettings(withFR)['lastReviewAt:FR'],'new-FR');
 assert.equal(countryReviewSettings(withFR)['reviewNote:FR'],undefined); // Do not pair an old note with a new date.
 assert.equal(countryReviewSettings(withFR).frInitialReviewAt,undefined);
 assert.equal(countryReviewSettings([{key:'lastReviewAt:CH',value:'CH-date'}])['lastReviewAt:CH'],'CH-date');
});
