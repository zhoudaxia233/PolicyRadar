import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateUpdate} from '../lib/update-data.ts';
import {lifecycle} from '../lib/domain/model.ts';
const active=JSON.parse(readFileSync(JSON.parse(readFileSync('data/current-export.json','utf8')).path,'utf8'));
const policy=(id:string)=>JSON.parse(active.tables.policies.find((r:any)=>r.id===id).data);
test('effective status rolls over on the exact effective date',()=>{
 for(const id of ['ch-be-information-security','ch-zh-premium-subsidy-2027']){
  const p=policy(id);assert.equal(lifecycle(p,p.effectiveDate),'已生效');
 }
});
test('failed checks retain the last successful evidence and timestamp',()=>{
 const next=structuredClone(active),c=next.tables.checks.find((r:any)=>r.snapshot_key);
 c.snapshot_key=null;c.error='HTTP 503';
 assert.throws(()=>validateUpdate(active,next),/snapshot/);
});
test('even unchanged policies cannot drop their archived check reference',()=>{
 const next=structuredClone(active);next.tables.checks.find((r:any)=>r.snapshot_key).snapshot_key=null;
 assert.throws(()=>validateUpdate(active,next),/snapshot/);
});

test('structured statuses do not depend on explanatory language',()=>{
 const p={...policy('de-fuel-relief-2026'),status:'adopted',nextKind:'expiry' as const,nextLabel:'Expiry'};
 assert.equal(lifecycle(p,'2027-01-01'),'已通过 · 期限已到，后续待核实');
 assert.equal(lifecycle(policy('ch-thirteenth-ahv'),'2027-02-01'),'已通过 · 生效日未确认');
 assert.equal(lifecycle(policy('nl-fl-home-battery'),'2027-01-01'),'本轮申请已结束');
});

import {readNavigation,navigationSearch} from '../lib/domain/navigation.ts';
import {validateSelection} from '../lib/update-data.ts';
import {createStaticData} from '../lib/static-data.ts';
test('foreign detail links select that country and remove incompatible filters',()=>{
 const rows=active.tables.policies.map((r:any)=>JSON.parse(r.data));
 const state=readNavigation('?country=DE&tag=rent&policy=ch-be-information-security',rows);
 assert.equal(state.country,'CH');assert.equal(state.region,'all');assert.deepEqual(state.tags,[]);
 const previous=navigationSearch('?lang=en',{...state,selectedId:null});
 assert.equal(new URLSearchParams(previous).get('lang'),'en');assert(!previous.includes('policy='));
 assert.deepEqual(readNavigation(navigationSearch('',state),rows),state);
});
test('operational gate requires a versioned registry without rewriting old exports',()=>{
 assert.throws(()=>validateSelection(active,active),/discoveryRegistry/);
 const next={...structuredClone(active),discoveryRegistry:JSON.parse(readFileSync('data/discovery-registry.json','utf8'))};
 assert.doesNotThrow(()=>validateSelection(active,next));
});
test('Swiss initial export retains the retired channel in its historical registry',()=>{
 const initial=JSON.parse(readFileSync('data/exports/2026-10-04-switzerland/policy-radar-export.json','utf8'));
 assert(createStaticData(initial).status.discovery.some(s=>s.url==='https://www.sz.ch/behoerden/gesetzessammlung.html/8756-8758-8801'));
 const next={...structuredClone(active),discoveryRegistry:JSON.parse(readFileSync('data/discovery-registry.json','utf8'))};
 next.discoveryRegistry[0].url='https://example.org/changed-channel';
 assert(createStaticData(next).status.discovery.some(s=>s.url==='https://example.org/changed-channel'));
 assert(!createStaticData(active).status.discovery.some(s=>s.url==='https://example.org/changed-channel'));
});

import {readdirSync} from 'node:fs';
import {readSnapshot} from '../lib/source-archive.ts';
test('every historical export still resolves all its original verified bytes',()=>{
 for(const run of readdirSync('data/exports')){
  const path=`data/exports/${run}/policy-radar-export.json`;
  const saved=JSON.parse(readFileSync(path,'utf8'));
  for(const snapshot of saved.tables.snapshots)assert(readSnapshot(path,snapshot).length>0);
 }
});
test('failed fetch cannot replace the last successful snapshot with another archived file',()=>{
 const next=structuredClone(active),check=next.tables.checks.find((r:any)=>r.snapshot_key);
 check.error='HTTP 503';check.snapshot_key=next.tables.snapshots.find((r:any)=>r.key!==check.snapshot_key).key;
 assert.throws(()=>validateUpdate(active,next),/snapshot/);
});
