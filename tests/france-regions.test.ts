import {readSnapshot} from '../lib/source-archive.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {regions,countryOf,lifecycle} from '../lib/domain/model.ts';
import {discovery} from '../lib/domain/coverage.ts';
import {createStaticData} from '../lib/static-data.ts';
import {validateUpdate} from '../lib/update-data.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {readFilters,filterSearch} from '../lib/domain/filters.ts';
import {selectListing,countrySourceUrls} from '../lib/domain/listing.ts';
import {regionName} from '../lib/i18n/index.ts';
const read=(p:string)=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const previous=read('../data/exports/2026-10-03-france/policy-radar-export.json');
const candidate=read('../data/exports/2026-10-03-france-regions/policy-radar-export.json');
const data=createStaticData(candidate),fr=regions.filter(r=>countryOf(r.id)==='FR');

test('France has 18 geographical areas with three channels and a record per area',()=>{
 assert.deepEqual(fr.filter(r=>r.id!=='FR').map(r=>r.id).sort(),['ARA','BFC','BRE','CVL','20R','GES','HDF','IDF','NOR','NAQ','OCC','PDL','PAC','971','972','973','974','976'].map(c=>'FR-'+c).sort());
 assert.equal(discovery.filter(d=>countryOf(d.region)==='FR').length,59);
 assert.equal(new Set(discovery.map(d=>d.url)).size,discovery.length);
 for(const r of fr.filter(r=>r.id!=='FR')){
  const sources=discovery.filter(d=>d.region===r.id);assert.equal(sources.length,3);
  assert(sources.some(s=>'kind' in s&&s.kind==='law'));assert(sources.some(s=>s.url.includes('.gouv.fr/')));
  assert([...data.policies,...data.intake.records].some(p=>p.region===r.id));
  for(const locale of ['zh','en'] as const){
   assert.notEqual(regionName(r.id,locale),r.id);
   const f=readFilters('?region='+r.id);assert.equal(f.country,'FR');assert.equal(f.region,r.id);
   assert.deepEqual(readFilters(filterSearch('?lang='+locale,f)),f);
  }
 }
});
test('French policy and source views isolate countries and retain uncertain discoveries',()=>{
 const f=readFilters('?country=FR');
 assert.equal(selectListing(data.policies,data.intake.records,f).count,12);
 assert.equal(selectListing(data.policies,data.intake.records,{...f,view:'pending'}).count,2);
 assert.equal(selectListing(data.policies,data.intake.records,{...f,view:'all'}).count,21);
 assert.equal(selectListing(data.policies,data.intake.records,{...f,view:'intake'}).count,7);
 const urls=countrySourceUrls('FR',data.policies,data.intake.records,data.status.discovery);
 for(const r of fr)for(const s of discovery.filter(d=>d.region===r.id))assert(urls.has(s.url));
 for(const p of data.policies.filter(p=>countryOf(p.region)==='DE'))for(const s of p.sources)assert(!urls.has(s.url));
 const regional=data.intake.coverage.filter(c=>c.region.startsWith('FR-'));
 assert.equal(regional.length,54);
 for(const c of regional){assert.equal(c.coveredThrough,null);assert(c.latestScan);assert.notEqual(c.latestScan.status,'complete');}
 for(const r of data.intake.records.filter(r=>r.region.startsWith('FR-'))){assert.equal(r.stage,'unverified');assert.equal(r.effectiveDate,null);}
});
test('regional evidence and translations pass the same gates without rewriting history',()=>{
 validateUpdate(previous,candidate,new Date(candidate.exportedAt));
 for(const table of ['policies','revisions','intake','scan_runs','snapshots'])for(const row of previous.tables[table])assert(candidate.tables[table].some((r:unknown)=>JSON.stringify(r)===JSON.stringify(row)));
 const old=createStaticData(previous);assert.equal(data.status.settings['lastReviewAt:DE'],old.status.settings['lastReviewAt:DE']);
 assert(data.status.settings['lastReviewAt:FR']);
 const l=createLocalization(data,read('../data/translations/content.json'),read('../data/translations/bindings.json'));
 for(const p of data.policies.filter(p=>countryOf(p.region)==='FR'))assert.equal(l.policies[p.id],'current');
 for(const r of data.intake.records.filter(r=>countryOf(r.region)==='FR'))assert.equal(l.intake[r.id],'current');
 const snapshotKeys=new Set(previous.tables.snapshots.map((s:{key:string})=>s.key));
 for(const s of candidate.tables.snapshots.filter((s:{key:string})=>!snapshotKeys.has(s.key))){
  const bytes=readSnapshot('data/exports/2026-10-03-france-regions/policy-radar-export.json',s);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),s.hash);
 }
 const challenge=data.status.checks.find(c=>c.url==='https://www.auvergnerhonealpes.fr/');
 assert(challenge?.error);assert.equal(challenge.snapshot_key,null);
});
test('application windows, legal effect and scheduled outcomes remain distinct',()=>{
 const get=(id:string)=>data.policies.find(p=>p.id===id)!;
 assert.equal(get('fr-27-mobility-levy').effectiveDate,'2026-01-01');
 assert.equal(get('fr-11-daeu-grant').effectiveDate,null);
 assert.equal(get('fr-11-daeu-grant').nextDate,'2026-10-20');
 assert(get('fr-11-daeu-grant').events.some(e=>e.date==='2027-02-22'&&e.kind==='scheduled'));
 assert.equal(get('fr-75-homework-support').nextDate,null); // Only May, not an invented exact day.
 assert.equal(get('fr-76-disaster-aid').effectiveDate,null); // Decision is not payment/commencement.
 assert.equal(get('fr-32-carpool-strategy').phase,'pending');
 const mayotte=get('fr-06-port-tariff');assert.equal(mayotte.phase,'pending');assert.equal(mayotte.effectiveDate,null);
 assert.match(lifecycle(mayotte,'2026-10-03'),/结果待核实/);
});
