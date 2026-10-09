import {readFile} from 'node:fs/promises';
import {createStaticData} from '../lib/static-data.ts';
import {resolveTopicRegistry} from '../lib/domain/topics.ts';
import {readExport} from '../lib/export-store.ts';
const read=async p=>JSON.parse(await readFile(p,'utf8'));
const path=process.argv[2]??(await read('data/current-export.json')).path;
const data=createStaticData(readExport(path));
const topics=resolveTopicRegistry(await read('data/topics.json'),data);
const membership=new Map(topics.flatMap(t=>t.recordIds.map(id=>[id,t.id])));
const buckets=new Map();
const add=(key,record)=>{const bucket=buckets.get(key)??[];bucket.push(record);buckets.set(key,bucket);};
for(const record of data.intake.records){
 const title=record.title.normalize('NFKC').toLocaleLowerCase().replace(/\s+/g,' ').trim().replace(/\.$/,'');
 if(record.officialId&&!record.officialId.startsWith('https://'))add(record.region+'|number|'+record.officialId,record);
 add(record.region+'|title|'+title,record);
 const commencement=title.replace(/^the /,'').match(/^(.*? act \d{4}) \(commencement/);
 if(commencement)add(record.region+'|commencement|'+commencement[1],record);
 const corrected=title.match(/^corrección de (?:errores|erratas) (?:de la |del |de las |de los )(.+)/);
 if(corrected)add(record.region+'|title|'+corrected[1],record);
 const court=title.match(/(?:recurso de inconstitucionalidad|cuestión de inconstitucionalidad).*?n\.(?:º|o)?\s*([\d-]+)/);
 if(court)add(record.region+'|case|'+court[1],record);
}
const candidates=[...buckets].filter(([,records])=>new Set(records.map(r=>r.id)).size>1).map(([reason,records])=>{
 const unique=[...new Map(records.map(r=>[r.id,r])).values()];
 const topicIds=unique.map(r=>membership.get(r.id));
 return {reason,grouped:topicIds.every(id=>id&&id===topicIds[0]),documents:unique.map(r=>({id:r.id,region:r.region,officialId:r.officialId,url:r.url,title:r.title,titleZh:r.titleZh,topic:membership.get(r.id)??null}))};
});
console.log(JSON.stringify({export:path,policiesScanned:data.policies.length,recordsScanned:data.intake.records.length,reviewedTopics:topics.length,groupedRecords:membership.size,notice:'Candidates are review prompts, never automatic merge decisions. Identical titles can describe different measures, periods or addressees.',candidates},null,2));
