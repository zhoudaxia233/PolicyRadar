import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createStaticData} from '../lib/static-data.ts';
import {validateUpdate} from '../lib/update-data.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {readFilters,filterSearch} from '../lib/domain/filters.ts';
import {selectListing,countrySourceUrls} from '../lib/domain/listing.ts';
import {countryName,regionName,translator} from '../lib/i18n/index.ts';
const read=(p:string)=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const previous=read('../data/exports/2026-10-03/policy-radar-export.json');
const candidate=read('../data/exports/2026-10-03-france/policy-radar-export.json');
const data=createStaticData(candidate);

test('French country and national filters survive a URL round trip in every UI language',()=>{
 for(const locale of ['zh','de','en'] as const){
  for(const query of ['?country=FR','?region=FR']){
   const f=readFilters(query);assert.equal(f.country,'FR');
   assert.deepEqual(readFilters(filterSearch('?lang='+locale,f)),f);
  }
  assert.notEqual(countryName('FR',locale),'FR');assert.notEqual(regionName('FR',locale),'FR');
  assert(!translator(locale)('追踪范围：法国全国层面及18个大区范围（本土13个、海外5个）。').includes('州'));
 }
 assert.equal(readFilters('?country=FR&region=DE-HE').country,'DE');
});
test('France lists verified policy separately from unverified discoveries and isolates source checks',()=>{
 const fr=readFilters('?country=FR');
 const adopted=selectListing(data.policies,data.intake.records,fr);
 assert.equal(adopted.count,1);assert(adopted.policies.every(p=>p.region==='FR'));
 assert.equal(adopted.raw.length,0);
 assert.equal(selectListing(data.policies,data.intake.records,{...fr,view:'all'}).count,3);
 assert.equal(selectListing(data.policies,data.intake.records,{...fr,view:'intake'}).count,2);
 const urls=countrySourceUrls('FR',data.policies,data.intake.records,data.status.discovery);
 assert(urls.has('https://www.legifrance.gouv.fr/jorf/jo'));
 assert(data.status.checks.filter(c=>urls.has(c.url)).length>=2);
 for(const p of data.policies.filter(p=>p.region.startsWith('DE')))for(const s of p.sources)assert(!urls.has(s.url));
 const coverage=data.intake.coverage.filter(c=>c.region==='FR');
 assert.equal(coverage.length,5);assert(coverage.every(c=>c.coveredThrough===null));
 assert.equal(coverage.find(c=>c.url.includes('legifrance'))?.latestScan?.status,'partial');
});
test('French baseline preserves German history, evidence gates and original language',()=>{
 validateUpdate(previous,candidate,new Date(candidate.exportedAt));
 assert.deepEqual(candidate.tables.policies.filter((p:{region:string})=>p.region!=='FR'),previous.tables.policies);
 assert.equal(data.status.settings.lastReviewAt,createStaticData(previous).status.settings.lastReviewAt);
 assert(data.status.settings.frInitialReviewAt);
 const localization=createLocalization(data,read('../data/translations/content.json'),read('../data/translations/bindings.json'));
 for(const p of data.policies.filter(p=>p.region==='FR')){
  assert.equal(localization.policies[p.id],'current');assert.equal(p.originalLanguage,'fr');
  assert.equal(p.effectiveDate,'2026-09-01');assert.equal(p.nextDate,'2027-09-01');
 }
 for(const r of data.intake.records.filter(r=>r.region==='FR')){
  assert.equal(localization.intake[r.id],'current');assert.equal(r.stage,'unverified');assert.equal(r.originalLanguage,'fr');
 }
});
