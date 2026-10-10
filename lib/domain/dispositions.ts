import {z} from 'zod';
import {countryOf,type Policy} from './model.ts';
import type {IntakeRecord} from './intake.ts';
import {explainsRecord} from './listing.ts';
import type {Topic} from './topics.ts';

const text=z.string().trim().min(1);
const reference=z.union([
 z.object({region:text,officialId:text}).strict(),
 z.object({region:text,url:z.string().url(),title:text}).strict(),
]);
// A reviewed decision that an official record needs no policy explanation, for
// example exchange rates, corrigenda that do not change the text, individual
// merger notifications or parliamentary question times. The record stays in the
// official-progress view; only the "awaiting explanation" list leaves it out.
export const dispositionDefinitionsSchema=z.array(z.object({
 id:z.string().regex(/^[a-z0-9-]+$/),reason:z.tuple([text,text]),
 appliesFromExport:z.string().datetime().optional(),
 basis:text,documents:z.array(reference).min(1),
}).strict());
export type DispositionDefinition=z.infer<typeof dispositionDefinitionsSchema>[number];
export type Disposition={id:string;reason:[string,string];recordIds:string[]};

export function resolveDispositions(input:unknown,records:IntakeRecord[],policies:Policy[],topics:Topic[]):Disposition[]{
 const definitions=dispositionDefinitionsSchema.parse(input),ids=new Set<string>(),assigned=new Set<string>();
 const grouped=new Set(topics.flatMap(t=>t.recordIds));
 return definitions.map(definition=>{
  if(ids.has(definition.id))throw Error('Duplicate disposition ID: '+definition.id);
  ids.add(definition.id);
  const members=new Map<string,IntakeRecord>();
  for(const ref of definition.documents){
   const matches=records.filter(r=>r.region===ref.region&&('officialId'in ref?r.officialId===ref.officialId:r.url===ref.url&&r.title===ref.title));
   if(!matches.length)throw Error('Unresolved disposition document: '+definition.id+' '+JSON.stringify(ref));
   for(const record of matches)members.set(record.id,record);
  }
  if(new Set([...members.values()].map(r=>countryOf(r.region))).size!==1)throw Error('Cross-country disposition: '+definition.id);
  for(const record of members.values()){
   if(assigned.has(record.id))throw Error('Document has multiple dispositions: '+record.id);
   assigned.add(record.id);
   // A record that is explained, or related to a concrete matter, cannot also be "no explanation needed".
   if(policies.some(p=>explainsRecord(p,record)))throw Error('Explained document cannot be dismissed: '+record.id);
   if(grouped.has(record.id))throw Error('Grouped document cannot be dismissed: '+record.id);
  }
  return {id:definition.id,reason:definition.reason,recordIds:[...members.keys()]};
 });
}

// Historical snapshot builds must not acquire decisions reviewed against newer records.
export function resolveDispositionRegistry(input:unknown,data:{exportedAt:string;intake:{records:IntakeRecord[]};policies:Policy[]},topics:Topic[]):Disposition[]{
 const registry=z.object({appliesFromExport:z.string().datetime(),dispositions:dispositionDefinitionsSchema}).strict().parse(input);
 return data.exportedAt<registry.appliesFromExport?[]:resolveDispositions(registry.dispositions.filter(d=>!d.appliesFromExport||data.exportedAt>=d.appliesFromExport),data.intake.records,data.policies,topics);
}
