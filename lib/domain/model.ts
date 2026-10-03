import { z } from 'zod';
export const regions = [{id:'DE',name:'德国联邦',de:'Bund'}, {id:'DE-HE',name:'黑森',de:'Hessen'}, {id:'DE-BY',name:'巴伐利亚',de:'Bayern'}, {id:'DE-BW',name:'巴登-符腾堡',de:'Baden-Württemberg'}, {id:'DE-BE',name:'柏林',de:'Berlin'}, {id:'DE-BB',name:'勃兰登堡',de:'Brandenburg'}, {id:'DE-HB',name:'不来梅',de:'Bremen'}, {id:'DE-HH',name:'汉堡',de:'Hamburg'}, {id:'DE-MV',name:'梅克伦堡-前波美拉尼亚',de:'Mecklenburg-Vorpommern'}, {id:'DE-NI',name:'下萨克森',de:'Niedersachsen'}, {id:'DE-NW',name:'北莱茵-威斯特法伦',de:'Nordrhein-Westfalen'}, {id:'DE-RP',name:'莱茵兰-普法尔茨',de:'Rheinland-Pfalz'}, {id:'DE-SL',name:'萨尔',de:'Saarland'}, {id:'DE-SN',name:'萨克森',de:'Sachsen'}, {id:'DE-ST',name:'萨克森-安哈尔特',de:'Sachsen-Anhalt'}, {id:'DE-SH',name:'石勒苏益格-荷尔斯泰因',de:'Schleswig-Holstein'}, {id:'DE-TH',name:'图林根',de:'Thüringen'}];
export const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v => !Number.isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0,10) === v, 'Invalid date');
const date = dateSchema;
export const tagsSchema=z.array(z.string().trim().min(1).max(30)).max(12).refine(tags=>new Set(tags).size===tags.length,'Duplicate tags');
export function policyTags(p:{tags?:string[];topic?:string}){return p.tags?.length?p.tags:p.topic?[p.topic]:['待分类'];}
const text = z.string().min(1).max(6000);
export const sourceSchema = z.object({id:z.string().regex(/^[a-z0-9-]+$/),title:text,url:z.string().url().refine(u=>u.startsWith('https://')),publisher:text,kind:z.enum(['law','parliament','government']),note:text});
export const policySchema = z.object({
 id:z.string().regex(/^[a-z0-9-]+$/), officialId:text,title:text,originalTitle:text,region:z.string().refine(r=>regions.some(x=>x.id===r)),topic:z.string().trim().min(1).max(60),tags:tagsSchema.optional(),
 phase:z.enum(['adopted','pending','closed']),status:text,summary:text,before:text,after:text,impact:text,limits:text,
 verifiedAt:date,lastEventDate:date,effectiveDate:date.nullable(),nextDate:date.nullable(),nextLabel:z.string().max(200),
 disputed:z.boolean(),dispute:z.string().max(6000),sources:z.array(sourceSchema).min(1).max(20),
 rules:z.array(z.object({title:text,detail:text,sourceId:z.string()})).max(8).optional(),
 dateExplanation:text.optional(),
 politics:z.object({
  proposedBy:z.object({name:text,party:text.nullable(),sourceId:z.string()}).optional(),
  votes:z.array(z.object({body:text,date,result:text,counts:z.object({for:z.number().int().min(0),against:z.number().int().min(0),abstain:z.number().int().min(0)}).nullable(),note:text,sourceId:z.string()})).max(10).optional()
 }).optional(),
 events:z.array(z.object({id:z.string().regex(/^[a-z0-9-]+$/),date,kind:z.enum(['proposal','adopted','published','effective','scheduled','withdrawn','correction']),title:text,detail:text,sourceId:z.string()})).min(1).max(100)
}).superRefine((p,c)=>{
 const sourceIds=new Set(p.sources.map(s=>s.id));
 if(sourceIds.size!==p.sources.length)c.addIssue({code:'custom',message:'Duplicate source IDs'});
 if(new Set(p.events.map(e=>e.id)).size!==p.events.length)c.addIssue({code:'custom',message:'Duplicate event IDs'});
 for(const item of [...(p.rules??[]),...(p.politics?.proposedBy?[p.politics.proposedBy]:[]),...(p.politics?.votes??[])])if(!sourceIds.has(item.sourceId))c.addIssue({code:'custom',message:'Rule and political metadata require a cited source'});
 for(const vote of p.politics?.votes??[])if(vote.date>p.verifiedAt)c.addIssue({code:'custom',message:'Future votes cannot have results'});
 for(const e of p.events){if(!sourceIds.has(e.sourceId))c.addIssue({code:'custom',message:'Event requires a cited source'}); if(e.kind!=='scheduled'&&e.date>p.verifiedAt)c.addIssue({code:'custom',message:'Future events must be scheduled'});}
 if(p.phase==='adopted'&&!p.events.some(e=>['adopted','published','effective'].includes(e.kind)))c.addIssue({code:'custom',message:'Adoption requires evidence'});
 if(p.lastEventDate>p.verifiedAt)c.addIssue({code:'custom',message:'Last confirmed event cannot be in future'});
});
export type Policy=z.infer<typeof policySchema>;
export function effectiveDateLabel(p:Policy){return p.effectiveDate?'本次改动开始生效':'最近已确认进展';}
export const importSchema=z.object({policies:z.array(policySchema).max(50),expectedVersions:z.record(z.number().int().min(0))});
export function validateRevision(old:Policy, next:Policy){
 if(old.id!==next.id||old.officialId!==next.officialId)throw new Error('Stable identity cannot change');
 for(const e of old.events){const same=next.events.find(n=>n.id===e.id);if(!same||JSON.stringify(same)!==JSON.stringify(e))throw new Error('Historical events are immutable; append a correction');}
}
export function selectPolicies(items:Policy[],view:string,region:string,topic:string,query:string,tags:string[]=[]){const q=query.trim().toLocaleLowerCase();return items.filter(p=>(view==='all'||view==='updates'||p.phase===view)&&(region==='all'||p.region===region)&&(topic==='all'||p.topic===topic)&&(!tags.length||tags.some(t=>policyTags(p).includes(t)))&&(!q||[p.title,p.originalTitle,p.summary,p.officialId,...policyTags(p)].join(' ').toLocaleLowerCase().includes(q))).sort((a,b)=>b.lastEventDate.localeCompare(a.lastEventDate));}
export function lifecycle(p:Policy,today:string){
 if(p.phase!=='adopted')return p.nextDate&&p.nextDate<today?'已过计划日期 · 结果待核实':p.status;
 if(p.nextDate&&p.nextDate<today&&/到期|期限结束/.test(p.nextLabel))return '期限已到 · 后续待核实';
 if(!p.effectiveDate)return p.status;
 if(p.effectiveDate>today)return '已通过 · 待生效';
 return p.status==='分步生效'?(p.nextDate&&p.nextDate>today?'已生效 · 分步实施':'已生效'):p.status;
}
