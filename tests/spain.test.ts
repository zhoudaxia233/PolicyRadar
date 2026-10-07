import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {spanishRegions} from '../lib/domain/spain.ts';
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
const before=read('data/exports/2026-10-07-crypto-committee-213603/policy-radar-export.json');
const path='data/exports/2026-10-07-spain-200016/policy-radar-export.json';
const after=read(path),data=createStaticData(after);
const es=after.discoveryRegistry.filter((s:{region:string})=>s.region.startsWith('ES'));

test('Spain and all autonomous communities and cities round-trip in every interface language',()=>{
 assert.deepEqual(spanishRegions.map(r=>r.id),['AN','AR','AS','CB','CL','CM','CN','CT','EX','GA','IB','MC','MD','NC','PV','RI','VC','CE','ML'].map(id=>'ES-'+id));
 assert.equal(countryName('ES','zh'),'西班牙');assert.equal(countryName('ES','de'),'Spanien');assert.equal(countryName('ES','en'),'Spain');
 assert.equal(readFilters('?country=ES').country,'ES');assert.equal(readFilters('').country,'DE');
 for(const id of ['ES',...spanishRegions.map(r=>r.id)])for(const locale of ['zh','de','en'] as const){
  const f=readFilters('?country=DE&region='+id);assert.equal(f.country,'ES');assert.equal(f.region,id);
  assert.deepEqual(readFilters(filterSearch('?lang='+locale,f)),f);assert.notEqual(regionName(id,locale),id);
 }
 assert.equal(originalRegionName('ES').language,'es');assert.equal(originalRegionName('ES-CT').language,'ca');assert.equal(originalRegionName('ES-PV').language,'eu');
 const country=countries.find(c=>c.id==='ES')!;
 for(const locale of ['de','en'] as const)for(const t of [country.scope,country.note,country.subdivision])assert(!/[\u3400-\u9fff]/u.test(translator(locale)(t)));
});

test('Spain channels cover each region without fabricating completed scans or wider jurisdiction',()=>{
 assert.equal(es.length,40);assert.equal(new Set(es.map((s:{url:string})=>s.url)).size,40);
 for(const r of spanishRegions)for(const kind of ['government','gazette'])assert(es.some((s:{region:string;kind:string})=>s.region===r.id&&s.kind===kind));
 for(const s of es){assert(!sourceSupportsRegion(s,'EU'));assert(!sourceSupportsRegion(s,'PT'));}
 assert(!sourceSupportsRegion(es.find((s:{region:string})=>s.region==='ES-CE'),'ES-ML'));
 const coverage=data.intake.coverage.filter(c=>c.region.startsWith('ES'));
 assert.equal(coverage.length,40);assert(coverage.every(c=>c.coveredThrough===null&&c.latestScan===null));
 assert.deepEqual(after.discoveryRegistry.filter((s:{region:string})=>!s.region.startsWith('ES')),before.discoveryRegistry);
});

test('Spain addition preserves history and isolates listings and source sets',()=>{
 validateSelection(before,after,new Date(after.exportedAt));
 assert.deepEqual(after.tables.policies.filter((p:{region:string})=>p.region!=='ES'),before.tables.policies);
 for(const table of ['intake','scan_runs'])assert.deepEqual(after.tables[table],before.tables[table]);
 for(const row of before.tables.settings)assert.deepEqual(after.tables.settings.find((r:{key:string})=>r.key===row.key),row);
 const list=selectListing(data.policies,data.intake.records,readFilters('?country=ES'));
 assert.equal(list.count,1);assert.equal(list.policies[0].id,'es-minimum-wage-2026');
 assert.equal(selectListing(data.policies,data.intake.records,readFilters('?region=ES-CT')).count,0);
 const urls=countrySourceUrls('ES',data.policies,data.intake.records,data.status.discovery);
 for(const s of data.status.discovery.filter(s=>!s.region.startsWith('ES')))assert(!urls.has(s.url));
});

test('Spanish minimum wage keeps commencement distinct from retroactive effects with translated archived evidence',()=>{
 const p=data.policies.find(p=>p.id==='es-minimum-wage-2026')!;
 const l=createLocalization(data,read('data/translations/content.json'),read('data/translations/bindings.json'));
 assert.equal(l.policies[p.id],'current');assert.equal(p.effectiveDate,'2026-02-20');assert.equal(p.nextDate,'2026-12-31');assert.equal(p.nextKind,'expiry');
 for(const locale of ['de','en'] as const)assert(policyTextFields(localizePolicy(p,locale,l)).every(t=>!/[\u3400-\u9fff]/u.test(t)));
 for(const s of es)assert(l.messages[s.title]);assert(l.messages[data.status.settings['reviewNote:ES']]);
 const source=p.sources[0];
 const check=after.tables.checks.find((c:{url:string})=>c.url===source.url);assert.equal(check.error,null);
 const snapshot=after.tables.snapshots.find((s:{key:string})=>s.key===check.snapshot_key);
 const text=readSnapshot(path,snapshot).toString('utf8').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
 for(const pattern of [/40,70/,/1 221/,/17 094/,/57,82/,/9,55/,/20\/02\/2026/,/1 de enero/,/31 de diciembre/])assert.match(text,pattern);
 assert.match(p.dateExplanation??'',/追溯起算日不同于法律生效日/);
});
