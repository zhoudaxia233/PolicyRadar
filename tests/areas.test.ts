import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createStaticData} from '../lib/static-data.ts';
import {readExport} from '../lib/export-store.ts';
import {resolveTopicRegistry} from '../lib/domain/topics.ts';
import {resolveDispositionRegistry} from '../lib/domain/dispositions.ts';
import {resolveAreas,areaBreakdown,areas,areaIds} from '../lib/domain/areas.ts';
import {selectListing,explainsRecord} from '../lib/domain/listing.ts';
import {readFilters,filterSearch} from '../lib/domain/filters.ts';
import {countries,regions,countryOf} from '../lib/domain/model.ts';
import {messages} from '../lib/i18n/messages.ts';
const read=(path:string)=>JSON.parse(readFileSync(path,'utf8'));

const data=createStaticData(readExport(read('data/current-export.json').path));
const topics=resolveTopicRegistry(read('data/topics.json'),data);
const dispositions=resolveDispositionRegistry(read('data/dispositions.json'),data,topics);
const registry=read('data/areas.json');
const areaOf=resolveAreas(registry,data.policies,topics);
const list=(query:string,extra:Record<string,unknown>={})=>selectListing(data.policies,data.intake.records,{...readFilters(query),...extra},undefined,'2026-10-22',topics,dispositions,areaOf);

test('every current explanation has exactly one reviewed area and the vocabulary stays fixed',()=>{
 assert.equal(areas.length,16);
 assert.equal(new Set(areaIds).size,areas.length);
 for(const a of areas)assert(a.title.every(t=>t.trim())&&a.short.every(t=>t.trim()),a.id);
 assert.deepEqual(Object.keys(areaOf).sort(),data.policies.map(p=>p.id).sort());
 // Generic labels are classified per item: sanctions are foreign affairs, childcare fees family support.
 assert.equal(areaOf['eu-russia-military-industrial-listing-2026-10'],'foreign');
 assert.equal(areaOf['de-belgium-police-treaty-2026'],'security');
 assert.equal(areaOf['bb-kita-income-relief-permanent'],'social');
 assert.equal(areaOf['de-rent-cap-2029'],'housing');
});

test('the area registry rejects unmapped topics, unknown areas, stale exceptions and split matters',()=>{
 const policies=[{id:'a',topic:'住房'},{id:'b',topic:'公共服务'}];
 const base={topics:{'住房':'housing','公共服务':'government'},policies:{b:'social'}};
 assert.deepEqual(resolveAreas(base,policies),{a:'housing',b:'social'});
 assert.throws(()=>resolveAreas({...base,topics:{'住房':'housing'}},[...policies,{id:'c',topic:'新标签'}]),/no area: 新标签 \(c\)/);
 assert.throws(()=>resolveAreas({...base,topics:{...base.topics,'住房':'houses'}},policies),/Unknown area/);
 assert.throws(()=>resolveAreas({...base,policies:{x:'social'}},policies),/unknown policy: x/);
 assert.throws(()=>resolveAreas({...base,policies:{b:'government'}},policies),/repeats the topic default: b/);
 assert.throws(()=>resolveAreas(base,policies,[{id:'t',policyIds:['a','b']}]),/one area: t/);
});

test('area links round-trip and unknown areas fall back to all',()=>{
 const state={...readFilters('?country=FR&view=pending'),area:'migration'};
 assert.deepEqual(readFilters(filterSearch('?lang=en',state)),state);
 assert.equal(new URLSearchParams(filterSearch('',{...state,area:'all'})).has('area'),false);
 assert.equal(readFilters('?area=nonsense').area,'all');
});

test('an area filter keeps only that area’s matters and drops records without an explanation',()=>{
 for(const country of ['DE','FR','EU']){
  const all=list('?view=all&country='+country);
  const housing=list('?view=all&country='+country,{area:'housing'});
  assert(housing.cards.every(c=>areaOf[c.policy.id]==='housing'));
  assert.equal(housing.cards.length,all.cards.filter(c=>areaOf[c.policy.id]==='housing').length);
  assert.equal(housing.raw.length+housing.reviewed.length,0);
  assert.equal(housing.count,housing.cards.length);
 }
 // Official progress keeps the records behind the area's explanations, never another area's.
 const progress=list('?view=intake&country=DE',{area:'housing'});
 const housingPolicies=data.policies.filter(p=>areaOf[p.id]==='housing'&&countryOf(p.region)==='DE');
 const grouped=new Set(topics.filter(t=>t.policyIds.some(id=>areaOf[id]==='housing')).flatMap(t=>t.recordIds));
 assert(progress.progress.length>0);
 for(const r of progress.progress)assert(grouped.has(r.id)||housingPolicies.some(p=>explainsRecord(p,r)),r.id);
 assert(progress.count<list('?view=intake&country=DE').count);
});

test('a search that matches only a grouped child record still finds the matter in its area',()=>{
 const child=data.intake.records.find(r=>r.url==='https://www.bundestag.de/dokumente/textarchiv/2026/kw45-de-pflegeneuordnungsgesetz-1225076')!;
 assert(child,'fixture record must stay in current intake');
 const query='?view=all&country=DE&q='+encodeURIComponent(child.title);
 const inArea=list(query,{area:'health'});
 assert(inArea.cards.some(c=>c.group?.policyIds.includes('de-care-insurance-reform-pnog')||c.policy.id==='de-care-insurance-reform-pnog'));
 assert.equal(list(query,{area:'tax'}).cards.length,0);
});

test('every bar and heatmap cell equals the list count its click produces',()=>{
 for(const country of countries.map(c=>c.id))for(const view of ['adopted','pending','all']){
  const base='?view='+view+'&country='+country;
  const {total,byRegion}=areaBreakdown(list(base).cards,areaOf);
  // The area menu offers all 16 areas: an option the chart leaves out (no matters) gives an empty list.
  for(const area of areaIds)assert.equal(list(base,{area}).count,total.get(area)??0,`${country} ${view} ${area}`);
  for(const [region,row] of byRegion){
   assert(regions.some(r=>r.id===region)&&countryOf(region)===country,region);
   for(const [area,n] of row)assert.equal(list(base,{area,region}).count,n,`${country} ${view} ${region} ${area}`);
  }
  // Regions never lose a matter; only a matter explained in several regions adds to more than one row.
  for(const [area,n] of total)assert([...byRegion.values()].reduce((s,row)=>s+(row.get(area)??0),0)>=n);
 }
 // Baden-Württemberg and Brandenburg each run the family-court pilot: one matter, one row each.
 const {total,byRegion}=areaBreakdown(list('?view=all&country=DE').cards,areaOf);
 const pilot=list('?view=all&country=DE',{area:'security'}).cards.find(c=>c.group?.policyIds.includes('bw-domestic-violence-support-pilot-2026'));
 assert.deepEqual(pilot?.members?.map(p=>p.region).sort(),['DE-BB','DE-BW']);
 for(const region of ['DE-BB','DE-BW'])assert(list('?view=all&country=DE',{area:'security',region}).cards.some(c=>c.group?.policyIds.includes('bw-domestic-violence-support-pilot-2026')),region);
 assert.equal(list('?view=all&country=DE',{area:'security'}).count,total.get('security'));
 assert.equal(byRegion.get('DE-BW')?.get('security'),list('?view=all&country=DE',{area:'security',region:'DE-BW'}).count);
});

test('area labels and chart text are translated',()=>{
 for(const key of ['{0}在推进什么','各地区对比','领域','全部领域','标签：','移除标签：{0}','匹配任一标签'] as const)assert(messages[key].trim());
 for(const a of areas)assert.notEqual(a.title[0],a.title[1]);
});

test('areas are 领域 / Area and tags 标签 / Tag in both languages, never topics',()=>{
 // "Topic" already names grouped matters; the old filters called areas 主题 in Chinese and tags Topics in English.
 assert.match(messages['领域'],/^Area$/);
 assert.match(messages['标签：'],/^Tags?: $/);
 for(const [zh,en] of Object.entries(messages)){
  assert.doesNotMatch(zh,/主题/,zh);
  assert.doesNotMatch(en,/\btopics?\b/i,zh);
  if(zh.includes('领域'))assert.match(en,/\barea/i,zh);
 }
});
