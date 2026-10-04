import {execFileSync} from 'node:child_process';
import {readFile,writeFile,mkdir,unlink,rmdir} from 'node:fs/promises';
import {dirname,basename} from 'node:path';
import {createHash} from 'node:crypto';
const paths=execFileSync('git',['ls-files','-z','data/exports'],{encoding:'utf8'}).split('\0').filter(p=>/\/sources\/[^/]+\/[^/]+\.(html|pdf)$/.test(p));
await mkdir('data/sources',{recursive:true});
// Verify all inputs before removing a single old copy.
for(const path of paths){const name=basename(path),bytes=await readFile(path).catch(e=>{if(e.code!=='ENOENT')throw e;return readFile('data/sources/'+name);});if(createHash('sha256').update(bytes).digest('hex')!==name.split('.')[0])throw Error('Invalid archive: '+path);const target='data/sources/'+name;try{await writeFile(target,bytes,{flag:'wx'});}catch(e){if(e.code!=='EEXIST')throw e;if(!(await readFile(target)).equals(bytes))throw Error('Conflicting archive: '+target);}}
for(const path of paths)await unlink(path).catch(e=>{if(e.code!=='ENOENT')throw e;});
for(const dir of new Set(paths.map(dirname)))await rmdir(dir).catch(e=>{if(e.code!=='ENOENT')throw e;});
for(const dir of new Set(paths.map(p=>dirname(dirname(p)))))await rmdir(dir).catch(e=>{if(!['ENOTEMPTY','ENOENT'].includes(e.code))throw e;});
console.log(`Compacted ${paths.length} verified source copies`);
