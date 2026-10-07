import {dateSchema} from './model.ts';
import {scanSchema,validateScanTime} from './intake.ts';
import type {DiscoverySource} from './coverage.ts';

// Recent coverage is independent of the historical backlog. Partial retrieval
// never closes a day, even when a newer export has been published.
export function recentCoverage(sources:DiscoverySource[],input:unknown[],today:string){
 dateSchema.parse(today);
 const now=new Date(today+'T23:59:00+02:00');
 const scans=input.map(s=>scanSchema.parse(s));
 for(const scan of scans)validateScanTime(scan,now);
 const days=Array.from({length:7},(_,i)=>new Date(Date.parse(today+'T12:00:00Z')-(7-i)*86400000).toISOString().slice(0,10));
 return sources.map(source=>{
  const history=scans.filter(s=>s.sourceUrl===source.url);
  const missingDays=days.filter(day=>!history.some(s=>s.status==='complete'&&s.windowStart<=day&&s.windowEnd>=day));
  return {sourceUrl:source.url,region:source.region,title:source.title,windowStart:days[0],windowEnd:days[6],missingDays,
   latestScan:history.sort((a,b)=>b.checkedAt.localeCompare(a.checkedAt))[0]?.status??'never_scanned'};
 });
}
