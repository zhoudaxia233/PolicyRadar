import {z} from 'zod';
import {legacyFrenchRegion} from './domain/france.ts';

const envelope=z.object({format:z.literal('policy-radar-export'),exportedAt:z.string().datetime(),schemaVersion:z.union([z.literal(2),z.literal(3)]),tables:z.record(z.array(z.record(z.unknown())))}).passthrough();
// Version 2 used FR- + INSEE region numbers. Only that format may interpret them
// as regions. Version 3 uses ISO identifiers, including numeric territorial codes.
// Preserve every other field, stable record ID and source byte. Historical files
// remain untouched; comparisons use this same narrowly defined projection.
export function migrateExportRegions(input:unknown){
 const data=envelope.parse(input);
 if(data.schemaVersion===3)return data;
 const tables={...data.tables};
 for(const table of ['policies','revisions','intake']){
  if(!tables[table])throw Error('Missing export table: '+table);
  tables[table]=tables[table].map(row=>{
   if(typeof row.data!=='string')throw Error('Missing record data');
   const record=JSON.parse(row.data);
   if(!record||typeof record.region!=='string')throw Error('Missing record region');
   const region=legacyFrenchRegion(record.region);
   const result={...row};
   if(region!==record.region)result.data=JSON.stringify({...record,region});
   if(typeof row.region==='string')result.region=legacyFrenchRegion(row.region);
   return result;
  });
 }
 return {...data,schemaVersion:3 as const,tables};
}

// Legacy global review metadata described Germany only. Never use it for a
// different country. Keep old keys in stored exports, not in the browser API.
export function countryReviewSettings(rows:{key:string;value:string}[]){
 const old=Object.fromEntries(rows.map(r=>[r.key,r.value]));
 const result:Record<string,string>=Object.fromEntries(rows.filter(r=>/^(lastReviewAt|reviewNote):[A-Z]{2}$/.test(r.key)).map(r=>[r.key,r.value]));
 for(const [country,date,note] of [['DE','lastReviewAt','reviewNote'],['FR','frInitialReviewAt','frInitialReviewNote']]){
  if(!result['lastReviewAt:'+country]&&old[date]){
   result['lastReviewAt:'+country]=old[date];
   if(!result['reviewNote:'+country]&&old[note])result['reviewNote:'+country]=old[note];
  }
 }
 return result;
}
