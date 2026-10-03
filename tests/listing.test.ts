import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createStaticData} from '../lib/static-data.ts';
import {selectListing} from '../lib/domain/listing.ts';
import {readFilters,filterSearch} from '../lib/domain/filters.ts';
import {regions,policyTags} from '../lib/domain/model.ts';
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
