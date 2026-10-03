import {countryOf,selectPolicies,policyTags,type Policy} from './model.ts';
import {type IntakeRecord} from './intake.ts';
import {type readFilters} from './filters.ts';

export function selectIntake(records:IntakeRecord[],region:string,tags:string[],query:string){const q=query.trim().toLocaleLowerCase();return records.filter(r=>(region==='all'||r.region===region)&&(!tags.length||tags.some(t=>policyTags(r).includes(t)))&&(!q||[r.title,r.titleZh,r.officialId,r.note,...policyTags(r)].join(' ').toLocaleLowerCase().includes(q))).sort((a,b)=>b.date.localeCompare(a.date));}

// Lists and navigation counts share scope, matching and inclusion rules.
export function selectListing(items:Policy[],records:IntakeRecord[],filters:ReturnType<typeof readFilters>){
 const {country,view,region,query,tags}=filters;
 const scoped=items.filter(p=>countryOf(p.region)===country);
 const intake=records.filter(r=>countryOf(r.region)===country);
 const unexplained=intake.filter(r=>!scoped.some(p=>r.officialId&&p.officialId===r.officialId&&p.region===r.region));
 const policies=selectPolicies(scoped,view,region,'all',query,tags);
 const raw=selectIntake(unexplained,region,tags,query).filter(r=>view==='all'||r.stage===view);
 const progress=selectIntake(intake,region,tags,query);
 return {policies,raw,progress,count:view==='intake'?progress.length:policies.length+raw.length};
}
