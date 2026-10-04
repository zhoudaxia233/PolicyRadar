import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {italianRegions,italianDiscovery} from '../lib/domain/italy.ts';
import {countries} from '../lib/domain/countries.ts';
import {readFilters,filterSearch} from '../lib/domain/filters.ts';
import {countryName,regionName,originalRegionName,translator} from '../lib/i18n/index.ts';
import {exportRegistry} from '../lib/export-registry.ts';
import {createStaticData} from '../lib/static-data.ts';
import {validateSelection} from '../lib/update-data.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {localizePolicy,policyTextFields} from '../lib/i18n/content.ts';
import {selectListing,countrySourceUrls} from '../lib/domain/listing.ts';
import {lifecycle} from '../lib/domain/model.ts';
import {readSnapshot} from '../lib/source-archive.ts';
import {sourceSupportsRegion} from '../lib/domain/coverage.ts';
const read=(p:string)=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const before=read('../data/exports/2026-10-04-weekly-translated/policy-radar-export.json');
const initial=read('../data/exports/2026-10-04-italy-121129/policy-radar-export.json');
const reviewedPath='data/exports/2026-10-04-italy-review-122041/policy-radar-export.json';
const after=read('../'+reviewedPath);
const data=createStaticData(after);

test('Italy and all 20 ISO regions round-trip across languages',()=>{
 assert.deepEqual(italianRegions.map(r=>r.id),['21','23','25','32','34','36','42','45','52','55','57','62','65','67','72','75','77','78','82','88'].map(id=>'IT-'+id));
 assert.equal(countryName('IT','zh'),'意大利');assert.equal(countryName('IT','de'),'Italien');assert.equal(countryName('IT','en'),'Italy');
 assert.equal(readFilters('?country=IT').country,'IT');assert.equal(readFilters('').country,'DE');
 for(const id of ['IT',...italianRegions.map(r=>r.id)])for(const locale of ['zh','de','en'] as const){
  const filters=readFilters('?country=DE&region='+id);assert.equal(filters.country,'IT');assert.equal(filters.region,id);
  assert.deepEqual(readFilters(filterSearch('?lang='+locale,filters)),filters);assert.notEqual(regionName(id,locale),id);
 }
 assert.equal(originalRegionName('IT').language,'it');assert.equal(originalRegionName('IT-62').language,'it');
 for(const id of ['IT-23','IT-32'])assert.equal(originalRegionName(id).language,'und');
 const it=countries.find(c=>c.id==='IT')!;
 for(const locale of ['de','en'] as const)for(const text of [it.scope,it.note])assert(!/[\u3400-\u9fff]/u.test(translator(locale)(text)));
});

test('Italian registration preserves explicit gaps and shared-channel boundaries',()=>{
 assert.equal(italianDiscovery.length,27);assert.equal(new Set(italianDiscovery.map(r=>r.url)).size,27);
 for(const r of italianRegions)assert(italianDiscovery.some(s=>s.region===r.id&&s.kind==='government'));
 assert.deepEqual(after.discoveryRegistry.filter((r:{region:string})=>!r.region.startsWith('IT')),exportRegistry(before));
 const coverage=data.intake.coverage.filter(c=>c.region.startsWith('IT'));
 assert.equal(coverage.length,27);assert(coverage.every(c=>c.coveredThrough===null&&c.latestScan===null));
 const shared=italianDiscovery.find(s=>s.url.endsWith('/30giorni/regioni'))!;
 for(const r of italianRegions)assert(sourceSupportsRegion(shared,r.id));
 for(const id of ['IT','IT-TN','IT-BZ','DE','FR'])assert(!sourceSupportsRegion(shared,id));
});

test('Italy selection preserves history and isolates sources and counts',()=>{
 validateSelection(before,initial,new Date(initial.exportedAt));
 validateSelection(initial,after,new Date(after.exportedAt));
 assert.deepEqual(after.tables.policies.filter((r:{region:string})=>r.region!=='IT'),before.tables.policies);
 for(const row of before.tables.settings)assert.deepEqual(after.tables.settings.find((r:{key:string})=>r.key===row.key),row);
 const list=selectListing(data.policies,data.intake.records,readFilters('?country=IT'));
 assert.equal(list.count,1);assert.deepEqual(list.policies.map(p=>p.id),['it-parental-leave-age-2026']);
 assert.equal(selectListing(data.policies,data.intake.records,readFilters('?region=IT-62')).count,0);
 const urls=countrySourceUrls('IT',data.policies,data.intake.records,data.status.discovery);
 for(const d of data.status.discovery.filter(d=>!d.region.startsWith('IT')))assert(!urls.has(d.url));
});

test('Initial Italian explanation has complete translations and preserves factual limits',()=>{
 const l=createLocalization(data,read('../data/translations/content.json'),read('../data/translations/bindings.json'));
 const p=data.policies.find(p=>p.id==='it-parental-leave-age-2026')!;
 assert.equal(l.policies[p.id],'current');assert.equal(p.effectiveDate,'2026-01-01');assert.equal(p.nextDate,null);assert.equal(p.originalLanguage,'it');
 assert(p.before.includes('12'));assert(p.after.includes('14'));assert(p.limits.includes('仅限雇员'));assert(p.limits.includes('成年'));
 for(const locale of ['de','en'] as const){const translated=localizePolicy(p,locale,l);assert(policyTextFields(translated).every(s=>!/[\u3400-\u9fff]/u.test(s)));assert.equal(translated.originalTitle,p.originalTitle);}
 assert(l.messages[data.status.settings['reviewNote:IT']]);
 for(const entry of italianDiscovery)assert(l.messages[entry.title]);
});


test('Italian review corrects status and adds directly archived legal evidence without rewriting history',()=>{
 const p=data.policies.find(p=>p.id==='it-parental-leave-age-2026')!;
 const old=JSON.parse(initial.tables.policies.find((r:{id:string})=>r.id===p.id).data);
 assert.equal(p.status,'adopted');
 assert.equal(lifecycle({...p,effectiveDate:null},'2026-10-04'),'已通过 · 生效日未确认');
 assert.equal(p.officialId,old.officialId);assert.equal(data.policyVersions[p.id],2);
 for(const event of old.events)assert.deepEqual(p.events.find(e=>e.id===event.id),event);
 const notice=p.events.find(e=>e.id==='it-parental-leave-inps-notice')!;
 assert.equal(notice.date,'2026-01-26');assert.equal(notice.kind,'published');assert.equal(notice.sourceId,'inps');
 assert(p.events.some(e=>e.kind==='correction'&&e.sourceId==='gazette-article'));
 assert.deepEqual(after.tables.scan_runs,initial.tables.scan_runs);
 const sourceText=(id:string)=>{
  const source=p.sources.find(s=>s.id===id)!;
  const check=after.tables.checks.find((c:{url:string})=>c.url===source.url);
  assert.equal(check.error,null);
  const snapshot=after.tables.snapshots.find((s:{key:string})=>s.key===check.snapshot_key);
  assert.equal(snapshot.url,source.url);
  return readSnapshot(reviewedPath,snapshot).toString('utf8').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
 };
 assert.match(sourceText('gazette-law'),/LEGGE 30 dicembre 2025, n\. 199/);
 const article=sourceText('gazette-article');
 assert.match(article,/219\. Al fine favorire/);
 assert.match(article,/all'articolo 32.*?dodici.*?quattordici/);
 assert.match(sourceText('inps'),/messaggio 26 gennaio 2026, n\. 251/);
});
