import {readFileSync,readdirSync,statSync,mkdirSync,writeFileSync,rmSync,existsSync} from 'node:fs';
import {join} from 'node:path';

// The selected data lives in one directory that is edited in place; git history
// keeps every earlier version. Rows are split into fixed-size chunks in their
// original order, so appending touches only the last chunk and no single file
// approaches GitHub's file-size limits. Historical data/exports/*/ files remain
// readable through the same loader.
export const storeDir='data/store';
export const storeTables=['policies','revisions','checks','snapshots','settings','intake','scan_runs'] as const;
export const storeChunkRows=1000;
const legacyExport=/^data\/exports\/[a-zA-Z0-9-]+\/policy-radar-export\.json$/;
export function isSafeExportPointer(path:string){return path===storeDir||legacyExport.test(path);}

// Rows stay untyped like JSON.parse output; schemas validate them where they are used.
type Exported={format:string;schemaVersion:number;exportedAt:string;discoveryRegistry?:unknown;tables:Record<string,any[]>};
const chunkName=(i:number)=>String(i).padStart(3,'0')+'.json';
const serialise=(value:unknown)=>JSON.stringify(value,null,2)+'\n';

// Relative file path -> exact file contents. Deterministic for identical data.
export function storeFiles(exported:Exported):Map<string,string>{
 const {tables,...meta}=exported;
 const unknown=Object.keys(tables).filter(t=>!(storeTables as readonly string[]).includes(t));
 if(unknown.length)throw Error('Unknown export table: '+unknown.join(', '));
 const files=new Map([['meta.json',serialise(meta)]]);
 for(const table of storeTables){
  const rows=tables[table];
  if(!Array.isArray(rows))throw Error('Missing export table: '+table);
  for(let i=0;i*storeChunkRows<Math.max(rows.length,1);i++)files.set(`${table}/${chunkName(i)}`,serialise(rows.slice(i*storeChunkRows,(i+1)*storeChunkRows)));
 }
 return files;
}

// Assemble an export from a reader so the same code serves the working tree and git refs.
export function assembleStore(read:(path:string)=>string,list:(table:string)=>string[]):Exported{
 const meta=JSON.parse(read('meta.json'));
 const tables:Record<string,any[]>={};
 for(const table of storeTables){
  const names=list(table).filter(n=>/^\d{3}\.json$/.test(n)).sort();
  if(!names.length)throw Error('Store table has no chunks: '+table);
  names.forEach((n,i)=>{if(n!==chunkName(i))throw Error('Store chunks must be consecutive: '+table+'/'+n);});
  tables[table]=names.flatMap(n=>JSON.parse(read(`${table}/${n}`)));
 }
 return {...meta,tables};
}

export function readExport(path:string):Exported{
 if(!statSync(path).isDirectory())return JSON.parse(readFileSync(path,'utf8'));
 return assembleStore(f=>readFileSync(join(path,f),'utf8'),t=>existsSync(join(path,t))?readdirSync(join(path,t)):[]);
}

export function writeStore(dir:string,exported:Exported){
 const files=storeFiles(exported);
 for(const table of storeTables){
  const folder=join(dir,table);
  mkdirSync(folder,{recursive:true});
  for(const name of readdirSync(folder))if(!files.has(`${table}/${name}`))rmSync(join(folder,name));
 }
 for(const [file,text] of files){
  const target=join(dir,file);
  if(!existsSync(target)||readFileSync(target,'utf8')!==text)writeFileSync(target,text);
 }
}

// Read the selected export as committed at a git ref (used by the history gate).
export function readExportAtRef(ref:string,path:string,git:(...args:string[])=>string):Exported{
 if(!isSafeExportPointer(path))throw Error('Unsafe export pointer');
 if(path!==storeDir)return JSON.parse(git('show',`${ref}:${path}`));
 return assembleStore(f=>git('show',`${ref}:${storeDir}/${f}`),t=>git('ls-tree','--name-only',ref,`${storeDir}/${t}/`).split('\n').filter(Boolean).map(p=>p.split('/').at(-1)!));
}
