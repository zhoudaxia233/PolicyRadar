import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,mkdirSync,cpSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {validateUpdate} from '../lib/update-data.ts';
const old=JSON.parse(readFileSync(new URL('../data/exports/2026-10-03/policy-radar-export.json',import.meta.url),'utf8'));
const now=new Date('2026-10-04T08:00:00Z');
const copy=()=>structuredClone(old);

test('unchanged export can carry forward without inventing a factual review',()=>{
 const next=copy();next.exportedAt=now.toISOString();
 assert.equal(validateUpdate(old,next,now).policies,24);
 assert.deepEqual(next.tables.settings,old.tables.settings);
});
test('update rejects removal of policies or alteration of archived history',()=>{
 const next=copy();next.tables.policies.pop();assert.throws(()=>validateUpdate(old,next,now),/removed/);
 for(const table of ['revisions','intake','scan_runs','snapshots']){
  const changed=copy();changed.tables[table].pop();assert.throws(()=>validateUpdate(old,changed,now));
 }
 const changed=copy();changed.tables.intake[0].data='{}';assert.throws(()=>validateUpdate(old,changed,now));
});
test('a policy edit requires a new version and an identical revision payload',()=>{
 const next=copy(),row=next.tables.policies[0];
 const p=JSON.parse(row.data);p.summary+=' 核实补充说明。';row.data=JSON.stringify(p);
 assert.throws(()=>validateUpdate(old,next,now),/version/);
 row.version++;assert.throws(()=>validateUpdate(old,next,now),/matching revision/);
 next.tables.revisions.push({id:`${row.id}:${row.version}`,policy_id:row.id,version:row.version,recorded_at:now.toISOString(),data:row.data});
 assert.doesNotThrow(()=>validateUpdate(old,next,now));
 p.events[0].detail='Rewritten history';row.data=JSON.stringify(p);
 next.tables.revisions.at(-1).data=row.data;
 assert.throws(()=>validateUpdate(old,next,now),/immutable/);
});
test('policy edits cannot cite an unarchived page or failed fetch',()=>{
 const next=copy(),row=next.tables.policies[0],p=JSON.parse(row.data);
 p.sources[0].url='https://www.bundesregierung.de/unarchived';row.data=JSON.stringify(p);row.version++;
 next.tables.revisions.push({id:`${row.id}:${row.version}`,policy_id:row.id,version:row.version,data:row.data});
 assert.throws(()=>validateUpdate(old,next,now),/archived evidence/);
});
test('new scans validate closed days, references and registered sources',()=>{
 const next=copy(),s=JSON.parse(next.tables.scan_runs[0].data);
 s.id='weekly-new-scan';s.checkedAt=now.toISOString();s.windowStart='2026-10-03';s.windowEnd='2026-10-03';s.recordIds=[];
 s.status='complete';s.allPagesChecked=true;s.totalListed=0;s.excluded=[];
 const row={id:s.id,source_url:s.sourceUrl,checked_at:s.checkedAt,data:JSON.stringify(s)};
 next.tables.scan_runs.push(row);assert.doesNotThrow(()=>validateUpdate(old,next,now));
 s.windowEnd='2026-10-04';row.data=JSON.stringify(s);assert.throws(()=>validateUpdate(old,next,now),/ongoing/);
 s.windowEnd='2026-10-03';s.recordIds=['missing'];s.totalListed=1;row.data=JSON.stringify(s);
 assert.throws(()=>validateUpdate(old,next,now),/missing or out-of-window/);
});
test('duplicate identities and future or regressing exports are rejected',()=>{
 const next=copy();next.tables.policies.push(next.tables.policies[0]);assert.throws(()=>validateUpdate(old,next,now),/duplicate/);
 for(const date of ['2026-10-01T00:00:00Z','2026-10-05T00:00:00Z'])assert.throws(()=>validateUpdate(old,{...copy(),exportedAt:date},now),/export time/);
});
test('selection switches the build pointer only after checking archive bytes',()=>{
 const root=mkdtempSync(join(tmpdir(),'policy-radar-select-'));
 try{
  const exports=join(root,'data/exports');mkdirSync(exports,{recursive:true});
  const fixture=fileURLToPath(new URL('../data/exports/2026-10-03',import.meta.url));
  cpSync(fixture,join(exports,'old'),{recursive:true});cpSync(fixture,join(exports,'new'),{recursive:true});
  const pointer=join(root,'data/current-export.json');writeFileSync(pointer,JSON.stringify({path:'data/exports/old/policy-radar-export.json'}));
  const run=()=>spawnSync(process.execPath,['--experimental-strip-types',fileURLToPath(new URL('../scripts/select-export.mjs',import.meta.url)),'data/exports/new/policy-radar-export.json'],{cwd:root,encoding:'utf8'});
  const snapshot=old.tables.snapshots[0].key,bytes=readFileSync(join(exports,'new',snapshot));
  writeFileSync(join(exports,'new',snapshot),'corrupt');
  const failed=run();assert.notEqual(failed.status,0);assert.match(failed.stderr,/checksum mismatch/);
  assert.equal(JSON.parse(readFileSync(pointer,'utf8')).path,'data/exports/old/policy-radar-export.json');
  writeFileSync(join(exports,'new',snapshot),bytes);
  const success=run();assert.equal(success.status,0,success.stderr);
  assert.equal(JSON.parse(readFileSync(pointer,'utf8')).path,'data/exports/new/policy-radar-export.json');
 }finally{rmSync(root,{recursive:true,force:true});}
});
