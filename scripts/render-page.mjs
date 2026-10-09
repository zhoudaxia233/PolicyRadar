import {spawn} from 'node:child_process';
import {writeFile,mkdtemp,rm} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';

// Some official listings are script-rendered shells to a plain HTTP client.
// The local Chrome renders them like any visitor; it never logs in or bypasses
// access controls. Rendered DOM is discovery evidence, not the server's bytes.
const candidates=['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome','/usr/bin/google-chrome','/usr/bin/chromium','/usr/bin/chromium-browser'];
export function chromePath(env=process.env,exists=existsSync){
 const path=env.CHROME_PATH??candidates.find(p=>exists(p));
 if(!path)throw Error('No Chrome found; set CHROME_PATH');
 return path;
}
export function renderArgs(url,profile,budgetMs=15000){
 if(!/^https:\/\//.test(url))throw Error('Only https URLs are rendered');
 return ['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check',`--user-data-dir=${profile}`,`--virtual-time-budget=${budgetMs}`,'--dump-dom',url];
}
export const complete=html=>/<\/html>\s*$/i.test(html.toString('utf8',Math.max(0,html.length-64)));
export async function renderPage(url,{timeoutMs=60000,budgetMs=15000}={}){
 const profile=await mkdtemp(join(tmpdir(),'policy-radar-render-'));
 try{
  return await new Promise((resolve,reject)=>{
   const child=spawn(chromePath(),renderArgs(url,profile,budgetMs),{stdio:['ignore','pipe','ignore']});
   const chunks=[];
   const finish=()=>{clearTimeout(timer);const html=Buffer.concat(chunks);complete(html)?resolve(html):reject(Error('Incomplete render: '+url));};
   const timer=setTimeout(()=>{child.kill();finish();},timeoutMs);
   // Chrome can stay alive after dumping the DOM; stop once the document is complete.
   child.stdout.on('data',c=>{chunks.push(c);if(complete(Buffer.concat(chunks)))child.kill();});
   child.on('error',e=>{clearTimeout(timer);reject(e);});
   child.on('close',finish);
  });
 }finally{await rm(profile,{recursive:true,force:true});}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const [url,out,budget]=process.argv.slice(2);
 if(!url||!out)throw Error('Usage: npm run data:render -- <https-url> <output.html> [virtual-time-ms]');
 const html=await renderPage(url,budget?{budgetMs:Number(budget),timeoutMs:Number(budget)+60000}:{});
 await writeFile(out,html);
 console.log(JSON.stringify({url,out,renderedAt:new Date().toISOString(),bytes:html.length,sha256:createHash('sha256').update(html).digest('hex')}));
}
