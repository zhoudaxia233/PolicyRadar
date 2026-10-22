import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createStaticData} from '../lib/static-data.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {localizePolicy,localizeIntake,contentText} from '../lib/i18n/content.ts';
import {countries,countryOf} from '../lib/domain/model.ts';
import {countrySourceUrls} from '../lib/domain/listing.ts';
import {splitSiteData,mergeSiteData,sourceTitleKey,type SiteData} from '../lib/site-data.ts';
import type {Localization} from '../lib/i18n/content.ts';
const read=(p:string)=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const base=createStaticData(read('../data/exports/2026-10-03/policy-radar-export.json'));
const data:SiteData={...base,topics:[],dispositions:[],areas:{},localization:createLocalization(base,read('../data/translations/content.json'),read('./fixtures/i18n-bindings.json'))};
const {shell,countries:files}=splitSiteData(data);
const bundles=new Map([...files].map(([c,f])=>[c,f.bundle]));
// A country read in English: its records plus its own catalog.
const english=(country:string):Localization=>({...files.get(country)!.bundle.localization,messages:files.get(country)!.messages});

test('every country file holds exactly that country\'s records and the checks its source panel shows',()=>{
 assert.deepEqual([...bundles.keys()],countries.map(c=>c.id));
 for(const [country,b] of bundles){
  assert.deepEqual(b.policies,data.policies.filter(p=>countryOf(p.region)===country));
  assert.deepEqual(b.records,data.intake.records.filter(r=>countryOf(r.region)===country));
  assert.deepEqual(b.coverage,data.intake.coverage.filter(c=>countryOf(c.region)===country));
  const shown=countrySourceUrls(country,data.policies,data.intake.records,data.status.discovery);
  assert.deepEqual(b.checks,data.status.checks.filter(c=>shown.has(c.url)));
  assert.deepEqual(Object.keys(b.localization.policies).sort(),b.policies.map(p=>p.id).sort());
  assert.deepEqual(Object.keys(b.localization.intake).sort(),b.records.map(r=>r.id).sort());
 }
});

test('the shell carries no country records, only what resolves a link and labels the page',()=>{
 assert.deepEqual(shell.policies,data.policies.map(p=>({id:p.id,region:p.region})));
 assert.deepEqual(shell.status.discovery,data.status.discovery);
 assert.deepEqual(shell.status.settings,data.status.settings);
 assert.equal('checks' in shell.status,false);
 assert.equal('records' in shell.intake,false);
 assert.equal('localization' in shell,false);
});

test('a country file translates its own texts exactly as the full catalog does',()=>{
 for(const [country,b] of bundles){
  const l=english(country);
  for(const p of b.policies)assert.deepEqual(localizePolicy(p,'en',l),localizePolicy(p,'en',data.localization),p.id);
  for(const r of b.records)assert.deepEqual(localizeIntake(r,'en',l),localizeIntake(r,'en',data.localization),r.id);
  for(const d of data.status.discovery.filter(d=>countryOf(d.region)===country))assert.equal(contentText(sourceTitleKey(d.title),'en',l.messages),contentText(sourceTitleKey(d.title),'en',data.localization.messages));
  const note=data.status.settings['reviewNote:'+country];
  if(note)assert.equal(contentText(note,'en',l.messages),contentText(note,'en',data.localization.messages));
  for(const key of Object.keys(l.messages))assert.equal(l.messages[key],data.localization.messages[key]);
  assert.equal('messages' in b.localization,false);
 }
 assert.equal(sourceTitleKey('联邦公报 2027 年'),'联邦公报 2026 年');
});

test('merging every country file gives the page the whole dataset again',()=>{
 // Countries load in any order; the page never depends on the export's row order across countries.
 const byId=<T extends {id?:string;url?:string}>(rows:T[])=>[...rows].sort((a,b)=>String(a.id??a.url).localeCompare(String(b.id??b.url)));
 const merged=mergeSiteData(shell,[...bundles.values()].reverse(),[...files.values()].map(f=>f.messages));
 assert.deepEqual(byId(merged.policies),byId(data.policies));
 assert.deepEqual(byId(merged.intake.records),byId(data.intake.records));
 assert.deepEqual(byId(merged.intake.coverage),byId(data.intake.coverage));
 assert.equal(merged.intake.trackingStart,data.intake.trackingStart);
 assert.deepEqual(merged.status.discovery,data.status.discovery);
 const shown=new Set(countries.flatMap(c=>[...countrySourceUrls(c.id,data.policies,data.intake.records,data.status.discovery)]));
 assert.deepEqual(new Set(merged.status.checks.map(c=>c.url)),new Set(data.status.checks.filter(c=>shown.has(c.url)).map(c=>c.url)));
 assert.deepEqual(merged.localization.policies,data.localization.policies);
 assert.deepEqual(merged.localization.intake,data.localization.intake);
 assert.deepEqual(merged.localization.sourceLanguages,data.localization.sourceLanguages);
 for(const key of Object.keys(merged.localization.messages))assert.equal(merged.localization.messages[key],data.localization.messages[key]);
 assert.deepEqual(mergeSiteData(shell,[bundles.get('DE')!]).localization.messages,{});
 // One loaded country is a complete view of that country.
 const one=mergeSiteData(shell,[bundles.get('DE')!]);
 assert(one.policies.length>0&&one.policies.every(p=>countryOf(p.region)==='DE'));
 assert.deepEqual(one.intake.records,data.intake.records.filter(r=>countryOf(r.region)==='DE'));
});
