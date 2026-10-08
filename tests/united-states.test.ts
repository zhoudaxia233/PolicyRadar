import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {americanRegions} from '../lib/domain/united-states.ts';
import {countries} from '../lib/domain/countries.ts';
import {readFilters,filterSearch} from '../lib/domain/filters.ts';
import {countryName,regionName,originalRegionName,translator} from '../lib/i18n/index.ts';
import {createStaticData} from '../lib/static-data.ts';
import {validateSelection} from '../lib/update-data.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {selectListing,countrySourceUrls} from '../lib/domain/listing.ts';
import {sourceSupportsRegion} from '../lib/domain/coverage.ts';
const read=(p:string)=>JSON.parse(readFileSync(p,'utf8'));
const folder='data/exports/2026-10-08-us-channels-203803';
const before=read(read(folder+'/manifest.json').baseExport);
const after=read(folder+'/policy-radar-export.json'),data=createStaticData(after);
const us=after.discoveryRegistry.filter((s:{region:string})=>s.region==='US'||s.region.startsWith('US-'));

test('US federal, 50 states and DC round-trip without country-code collisions',()=>{
 const codes='AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY'.split(' ');
 assert.deepEqual(americanRegions.map(r=>r.id),codes.map(c=>'US-'+c));
 assert.equal(countryName('US','zh'),'美国');assert.equal(countryName('US','en'),'United States');
 assert.equal(readFilters('?country=US').country,'US');assert.equal(readFilters('').country,'DE');
 for(const id of ['US',...americanRegions.map(r=>r.id)])for(const locale of ['zh','en'] as const){
  const f=readFilters('?country=DE&region='+id);assert.equal(f.country,'US');assert.equal(f.region,id);
  assert.deepEqual(readFilters(filterSearch('?lang='+locale,f)),f);assert.notEqual(regionName(id,locale),id);
  assert.equal(originalRegionName(id).language,'en');
 }
 assert.equal(readFilters('?region=DE').country,'DE');
 assert.equal(readFilters('?region=US-DE').country,'US');
 assert.equal(readFilters('?country=US&region=US-PR').region,'all');
 assert.notEqual(regionName('US-WA','zh'),regionName('US-DC','zh'));
 const country=countries.find(c=>c.id==='US')!;
 for(const t of [country.scope,country.note,country.subdivision])assert(!/[\u3400-\u9fff]/u.test(translator('en')(t)));
});

test('US sources preserve jurisdiction and explicitly unscanned coverage',()=>{
 assert.equal(us.length,57);assert.equal(new Set(us.map((s:{url:string})=>s.url)).size,57);
 assert.equal(us.filter((s:{region:string})=>s.region==='US').length,6);
 for(const r of americanRegions)assert.equal(us.filter((s:{region:string})=>s.region===r.id).length,1);
 for(const s of us){assert(!sourceSupportsRegion(s,'DE'));assert(!sourceSupportsRegion(s,'US-PR'));}
 assert(!sourceSupportsRegion(us.find((s:{region:string})=>s.region==='US-DE'),'DE'));
 assert(!sourceSupportsRegion(us.find((s:{region:string})=>s.region==='US-WA'),'US-DC'));
 const coverage=data.intake.coverage.filter(c=>c.region==='US'||c.region.startsWith('US-'));
 assert.equal(coverage.length,57);assert(coverage.every(c=>c.coveredThrough===null&&c.latestScan===null));
 assert.equal(data.status.settings['lastReviewAt:US'],undefined);
 const l=createLocalization(data,read('data/translations/content.json'),read('data/translations/bindings.json'));
 for(const s of us)assert(l.messages[s.title]);assert(l.messages[data.status.settings['reviewNote:US']]);
});

test('US registration preserves existing history and isolates empty US listings',()=>{
 validateSelection(before,after,new Date(after.exportedAt));
 for(const [table,rows] of Object.entries(before.tables))if(table!=='settings')assert.deepEqual(after.tables[table],rows,table);
 for(const row of before.tables.settings)if(row.key!=='scheduleLabel')assert.deepEqual(after.tables.settings.find((r:{key:string})=>r.key===row.key),row);
 assert.deepEqual(after.discoveryRegistry.filter((s:{region:string})=>!s.region.startsWith('US')),before.discoveryRegistry);
 for(const region of ['all','US','US-CA','US-DC'])for(const view of ['all','adopted','pending','updates','intake']){
  const list=selectListing(data.policies,data.intake.records,readFilters('?country=US&region='+region+'&view='+view));assert.equal(list.count,0);
 }
 const urls=countrySourceUrls('US',data.policies,data.intake.records,data.status.discovery);
 assert.equal(urls.size,57);for(const s of us)assert(urls.has(s.url));
 for(const s of data.status.discovery.filter(s=>!s.region.startsWith('US')))assert(!urls.has(s.url));
});
