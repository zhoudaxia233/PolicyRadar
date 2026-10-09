import {execFileSync} from 'node:child_process';
import {createStaticData} from '../lib/static-data.ts';
import {validateSelection} from '../lib/update-data.ts';
import {readExportAtRef,isSafeExportPointer,storeDir} from '../lib/export-store.ts';
const git=(...args)=>execFileSync('git',args,{encoding:'utf8',maxBuffer:512*1024*1024}).trim();
const read=(ref,path)=>execFileSync('git',['show',`${ref}:${path}`],{encoding:'utf8',maxBuffer:512*1024*1024});
const pointerAt=ref=>{const path=JSON.parse(read(ref,'data/current-export.json')).path;if(!isSafeExportPointer(path))throw Error('Unsafe export pointer');return path;};
const load=(ref,path)=>readExportAtRef(ref,path,(...args)=>execFileSync('git',args,{encoding:'utf8',maxBuffer:512*1024*1024}));
const storeTree=ref=>{try{return git('rev-parse',`${ref}:${storeDir}`);}catch{return null;}};
let base=process.argv[2]||process.env.HISTORY_BASE;
const head=process.argv[3]||'HEAD';
// New-branch pushes have an all-zero before SHA. Manual/root runs may have none.
// With no event baseline, validate the head transition against its first parent.
// A root commit has no transition: validate its initial export as a baseline.
if(!base||/^0+$/.test(base)){
 base=git('rev-list','--parents','-n','1',head).split(' ')[1];
 if(!base){
  createStaticData(load(head,pointerAt(head)));
  console.log('Validated initial export; no parent transition exists');
  process.exit(0);
 }
}
git('merge-base','--is-ancestor',base,head);
// Include feature-branch selections before the merge commit; first-parent-only
// traversal would mistake a reviewed policy's versions 1 -> 2 for a jump 0 -> 2.
const commits=git('rev-list','--topo-order','--reverse',`${base}..${head}`).split('\n').filter(Boolean);
let previous=base;
for(const commit of commits){
 const oldPath=pointerAt(previous),nextPath=pointerAt(commit);
 // Per-run export files are immutable forever, including after the move to data/store.
 if(oldPath!==storeDir&&read(commit,oldPath)!==read(previous,oldPath))throw Error('Previously selected export changed in place');
 if(oldPath===storeDir&&nextPath!==storeDir)throw Error('Selection cannot move from data/store back to a per-run export');
 if(nextPath===storeDir){
  // The store is edited in place: every content change is a selection transition.
  if(oldPath!==storeDir||storeTree(previous)!==storeTree(commit))validateSelection(load(previous,oldPath),load(commit,nextPath));
 }else if(oldPath!==nextPath)validateSelection(load(previous,oldPath),load(commit,nextPath));
 else if(read(previous,oldPath)!==read(commit,nextPath))throw Error('Active export changed without selection');
 previous=commit;
}
console.log(`Validated ${commits.length} commit transitions`);
