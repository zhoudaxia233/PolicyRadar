import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readExport} from '../lib/export-store.ts';
import {createStaticData} from '../lib/static-data.ts';
import {policySchema} from '../lib/domain/model.ts';
import {resolveTopics} from '../lib/domain/topics.ts';

const store=readExport('data/store') as any;
const data=createStaticData(store);
// Immutable revisions from the 14 October recheck; later outcomes must not be frozen here.
const revision=(id:string,v:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===`${id}:${v}`).data));

test('a ministry statement at a petition hearing does not become a cabinet decision',()=>{
 const p=revision('de-bmf-crypto-tax-reform-2027',3);
 assert.equal(p.status,'pending');assert.equal(p.effectiveDate,null);
 assert(!p.events.some(e=>e.kind==='adopted'||e.kind==='effective'));
 assert(p.events.some(e=>e.id==='bmf-draft-coordination-confirmed-20261012'&&e.kind==='correction'));
 assert.match(p.statusNote!,/未见官方确认/);
});

test('the holding-period petition joins the competing-proposal matter, not the CARF bill',()=>{
 const topics=resolveTopics(JSON.parse(readFileSync('data/topics.json','utf8')).topics,data.intake.records,data.policies);
 const holding=topics.find(t=>t.id==='de-crypto-holding-period')!;
 assert(holding.recordIds.includes('de-bt-petition-crypto-holding-20261012'));
 const carf=topics.find(t=>t.id==='de-crypto-information-exchange')!;
 assert(!carf.recordIds.includes('de-bt-petition-crypto-holding-20261012'));
 const c=revision('de-carf-agreement-2026',9);
 assert.equal(c.effectiveDate,null);
 assert.equal(c.events.filter(e=>e.kind==='adopted').length,1);
});
