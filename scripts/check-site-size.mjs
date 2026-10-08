import {readdir,stat} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

// GitHub Pages rejects published sites above 1 GB. Fail well before that so moving
// the evidence archive is a planned decision, not a blocked deployment.
export const siteSizeLimit=700*1000*1000;
export async function siteSize(dir){
 let total=0;
 for(const entry of await readdir(dir,{withFileTypes:true})){
  const path=resolve(dir,entry.name);
  total+=entry.isDirectory()?await siteSize(path):(await stat(path)).size;
 }
 return total;
}
export async function checkSiteSize(dir,limit=siteSizeLimit){
 const size=await siteSize(dir);
 if(size>limit)throw Error(`Built site is ${(size/1e6).toFixed(0)} MB, above the ${(limit/1e6).toFixed(0)} MB limit. GitHub Pages rejects sites above 1 GB; move archived evidence out of the Pages build before publishing more.`);
 return size;
}
if(import.meta.url===pathToFileURL(process.argv[1]).href){
 const size=await checkSiteSize(process.argv[2]||'dist');
 console.log(`Built site size: ${(size/1e6).toFixed(0)} MB of ${(siteSizeLimit/1e6).toFixed(0)} MB limit`);
}
