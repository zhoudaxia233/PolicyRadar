import {groupRecords,type Topic} from './topics.ts';
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
export function selectListing(items:Policy[],records:IntakeRecord[],filters:ReturnType<typeof readFilters>,searchText?:(p:{id:string})=>string,today?:string,topics:Topic[]=[]){
 const {country,view,region,query,tags}=filters;
 const scoped=items.filter(p=>countryOf(p.region)===country);
 const intake=records.filter(r=>countryOf(r.region)===country);
 const unexplained=intake.filter(r=>!scoped.some(p=>explainsRecord(p,r)));
 const recordsById=new Map(intake.map(r=>[r.id,r]));
 const topicText=new Map(topics.flatMap(t=>t.recordIds.map(id=>[id,t.title.join(' ')] as const)));
 const recordSearch=(r:{id:string})=>[searchText?.(r)??[recordsById.get(r.id)].filter(x=>x!==undefined).map(x=>[x.title,x.titleZh,x.officialId,x.note,...policyTags(x)].join(' ')).join(' '),topicText.get(r.id)??''].join(' ');
 const progress=selectIntake(intake,region,tags,query,recordSearch);
 const matchingPolicyIds=new Set(topics.filter(t=>t.recordIds.some(id=>progress.some(r=>r.id===id))).flatMap(t=>t.policyIds));
 const policyMatches=selectPolicies(scoped,view,region,'all','',tags,searchText,today).filter(p=>!query.trim()||matchingPolicyIds.has(p.id)||selectPolicies([p],view,region,'all',query,tags,searchText,today).length>0);
 const rawMatches=selectIntake(unexplained,region,tags,query,recordSearch).filter(r=>view==='all'||r.stage===view);
 const rawGroups=groupRecords(rawMatches,topics).filter(g=>!g.policyIds.some(id=>policyMatches.some(p=>p.id===id)));
 const raw=rawGroups.flatMap(g=>g.records),progressGroups=groupRecords(progress,topics);
 const explainedGroups=topics.filter(t=>['all','adopted','pending'].includes(view)&&t.policyIds.length>1&&t.policyIds.some(id=>policyMatches.some(p=>p.id===id))).flatMap(t=>{
  const matches=progress.filter(r=>t.recordIds.includes(r.id));
  const fallback=intake.filter(r=>t.recordIds.includes(r.id)&&(region==='all'||r.region===region)&&policyMatches.some(p=>t.policyIds.includes(p.id)&&explainsRecord(p,r)));
  return groupRecords(matches.length?matches:fallback,[t]);
 });
 const policies=policyMatches.filter(p=>!explainedGroups.some(g=>g.policyIds.includes(p.id)));
 const policyGroups=groupRecords(progress,topics).filter(g=>g.title&&g.policyIds.some(id=>policies.some(p=>p.id===id)));
 return {policies,raw,progress,rawGroups,progressGroups,policyGroups,explainedGroups,explainedCount:policyMatches.length,count:view==='intake'?progressGroups.length:policies.length+rawGroups.length+explainedGroups.length};
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
