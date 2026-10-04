import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync,spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const old=JSON.parse(readFileSync('data/exports/2026-10-03/policy-radar-export.json','utf8'));
const registry=JSON.parse(readFileSync('data/discovery-registry.json','utf8'));
test('CI gate rejects skipped versions, intermediate bypasses and in-place edits',()=>{
 const root=mkdtempSync(join(tmpdir(),'policy-history-'));
 const git=(...args:string[])=>execFileSync('git',args,{cwd:root,encoding:'utf8'}).trim();
 const save=(name:string,data:unknown)=>{mkdirSync(join(root,'data/exports',name),{recursive:true});writeFileSync(join(root,'data/exports',name,'policy-radar-export.json'),JSON.stringify(data));writeFileSync(join(root,'data/current-export.json'),JSON.stringify({path:`data/exports/${name}/policy-radar-export.json`}));git('add','.');git('commit','-qm',name);return git('rev-parse','HEAD');};
 const run=(base:string)=>spawnSync(process.execPath,['--experimental-strip-types',fileURLToPath(new URL('../scripts/validate-history.mjs',import.meta.url)),base,'HEAD'],{cwd:root,encoding:'utf8'});
 try{
  git('init','-q');git('config','user.name','Test');git('config','user.email','test@example.invalid');
  const base=save('old',old),next={...structuredClone(old),discoveryRegistry:registry};
  for(const missing of ['', '0'.repeat(40)])assert.equal(run(missing).status,0,run(missing).stderr);
  save('valid',next);assert.equal(run(base).status,0);
  assert.equal(run('0'.repeat(40)).status,0);
  const stable=git('rev-parse','HEAD');const bad=structuredClone(next);bad.tables.policies[0].version+=2;
  save('skipped',bad);assert.match(run(stable).stderr,/version must advance exactly once/);
  assert.match(run('0'.repeat(40)).stderr,/version must advance exactly once/);
  save('restored',next);assert.match(run(stable).stderr,/version must advance exactly once/);
  git('reset','--hard',stable);const path=join(root,'data/exports/valid/policy-radar-export.json');writeFileSync(path,JSON.stringify({...next,exportedAt:'2026-10-04T08:00:00Z'}));git('add','.');git('commit','-qm','in-place');
  assert.match(run(stable).stderr,/changed in place/);
 }finally{rmSync(root,{recursive:true,force:true});}
});

test('CI gate validates intermediate selections inside a merged feature branch',()=>{
 const root=mkdtempSync(join(tmpdir(),'policy-merge-history-'));
 const git=(...args:string[])=>execFileSync('git',args,{cwd:root,encoding:'utf8'}).trim();
 const save=(path:string)=>{
  const data=readFileSync(path,'utf8');
  mkdirSync(join(root,path,'..'),{recursive:true});writeFileSync(join(root,path),data);
  writeFileSync(join(root,'data/current-export.json'),JSON.stringify({path}));
  git('add','.');git('commit','-qm',path);return git('rev-parse','HEAD');
 };
 try{
  git('init','-q','-b','main');git('config','user.name','Test');git('config','user.email','test@example.invalid');
  const base=save('data/exports/2026-10-04-weekly-translated/policy-radar-export.json');
  git('switch','-qc','feature');
  save('data/exports/2026-10-04-italy-121129/policy-radar-export.json');
  save('data/exports/2026-10-04-italy-review-122041/policy-radar-export.json');
  git('switch','-q','main');git('merge','--no-ff','feature','-m','Merge Italy');
  const result=spawnSync(process.execPath,['--experimental-strip-types',fileURLToPath(new URL('../scripts/validate-history.mjs',import.meta.url)),base,'HEAD'],{cwd:root,encoding:'utf8'});
  assert.equal(result.status,0,result.stderr);
  assert.match(result.stdout,/Validated 3 commit transitions/);
 }finally{rmSync(root,{recursive:true,force:true});}
});
