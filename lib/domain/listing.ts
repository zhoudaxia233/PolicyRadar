import {countryOf,selectPolicies,policyTags,type Policy} from './model.ts';
import {type IntakeRecord} from './intake.ts';
import {type readFilters} from './filters.ts';

export function selectIntake(records:IntakeRecord[],region:string,tags:string[],query:string,searchText?:(p:{id:string})=>string){const q=query.trim().toLocaleLowerCase();return records.filter(r=>(region==='all'||r.region===region)&&(!tags.length||tags.some(t=>policyTags(r).includes(t)))&&(!q||(searchText?.(r)??[r.title,r.titleZh,r.officialId,r.note,...policyTags(r)].join(' ')).toLocaleLowerCase().includes(q))).sort((a,b)=>b.date.localeCompare(a.date));}

// Lists and navigation counts share scope, matching and inclusion rules.
export function selectListing(items:Policy[],records:IntakeRecord[],filters:ReturnType<typeof readFilters>,searchText?:(p:{id:string})=>string){
 const {country,view,region,query,tags}=filters;
 const scoped=items.filter(p=>countryOf(p.region)===country);
 const intake=records.filter(r=>countryOf(r.region)===country);
 const unexplained=intake.filter(r=>!scoped.some(p=>r.officialId&&p.officialId===r.officialId&&p.region===r.region));
 const policies=selectPolicies(scoped,view,region,'all',query,tags,searchText);
 const raw=selectIntake(unexplained,region,tags,query,searchText).filter(r=>view==='all'||r.stage===view);
 const progress=selectIntake(intake,region,tags,query,searchText);
 return {policies,raw,progress,count:view==='intake'?progress.length:policies.length+raw.length};
}

// A country's source panel must not leak another country's check history.
export function countrySourceUrls(country:string,items:Policy[],records:IntakeRecord[],discovery:{region:string;url:string}[]){
 return new Set([
  ...items.filter(p=>countryOf(p.region)===country).flatMap(p=>p.sources.map(s=>s.url)),
  ...records.filter(r=>countryOf(r.region)===country).map(r=>r.url),
  ...discovery.filter(d=>countryOf(d.region)===country).map(d=>d.url),
 ]);
}
