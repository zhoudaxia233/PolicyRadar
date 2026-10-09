import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {buildSync} from 'esbuild';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createStaticData} from '../lib/static-data.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {resolveTopicRegistry,groupRecords} from '../lib/domain/topics.ts';
import {readExport} from '../lib/export-store.ts';
const read=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const data=createStaticData(readExport(process.env.POLICY_RADAR_EXPORT??read('data/current-export.json').path));
const localization=createLocalization(data,read('data/translations/content.json'),read('data/translations/bindings.json'));
const groups=groupRecords(data.intake.records,resolveTopicRegistry(read('data/topics.json'),data));
const bundle=buildSync({entryPoints:['app/intake-view.tsx'],bundle:true,write:false,platform:'node',format:'esm',jsx:'automatic'}).outputFiles[0].text;
const {TopicDocuments}=await import('data:text/javascript;base64,'+Buffer.from(bundle).toString('base64'));
test('CARF historical pending and adopted records have explicitly record-scoped bilingual badges',()=>{
 const group=groups.find(g=>g.id==='topic:de-crypto-information-exchange')!;
 assert(group);
 assert(group.records.some(r=>r.stage==='pending'));
 assert(group.records.some(r=>r.stage==='adopted'));
 const before=JSON.stringify(group);
 for(const locale of ['zh','en']){
  const html=renderToStaticMarkup(createElement(TopicDocuments,{group,policies:data.policies,open:()=>{},locale,localization}));
  const prefix=locale==='zh'?'记录当时：':'At the time of this record: ';
  assert.equal(html.split(prefix).length-1,group.records.length);
  assert(html.includes(prefix+(locale==='zh'?'待决':'Pending')));
  assert(html.includes(prefix+(locale==='zh'?'已确认通过或公布':'Adoption or publication confirmed')));
  assert(html.includes(locale==='zh'?'不是多个当前状态':'not multiple current statuses'));
  for(const record of group.records)assert(html.includes(record.url.replaceAll('&','&amp;')));
 }
 assert.equal(JSON.stringify(group),before);
});
test('all grouped official records scope their badges without rewriting stages',()=>{
 for(const group of groups){
  const html=renderToStaticMarkup(createElement(TopicDocuments,{group,policies:data.policies,open:()=>{},locale:'zh',localization}));
  assert.equal(html.split('记录当时：').length-1,group.records.length,group.id);
 }
});
test('US temporary and proposed rules retain different record stages in one matter',()=>{
 const group=groups.find(g=>g.id==='topic:us-scholarship-credit-2026')!;
 assert(group);
 assert.equal(group.records.find(r=>r.id==='us-fr-2026-20264')?.stage,'adopted');
 assert.equal(group.records.find(r=>r.id==='us-fr-2026-20277')?.stage,'pending');
 const html=renderToStaticMarkup(createElement(TopicDocuments,{group,policies:data.policies,open:()=>{},locale:'en',localization}));
 assert(html.includes('At the time of this record: Pending'));
 assert(html.includes('At the time of this record: Adoption or publication confirmed'));
});
