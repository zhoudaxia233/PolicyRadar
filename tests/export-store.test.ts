import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,readdirSync,statSync,rmSync,renameSync,writeFileSync,mkdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync,spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {readExport,writeStore,storeTables,storeChunkRows,isSafeExportPointer} from '../lib/export-store.ts';

const legacy=JSON.parse(readFileSync('data/exports/2026-10-09-rendered-channels-222019/policy-radar-export.json','utf8'));
const files=(dir:string)=>Object.fromEntries(storeTables.flatMap(t=>readdirSync(join(dir,t)).map(n=>[`${t}/${n}`,readFileSync(join(dir,t,n),'utf8')])));

test('the store reproduces an export exactly, in row order',()=>{
 const dir=mkdtempSync(join(tmpdir(),'policy-store-'));
 try{writeStore(dir,legacy);assert.deepEqual(readExport(dir),legacy);}
 finally{rmSync(dir,{recursive:true,force:true});}
});

test('appending a discovery rewrites only the last intake chunk',()=>{
 const dir=mkdtempSync(join(tmpdir(),'policy-store-'));
 try{
  writeStore(dir,legacy);const before=files(dir);
  const next=structuredClone(legacy);next.tables.intake.push({...next.tables.intake.at(-1),id:'appended'});
  writeStore(dir,next);const after=files(dir);
  const last=`intake/${String(Math.floor((next.tables.intake.length-1)/storeChunkRows)).padStart(3,'0')}.json`;
  assert.deepEqual(Object.keys(after).filter(f=>after[f]!==before[f]),[last]);
  assert.deepEqual(readExport(dir),next);
 }finally{rmSync(dir,{recursive:true,force:true});}
});

test('a store with a missing chunk is rejected rather than silently shortened',()=>{
 const dir=mkdtempSync(join(tmpdir(),'policy-store-'));
 try{writeStore(dir,legacy);renameSync(join(dir,'intake/001.json'),join(dir,'intake/009.json'));assert.throws(()=>readExport(dir),/consecutive/);}
 finally{rmSync(dir,{recursive:true,force:true});}
});

test('the selected store stays far below GitHub file-size limits',()=>{
 const pointer=JSON.parse(readFileSync('data/current-export.json','utf8')).path;
 assert.equal(pointer,'data/store');
 for(const t of storeTables)for(const n of readdirSync(join('data/store',t)))assert.ok(statSync(join('data/store',t,n)).size<5_000_000,`${t}/${n} exceeds 5 MB`);
});

test('only per-run exports and data/store are valid selections',()=>{
 assert.ok(isSafeExportPointer('data/store'));
 assert.ok(isSafeExportPointer('data/exports/2026-10-03/policy-radar-export.json'));
 for(const bad of ['data/store/../secrets','/etc/passwd','data/stores'])assert.equal(isSafeExportPointer(bad),false);
});

test('CI gate validates the move to data/store and every later in-place change',()=>{
 const root=mkdtempSync(join(tmpdir(),'policy-store-history-'));
 const git=(...args:string[])=>execFileSync('git',args,{cwd:root,encoding:'utf8'}).trim();
 const commit=(name:string)=>{git('add','-A');git('commit','-qm',name);return git('rev-parse','HEAD');};
 const run=(base:string)=>spawnSync(process.execPath,['--experimental-strip-types',fileURLToPath(new URL('../scripts/validate-history.mjs',import.meta.url)),base,'HEAD'],{cwd:root,encoding:'utf8'});
 const old=JSON.parse(readFileSync('data/exports/2026-10-03/policy-radar-export.json','utf8'));
 const next={...structuredClone(old),discoveryRegistry:JSON.parse(readFileSync('data/discovery-registry.json','utf8'))};
 const point=(path:string)=>writeFileSync(join(root,'data/current-export.json'),JSON.stringify({path}));
 try{
  git('init','-q');git('config','user.name','Test');git('config','user.email','test@example.invalid');
  mkdirSync(join(root,'data/exports/old'),{recursive:true});writeFileSync(join(root,'data/exports/old/policy-radar-export.json'),JSON.stringify(old));
  point('data/exports/old/policy-radar-export.json');const base=commit('legacy');
  writeStore(join(root,'data/store'),next);point('data/store');commit('move');
  assert.equal(run(base).status,0,run(base).stderr);
  const moved=git('rev-parse','HEAD');
  const lost=structuredClone(next);lost.tables.policies.pop();writeStore(join(root,'data/store'),lost);commit('lost');
  assert.match(run(moved).stderr,/Existing policy removed/);
  git('reset','-q','--hard',moved);
  point('data/exports/old/policy-radar-export.json');commit('back');
  assert.match(run(moved).stderr,/cannot move from data\/store back/);
 }finally{rmSync(root,{recursive:true,force:true});}
});
