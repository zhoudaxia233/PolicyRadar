import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createStaticData} from '../lib/static-data.ts';
import {validateSelection} from '../lib/update-data.ts';
import {readSnapshot} from '../lib/source-archive.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {policyTextFields,localizePolicy} from '../lib/i18n/content.ts';
import {selectListing} from '../lib/domain/listing.ts';
import {readFilters} from '../lib/domain/filters.ts';
import {sourceSupportsRegion} from '../lib/domain/coverage.ts';
const folder='data/exports/2026-10-07-spain-backfill-203702';
const read=(p:string)=>JSON.parse(readFileSync(p,'utf8'));
const manifest=read(folder+'/manifest.json');
const before=read(manifest.baseExport),after=read(folder+'/policy-radar-export.json');
const data=createStaticData(after);
const records=data.intake.records.filter(r=>r.id.startsWith('es-catalog-'));
const newIds=new Set<string>(manifest.reviewedPolicyIds);

test('Spain backfill reconciles 279 archived daily responses and all 874 Part I identities',()=>{
 assert.equal(manifest.feeds.length,279);assert.equal(new Set(manifest.feeds.map((f:{date:string})=>f.date)).size,279);
 assert.equal(manifest.feeds[0].date,'2026-01-01');assert.equal(manifest.feeds.at(-1).date,'2026-10-06');
 const ids:string[]=[];
 for(const f of manifest.feeds){
  const bytes=readFileSync(folder+'/'+f.file),xml=bytes.toString('utf8');
  assert.equal(createHash('sha256').update(bytes).digest('hex'),f.sha256);
  const actual=[...xml.matchAll(/<seccion codigo="1"[\s\S]*?<\/seccion>/g)].flatMap(s=>[...s[0].matchAll(/<identificador>([^<]+)<\/identificador>/g)].map(m=>m[1]));
  assert.deepEqual(actual,f.ids);ids.push(...actual);
  if(f.apiStatus!=='200'){assert.equal(f.apiStatus,'404');assert.equal(actual.length,0);assert.match(xml,/La información solicitada no existe/);}
 }
 assert.equal(ids.length,874);assert.equal(new Set(ids).size,874);
 assert.deepEqual(new Set(records.map(r=>r.officialId?.split(';')[0])),new Set(ids));
 assert.equal(records.filter(r=>r.date.startsWith('2026-01')).length,85);
 assert(records.every(r=>r.date>='2026-01-01'&&r.date<='2026-10-06'&&r.dateKind==='published'));
});

test('Spain backfill preserves immutable history and other countries review markers',()=>{
 validateSelection(before,after,new Date(after.exportedAt));
 for(const table of ['policies','revisions','intake','scan_runs','snapshots'])for(const row of before.tables[table]){
  const key=table==='snapshots'?'key':'id';assert.deepEqual(after.tables[table].find((r:Record<string,unknown>)=>r[key]===row[key]),row);
 }
 for(const row of before.tables.settings.filter((r:{key:string})=>!r.key.endsWith(':ES')))assert.deepEqual(after.tables.settings.find((r:{key:string})=>r.key===row.key),row);
 const boe='https://www.boe.es/diario_boe/';
 assert.deepEqual(after.discoveryRegistry.filter((s:{url:string})=>s.url!==boe),before.discoveryRegistry.filter((s:{url:string})=>s.url!==boe));
 const channel=after.discoveryRegistry.find((s:{url:string})=>s.url===boe);
 for(const r of records)assert(sourceSupportsRegion(channel,r.region));
 assert.equal(records.find(r=>r.officialId==='BOE-A-2026-992')?.region,'ES-VC');
 assert.equal(records.find(r=>r.officialId==='BOE-A-2026-1259')?.region,'ES-CL');
 assert(!sourceSupportsRegion(channel,'PT'));
});

test('Spain catalogue ingestion leaves unreviewed records and coverage explicitly incomplete',()=>{
 const coverage=data.intake.coverage.filter(c=>c.region.startsWith('ES'));
 assert.equal(coverage.length,40);assert(coverage.every(c=>c.coveredThrough===null&&c.nextUncovered==='2026-01-01'&&c.latestScan?.status!=='complete'));
 const scans=after.tables.scan_runs.filter((r:{id:string})=>manifest.newScanIds.includes(r.id)).map((r:{data:string})=>JSON.parse(r.data));
 assert.equal(scans.length,49);assert(scans.every((s:{status:string;allPagesChecked:boolean})=>s.status!=='complete'&&!s.allPagesChecked));
 assert.equal(scans.filter((s:{status:string})=>s.status==='blocked').length,4);
 assert.equal(records.filter(r=>r.stage==='adopted').length,10);assert.equal(records.filter(r=>r.stage==='unverified').length,864);
 assert(records.filter(r=>r.stage==='unverified').every(r=>r.effectiveDate===null&&r.adoptionDate===null));
 assert.equal(selectListing(data.policies,data.intake.records,readFilters('?country=ES')).count,10);
 assert.equal(selectListing(data.policies,data.intake.records,readFilters('?country=ES&view=all')).count,874);
});

test('reviewed Spain policies have current translations, archived citations and correctly separated dates',()=>{
 const l=createLocalization(data,read('data/translations/content.json'),read('data/translations/bindings.json'));
 const ps=data.policies.filter(p=>newIds.has(p.id));assert.equal(ps.length,9);
 for(const p of ps){
  assert.equal(l.policies[p.id],'current');assert.equal(p.originalLanguage,'es');
  for(const locale of ['de','en'] as const)assert(policyTextFields(localizePolicy(p,locale,l)).every(t=>!/[\u3400-\u9fff]/u.test(t)));
  for(const s of p.sources){
   const check=after.tables.checks.find((r:{url:string})=>r.url===s.url);assert.equal(check.error,null);
   const snapshot=after.tables.snapshots.find((r:{key:string})=>r.key===check.snapshot_key);assert.equal(snapshot.url,s.url);readSnapshot(folder+'/policy-radar-export.json',snapshot);
  }
 }
 const get=(n:number)=>ps.find(p=>p.id==='es-boe-2026-'+n)!;
 assert.equal(get(992).effectiveDate,'2025-12-30');assert(get(992).events.some(e=>e.kind==='published'&&e.date==='2026-01-17'));
 assert.equal(get(1259).effectiveDate,'2026-01-20');assert(get(1259).events.some(e=>e.date==='2025-12-31'));assert.match(get(1259).limits,/最长6个月/);
 assert.equal(get(939).effectiveDate,null);assert.equal(get(939).nextDate,null);assert.match(get(939).limits,/合同结束/);
 for(const n of [674,675])assert.equal(get(n).effectiveDate,'2026-02-02');
 assert.equal(get(326).effectiveDate,'2026-02-01');assert.match(get(560).after,/能量含量/);
 assert.equal(records.filter(r=>l.intake[r.id]==='current').length,10);assert.equal(records.filter(r=>l.intake[r.id]==='missing').length,864);
});

test('successful original downloads have exact archived bytes and failures retain prior successful evidence',()=>{
 for(const f of manifest.fetches){
  const check=after.tables.checks.find((r:{url:string})=>r.url===f.url);
  if(f.error){
   assert.equal(check.error,f.error);
   const old=before.tables.checks.find((r:{url:string})=>r.url===f.url);
   if(old?.snapshot_key)assert.equal(check.snapshot_key,old.snapshot_key);
  }else{
   const snapshot=after.tables.snapshots.find((r:{key:string})=>r.key===check.snapshot_key);
   assert.equal(createHash('sha256').update(readSnapshot(folder+'/policy-radar-export.json',snapshot)).digest('hex'),f.hash);
  }
 }
});
