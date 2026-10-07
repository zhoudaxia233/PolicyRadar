import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createStaticData} from '../lib/static-data.ts';
import {selectListing} from '../lib/domain/listing.ts';
import {readFilters,filterSearch} from '../lib/domain/filters.ts';
import {regions,policyTags,progressDate,keyDate} from '../lib/domain/model.ts';
const data=createStaticData(JSON.parse(readFileSync(new URL('../data/exports/2026-10-03/policy-radar-export.json',import.meta.url),'utf8')));
const base=readFilters('?view=all');
const select=(state:typeof base)=>selectListing(data.policies,data.intake.records,state);

test('all results include unverified raw records in the same total as navigation',()=>{
 const result=select(base);
 assert.equal(result.count,37);
 assert.equal(result.policies.length,24);
 assert.equal(result.raw.length,13);
 assert.equal(result.raw.filter(r=>r.stage==='unverified').length,7);
});
test('crypto counts distinguish policy topics from multiple progress records',()=>{
 const state={...base,tags:['加密资产']};
 const counts=Object.fromEntries(['adopted','pending','all','intake'].map(view=>[view,select({...state,view}).count]));
 assert.deepEqual(counts,{adopted:1,pending:2,all:3,intake:4});
 const progress=select({...state,view:'intake'}).progress;
 assert.equal(new Set(progress.map(r=>r.officialId)).size,2);
 assert.equal(select(state).raw.length,0);
 const combined=select({...state,view:'adopted',tags:['加密资产','待分类']});
 assert.equal(combined.count,2);
 assert.equal(combined.raw.length,1);
 assert(!policyTags(combined.raw[0]).includes('加密资产'));
});
test('view and region navigation honor search and categories with identical refresh results',()=>{
 for(const view of ['adopted','pending','all','intake','updates'])for(const region of ['all',...regions.map(r=>r.id)])for(const tags of [[],['加密资产'],['待分类','加密资产']])for(const query of ['', '21/5752']){
  const state={...base,view,region,tags,query};
  const result=select(state);
  assert.deepEqual(select(readFilters(filterSearch('',state))),result);
  assert.equal(result.count,view==='intake'?result.progress.length:result.policies.length+result.raw.length);
  for(const row of (view==='intake'?result.progress:[...result.policies,...result.raw])){
   assert(region==='all'||row.region===region);
   assert(!tags.length||tags.some(t=>policyTags(row).includes(t)));
  }
 }
 assert.equal(select({...base,region:'DE-HE',tags:['加密资产']}).count,0);
 assert.equal(select({...base,query:'21/5752'}).count,1);
 assert.equal(select({...base,view:'intake',query:'21/5752'}).count,2);
});
test('unverified records never appear in adopted or pending even with a matching category',()=>{
 for(const view of ['adopted','pending'])assert(select({...base,view,tags:['待分类']}).raw.every(r=>r.stage===view));
});

test('unnumbered announcements link by exact source identity without merging numbered laws',()=>{
 const sample=data.intake.records.find(r=>!r.officialId)!;
 const explanation={...data.policies[0],id:'announcement-explanation',region:sample.region,officialId:sample.url};
 const result=selectListing([explanation],[sample],base);
 assert.equal(result.raw.length,0);
 assert.equal(result.count,1);
 assert.equal(result.progress.length,1);
 const numbered={...sample,officialId:'Separate law in the same gazette'};
 assert.equal(selectListing([explanation],[numbered],base).raw.length,1);
 const otherRegion={...explanation,region:sample.region==='DE-HH'?'DE-BY':'DE-HH'};
 assert.equal(selectListing([otherRegion],[sample],base).raw.length,1);
 const differentUrl={...sample,url:sample.url+'?other=document'};
 assert.equal(selectListing([explanation],[differentUrl],base).raw.length,1);
});
test('data-maintenance corrections never count as official progress or reorder lists',()=>{
 const current=createStaticData(JSON.parse(readFileSync(new URL('../data/exports/2026-10-07-uk-backfill-date-review-184206/policy-radar-export.json',import.meta.url),'utf8')));
 const rent=current.policies.find(p=>p.id==='de-rent-cap-2029')!;
 assert.equal(rent.lastEventDate,'2026-10-06');
 assert.equal(progressDate(rent),'2025-07-23');
 const today='2026-10-07';
 const listed=(view:string)=>selectListing(current.policies,current.intake.records,{...readFilters('?view=all'),country:'DE',view},undefined,today).policies;
 assert.equal(listed('adopted').findIndex(p=>p.id==='de-rent-cap-2029')>listed('adopted').findIndex(p=>p.id==='mv-regiobus-mv83-2026'),true);
});
test('every list leads with the date nearest today, upcoming before past',()=>{
 const current=createStaticData(JSON.parse(readFileSync(new URL('../data/exports/2026-10-07-uk-backfill-date-review-184206/policy-radar-export.json',import.meta.url),'utf8')));
 const today='2026-10-07';
 for(const view of ['adopted','pending','all']){
  const dates=selectListing(current.policies,current.intake.records,{...readFilters('?view=all'),country:'DE',view},undefined,today).policies.map(p=>keyDate(p,today).date);
  const upcoming=dates.filter(d=>d>=today),past=dates.filter(d=>d<today);
  assert.deepEqual(dates,[...upcoming,...past],view);
  assert.deepEqual(upcoming,[...upcoming].sort(),view);
  assert.deepEqual(past,[...past].sort().reverse(),view);
 }
});
