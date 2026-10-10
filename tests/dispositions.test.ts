import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createStaticData} from '../lib/static-data.ts';
import {selectListing} from '../lib/domain/listing.ts';
import {readFilters} from '../lib/domain/filters.ts';
import {resolveDispositions,resolveDispositionRegistry,type DispositionDefinition} from '../lib/domain/dispositions.ts';
import {resolveTopicRegistry} from '../lib/domain/topics.ts';
import {readExport} from '../lib/export-store.ts';
import type {IntakeRecord} from '../lib/domain/intake.ts';
import type {Policy} from '../lib/domain/model.ts';
const read=(path:string)=>JSON.parse(readFileSync(path,'utf8'));

const record=(id:string,extra:Partial<IntakeRecord>={}):IntakeRecord=>({id,region:'EU',title:'Title '+id,date:'2026-10-08',dateKind:'published',url:'https://example.eu/'+id,sourceUrl:'https://example.eu/',kind:'announcement',stage:'unverified',note:'Note '+id,tags:[],...extra});
const records=[record('rates',{officialId:'OJ:C_1',title:'Euro exchange rates – 7 October 2026'}),record('merger',{officialId:'OJ:C_2',stage:'pending'}),record('law',{officialId:'OJ:L_3',stage:'adopted'}),record('news')];
const reason:[string,string]=['仅供参考的汇率','Reference exchange rates only'];
const define=(documents:DispositionDefinition['documents'],id='d1'):DispositionDefinition=>({id,reason,basis:'Reviewed.',documents});
const base=readFilters('?country=EU&view=all');

test('a dismissed record leaves the awaiting list and its count but stays in official progress',()=>{
 const dispositions=resolveDispositions([define([{region:'EU',officialId:'OJ:C_1'}])],records,[],[]);
 assert.deepEqual(dispositions,[{id:'d1',reason,recordIds:['rates']}]);
 const before=selectListing([],records,base),after=selectListing([],records,base,undefined,undefined,[],dispositions);
 assert.equal(before.count,4);
 assert.equal(after.count,3);
 assert(!after.raw.some(r=>r.id==='rates'));
 assert.deepEqual(after.reviewed.map(r=>r.id),['rates']);
 const progress=selectListing([],records,{...base,view:'intake'},undefined,undefined,[],dispositions);
 assert.equal(progress.count,4);
 assert(progress.progress.some(r=>r.id==='rates'));
});

test('stage, region and search filters apply to reviewed records like awaiting ones',()=>{
 const dispositions=resolveDispositions([define([{region:'EU',officialId:'OJ:C_1'},{region:'EU',officialId:'OJ:C_2'}])],records,[],[]);
 const select=(f:Partial<typeof base>)=>selectListing([],records,{...base,...f},undefined,undefined,[],dispositions);
 assert.deepEqual(select({view:'pending'}).reviewed.map(r=>r.id),['merger']);
 assert.deepEqual(select({query:'exchange'}).reviewed.map(r=>r.id),['rates']);
 assert.equal(select({query:'exchange'}).count,0);
 assert.deepEqual(select({country:'DE'}).reviewed,[]);
});

test('unknown, overlapping, explained, grouped and cross-country documents are rejected',()=>{
 assert.throws(()=>resolveDispositions([define([{region:'EU',officialId:'OJ:C_9'}])],records,[],[]),/Unresolved disposition document/);
 assert.throws(()=>resolveDispositions([define([{region:'EU',officialId:'OJ:C_1'}]),define([{region:'EU',officialId:'OJ:C_1'}],'d2')],records,[],[]),/multiple dispositions/);
 assert.throws(()=>resolveDispositions([define([{region:'EU',officialId:'OJ:C_1'}]),define([{region:'EU',officialId:'OJ:C_2'}])],records,[],[]),/Duplicate disposition ID/);
 const policy={region:'EU',officialId:'OJ:L_3'} as Policy;
 assert.throws(()=>resolveDispositions([define([{region:'EU',officialId:'OJ:L_3'}])],records,[policy],[]),/Explained document/);
 // A group is dismissed whole or not at all, and never when an explanation covers it.
 const group={id:'t',title:['a','b'] as [string,string],recordIds:['news','merger'],policyIds:[] as string[]};
 assert.throws(()=>resolveDispositions([define([{region:'EU',url:'https://example.eu/news',title:'Title news'}])],records,[],[group]),/Grouped document/);
 assert.deepEqual(resolveDispositions([define([{region:'EU',url:'https://example.eu/news',title:'Title news'},{region:'EU',officialId:'OJ:C_2'}])],records,[],[group])[0].recordIds,['news','merger']);
 assert.throws(()=>resolveDispositions([define([{region:'EU',url:'https://example.eu/news',title:'Title news'},{region:'EU',officialId:'OJ:C_2'}])],records,[],[{...group,policyIds:['p']}]),/Grouped document/);
 assert.throws(()=>resolveDispositions([define([{region:'EU',officialId:'OJ:C_1'},{region:'DE',officialId:'X'}])],[...records,record('de',{region:'DE',officialId:'X'})],[],[]),/Cross-country/);
 // An unnumbered record is identified by its exact URL and original title, not by URL alone.
 assert.throws(()=>resolveDispositions([define([{region:'EU',url:'https://example.eu/news',title:'Other'}])],records,[],[]),/Unresolved/);
});

test('the current registry resolves, and historical snapshots do not acquire later decisions',()=>{
 const data=createStaticData(readExport(read('data/current-export.json').path));
 const topics=resolveTopicRegistry(read('data/topics.json'),data);
 const registry=read('data/dispositions.json');
 const current=resolveDispositionRegistry(registry,data,topics);
 assert.equal(new Set(current.flatMap(d=>d.recordIds)).size,current.flatMap(d=>d.recordIds).length);
 for(const d of current)assert(d.reason.every(s=>s.trim()));
 const prior=createStaticData(read('data/exports/2026-10-08-bmf-timeline-213634/policy-radar-export.json'));
 assert.deepEqual(resolveDispositionRegistry(registry,prior,[]),[]);
});
