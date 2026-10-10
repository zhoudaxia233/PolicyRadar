import {groupRecords,type Topic,type RecordGroup} from './topics.ts';
import {countryOf,selectPolicies,policyTags,type Policy} from './model.ts';
import {type IntakeRecord} from './intake.ts';
import {type readFilters} from './filters.ts';
import type {Disposition} from './dispositions.ts';

// Announcements without an official number use their exact source URL as identity.
// Never match a numbered law by URL: one gazette can contain several laws.
export function explainsRecord(p:Pick<Policy,'officialId'|'region'>,r:Pick<IntakeRecord,'officialId'|'region'|'url'>){
 return p.region===r.region&&p.officialId===(r.officialId??r.url);
}

export function selectIntake(records:IntakeRecord[],region:string,tags:string[],query:string,searchText?:(p:{id:string})=>string,lowercased=false){const q=query.trim().toLocaleLowerCase();return records.filter(r=>(region==='all'||r.region===region)&&(!tags.length||tags.some(t=>policyTags(r).includes(t)))&&(!q||(lowercased&&searchText?searchText(r):(searchText?.(r)??[r.title,r.titleZh,r.officialId,r.note,...policyTags(r)].join(' ')).toLocaleLowerCase()).includes(q))).sort((a,b)=>b.date.localeCompare(a.date));}

const searchCaches=new WeakMap<(p:{id:string})=>string,WeakMap<Topic[],Map<string,string>>>();
function cachedSearch(searchText:(p:{id:string})=>string,topics:Topic[]){
 let byTopics=searchCaches.get(searchText);
 if(!byTopics){byTopics=new WeakMap();searchCaches.set(searchText,byTopics);}
 let cache=byTopics.get(topics);
 if(!cache){cache=new Map();byTopics.set(topics,cache);}
 return cache;
}

// Lists and navigation counts share scope, matching and inclusion rules.
export function selectListing(items:Policy[],records:IntakeRecord[],filters:ReturnType<typeof readFilters>,searchText?:(p:{id:string})=>string,today?:string,topics:Topic[]=[],dispositions:Disposition[]=[]){
 const {country,view,region,query,tags}=filters;
 const scoped=items.filter(p=>countryOf(p.region)===country);
 const intake=records.filter(r=>countryOf(r.region)===country);
 // Same identity rule as explainsRecord, indexed so each render does not scan every policy per record.
 const explained=new Set(scoped.map(p=>p.region+'\0'+p.officialId));
 // Records reviewed as needing no explanation leave the awaiting list but stay in official progress.
 const dismissed=new Set(dispositions.flatMap(d=>d.recordIds));
 const unexplained=intake.filter(r=>!explained.has(r.region+'\0'+(r.officialId??r.url)));
 const awaiting=unexplained.filter(r=>!dismissed.has(r.id));
 const recordsById=new Map(intake.map(r=>[r.id,r]));
 const topicText=new Map(topics.flatMap(t=>t.recordIds.map(id=>[id,t.title.join(' ')] as const)));
 const text=(r:{id:string})=>[searchText?.(r)??[recordsById.get(r.id)].filter(x=>x!==undefined).map(x=>[x.title,x.titleZh,x.officialId,x.note,...policyTags(x)].join(' ')).join(' '),topicText.get(r.id)??''].join(' ');
 // Search text depends only on the search function and topic titles; reuse it across the many count calls of one render.
 const cache=searchText&&cachedSearch(searchText,topics);
 const recordSearch=cache?(r:{id:string})=>{let value=cache.get(r.id);if(value===undefined){value=text(r).toLocaleLowerCase();cache.set(r.id,value);}return value;}:text;
 const progress=selectIntake(intake,region,tags,query,recordSearch,!!cache);
 const progressIds=new Set(progress.map(r=>r.id));
 const matchingPolicyIds=new Set(topics.filter(t=>t.recordIds.some(id=>progressIds.has(id))).flatMap(t=>t.policyIds));
 const policyMatches=selectPolicies(scoped,view,region,'all','',tags,searchText,today).filter(p=>!query.trim()||matchingPolicyIds.has(p.id)||selectPolicies([p],view,region,'all',query,tags,searchText,today).length>0);
 const matchedPolicyIds=new Set(policyMatches.map(p=>p.id));
 const rawMatches=selectIntake(awaiting,region,tags,query,recordSearch,!!cache).filter(r=>view==='all'||r.stage===view);
 const reviewed=selectIntake(unexplained.filter(r=>dismissed.has(r.id)),region,tags,query,recordSearch,!!cache).filter(r=>view==='all'||r.stage===view);
 const rawGroups=groupRecords(rawMatches,topics).filter(g=>!g.policyIds.some(id=>matchedPolicyIds.has(id)));
 const raw=rawGroups.flatMap(g=>g.records),progressGroups=groupRecords(progress,topics);
 const explainedGroups=topics.filter(t=>['all','adopted','pending'].includes(view)&&t.policyIds.length>1&&t.policyIds.some(id=>matchedPolicyIds.has(id))).flatMap(t=>{
  const members=new Set(t.recordIds);
  const matches=progress.filter(r=>members.has(r.id));
  const fallback=intake.filter(r=>members.has(r.id)&&(region==='all'||r.region===region)&&policyMatches.some(p=>t.policyIds.includes(p.id)&&explainsRecord(p,r)));
  return groupRecords(matches.length?matches:fallback,[t]);
 });
 const groupedPolicyIds=new Set(explainedGroups.flatMap(g=>g.policyIds));
 const policies=policyMatches.filter(p=>!groupedPolicyIds.has(p.id));
 // One dated card per matter, sorted and split into upcoming/past like any other card. The
 // card follows the matter's first open or adopted explanation: a closed version (e.g. a
 // rejected bill) must not label the whole matter as ended while another version is active.
 const leads=new Map(explainedGroups.map(g=>{const members=policyMatches.filter(p=>g.policyIds.includes(p.id));return [g,members.find(p=>p.phase!=='closed')??members[0]] as const;}));
 const cards:{policy:Policy;group?:RecordGroup}[]=[];
 for(const policy of policyMatches){
  const group=explainedGroups.find(g=>g.policyIds.includes(policy.id));
  if(!group)cards.push({policy});
  else if(leads.get(group)===policy)cards.push({policy,group});
 }
 const policyIds=new Set(policies.map(p=>p.id));
 const policyGroups=progressGroups.filter(g=>g.title&&g.policyIds.some(id=>policyIds.has(id)));
 return {policies,cards,raw,reviewed,progress,rawGroups,progressGroups,policyGroups,explainedGroups,explainedCount:policyMatches.length,count:view==='intake'?progressGroups.length:policies.length+rawGroups.length+explainedGroups.length};
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
