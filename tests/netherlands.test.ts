import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createStaticData} from '../lib/static-data.ts';
import {validateUpdate} from '../lib/update-data.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {discoveryForYear} from '../lib/domain/coverage.ts';
import {coverageRows} from '../lib/domain/intake.ts';
import {dutchProvinces,dutchDiscovery} from '../lib/domain/netherlands.ts';
import {readFilters,filterSearch} from '../lib/domain/filters.ts';
import {selectListing,countrySourceUrls} from '../lib/domain/listing.ts';
import {countryName,regionName,originalRegionName,translator} from '../lib/i18n/index.ts';
const read=(p:string)=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const previous=read('../data/exports/2026-10-03-france-iso/policy-radar-export.json');
const candidate=read('../data/exports/2026-10-04-netherlands/policy-radar-export.json');
const data=createStaticData(candidate),nl=data.policies.filter(p=>p.region.startsWith('NL'));

test('Dutch provinces use ISO identities and round-trip without colliding with France',()=>{
 assert.deepEqual(new Set(dutchProvinces.map(p=>p.id)),new Set(['NL-DR','NL-FL','NL-FR','NL-GE','NL-GR','NL-LI','NL-NB','NL-NH','NL-OV','NL-UT','NL-ZE','NL-ZH']));
 for(const region of ['NL',...dutchProvinces.map(p=>p.id)])for(const locale of ['zh','de','en'] as const){
  const f=readFilters('?region='+region);assert.equal(f.country,'NL');assert.equal(f.region,region);
  assert.deepEqual(readFilters(filterSearch('?lang='+locale,f)),f);
  assert.notEqual(regionName(region,locale),region);assert.equal(originalRegionName(region).language,'nl');
 }
 assert.equal(readFilters('?country=FR&region=NL-FR').country,'NL');
 assert.equal(readFilters('?country=NL&region=FR-ARA').country,'FR');
 assert.equal(countryName('NL','zh'),'荷兰');assert.equal(readFilters('').country,'DE');
 for(const locale of ['zh','de','en'] as const)assert(!translator(locale)('追踪范围：荷兰全国层面及欧洲部分全部12个省。').includes('Bund'));
});
test('Netherlands connects all provinces but does not assert full scan coverage',()=>{
 assert.equal(nl.length,14);assert.equal(nl.filter(p=>p.region==='NL').length,2);
 for(const p of dutchProvinces){assert(nl.some(row=>row.region===p.id));assert(dutchDiscovery.some(d=>d.region===p.id&&d.kind==='government'));assert(dutchDiscovery.some(d=>d.region===p.id&&d.kind==='parliament'));}
 const coverage=data.intake.coverage.filter(c=>c.region.startsWith('NL'));
 assert.equal(coverage.length,38);assert(coverage.every(c=>c.coveredThrough===null));
 assert.equal(coverage.filter(c=>c.latestScan?.status==='partial').length,37);
 assert.equal(coverage.filter(c=>c.latestScan?.status==='blocked').length,1);
 const blocked=data.status.checks.find(c=>c.url==='https://stateninformatie.flevoland.nl/');assert(blocked?.error);assert.equal(blocked?.snapshot_key,null);
 const listing=selectListing(data.policies,data.intake.records,readFilters('?country=NL'));
 assert.equal(listing.count,13);assert.equal(listing.raw.length,0);
 assert.equal(selectListing(data.policies,data.intake.records,readFilters('?country=NL&view=intake')).count,6);assert(listing.policies.every(p=>p.region.startsWith('NL')&&p.phase==='adopted'));
 const pending=selectListing(data.policies,data.intake.records,readFilters('?country=NL&view=pending'));
 assert.equal(pending.count,1);assert.equal(pending.policies[0].region,'NL-NB');
 const urls=countrySourceUrls('NL',data.policies,data.intake.records,data.status.discovery);
 for(const p of data.policies.filter(p=>!p.region.startsWith('NL')))for(const s of p.sources)assert(!urls.has(s.url));
});
test('Dutch baseline preserves German and French history and review markers',()=>{
 validateUpdate(previous,candidate,new Date(candidate.exportedAt));
 assert.deepEqual(candidate.tables.policies.filter((p:{region:string})=>!p.region.startsWith('NL')),previous.tables.policies);
 assert.deepEqual(candidate.tables.revisions.slice(0,previous.tables.revisions.length),previous.tables.revisions);
 assert.deepEqual(candidate.tables.intake.slice(0,previous.tables.intake.length),previous.tables.intake);
 assert.equal(data.intake.records.filter(r=>r.region.startsWith('NL')).length,6);
 for(const country of ['DE','FR'])for(const key of ['lastReviewAt','reviewNote'])assert.equal(data.status.settings[key+':'+country],createStaticData(previous).status.settings[key+':'+country]);
 assert(data.status.settings['lastReviewAt:NL']);
 const localized=createLocalization(data,read('../data/translations/content.json'),read('../data/translations/bindings.json'));
 for(const p of nl){assert.equal(localized.policies[p.id],'current');assert.equal(p.originalLanguage,'nl');for(const s of p.sources)assert(data.status.checks.some(c=>c.url===s.url&&c.snapshot_key&&!c.error));}
});
test('Dutch policy facts distinguish future, exhausted and closed application windows',()=>{
 const by=(id:string)=>nl.find(p=>p.id.endsWith(id))!;
 const wage=by('minimum-wage');assert.equal(wage.effectiveDate,'2026-07-01');assert(wage.summary.includes('14.99'));assert(wage.before.includes('14.71'));
 const rent=by('social-rent-cap');assert(rent.summary.includes('4.1%'));assert(rent.limits.includes('25'));assert(rent.limits.includes('积分'));
 const ov=by('canal-community');assert.equal(ov.effectiveDate,null);assert.equal(ov.nextDate,'2026-10-05');assert(ov.events.some(e=>e.date==='2026-10-05'&&e.kind==='scheduled'));
 for(const suffix of ['home-battery','mobility-grants','solar-parking']){const p=by(suffix);assert.equal(p.status,'本轮申请已结束');assert.equal(p.nextDate,null);}
 const nb=by('budget-2027');assert.equal(nb.phase,'pending');assert.equal(nb.effectiveDate,null);assert.equal(nb.nextDate,'2026-11-06');
 const ze=by('heritage-2027');assert.equal(ze.nextDate,'2026-11-02');assert(ze.events.some(e=>e.date==='2027-02-02'&&e.kind==='scheduled'));assert.equal(ze.effectiveDate,null);
 const ge=by('livestock-modernisation');assert(ge.limits.includes('2030年1月1日'));assert.equal(ge.nextDate,'2027-12-31');
});

test('Friesland annual publications advance without losing previous scan history',()=>{
 const entry=discoveryForYear(2027).find(d=>d.region==='NL-FR'&&d.kind==='law')!;
 assert.equal(entry.url,'https://www.fryslan.frl/bekendmakingen-2027');
 const scans=candidate.tables.scan_runs.map((r:{data:string})=>JSON.parse(r.data));
 const coverage=coverageRows(scans,2027).find(c=>c.url===entry.url)!;
 assert.equal(coverage.latestScan?.sourceUrl,'https://www.fryslan.frl/bekendmakingen-2026');
 assert.equal(coverage.coveredThrough,null);
});
