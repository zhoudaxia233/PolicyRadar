import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {checkSiteSize,siteSize} from '../scripts/check-site-size.mjs';

test('site size counts nested evidence files and rejects builds above the limit',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'site-size-'));
 try{
  await mkdir(join(dir,'sources','a'),{recursive:true});
  await writeFile(join(dir,'index.html'),'x'.repeat(10));
  await writeFile(join(dir,'sources','a','b.bin'),'x'.repeat(30));
  assert.equal(await siteSize(dir),40);
  assert.equal(await checkSiteSize(dir,40),40);
  await assert.rejects(checkSiteSize(dir,39),/above the/);
 }finally{await rm(dir,{recursive:true,force:true});}
});
