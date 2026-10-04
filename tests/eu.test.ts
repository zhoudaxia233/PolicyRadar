import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {countries,regions,countryOf,policySchema,lifecycle,keyDate,effectiveDateLabel} from '../lib/domain/model.ts';
import {readFilters,filterSearch} from '../lib/domain/filters.ts';
import {selectListing,countrySourceUrls} from '../lib/domain/listing.ts';
import {countryName,regionName,translator} from '../lib/i18n/index.ts';
import {createStaticData} from '../lib/static-data.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {localizePolicy,policyTextFields,searchText,contentText} from '../lib/i18n/content.ts';
import {validateSelection} from '../lib/update-data.ts';
import {exportRegistry} from '../lib/export-registry.ts';
import {readSnapshot} from '../lib/source-archive.ts';
const read=(p:string)=>JSON.parse(readFileSync(p,'utf8'));
const initial=read('data/exports/2026-10-04-eu-130806/policy-radar-export.json');
const path='data/exports/2026-10-04-eu-date-review-131101/policy-radar-export.json';
const before=read('data/exports/2026-10-04-italy-evidence-review-124438/policy-radar-export.json');
const after=read(path),data=createStaticData(after),old=createStaticData(before);
const localization=createLocalization(data,read('data/translations/content.json'),read('data/translations/bindings.json'));
const policies=data.policies.filter(p=>p.region==='EU');

test('EU is a supranational jurisdiction and round-trips without changing the default country',()=>{
 assert.equal(countryName('EU','zh'),'欧盟');assert.equal(countryName('EU','de'),'Europäische Union');assert.equal(countryName('EU','en'),'European Union');
 assert.equal(countryOf('EU'),'EU');assert.equal(readFilters('').country,'DE');
 assert.deepEqual(regions.filter(r=>countryOf(r.id)==='EU').map(r=>r.id),['EU']);
 for(const query of ['?country=EU','?country=DE&region=EU'])for(const locale of ['zh','de','en'] as const){
  const f=readFilters(query);assert.equal(f.country,'EU');
  assert.deepEqual(readFilters(filterSearch('?lang='+locale,f)),f);
  assert.notEqual(regionName('EU',locale),'EU');
 }
 assert(!policySchema.safeParse({...policies[0],region:'EU-DE'}).success);
 const eu=countries.find(c=>c.id==='EU')!;
 for(const locale of ['de','en'] as const)for(const text of [eu.scope,eu.note,'国家／地区'] as const)assert(!/[\u3400-\u9fff]/u.test(translator(locale)(text)));
});

test('EU intake preserves every historical row and other countries review settings',()=>{
 validateSelection(before,initial,new Date(initial.exportedAt));
 validateSelection(initial,after,new Date(after.exportedAt));
 assert.equal(policies.length,3);
 assert.deepEqual(after.tables.policies.filter((r:{region:string})=>r.region!=='EU'),before.tables.policies);
 for(const table of ['revisions','intake','scan_runs','snapshots','checks'])assert.deepEqual(after.tables[table].slice(0,before.tables[table].length),before.tables[table],table);
 for(const row of before.tables.settings)assert.deepEqual(after.tables.settings.find((r:{key:string})=>r.key===row.key),row);
 assert.deepEqual(after.discoveryRegistry.filter((r:{region:string})=>r.region!=='EU'),exportRegistry(before));
 const coverage=data.intake.coverage.filter(r=>r.region==='EU');assert.equal(coverage.length,4);
 assert(coverage.every(r=>r.coveredThrough===null&&r.latestScan===null&&r.nextUncovered==='2026-10-02'));
 assert(data.status.settings['reviewNote:EU'].includes('未逐国核查'));
});

test('EU records and sources stay separate from national measures and counts',()=>{
 const f=readFilters('?country=EU');const list=selectListing(data.policies,data.intake.records,f);
 assert.equal(list.count,3);assert.equal(list.raw.length,0);
 assert.equal(selectListing(data.policies,data.intake.records,{...f,view:'pending'}).count,0);
 for(const country of ['DE','FR','NL','IT','CH']){
  const filters=readFilters('?country='+country);
  assert.deepEqual(selectListing(data.policies,data.intake.records,filters),selectListing(old.policies,old.intake.records,filters));
  const urls=countrySourceUrls(country,data.policies,data.intake.records,data.status.discovery);
  for(const p of policies)for(const s of p.sources)assert(!urls.has(s.url));
 }
 const urls=countrySourceUrls('EU',data.policies,data.intake.records,data.status.discovery);
 for(const p of policies)for(const s of p.sources)assert(urls.has(s.url));
});

test('EU multilingual search and counts use complete version-bound translations',()=>{
 const index=new Map(policies.map(p=>[p.id,searchText(p,localization)]));
 for(const p of policies){
  assert.equal(data.policyVersions[p.id],p.id==='eu-common-charger-2022'?2:1);assert.equal(localization.policies[p.id],'current');
  for(const locale of ['de','en'] as const){
   const translated=localizePolicy(p,locale,localization);
   assert(policyTextFields(translated).every(s=>!/[\u3400-\u9fff]/u.test(s)),p.id);
   for(const k of ['officialId','originalTitle','effectiveDate','nextDate','region'] as const)assert.equal(translated[k],p[k]);
  }
 }
 for(const query of ['即时转账','Echtzeitüberweisungen','instant euro'])assert.equal(selectListing(data.policies,data.intake.records,{...readFilters('?country=EU'),query},p=>index.get(p.id)??'').count,1);
 for(const source of data.status.discovery.filter(d=>d.region==='EU'))assert(localization.messages[source.title]);
 assert(localization.messages[data.status.settings['reviewNote:EU']]);
});

test('EU explanations retain legal instrument, application dates, exceptions and incomplete transposition',()=>{
 const instant=policies.find(p=>p.id==='eu-instant-euro-payments-2024')!,charger=policies.find(p=>p.id==='eu-common-charger-2022')!;
 assert.equal(instant.effectiveDate,'2024-04-08');assert.equal(instant.nextDate,'2027-01-09');assert.equal(instant.nextKind,'implementation');
 assert.equal(lifecycle(instant,'2026-10-04'),'已生效 · 分步实施');
 for(const term of ['2027-04-09','2027-07-09','2028-06-09','电子货币'])assert(instant.limits.includes(term));
 assert(instant.impact.includes('不代表所有转账一律免费'));
 assert(charger.officialId.startsWith('Directive'));assert(charger.statusNote?.includes('未逐国核查'));
 assert.equal(charger.effectiveDate,'2024-12-28');assert(charger.dateExplanation?.includes('不是指令本身的生效日'));
 assert(charger.events.some(e=>e.date==='2026-04-28'&&e.kind==='effective'));
 assert(charger.limits.includes('有线充电'));assert(charger.limits.includes('并不等于扩围已通过'));
});

test('EU sources are real archived official explanations; failed legal downloads are not evidence',()=>{
 const originals:Record<string,string>={};
 for(const p of policies)for(const s of p.sources){
  assert.equal(s.kind,'government');assert(s.note.includes('不是法律原文'));
  const check=after.tables.checks.find((c:{url:string})=>c.url===s.url);assert.equal(check.error,null);
  const snapshot=after.tables.snapshots.find((s:{key:string})=>s.key===check.snapshot_key);
  const bytes=readSnapshot(path,snapshot);assert(bytes.length>10000);assert.equal(snapshot.url,s.url);
  originals[s.id]=bytes.toString('utf8').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ');
 }
 assert.match(originals['roaming-extension'],/2032/);
 assert.match(originals.instant,/9 January 2027/);assert.match(originals.instant,/9 April 2027/);
 assert.match(originals.charger,/28.{0,20}April.{0,20}2026/);
 const failures=after.tables.checks.filter((c:{url:string;error:string|null})=>c.url.startsWith('https://eur-lex.europa.eu/')&&c.error);
 assert.equal(failures.length,3);assert(failures.every((c:{snapshot_key:string|null})=>c.snapshot_key===null));
});


test('application dates stay distinct in badges, cards and translated details without altering legacy commencement',()=>{
 const charger=policies.find(p=>p.id==='eu-common-charger-2022')!;
 assert.equal(charger.effectiveDateKind,'application');
 assert.equal(lifecycle(charger,'2024-12-27'),'已通过 · 待适用');
 assert.equal(lifecycle(charger,'2026-10-04'),'已适用');
 assert.equal(keyDate(charger,'2026-10-04').kind,'application');
 assert.equal(effectiveDateLabel(charger),'本次要求开始适用');
 assert.equal(lifecycle({...charger,effectiveDateKind:undefined},'2026-10-04'),'已生效');
 assert(!policySchema.safeParse({...charger,effectiveDate:null}).success);
 const prior=JSON.parse(initial.tables.policies.find((p:{id:string})=>p.id===charger.id).data);
 for(const e of prior.events)assert.deepEqual(charger.events.find(x=>x.id===e.id),e);
 assert(charger.events.some(e=>e.kind==='correction'));
 for(const locale of ['de','en'] as const){
  const translated=localizePolicy(charger,locale,localization);
  assert.equal(translated.effectiveDateKind,'application');assert.equal(lifecycle(translated,'2026-10-04'),'已适用');
  assert(!/[\u3400-\u9fff]/u.test(contentText(effectiveDateLabel(translated),locale,localization.messages)));
  for(const label of [lifecycle(translated,'2026-10-04'),'本次要求开始适用：'] as const)assert(!/[\u3400-\u9fff]/u.test(translator(locale)(label)));
 }
});
