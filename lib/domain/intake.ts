import {z} from 'zod';
import {dateSchema,regions,tagsSchema} from './model.ts';
import {discoveryForYear,type DiscoverySource} from './coverage.ts';
export const trackingStart='2026-10-02';
const url=z.string().url().refine(u=>{const p=new URL(u);return p.protocol==='https:'&&!p.username&&!p.password&&!p.port;});
const text=z.string().trim().min(1).max(6000);
// Raw discoveries remain available even before a policy explanation exists.
export const intakeSchema=z.object({
 originalLanguage:z.string().regex(/^[a-z]{2,3}(?:-[A-Za-z0-9]+)*$/).optional(),
 id:z.string().regex(/^[a-z0-9-]+$/).max(100),region:z.string().refine(r=>regions.some(x=>x.id===r)),
 supersedes:z.string().regex(/^[a-z0-9-]+$/).max(100).optional(),
 title:text,titleZh:text.optional(),date:dateSchema,dateKind:z.enum(['published','adopted','announced']).default('published'),
 adoptionDate:dateSchema.nullable().optional(),effectiveDate:dateSchema.nullable().optional(),
 url,sourceUrl:url,officialId:text.optional(),kind:z.enum(['law','regulation','decision','announcement']),
 stage:z.enum(['adopted','pending','unverified']).default('unverified'),note:text,tags:tagsSchema.default([])
}).strict();
export const scanSchema=z.object({
 id:z.string().regex(/^[a-z0-9-]+$/).max(100),sourceUrl:url,checkedAt:z.string().datetime(),
 windowStart:dateSchema,windowEnd:dateSchema,status:z.enum(['complete','partial','blocked']),
 pages:z.array(url).max(200),recordIds:z.array(z.string().regex(/^[a-z0-9-]+$/)).max(300),
 excluded:z.array(z.object({url,reason:text}).strict()).max(300).default([]),
 allPagesChecked:z.boolean().default(false),totalListed:z.number().int().min(0).nullable().default(null),note:text
}).strict().superRefine((s,c)=>{
 if(s.windowStart<trackingStart||s.windowEnd<s.windowStart)c.addIssue({code:'custom',message:'Invalid monitoring interval'});
 const urls=[...s.recordIds,...s.excluded.map(x=>x.url)];
 if(new Set(urls).size!==urls.length)c.addIssue({code:'custom',message:'Duplicate listed documents'});
 if(s.status==='complete'&&(!s.pages.length||!s.allPagesChecked||s.totalListed!==urls.length))c.addIssue({code:'custom',message:'Complete scan needs all pages and reconciled listed documents'});
});
export const intakeBatchSchema=z.object({records:z.array(intakeSchema).max(100),scans:z.array(scanSchema).max(100)}).strict();
export type IntakeRecord=z.infer<typeof intakeSchema>;
export type Scan=z.infer<typeof scanSchema>;
export function berlinDate(now=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);}
export function validateScanTime(s:Scan,now=new Date()){
 if(Date.parse(s.checkedAt)>now.getTime()+60000||s.windowEnd>berlinDate(now))throw Error('Scan is in the future');
 if(s.status==='complete'&&(s.windowEnd>=berlinDate(now)||s.windowEnd>=berlinDate(new Date(s.checkedAt))))throw Error('An ongoing day cannot be marked complete');
}
const nextDay=(date:string)=>new Date(Date.parse(date+'T12:00:00Z')+86400000).toISOString().slice(0,10);
export function coverageRows(scans:Scan[],year:number,registry?:DiscoverySource[]){return discoveryForYear(year,registry).map(source=>{
 // Annual source URLs represent one channel. Do not reset its history at New Year.
 const sourceUrls=new Set(Array.from({length:Math.max(1,year-2026+1)},(_,i)=>discoveryForYear(2026+i,registry).find(d=>d.region===source.region&&d.publisher===source.publisher&&d.title.replace(/20\d{2}/g,'YEAR')===source.title.replace(/20\d{2}/g,'YEAR'))?.url).filter(Boolean));
 sourceUrls.add(source.url);
 const history=scans.filter(s=>sourceUrls.has(s.sourceUrl)).sort((a,b)=>b.checkedAt.localeCompare(a.checkedAt));
 let next=trackingStart,coveredThrough:string|null=null;
 for(const scan of history.filter(s=>s.status==='complete').sort((a,b)=>a.windowStart.localeCompare(b.windowStart))){if(scan.windowStart<=next&&scan.windowEnd>=next){coveredThrough=scan.windowEnd;next=nextDay(scan.windowEnd);}}
 return {...source,coveredThrough,nextUncovered:next,latestScan:history[0]??null};
});}
