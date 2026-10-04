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
  save('valid',next);assert.equal(run(base).status,0);
  const stable=git('rev-parse','HEAD');const bad=structuredClone(next);bad.tables.policies[0].version+=2;
  save('skipped',bad);assert.match(run(stable).stderr,/version must advance exactly once/);
  save('restored',next);assert.match(run(stable).stderr,/version must advance exactly once/);
  git('reset','--hard',stable);const path=join(root,'data/exports/valid/policy-radar-export.json');writeFileSync(path,JSON.stringify({...next,exportedAt:'2026-10-04T08:00:00Z'}));git('add','.');git('commit','-qm','in-place');
  assert.match(run(stable).stderr,/changed in place/);
 }finally{rmSync(root,{recursive:true,force:true});}
});
