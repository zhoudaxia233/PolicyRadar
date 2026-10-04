import {execFileSync} from 'node:child_process';
import {createStaticData} from '../lib/static-data.ts';
import {validateSelection} from '../lib/update-data.ts';
const git=(...args)=>execFileSync('git',args,{encoding:'utf8',maxBuffer:32*1024*1024}).trim();
const read=(ref,path)=>execFileSync('git',['show',`${ref}:${path}`],{encoding:'utf8',maxBuffer:32*1024*1024});
let base=process.argv[2]||process.env.HISTORY_BASE;
const head=process.argv[3]||'HEAD';
// New-branch pushes have an all-zero before SHA. Manual/root runs may have none.
// With no event baseline, validate the head transition against its first parent.
// A root commit has no transition: validate its initial export as a baseline.
if(!base||/^0+$/.test(base)){
 base=git('rev-list','--parents','-n','1',head).split(' ')[1];
 if(!base){
  const path=JSON.parse(read(head,'data/current-export.json')).path;
  if(!/^data\/exports\/[a-zA-Z0-9-]+\/policy-radar-export\.json$/.test(path))throw Error('Unsafe export pointer');
  createStaticData(JSON.parse(read(head,path)));
  console.log('Validated initial export; no parent transition exists');
  process.exit(0);
 }
}
git('merge-base','--is-ancestor',base,head);
const commits=git('rev-list','--first-parent','--reverse',`${base}..${head}`).split('\n').filter(Boolean);
let previous=base;
for(const commit of commits){
 const oldPath=JSON.parse(read(previous,'data/current-export.json')).path;
 const nextPath=JSON.parse(read(commit,'data/current-export.json')).path;
 for(const path of [oldPath,nextPath])if(!/^data\/exports\/[a-zA-Z0-9-]+\/policy-radar-export\.json$/.test(path))throw Error('Unsafe export pointer');
 const before=read(previous,oldPath),after=read(commit,nextPath);
 if(read(commit,oldPath)!==before)throw Error('Previously selected export changed in place');
 if(oldPath!==nextPath)validateSelection(JSON.parse(before),JSON.parse(after));
 else if(before!==after)throw Error('Active export changed without selection');
 previous=commit;
}
console.log(`Validated ${commits.length} commit transitions`);
