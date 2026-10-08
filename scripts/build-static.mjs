import {resolveTopicRegistry} from '../lib/domain/topics.ts';
import {readSnapshot} from '../lib/source-archive.ts';
import {build} from 'esbuild';
import {mkdir,writeFile,readFile,copyFile,rm,rename,mkdtemp} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {createHash} from 'node:crypto';
import {createLocalization} from '../lib/i18n/build.ts';
import {createStaticData,snapshotKey} from '../lib/static-data.ts';

const source=resolve(process.argv[2]||JSON.parse(await readFile('data/current-export.json','utf8')).path);
const raw=await readFile(source,'utf8');
const exported=JSON.parse(raw);
const data=createStaticData(exported);
data.topics=resolveTopicRegistry(JSON.parse(await readFile('data/topics.json','utf8')),data);
data.localization=createLocalization(data,JSON.parse(await readFile('data/translations/content.json','utf8')),JSON.parse(await readFile('data/translations/bindings.json','utf8')));
await mkdir('.build-tmp',{recursive:true});
const output=await mkdtemp(resolve('.build-tmp/static-build-'));
try {
  await build({stdin:{contents:'import React from "react";import {createRoot} from "react-dom/client";import Home from "./app/page";createRoot(document.getElementById("root")).render(<Home/>);',resolveDir:process.cwd(),loader:'tsx'},bundle:true,minify:true,jsx:'automatic',outfile:resolve(output,'app.js'),platform:'browser',define:{'process.env.NODE_ENV':'"production"'}});
  await writeFile(resolve(output,'style.css'),(await readFile('app/globals.css','utf8')));
  // Version asset URLs by content so a new index.html never pairs with a cached old app.js or style.css.
  const version=async f=>createHash('sha256').update(await readFile(resolve(output,f))).digest('hex').slice(0,10);
  const [jsVersion,cssVersion]=await Promise.all([version('app.js'),version('style.css')]);
  await writeFile(resolve(output,'index.html'),'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>Policy Radar</title><script>try{const t=localStorage.getItem(\'theme\');if(t===\'light\'||t===\'dark\')document.documentElement.dataset.theme=t}catch{}</script><link rel="icon" href="./favicon.svg"><link rel="stylesheet" href="./style.css?v='+cssVersion+'"></head><body><div id="root"></div><script type="module" src="./app.js?v='+jsVersion+'"></script></body></html>');
  await copyFile('public/favicon.svg',resolve(output,'favicon.svg'));
  await writeFile(resolve(output,'.nojekyll'),'');
  await writeFile(resolve(output,'data.json'),JSON.stringify(data));
  await writeFile(resolve(output,'policy-radar-export.json'),raw);
  for(const s of exported.tables.snapshots){
    if(!snapshotKey.test(s.key))throw Error('Unsafe snapshot key');
    const bytes=readSnapshot(source,s);
    if(createHash('sha256').update(bytes).digest('hex')!==s.hash)throw Error('Snapshot checksum mismatch: '+s.key);
    // Original third-party HTML is downloadable evidence, never an executable page on our origin.
    const target=resolve(output,s.key+'.bin');
    await mkdir(dirname(target),{recursive:true});await writeFile(target,bytes);
  }
  await rm('dist',{recursive:true,force:true});
  await rename(output,'dist');
  console.log(`Static site built: ${data.policies.length} policies, ${exported.tables.revisions.length} revisions, ${exported.tables.snapshots.length} verified evidence files. No server credentials required.`);
} finally {await rm(output,{recursive:true,force:true});}
