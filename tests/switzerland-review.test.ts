import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createStaticData} from '../lib/static-data.ts';
import {validateUpdate} from '../lib/update-data.ts';
import {swissDiscovery} from '../lib/domain/switzerland.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {localizePolicy} from '../lib/i18n/content.ts';

const read=(path:string)=>JSON.parse(readFileSync(new URL(path,import.meta.url),'utf8'));
const before=read('../data/exports/2026-10-04-switzerland/policy-radar-export.json');
const after=read('../data/exports/2026-10-04-switzerland-review/policy-radar-export.json');
const data=createStaticData(after);
const shells=['https://www.fedlex.admin.ch/de/oc','https://www.parlament.ch/de/ratsbetrieb/suche-curia-vista','https://rsn.ne.ch/','https://silgeneve.ch/legis/'];
const retired='https://www.sz.ch/behoerden/gesetzessammlung.html/8756-8758-8801';
const schwyz='https://www.sz.ch/kanton/gesetze.html/8756-8757-10021';

test('unreadable Swiss portal archives no longer count as successful source checks',()=>{
 for(const url of shells){
  const check=data.status.checks.find(c=>c.url===url)!;
  assert(check.error,url);assert.equal(check.last_success_at,null);assert.equal(check.snapshot_key,null);
  const coverage=data.intake.coverage.find(c=>c.url===url)!;
  assert.equal(coverage.latestScan?.status,'blocked',url);assert.equal(coverage.coveredThrough,null);
  assert.match(coverage.latestScan!.note,/存档/);
 }
 // A normal page may mention JavaScript while still providing readable content.
 const aargau=data.status.checks.find(c=>c.url==='https://www.ag.ch/de')!;
 assert.equal(aargau.error,null);assert(aargau.snapshot_key);
});

test('Schwyz law discovery uses the official collection and records the actual fetch outcome',()=>{
 assert.equal(swissDiscovery.find(s=>s.region==='CH-SZ'&&s.kind==='law')?.url,schwyz);
 assert(!swissDiscovery.some(s=>s.url===retired));
 const old=data.status.checks.find(c=>c.url===retired)!;
 assert(old.error);assert.equal(old.last_success_at,null);assert.equal(old.snapshot_key,null);
 const check=data.status.checks.find(c=>c.url===schwyz)!;
 assert.match(check.error!,/403/);assert.equal(check.last_success_at,null);assert.equal(check.snapshot_key,null);
 const coverage=data.intake.coverage.find(c=>c.url===schwyz)!;
 assert.equal(coverage.latestScan?.status,'blocked');assert.equal(coverage.coveredThrough,null);
});

test('Swiss upcoming reminders include all four confirmed future milestones',()=>{
 const swiss=data.policies.filter(p=>p.region.startsWith('CH'));
 const upcoming=swiss.filter(p=>p.nextDate&&p.nextDate>='2026-10-04').sort((a,b)=>a.nextDate!.localeCompare(b.nextDate!));
 assert.deepEqual(upcoming.map(p=>[p.id,p.nextDate]),[
  ['ch-be-information-security','2026-11-01'],['ch-ar-justice-consultation','2026-11-06'],
  ['ch-bl-digital-building-consultation','2026-11-30'],['ch-zh-premium-subsidy-2027','2027-01-01']
 ]);
 for(const p of upcoming){assert(p.nextLabel);assert(p.events.some(e=>e.kind==='scheduled'&&e.date===p.nextDate));}
 // Month-only payments and tentative commencement must remain undated.
 for(const id of ['ch-thirteenth-ahv','ch-vd-energy-law'])assert.equal(swiss.find(p=>p.id===id)!.nextDate,null);
});

test('Swiss corrections preserve immutable history and other countries while keeping translations current',()=>{
 // This historical correction dropped invalid snapshot pointers; the strengthened gate rejects that shape.
 assert.throws(()=>validateUpdate(before,after,new Date(after.exportedAt)),/snapshot.*must be retained/);
 for(const table of ['revisions','intake','scan_runs','snapshots'])assert.deepEqual(after.tables[table].slice(0,before.tables[table].length),before.tables[table]);
 const changed=new Set(['ch-be-information-security','ch-zh-premium-subsidy-2027']);
 for(const row of after.tables.policies){
  const old=before.tables.policies.find((p:{id:string})=>p.id===row.id);
  if(!changed.has(row.id)){assert.deepEqual(row,old);continue;}
  assert.equal(row.version,old.version+1);
  const policy=JSON.parse(row.data),prior=JSON.parse(old.data);
  assert.deepEqual(policy.events.slice(0,prior.events.length),prior.events);
  assert(policy.events.some((e:{kind:string})=>e.kind==='correction'));
 }
 for(const country of ['DE','FR','NL'])for(const key of ['lastReviewAt','reviewNote'])assert.equal(data.status.settings[key+':'+country],createStaticData(before).status.settings[key+':'+country]);
 const correctedChecks=new Set([...shells,retired]);
 for(const check of before.tables.checks)if(!correctedChecks.has(check.url))assert.deepEqual(after.tables.checks.find((c:{url:string})=>c.url===check.url),check);
 const localization=createLocalization(data,read('../data/translations/content.json'),read('../data/translations/bindings.json'));
 for(const p of data.policies.filter(p=>p.region.startsWith('CH'))){
  assert.equal(localization.policies[p.id],'current',p.id);
  for(const locale of ['de','en'] as const){const translated=localizePolicy(p,locale,localization);assert.equal(translated.nextDate,p.nextDate);if(changed.has(p.id))assert.notEqual(translated.nextLabel,p.nextLabel);}
 }
 for(const url of [...shells,schwyz])assert(localization.messages[data.intake.coverage.find(c=>c.url===url)!.latestScan!.note]);
 assert(localization.messages[data.status.settings['reviewNote:CH']]);
});
