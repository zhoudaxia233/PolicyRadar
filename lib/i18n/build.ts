import {createHash} from 'node:crypto';
import {z} from 'zod';
import {policyTextFields,type Localization,type TranslationState} from './content.ts';
import type {createStaticData} from '../static-data.ts';
export const catalogSchema=z.record(z.tuple([z.string().trim().min(1),z.string().trim().min(1)]));
const binding=z.object({titleIsOriginal:z.boolean().optional(),version:z.number().int().positive().optional(),hash:z.string().regex(/^[a-f0-9]{64}$/),verbatim:z.array(z.string()),originalLanguage:z.string().regex(/^[a-z]{2,3}(?:-[A-Za-z0-9]+)*$/)});
export const bindingsSchema=z.object({policies:z.record(binding),intake:z.record(binding)});
// The hash includes facts as well as prose: a date or source change invalidates
// the old explanation even when its Chinese sentences happen to be unchanged.
export const contentHash=(value:unknown):string=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
export function createLocalization(data:ReturnType<typeof createStaticData>,catalog:unknown,bindings:unknown):Localization {
 const messages=catalogSchema.parse(catalog),manifest=bindingsSchema.parse(bindings);
 const result:Localization={messages,policies:{},intake:{},sourceLanguages:{},originalIntakeTitles:{}};
 const check=(row:{id:string},texts:string[],kind:'policies'|'intake'):TranslationState=>{
  const entry=manifest[kind][row.id];
  if(entry){result.sourceLanguages[row.id]=entry.originalLanguage;if(kind==='intake')result.originalIntakeTitles[row.id]=entry.titleIsOriginal===true;}
  if(!entry)return 'missing';
  if((kind==='policies'&&entry.version!==data.policyVersions[row.id])||entry.hash!==contentHash(row))return 'stale';
  return texts.some(t=>t&&!messages[t]&&!entry.verbatim.includes(t))?'missing':'current';
 };
 for(const p of data.policies)result.policies[p.id]=check(p,[...policyTextFields(p),p.topic,...(p.tags??[])],'policies');
 for(const r of data.intake.records)result.intake[r.id]=check(r,[r.titleZh??r.title,r.note,...r.tags],'intake');
 return result;
}
