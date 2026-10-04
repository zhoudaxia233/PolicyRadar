import {readSnapshot} from '../lib/source-archive.ts';
import {readFile,writeFile,rename,unlink} from 'node:fs/promises';
import {resolve,relative,dirname} from 'node:path';
import {randomUUID,createHash} from 'node:crypto';
import {validateSelection} from '../lib/update-data.ts';

const candidatePath=process.argv[2];
if(!candidatePath)throw Error('Usage: npm run data:select -- data/exports/RUN/policy-radar-export.json');
const selected=relative(process.cwd(),resolve(candidatePath)).split('\\').join('/');
if(!/^data\/exports\/[a-zA-Z0-9-]+\/policy-radar-export\.json$/.test(selected))throw Error('Candidate must be in a new data/exports run directory');
const pointer='data/current-export.json',before=await readFile(pointer,'utf8');
const current=JSON.parse(before).path;
if(resolve(current)===resolve(selected))throw Error('Create a new export; never edit the active export in place');
const oldRaw=await readFile(current,'utf8'),raw=await readFile(selected,'utf8');
const next=JSON.parse(raw);
const summary=validateSelection(JSON.parse(oldRaw),next);
for(const s of next.tables.snapshots){
 const bytes=readSnapshot(selected,s);
 if(createHash('sha256').update(bytes).digest('hex')!==s.hash)throw Error('Snapshot checksum mismatch: '+s.key);
}
if(await readFile(pointer,'utf8')!==before||await readFile(current,'utf8')!==oldRaw||await readFile(selected,'utf8')!==raw)throw Error('Data changed during validation; retry from the current export');
const tmp=pointer+'.'+randomUUID()+'.tmp';
try{await writeFile(tmp,JSON.stringify({path:selected},null,2)+'\n',{flag:'wx'});await rename(tmp,pointer);}finally{await unlink(tmp).catch(e=>{if(e.code!=='ENOENT')throw e;});}
console.log(JSON.stringify({selected,...summary}));
