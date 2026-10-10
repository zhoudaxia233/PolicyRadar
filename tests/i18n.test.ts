import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolveLocale,localeSearch,formatDate,formatTimestamp,translator} from '../lib/i18n/index.ts';
import {messages} from '../lib/i18n/messages.ts';
import {contentText,localizePolicy,localizeIntake,searchText,policyTextFields} from '../lib/i18n/content.ts';
import {createLocalization,contentHash} from '../lib/i18n/build.ts';
import {createStaticData} from '../lib/static-data.ts';
import {readFilters,filterSearch} from '../lib/domain/filters.ts';
import {selectListing} from '../lib/domain/listing.ts';
import {lifecycle,keyDate} from '../lib/domain/model.ts';
const read=(p:string)=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
// A fixed translation fixture; future data can publish with explicit missing/stale labels.
const data=createStaticData(read('../data/exports/2026-10-03/policy-radar-export.json'));
const catalog=read('../data/translations/content.json'),bindings=read('./fixtures/i18n-bindings.json');
const l=createLocalization(data,catalog,bindings);

test('language priority is URL, saved choice, supported browser preference, then English',()=>{
 assert.equal(resolveLocale('?lang=zh','en',['en-US']),'zh');
 assert.equal(resolveLocale('?lang=xx','en',['zh-CN']),'en');
 assert.equal(resolveLocale('',null,['fr-FR','zh-CN','en-US']),'zh');
 assert.equal(resolveLocale('',null,['fr']),'en');
 assert.equal(resolveLocale('?lang=EN-us'),'en');
 assert.equal(resolveLocale(''),'en');
 assert.equal(resolveLocale('',null,[]),'en');
 assert.equal(resolveLocale('',null,['zh-TW']),'zh');
// German is no longer an interface language: old links and saved choices fall back cleanly.
 assert.equal(resolveLocale('?lang=de','de',['de-DE']),'en');
 assert.equal(resolveLocale('?lang=de','de',['de-DE','zh-CN']),'zh');
 assert.equal(resolveLocale('?country=DE',null,['en']),'en');
});
test('language and filter URLs preserve detail, query and tag identities across switches',()=>{
 const initial='?lang=zh&view=all&policy=he-rent-protection-2025&q=Miete&tag=租房&region=DE-HE';
 const next=localeSearch(initial,'en');assert.deepEqual(readFilters(next),readFilters(initial));
 const filtered=filterSearch(next,{...readFilters(next),query:'rent'});
 assert.equal(new URLSearchParams(filtered).get('lang'),'en');
 assert.equal(new URLSearchParams(filtered).get('policy'),'he-rent-protection-2025');
});
test('all UI translations retain interpolation placeholders',()=>{
 const slots=(s:string)=>[...s.matchAll(/\{\d+\}/g)].map(m=>m[0]).sort();
 for(const [key,value]of Object.entries(messages))assert.deepEqual(slots(value),slots(key),key);
 assert.equal(translator('en')('赞成 {0} · 反对 {1} · 弃权 {2}',[3,2,1]),'For: 3 · against: 2 · abstentions: 1');
});
test('all existing policies and intake have complete current translations',()=>{
 assert.equal(Object.keys(l.policies).length,24);assert.equal(Object.keys(l.intake).length,18);
 assert(Object.values(l.policies).every(s=>s==='current'));assert(Object.values(l.intake).every(s=>s==='current'));
 for(const locale of ['en'] as const){
  for(const p of data.policies)assert(!policyTextFields(localizePolicy(p,locale,l)).some(t=>/[\u3400-\u9fff]/.test(t)),p.id);
  for(const r of data.intake.records){const translated=localizeIntake(r,locale,l);assert(!/[\u3400-\u9fff]/.test(translated.titleZh??''));assert(!/[\u3400-\u9fff]/.test(translated.note));}
 }
});
test('translations preserve identities, legal dates, original titles, tags and evidence links',()=>{
 for(const p of data.policies)for(const locale of ['en'] as const){
  const t=localizePolicy(p,locale,l);
  for(const key of ['id','officialId','originalTitle','effectiveDate','nextDate','verifiedAt','phase','status','tags','topic'] as const)assert.deepEqual(t[key],p[key]);
  assert.deepEqual(t.sources.map(s=>[s.id,s.url,s.kind]),p.sources.map(s=>[s.id,s.url,s.kind]));
  assert.deepEqual(t.events.map(e=>[e.id,e.date,e.kind,e.sourceId]),p.events.map(e=>[e.id,e.date,e.kind,e.sourceId]));
 }
});
test('a fact-only change or version change invalidates an otherwise unchanged translation',()=>{
 const changed=structuredClone(data);changed.policies[0].verifiedAt='2026-10-04';
 const stale=createLocalization(changed,catalog,bindings);assert.equal(stale.policies[changed.policies[0].id],'stale');
 assert.equal(localizePolicy(changed.policies[0],'en',stale),changed.policies[0]);
 const version=structuredClone(data);version.policyVersions[version.policies[0].id]++;
 assert.equal(createLocalization(version,catalog,bindings).policies[version.policies[0].id],'stale');
});
test('missing new records and incomplete translations remain available without stale content',()=>{
 const changed=structuredClone(data);changed.policies[0].id='new-policy';
 const missing=createLocalization(changed,catalog,bindings);assert.equal(missing.policies['new-policy'],'missing');
 assert.equal(localizePolicy(changed.policies[0],'en',missing),changed.policies[0]);
 const incomplete={...catalog};delete incomplete[data.policies[0].summary];
 assert.equal(createLocalization(data,incomplete,bindings).policies[data.policies[0].id],'missing');
 assert.equal(contentText('Untranslated new text','en',{}),'Untranslated new text');
});
test('new English explanations also require translation, not just Chinese text detection',()=>{
 const changed=structuredClone(data);changed.policies[0].summary='A newly written English explanation.';
 const reviewed=structuredClone(bindings);reviewed.policies[changed.policies[0].id].hash=contentHash(changed.policies[0]);
 assert.equal(createLocalization(changed,catalog,reviewed).policies[changed.policies[0].id],'missing');
});
test('translated search matches all languages while category identities and counts stay stable',()=>{
 const index=new Map([...data.policies,...data.intake.records].map(p=>[p.id,searchText(p,l)]));const text=(p:{id:string})=>index.get(p.id)??'';
 for(const locale of ['zh','en'] as const){
  const policies=data.policies.map(p=>localizePolicy(p,locale,l)),records=data.intake.records.map(r=>localizeIntake(r,locale,l));
  for(const query of ['Mindestlohn','minimum wage','最低工资']){
   const result=selectListing(policies,records,{...readFilters(''),query},text);
   assert(result.policies.some(p=>p.id==='de-minimum-wage-2026'));
  }
  const filtered=selectListing(policies,records,{...readFilters('?view=all&tag=租房')},text);
  assert.equal(filtered.count,selectListing(data.policies,data.intake.records,readFilters('?view=all&tag=租房')).count);
 }
});
test('canonical lifecycle decisions remain independent of translated next-step wording',()=>{
 const original=data.policies.find(p=>p.id==='de-fuel-relief-2026')!;
 assert.equal(lifecycle(original,'2027-01-02'),'已通过 · 期限已到，后续待核实');
 for(const locale of ['en'] as const){const translated=localizePolicy(original,locale,l);assert.equal(keyDate(translated,'2026-10-03').date,keyDate(original,'2026-10-03').date);assert(!/[\u3400-\u9fff]/.test(translator(locale)(lifecycle(original,'2027-01-02'))));}
});
test('original-language metadata is record-specific, not inferred from the chosen language',()=>{
 const custom=structuredClone(bindings);custom.policies[data.policies[0].id].originalLanguage='fr';
 assert.equal(createLocalization(data,catalog,custom).sourceLanguages[data.policies[0].id],'fr');
});
test('dates are formatted in the selected language without shifting date-only values',()=>{
 assert.equal(formatDate('2026-10-03','zh'),'2026/10/03');
 assert.match(formatDate('2026-10-03','en',{year:'numeric',month:'long',day:'numeric'}),/October 3, 2026/);
});

test('country update stamps show Berlin time for instants and no invented time for bare dates',()=>{
 assert.equal(formatTimestamp('2026-10-10T15:34:39.000Z','zh'),'2026年10月10日 17:34');
 assert.equal(formatTimestamp('2026-10-10T15:34:39.000Z','en'),'Oct 10, 2026, 17:34');
 assert.equal(formatTimestamp('2026-10-10','zh'),'2026年10月10日');
 assert.equal(formatTimestamp('2026-10-10','en'),'Oct 10, 2026');
});

test('editorial intake placeholders are never presented as German original titles',()=>{
 for(const id of ['doc-8e46b7b9e68aa2080ff7fff7','doc-8a47e37a8c6e022339ba6940','doc-1fdc2f318aa34bfadf55403b'])assert.equal(l.originalIntakeTitles[id],false);
 assert.equal(l.originalIntakeTitles['doc-6cc5f77d6c478a814ac3d1a7'],true);
 const police=data.intake.records.find(r=>r.id==='doc-57be003982e82ac753a52394')!;
 assert.equal(localizeIntake(police,'en',l).titleZh,'New regulation on police appearance');
});
