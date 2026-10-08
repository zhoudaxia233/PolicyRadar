import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {britishRegions} from '../lib/domain/united-kingdom.ts';
import {countries} from '../lib/domain/countries.ts';
import {readFilters,filterSearch} from '../lib/domain/filters.ts';
import {countryName,regionName,originalRegionName,translator} from '../lib/i18n/index.ts';
import {createStaticData} from '../lib/static-data.ts';
import {validateSelection} from '../lib/update-data.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {localizePolicy,policyTextFields} from '../lib/i18n/content.ts';
import {selectListing,countrySourceUrls} from '../lib/domain/listing.ts';
import {sourceSupportsRegion} from '../lib/domain/coverage.ts';
import {readSnapshot} from '../lib/source-archive.ts';
const read=(p:string)=>JSON.parse(readFileSync(p,'utf8'));
const before=read('data/exports/2026-10-07-politics-181653/policy-radar-export.json');
const path='data/exports/2026-10-07-united-kingdom-182736/policy-radar-export.json';
const after=read(path),data=createStaticData(after);
const gb=after.discoveryRegistry.filter((s:{region:string})=>s.region.startsWith('GB'));

test('UK country and four parts survive URL round-trips in all interface languages',()=>{
 assert.deepEqual(britishRegions.map(r=>r.id),['GB-ENG','GB-SCT','GB-WLS','GB-NIR']);
 assert.equal(countryName('GB','zh'),'英国');assert.equal(countryName('GB','en'),'United Kingdom');
 assert.equal(readFilters('?country=GB').country,'GB');
 assert.equal(readFilters('').country,'DE');
 for(const id of ['GB',...britishRegions.map(r=>r.id)])for(const locale of ['zh','en'] as const){
  const f=readFilters('?country=DE&region='+id);assert.equal(f.country,'GB');assert.equal(f.region,id);
  assert.deepEqual(readFilters(filterSearch('?lang='+locale,f)),f);assert.notEqual(regionName(id,locale),id);assert.equal(originalRegionName(id).language,'en');
 }
 const country=countries.find(c=>c.id==='GB')!;
 for(const locale of ['en'] as const)for(const t of [country.scope,country.note,country.subdivision])assert(!/[\u3400-\u9fff]/u.test(translator(locale)(t)));
});

test('UK channels preserve shared-channel boundaries and honest scan gaps',()=>{
 assert.equal(gb.length,9);assert.equal(new Set(gb.map((s:{url:string})=>s.url)).size,9);
 for(const region of britishRegions)assert(gb.some((s:{region:string;supportedRegions?:string[]})=>sourceSupportsRegion(s,region.id)));
 for(const s of gb){assert(!sourceSupportsRegion(s,'IE'));assert(!sourceSupportsRegion(s,'EU'));if(s.region==='GB')assert(sourceSupportsRegion(s,'GB-NIR'));}
 const coverage=data.intake.coverage.filter(c=>c.region.startsWith('GB'));
 assert.equal(coverage.length,9);assert(coverage.every(c=>c.coveredThrough===null&&c.latestScan===null));
 assert.deepEqual(after.discoveryRegistry.filter((s:{region:string})=>!s.region.startsWith('GB')),before.discoveryRegistry);
});

test('UK addition preserves prior records and isolates its listing and sources',()=>{
 validateSelection(before,after,new Date(after.exportedAt));
 assert.deepEqual(after.tables.policies.filter((p:{region:string})=>p.region!=='GB'),before.tables.policies);
 for(const table of ['intake','scan_runs'])assert.deepEqual(after.tables[table],before.tables[table]);
 for(const row of before.tables.settings)assert.deepEqual(after.tables.settings.find((r:{key:string})=>r.key===row.key),row);
 const list=selectListing(data.policies,data.intake.records,readFilters('?country=GB'));
 assert.equal(list.count,1);assert.equal(list.policies[0].id,'gb-minimum-wage-2026');
 assert.equal(selectListing(data.policies,data.intake.records,readFilters('?region=GB-SCT')).count,0);
 const urls=countrySourceUrls('GB',data.policies,data.intake.records,data.status.discovery);
 for(const s of data.status.discovery.filter(s=>!s.region.startsWith('GB')))assert(!urls.has(s.url));
});

test('UK explanation has complete translations and archived support for rates, dates and extent',()=>{
 const p=data.policies.find(p=>p.id==='gb-minimum-wage-2026')!;
 const l=createLocalization(data,read('data/translations/content.json'),read('data/translations/bindings.json'));
 assert.equal(l.policies[p.id],'current');assert.equal(p.effectiveDate,'2026-04-01');assert.equal(p.nextDate,null);
 for(const locale of ['en'] as const)assert(policyTextFields(localizePolicy(p,locale,l)).every(t=>!/[\u3400-\u9fff]/u.test(t)));
 for(const s of gb)assert(l.messages[s.title]);assert(l.messages[data.status.settings['reviewNote:GB']]);
 const source=p.sources.find(s=>s.id==='law')!;
 const check=after.tables.checks.find((c:{url:string})=>c.url===source.url);assert.equal(check.error,null);
 const snapshot=after.tables.snapshots.find((s:{key:string})=>s.key===check.snapshot_key);
 const text=readSnapshot(path,snapshot).toString('utf8').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
 for(const pattern of [/19th March 2026/,/1st April 2026/,/England and Wales, Scotland and Northern Ireland/,/£12.71/,/£10.85/,/£8.00/,/£11.10/])assert.match(text,pattern);
});
