import {z} from 'zod';
import {countryOf,type Policy} from './model.ts';
import type {IntakeRecord} from './intake.ts';

const text=z.string().trim().min(1);
// A document added to an existing matter later carries its own first export, so
// builds of older snapshots, which do not contain that record yet, still resolve.
const since={appliesFromExport:z.string().datetime().optional()};
const reference=z.union([
 z.object({region:text,officialId:text,...since}).strict(),
 z.object({region:text,url:z.string().url(),title:text,...since}).strict(),
]);
export const topicDefinitionsSchema=z.array(z.object({
 id:z.string().regex(/^[a-z0-9-]+$/),title:z.tuple([text,text]),
 appliesFromExport:z.string().datetime().optional(),
 basis:text,documents:z.array(reference).min(1),
 // Reviewed explanations of this matter whose own identifier is not one of its records,
 // e.g. an explanation keyed by a regulation's name while the record is the cabinet notice.
 explanations:z.array(z.union([z.string().regex(/^[a-z0-9-]+$/),z.object({id:z.string().regex(/^[a-z0-9-]+$/),...since}).strict()])).min(1).optional(),
}).strict());
export type TopicDefinition=z.infer<typeof topicDefinitionsSchema>[number];
export type Topic={id:string;title:[string,string];recordIds:string[];policyIds:string[]};
export type RecordGroup={id:string;title?:Topic['title'];records:IntakeRecord[];policyIds:string[]};

// Explicit, reviewed relations only. Similar names, shared gazettes and broad
// parent-law references are not enough to establish one concrete policy matter.
export function resolveTopics(input:unknown,records:IntakeRecord[],policies:Policy[]):Topic[]{
 const definitions=topicDefinitionsSchema.parse(input),ids=new Set<string>(),assigned=new Set<string>();
 return definitions.map(definition=>{
  if(ids.has(definition.id))throw Error('Duplicate topic ID: '+definition.id);
  ids.add(definition.id);
  const members=new Map<string,IntakeRecord>();
  for(const ref of definition.documents){
   const matches=records.filter(r=>r.region===ref.region&&('officialId'in ref?r.officialId===ref.officialId:r.url===ref.url&&r.title===ref.title));
   if(!matches.length)throw Error('Unresolved topic document: '+definition.id+' '+JSON.stringify(ref));
   for(const record of matches)members.set(record.id,record);
  }
  if(members.size<(definition.explanations?1:2))throw Error('A topic must relate at least two current records: '+definition.id);
  if(new Set([...members.values()].map(r=>countryOf(r.region))).size!==1)throw Error('Cross-country topic: '+definition.id);
  for(const id of members.keys()){
   if(assigned.has(id))throw Error('Document belongs to multiple topics: '+id);
   assigned.add(id);
  }
  // A shared overview URL can discuss unrelated measures. Link an explanation
  // only through a numbered identity, or an exact original title plus URL.
  const linked=policies.filter(p=>[...members.values()].some(r=>p.region===r.region&&(r.officialId&&!/^https?:/.test(r.officialId)?p.officialId===r.officialId:p.officialId===r.url&&p.originalTitle===r.title)));
  for(const id of (definition.explanations??[]).map(e=>typeof e==='string'?e:e.id)){
   const policy=policies.find(p=>p.id===id);
   if(!policy)throw Error('Unresolved topic explanation: '+definition.id+' '+id);
   if(countryOf(policy.region)!==countryOf([...members.values()][0].region))throw Error('Cross-country topic: '+definition.id);
   if(linked.includes(policy))throw Error('Topic explanation is already linked by its records: '+definition.id+' '+id);
   linked.push(policy);
  }
  return {id:definition.id,title:definition.title,recordIds:[...members.keys()],policyIds:linked.map(p=>p.id)};
 });
}

export function groupRecords(records:IntakeRecord[],topics:Topic[]):RecordGroup[]{
 const membership=new Map(topics.flatMap(t=>t.recordIds.map(id=>[id,t] as const)));
 const groups=new Map<string,RecordGroup>();
 for(const record of records){
  const topic=membership.get(record.id),id=topic?'topic:'+topic.id:'record:'+record.id;
  let group=groups.get(id);
  if(!group){group={id,title:topic?.title,records:[],policyIds:topic?.policyIds??[]};groups.set(id,group);}
  group.records.push(record);
 }
 // Newest matching document orders the matter; each child keeps its own date.
 return [...groups.values()].map(g=>({...g,records:[...g.records].sort((a,b)=>a.date.localeCompare(b.date))}))
  .sort((a,b)=>b.records.at(-1)!.date.localeCompare(a.records.at(-1)!.date));
}


// Historical snapshot builds must not acquire relations reviewed against newer
// records. Candidate/current builds still reject every dangling reference.
export function resolveTopicRegistry(input:unknown,data:{exportedAt:string;intake:{records:IntakeRecord[]};policies:Policy[]}):Topic[]{
 const registry=z.object({appliesFromExport:z.string().datetime(),topics:topicDefinitionsSchema}).strict().parse(input);
 const applies=(item:{appliesFromExport?:string})=>!item.appliesFromExport||data.exportedAt>=item.appliesFromExport;
 return data.exportedAt<registry.appliesFromExport?[]:resolveTopics(registry.topics.filter(applies).map(t=>{const explanations=t.explanations?.filter(e=>typeof e==='string'||applies(e));return {...t,documents:t.documents.filter(applies),explanations:explanations?.length?explanations:undefined};}),data.intake.records,data.policies);
}
