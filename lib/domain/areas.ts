import {z} from 'zod';
import type {Policy} from './model.ts';
import type {Topic} from './topics.ts';

// Fixed policy areas for "what is this country working on". Each explanation has exactly one
// area so a matter is counted once; scope rules and boundary cases are in data/AREAS.md.
export const areas=[
 {id:'tax',title:['税务与财政','Taxes & public finance'],short:['税务','Tax']},
 {id:'work',title:['劳动与就业','Work & employment'],short:['劳动','Work']},
 {id:'social',title:['社会保障与家庭','Social security & families'],short:['社保家庭','Social']},
 {id:'health',title:['医疗与照护','Health & care'],short:['医疗','Health']},
 {id:'housing',title:['住房与建设','Housing & construction'],short:['住房','Housing']},
 {id:'environment',title:['能源、气候与环境','Energy, climate & environment'],short:['能源环境','Energy']},
 {id:'transport',title:['交通与出行','Transport & mobility'],short:['交通','Transport']},
 {id:'education',title:['教育、科研与文化','Education, research & culture'],short:['教育文化','Education']},
 {id:'business',title:['企业与经济','Business & economy'],short:['企业','Business']},
 {id:'finance',title:['金融与消费者','Finance & consumers'],short:['金融消费','Consumers']},
 {id:'agriculture',title:['农业与乡村','Agriculture & rural areas'],short:['农业','Farming']},
 {id:'digital',title:['数字与通信','Digital & telecoms'],short:['数字','Digital']},
 {id:'security',title:['安全、司法与应急','Security, justice & emergencies'],short:['安全司法','Justice']},
 {id:'foreign',title:['外交与国防','Foreign affairs & defence'],short:['外交国防','Foreign']},
 {id:'migration',title:['移民与融入','Migration & integration'],short:['移民','Migration']},
 {id:'government',title:['政府与公共服务','Government & public services'],short:['政府','Government']},
] as const satisfies readonly {id:string;title:[string,string];short:[string,string]}[];
export type AreaId=typeof areas[number]['id'];
export const areaIds:readonly string[]=areas.map(a=>a.id);
export const isArea=(id:string):id is AreaId=>areaIds.includes(id);

const areaId=z.string().refine(isArea,'Unknown area');
// Topic labels give the default area; reviewed per-policy exceptions cover generic labels
// such as "public services" whose items belong to different areas.
const registrySchema=z.object({topics:z.record(z.string(),areaId),policies:z.record(z.string(),areaId)}).strict();

export function resolveAreas(input:unknown,policies:Pick<Policy,'id'|'topic'>[],topics:Pick<Topic,'id'|'policyIds'>[]=[]):Record<string,AreaId>{
 const registry=registrySchema.parse(input),known=new Set(policies.map(p=>p.id)),result:Record<string,AreaId>={};
 for(const [id,area] of Object.entries(registry.policies)){
  if(!known.has(id))throw Error('Area exception for unknown policy: '+id);
  const policy=policies.find(p=>p.id===id)!;
  if(registry.topics[policy.topic]===area)throw Error('Area exception repeats the topic default: '+id);
 }
 for(const p of policies){
  const area=registry.policies[p.id]??registry.topics[p.topic];
  if(!area)throw Error(`Policy topic has no area: ${p.topic} (${p.id}); add it to data/areas.json`);
  result[p.id]=area as AreaId;
 }
 // One matter is one bar segment: its explanations must not count toward two areas.
 for(const t of topics){
  const found=new Set(t.policyIds.map(id=>result[id]).filter(Boolean));
  if(found.size>1)throw Error('Grouped explanations need one area: '+t.id+' ('+[...found].join(', ')+')');
 }
 return result;
}

// Matter counts per area and per region, from listing cards (one card per matter). A matter
// explained in several regions (two states running the same pilot) counts once in the total
// and once in each of those regions, like the sidebar's region counts.
export function areaBreakdown(cards:{policy:Pick<Policy,'id'|'region'>;members?:Pick<Policy,'region'>[]}[],areaOf:Record<string,string>){
 const total=new Map<string,number>(),byRegion=new Map<string,Map<string,number>>();
 for(const {policy,members} of cards){
  const area=areaOf[policy.id];
  if(!area)continue;
  total.set(area,(total.get(area)??0)+1);
  for(const region of new Set((members??[policy]).map(p=>p.region))){
   let row=byRegion.get(region);
   if(!row)byRegion.set(region,row=new Map());
   row.set(area,(row.get(area)??0)+1);
  }
 }
 return {total,byRegion};
}
