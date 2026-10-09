import {readSnapshot} from '../lib/source-archive.ts';
import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {validateSelection} from '../lib/update-data.ts';
import {readExport,readExportAtRef,storeDir,storeTables} from '../lib/export-store.ts';

// The selected data is edited in place in data/store. This gate compares the
// working tree with the selection committed at HEAD, so lost history, missing
// revisions, unarchived citations and invalid scans are rejected before commit.
if(process.argv[2]&&process.argv[2]!==storeDir)throw Error('Usage: npm run data:select  (validates data/store against the committed selection; per-run export copies are no longer created)');
const git=(...args)=>execFileSync('git',args,{encoding:'utf8',maxBuffer:512*1024*1024});
const pointer='data/current-export.json';
const fingerprint=()=>{
 const hash=createHash('sha256').update(readFileSync(pointer)).update(readFileSync(join(storeDir,'meta.json')));
 for(const table of storeTables)for(const name of readdirSync(join(storeDir,table)).sort())hash.update(table+name).update(readFileSync(join(storeDir,table,name)));
 return hash.digest('hex');
};
const before=fingerprint();
const committed=JSON.parse(git('show','HEAD:'+pointer)).path;
const next=readExport(storeDir);
const summary=validateSelection(readExportAtRef('HEAD',committed,git),next);
for(const s of next.tables.snapshots)readSnapshot(join(storeDir,'meta.json'),s);
if(fingerprint()!==before)throw Error('Data changed during validation; rerun the gate');
const text=JSON.stringify({path:storeDir},null,2)+'\n';
if(readFileSync(pointer,'utf8')!==text)writeFileSync(pointer,text);
console.log(JSON.stringify({selected:storeDir,comparedWith:committed,...summary}));
