import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createStaticData} from '../lib/static-data.ts';
import {validateUpdate} from '../lib/update-data.ts';
import {policySchema} from '../lib/domain/model.ts';
import {dutchProvinces} from '../lib/domain/netherlands.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {localizeIntake,localizePolicy} from '../lib/i18n/content.ts';
const read=(path:string)=>JSON.parse(readFileSync(new URL(path,import.meta.url),'utf8'));
const before=read('../data/exports/2026-10-04-netherlands/policy-radar-export.json');
const after=read('../data/exports/2026-10-04-netherlands-review/policy-radar-export.json');
const data=createStaticData(after);
const localization=createLocalization(data,read('../data/translations/content.json'),read('../data/translations/bindings.json'));

test('Dutch corrections append history without changing prior evidence or scan coverage',()=>{
 validateUpdate(before,after,new Date(after.exportedAt));
 for(const table of ['revisions','intake','scan_runs','snapshots','checks'])assert.deepEqual(after.tables[table].slice(0,before.tables[table].length),before.tables[table]);
 assert.deepEqual(data.intake.coverage,createStaticData(before).intake.coverage);
 for(const country of ['DE','FR'])for(const key of ['lastReviewAt','reviewNote'])assert.equal(data.status.settings[key+':'+country],createStaticData(before).status.settings[key+':'+country]);
 for(const row of after.tables.policies){const old=before.tables.policies.find((r:{id:string})=>r.id===row.id);if(row.version===old.version)assert.deepEqual(row,old);else assert.deepEqual(JSON.parse(row.data).events.slice(0,JSON.parse(old.data).events.length),JSON.parse(old.data).events);}
});

test('displayed Dutch timelines separate reopening, dated closure and undated exhaustion',()=>{
 const battery=data.policies.find(p=>p.id==='nl-fl-home-battery')!;
 const opening=battery.events.find(e=>e.date==='2026-10-01')!;
 assert.equal(opening.kind,'effective');assert.match(opening.title,/重新开放/);assert(!/用完|耗尽/.test(opening.title+opening.detail));
 assert.match(battery.dateExplanation!,/未公布实际耗尽日期/);
 assert(battery.events.some(e=>e.kind==='correction'&&e.date==='2026-10-04'));
 for(const [id,deadline] of [['nl-ut-mobility-grants','2026-09-30'],['nl-nh-solar-parking','2026-10-01']]){
  const p=data.policies.find(p=>p.id===id)!;
  assert(p.events.some(e=>e.kind==='closed'&&e.date===deadline));
  assert(!p.events.some(e=>e.kind==='scheduled'&&e.date<='2026-10-04'));
  assert(p.events.filter(e=>e.kind==='adopted'||e.kind==='effective').every(e=>!/已截止|已结束/.test(e.title+e.detail)));
  assert.equal(p.lastEventDate,'2026-10-04'); // The dated editorial correction is the latest confirmed event.
  for(const locale of ['en'] as const){const translated=localizePolicy(p,locale,localization);assert.equal(localization.policies[p.id],'current');assert(translated.events.some(e=>e.kind==='closed'&&e.date===deadline));}
 }
});

test('all six original Dutch announcement titles are retained, visible and linked once',()=>{
 const expected=[
  'Nieuwe subsidie voor landbouwexperimenten in de provincie Groningen',
  'Nieuwe investeringsregeling voor sterk Drents platteland',
  'Ideeën gezocht voor buurt of dorp langs Kanaal Almelo-De Haandrik',
  'Meer ruimte voor planten en dieren: subsidie voor icoonsoorten opent 1 oktober',
  'Elf rijksmonumenten ontvangen bijna € 3 miljoen voor restauratie en volgende € 3,7 miljoen staat klaar',
  'Provincie Noord-Brabant presenteert begroting 2027'
 ];
 const records=data.intake.records.filter(r=>r.region.startsWith('NL'));
 assert.deepEqual(records.map(r=>r.title),expected);
 for(const r of records){
  assert.equal(localization.intake[r.id],'current');assert.equal(localization.originalIntakeTitles[r.id],true);
  assert.equal(data.policies.filter(p=>p.region===r.region&&p.officialId===r.officialId).length,1);
  for(const locale of ['zh','en'] as const)assert.equal(localizeIntake(r,locale,localization).title,r.title);
 }
});

test('corrections reject missing targets, cycles, forks and changed document identities',()=>{
 const policy=JSON.parse(after.tables.policies.find((r:{id:string})=>r.id==='nl-fl-home-battery').data);
 for(const target of ['missing',policy.events[1].id]){const p=structuredClone(policy);p.events[1].supersedes=target;assert.equal(policySchema.safeParse(p).success,false);}
 const fork=structuredClone(policy);fork.events.push({...fork.events[1],id:'fork'});assert.equal(policySchema.safeParse(fork).success,false);
 const withdrawn=structuredClone(policy);withdrawn.events[1].kind='withdrawn';assert.equal(policySchema.safeParse(withdrawn).success,false); // Superseded adoption evidence cannot establish current adoption.
 for(const change of [{supersedes:'missing'},{region:'NL-DR'},{url:'https://www.provinciegroningen.nl/another-article'},{officialId:'another-measure'}]){
  const broken=structuredClone(after),row=broken.tables.intake.at(-6);row.data=JSON.stringify({...JSON.parse(row.data),...change});assert.throws(()=>validateUpdate(before,broken,new Date(after.exportedAt)),/correction/i);
 }
 const forked=structuredClone(after),row=structuredClone(forked.tables.intake.at(-6));row.id='forked-title';row.data=JSON.stringify({...JSON.parse(row.data),id:row.id});forked.tables.intake.push(row);
 assert.throws(()=>validateUpdate(before,forked,new Date(after.exportedAt)),/Correction/);
});

test('central Dutch law channels accept each province while rejecting unrelated regions',()=>{
 const now=new Date('2026-10-04T12:00:00Z');
 function candidate(sourceUrl:string,region:string,scanRegion=region){
  const next=structuredClone(after),r=JSON.parse(before.tables.intake.find((r:{id:string})=>r.id==='nl-gr-farm-experiments-announcement').data);
  Object.assign(r,{id:'new-provincial-law',date:'2026-10-03',sourceUrl,region});
  next.tables.intake.push({id:r.id,url:r.url,discovered_at:now.toISOString(),data:JSON.stringify(r)});
  const scan={id:'provincial-law-scan',sourceUrl,checkedAt:now.toISOString(),windowStart:'2026-10-03',windowEnd:'2026-10-03',status:'partial',pages:[sourceUrl],recordIds:[r.id],excluded:[],allPagesChecked:false,totalListed:null,note:'Test discovery, not a complete scan.'};
  if(scanRegion!==region){const other={...r,id:'scan-other-region',region:scanRegion};next.tables.intake.push({id:other.id,url:other.url,discovered_at:now.toISOString(),data:JSON.stringify({...other,sourceUrl:'https://www.bundesregierung.de/breg-de/suche/gesetzliche-neuregelungen-442800'})});scan.recordIds=[other.id];}
  next.tables.scan_runs.push({id:scan.id,source_url:sourceUrl,checked_at:scan.checkedAt,data:JSON.stringify(scan)});
  return next;
 }
 for(const source of ['https://zoek.officielebekendmakingen.nl/','https://lokaleregelgeving.overheid.nl/']){
  for(const p of dutchProvinces)assert.doesNotThrow(()=>validateUpdate(after,candidate(source,p.id),now));
  for(const region of ['DE','FR','NL-BQ'])assert.throws(()=>validateUpdate(after,candidate(source,region),now));
  assert.throws(()=>validateUpdate(after,candidate(source,'NL-GR','DE'),now),/Scan references/);
 }
 assert.doesNotThrow(()=>validateUpdate(after,candidate('https://zoek.officielebekendmakingen.nl/','NL'),now));
 assert.throws(()=>validateUpdate(after,candidate('https://lokaleregelgeving.overheid.nl/','NL'),now),/Invalid discovery/);
 assert.throws(()=>validateUpdate(after,candidate('https://www.provinciegroningen.nl/','NL-DR'),now),/Invalid discovery/);
 assert.throws(()=>validateUpdate(after,candidate('https://wetten.overheid.nl/','NL-GR'),now),/Invalid discovery/);
});
