import {countryOf,selectPolicies,policyTags,type Policy} from './model.ts';
import {type IntakeRecord} from './intake.ts';
import {type readFilters} from './filters.ts';

// Announcements without an official number use their exact source URL as identity.
// Never match a numbered law by URL: one gazette can contain several laws.
export function explainsRecord(p:Pick<Policy,'officialId'|'region'>,r:Pick<IntakeRecord,'officialId'|'region'|'url'>){
 return p.region===r.region&&p.officialId===(r.officialId??r.url);
}

export function selectIntake(records:IntakeRecord[],region:string,tags:string[],query:string,searchText?:(p:{id:string})=>string){const q=query.trim().toLocaleLowerCase();return records.filter(r=>(region==='all'||r.region===region)&&(!tags.length||tags.some(t=>policyTags(r).includes(t)))&&(!q||(searchText?.(r)??[r.title,r.titleZh,r.officialId,r.note,...policyTags(r)].join(' ')).toLocaleLowerCase().includes(q))).sort((a,b)=>b.date.localeCompare(a.date));}

// Lists and navigation counts share scope, matching and inclusion rules.
export function selectListing(items:Policy[],records:IntakeRecord[],filters:ReturnType<typeof readFilters>,searchText?:(p:{id:string})=>string,today?:string){
 const {country,view,region,query,tags}=filters;
 const scoped=items.filter(p=>countryOf(p.region)===country);
 const intake=records.filter(r=>countryOf(r.region)===country);
 const unexplained=intake.filter(r=>!scoped.some(p=>explainsRecord(p,r)));
 const policies=selectPolicies(scoped,view,region,'all',query,tags,searchText,today);
 const raw=selectIntake(unexplained,region,tags,query,searchText).filter(r=>view==='all'||r.stage===view);
 const progress=selectIntake(intake,region,tags,query,searchText);
 return {policies,raw,progress,count:view==='intake'?progress.length:policies.length+raw.length};
}

// The shared timeline shows official events only. Corrections are dated by our own
// review and stay in each policy's detail history.
export function timelineEvents(policies:Policy[],today:string){
 const events=policies.flatMap(p=>p.events.filter(e=>e.kind!=='correction').map(e=>({p,e})));
 return {
  scheduled:events.filter(x=>x.e.kind==='scheduled'&&x.e.date>=today).sort((a,b)=>a.e.date.localeCompare(b.e.date)),
  happened:events.filter(x=>x.e.kind!=='scheduled').sort((a,b)=>b.e.date.localeCompare(a.e.date)),
 };
}

// A country's source panel must not leak another country's check history.
export function countrySourceUrls(country:string,items:Policy[],records:IntakeRecord[],discovery:{region:string;url:string}[]){
 return new Set([
  ...items.filter(p=>countryOf(p.region)===country).flatMap(p=>p.sources.map(s=>s.url)),
  ...records.filter(r=>countryOf(r.region)===country).map(r=>r.url),
  ...discovery.filter(d=>countryOf(d.region)===country).map(d=>d.url),
 ]);
}
