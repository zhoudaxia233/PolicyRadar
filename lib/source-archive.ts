import {readFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {createHash} from 'node:crypto';
import {snapshotKey} from './static-data.ts';
// Historical exports retain their original logical keys; storage is content-addressed.
export function readSnapshot(exportPath:string,snapshot:{key:string;hash:string},root=process.cwd()){
 if(!snapshotKey.test(snapshot.key)||!snapshot.key.includes('/'+snapshot.hash+'.'))throw Error('Unsafe snapshot key or hash');
 let bytes:Buffer;
 try{bytes=readFileSync(resolve(dirname(exportPath),snapshot.key));}
 catch(error){if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error;bytes=readFileSync(resolve(root,'data/sources',snapshot.key.split('/').at(-1)!));}
 if(createHash('sha256').update(bytes).digest('hex')!==snapshot.hash)throw Error('Snapshot checksum mismatch: '+snapshot.key);
 return bytes;
}
