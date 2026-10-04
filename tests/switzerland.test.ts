import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createStaticData} from '../lib/static-data.ts';
import {validateUpdate} from '../lib/update-data.ts';
import {swissCantons,swissDiscovery} from '../lib/domain/switzerland.ts';
import {readFilters,filterSearch} from '../lib/domain/filters.ts';
import {selectListing,countrySourceUrls} from '../lib/domain/listing.ts';
import {regionName,countryName,originalRegionName,translator} from '../lib/i18n/index.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {localizePolicy,searchText} from '../lib/i18n/content.ts';
const read=(p:string)=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const previous=read('../data/exports/2026-10-04-netherlands-review/policy-radar-export.json');
const baseline=read('../data/exports/2026-10-04-switzerland/policy-radar-export.json');
const candidate=read('../data/exports/2026-10-04-switzerland-review/policy-radar-export.json');
const data=createStaticData(candidate),ch=data.policies.filter(p=>p.region.startsWith('CH'));
const localization=createLocalization(data,read('../data/translations/content.json'),read('../data/translations/bindings.json'));

test('Swiss canton URLs preserve ISO identities across France, Netherlands and Germany',()=>{
 assert.deepEqual(swissCantons.map(r=>r.id).sort(),['ZH','BE','LU','UR','SZ','OW','NW','GL','ZG','FR','SO','BS','BL','SH','AR','AI','SG','GR','AG','TG','TI','VD','VS','NE','GE','JU'].map(c=>'CH-'+c).sort());
 for(const id of ['CH',...swissCantons.map(r=>r.id)])for(const locale of ['zh','de','en'] as const){
  const f=readFilters('?region='+id);assert.equal(f.country,'CH');assert.equal(f.region,id);assert.deepEqual(readFilters(filterSearch('?lang='+locale,f)),f);assert.notEqual(regionName(id,locale),id);
 }
 for(const id of ['CH-FR','NL-FR','FR','CH-GR','NL-GR','CH-GE','NL-GE','CH-ZH','NL-ZH','CH-BE','DE-BE','CH-NW','DE-NW','CH-SH','DE-SH'])assert.equal(readFilters('?region='+id).region,id);
 assert.equal(readFilters('?country=FR&region=CH-FR').country,'CH');assert.equal(readFilters('').country,'DE');assert.equal(countryName('CH','en'),'Switzerland');
});
test('Every canton has a researched measure and three distinct official entry points',()=>{
 assert.equal(ch.length,28);assert.equal(ch.filter(p=>p.region==='CH').length,2);assert.equal(swissDiscovery.length,82);assert.equal(new Set(swissDiscovery.map(s=>s.url)).size,82);
 for(const region of swissCantons){assert(ch.some(p=>p.region===region.id));assert.deepEqual(swissDiscovery.filter(s=>s.region===region.id).map(s=>s.kind).sort(),['government','law','parliament']);}
 const coverage=data.intake.coverage.filter(c=>c.region.startsWith('CH'));assert.equal(coverage.length,82);assert(coverage.every(c=>c.coveredThrough===null&&c.latestScan?.status!=='complete'));
 assert(coverage.some(c=>c.latestScan?.status==='blocked'));assert(coverage.some(c=>c.latestScan?.status==='partial'));
 for(const c of coverage){assert.deepEqual(c.latestScan?.recordIds,[]);assert.equal(c.latestScan?.allPagesChecked,false);if(c.latestScan?.status==='blocked')assert(data.status.checks.find(s=>s.url===c.url)?.error);}
 const f=readFilters('?country=CH');const listing=selectListing(data.policies,data.intake.records,f);assert(listing.policies.every(p=>p.region.startsWith('CH')&&p.phase==='adopted'));assert.equal(listing.count,23);
 assert.equal(selectListing(data.policies,data.intake.records,{...f,view:'pending'}).count,5);assert.equal(selectListing(data.policies,data.intake.records,{...f,view:'intake'}).count,8);
 const urls=countrySourceUrls('CH',data.policies,data.intake.records,data.status.discovery);for(const p of data.policies.filter(p=>!p.region.startsWith('CH')))for(const s of p.sources)assert(!urls.has(s.url));
});
test('Swiss baseline preserves old records, reviews and original evidence bytes',()=>{
 validateUpdate(baseline,candidate,new Date(candidate.exportedAt));
 assert.deepEqual(candidate.tables.policies.filter((p:{region:string})=>!p.region.startsWith('CH')),previous.tables.policies);
 for(const table of ['revisions','intake','scan_runs','snapshots'])assert.deepEqual(candidate.tables[table].slice(0,previous.tables[table].length),previous.tables[table]);
 for(const c of ['DE','FR','NL'])for(const key of ['lastReviewAt','reviewNote'])assert.equal(data.status.settings[key+':'+c],createStaticData(previous).status.settings[key+':'+c]);
 assert(data.status.settings['lastReviewAt:CH']);
 for(const p of ch)for(const s of p.sources){const check=data.status.checks.find(c=>c.url===s.url)!;assert(check&&!check.error&&check.snapshot_key);const snapshot=candidate.tables.snapshots.find((v:{key:string})=>v.key===check.snapshot_key);const bytes=readFileSync(new URL('../data/exports/2026-10-04-switzerland-review/'+snapshot.key,import.meta.url));assert.equal(createHash('sha256').update(bytes).digest('hex'),snapshot.hash);}
});
test('Swiss originals remain source-specific while all three explanations are current',()=>{
 assert(translator('de')('追踪范围：瑞士联邦及全部26个州。').includes('Kantone'));assert(translator('en')('追踪范围：瑞士联邦及全部26个州。').includes('cantons'));
 assert.equal(originalRegionName('CH-TI').language,'it');assert.equal(originalRegionName('CH-VD').language,'fr');assert.equal(originalRegionName('CH-ZH').language,'de');assert.equal(originalRegionName('CH-GR').language,'und');
 for(const p of ch){assert.equal(localization.policies[p.id],'current');for(const lang of ['de','en'] as const){const translated=localizePolicy(p,lang,localization);assert.equal(translated.originalTitle,p.originalTitle);assert.equal(translated.effectiveDate,p.effectiveDate);assert.notEqual(translated.title,p.title);}}
 for(const p of data.intake.records.filter(r=>r.region.startsWith('CH'))){assert.equal(localization.intake[p.id],'current');assert.equal(localization.originalIntakeTitles[p.id],true);}
 const ticino=ch.find(p=>p.region==='CH-TI')!;assert.equal(ticino.originalLanguage,'it');assert(searchText(ticino,localization).includes('salario minimo'));assert.equal(ch.find(p=>p.region==='CH-FR')?.originalLanguage,'fr');
});
test('Swiss facts distinguish adoption, consultation, payment months and deferred provisions',()=>{
 const by=(id:string)=>ch.find(p=>p.id==='ch-'+id)!;
 const ahv=by('thirteenth-ahv');assert.equal(ahv.effectiveDate,null);assert.equal(ahv.nextDate,null);assert(ahv.summary.includes('2026年12月'));assert.equal(ahv.events[0].kind,'adopted');
 const be=by('be-information-security');assert.equal(be.effectiveDate,'2026-11-01');assert(be.events.some(e=>e.kind==='scheduled'&&e.date==='2026-11-01'));
 for(const [id,end] of [['bl-digital-building-consultation','2026-11-30'],['ar-justice-consultation','2026-11-06']]){const p=by(id);assert.equal(p.phase,'pending');assert.equal(p.effectiveDate,null);assert.equal(p.nextDate,end);}
 assert.equal(by('ai-cycle-path-bill-returned').phase,'pending');assert.equal(by('sz-premium-subsidy-reform').effectiveDate,null);assert.equal(by('sg-health-bill').effectiveDate,null);
 assert.equal(by('vd-energy-law').phase,'adopted');assert.equal(by('vd-energy-law').effectiveDate,null);
 assert(by('ju-planning-building-law').summary.includes('第4条第2款'));assert(by('ju-planning-building-law').limits.includes('暂')||by('ju-planning-building-law').limits.includes('推迟'));
 assert(by('ti-minimum-wage-2026').before.includes('未上调'));assert(by('ge-minimum-wage-2026').limits.includes('18.07'));assert(by('lu-premium-subsidy-2026').limits.includes('2025年12月1日'));
 assert.equal(by('ur-energy-law').effectiveDate,'2026-10-01');assert.equal(by('nw-public-documents').effectiveDate,'2026-08-01');assert(by('gr-demolition-premium').limits.includes('不补偿'));
});
