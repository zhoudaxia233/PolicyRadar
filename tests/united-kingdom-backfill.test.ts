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
const folder='data/exports/2026-10-07-uk-backfill-183857';
const read=(p:string)=>JSON.parse(readFileSync(p,'utf8'));
const manifest=read(folder+'/manifest.json');
const before=read(manifest.baseExport),after=read(folder+'/policy-radar-export.json');
const data=createStaticData(after);
const newIds=new Set<string>(manifest.reviewedPolicyIds);
const records=data.intake.records.filter(r=>r.id.startsWith('gb-catalog-'));

test('UK catalogue backfill reconciles every archived page against included and excluded identities',()=>{
 const ids:string[]=[];
 for(const f of manifest.feeds){
  const bytes=readFileSync(folder+'/'+f.file);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),f.sha256);
  const page=[...bytes.toString('utf8').matchAll(/<id>http:\/\/www\.legislation\.gov\.uk\/id\/([^<]+)<\/id>/g)].map(m=>m[1]);
  assert.equal(page.length,f.entries);ids.push(...page);
 }
 assert.equal(ids.length,1678);assert.equal(new Set(ids).size,1678);
 const included=records.map(r=>r.id.replace('gb-catalog-','').replaceAll('-','/'));
 assert.equal(records.length,1675);assert.equal(manifest.excludedRecords.length,3);
 assert.deepEqual(new Set([...included,...manifest.excludedRecords.map((r:{identity:string})=>r.identity)]),new Set(ids));
 assert.equal(records.filter(r=>r.date.startsWith('2026-01')).length,137);
 assert(records.every(r=>r.date>='2026-01-01'&&r.date<='2026-10-06'&&r.dateKind==='published'));
 // An ISBN in the catalogue URL is not a confirmed statutory instrument number.
 assert.equal(records.find(r=>r.id==='gb-catalog-uksi-2026-9780348283952')?.officialId,undefined);
});

test('UK backfill preserves all earlier policies and immutable history, and changes only UK review markers',()=>{
 validateSelection(before,after,new Date(after.exportedAt));
 for(const table of ['policies','revisions','intake','scan_runs','snapshots'])for(const row of before.tables[table]){
  const key=table==='snapshots'?'key':'id';assert.deepEqual(after.tables[table].find((r:Record<string,unknown>)=>r[key]===row[key]),row);
 }
 for(const row of before.tables.settings.filter((r:{key:string})=>!r.key.endsWith(':GB')))assert.deepEqual(after.tables.settings.find((r:{key:string})=>r.key===row.key),row);
 assert.deepEqual(after.discoveryRegistry,before.discoveryRegistry);
});

test('downloads and catalogue discoveries never close unreviewed coverage or claim adoption',()=>{
 const coverage=data.intake.coverage.filter(c=>c.region.startsWith('GB'));
 assert.equal(coverage.length,9);assert(coverage.every(c=>c.coveredThrough===null&&c.nextUncovered==='2026-01-01'&&c.latestScan?.status==='partial'));
 const newScans=after.tables.scan_runs.filter((r:{id:string})=>manifest.newScanIds.includes(r.id)).map((r:{data:string})=>JSON.parse(r.data));
 assert.equal(newScans.length,19);assert(newScans.every((s:{status:string;allPagesChecked:boolean})=>s.status==='partial'&&!s.allPagesChecked));
 assert.equal(records.filter(r=>r.stage==='adopted').length,13);
 assert.equal(records.filter(r=>r.stage==='unverified').length,1662);
 assert(records.filter(r=>r.stage==='unverified').every(r=>r.effectiveDate===null&&r.adoptionDate===null));
 const conflict=records.find(r=>r.id==='gb-catalog-uksi-2026-79')!;
 assert.equal(conflict.stage,'unverified');assert.match(conflict.note,/日期存在冲突/);
 const list=selectListing(data.policies,data.intake.records,readFilters('?country=GB'));
 assert.equal(list.count,13);assert.equal(list.raw.length,0);
 assert.equal(selectListing(data.policies,data.intake.records,readFilters('?country=GB&view=all')).count,1675);
});

test('reviewed UK backfill has current translations and preserves territorial and application-date limits',()=>{
 const l=createLocalization(data,read('data/translations/content.json'),read('data/translations/bindings.json'));
 const ps=data.policies.filter(p=>newIds.has(p.id));assert.equal(ps.length,12);
 for(const p of ps){
  assert.equal(l.policies[p.id],'current');assert.equal(p.originalLanguage,'en');
  for(const locale of ['de','en'] as const)assert(policyTextFields(localizePolicy(p,locale,l)).every(t=>!/[\u3400-\u9fff]/u.test(t)));
  for(const s of p.sources){
   const check=after.tables.checks.find((r:{url:string})=>r.url===s.url);assert.equal(check.error,null);
   const snapshot=after.tables.snapshots.find((r:{key:string})=>r.key===check.snapshot_key);assert.equal(snapshot.url,s.url);readSnapshot(folder+'/policy-radar-export.json',snapshot);
  }
 }
 const get=(id:string)=>ps.find(p=>p.id==='gb-'+id)!;
 assert.equal(get('wsi-2026-6').region,'GB-WLS');assert.equal(get('wsi-2026-6').effectiveDate,'2026-06-01');
 assert.equal(get('nisr-2026-5').region,'GB-NIR');assert.equal(get('nisr-2026-5').effectiveDate,'2026-06-14');assert.match(get('nisr-2026-5').limits,/存货可售至耗尽/);
 assert.equal(get('uksi-2026-17').region,'GB-ENG');assert.match(get('uksi-2026-17').after,/2025年11月27日/);
 assert.equal(get('wsi-2026-11').effectiveDateKind,'application');assert.equal(get('wsi-2026-11').effectiveDate,'2026-08-01');assert(get('wsi-2026-11').events.some(e=>e.date==='2026-02-12'));
 assert.match(get('uksi-2026-15').limits,/不适用于北爱尔兰/);assert.match(get('uksi-2026-15').limits,/不等于自动获得法定陪产工资/);
 assert.match(get('uksi-2026-73').limits,/不是保证修好/);
 assert.equal(records.filter(r=>l.intake[r.id]==='current').length,13);
 assert.equal(records.filter(r=>l.intake[r.id]==='missing').length,1662);
});

test('January archive includes PDF originals rather than only PDF landing pages',()=>{
 const pdfs=manifest.fetches.filter((f:{file:string})=>f.file.endsWith('.pdf'));assert.equal(pdfs.length,37);
 for(const f of pdfs){
  assert.equal(f.error,undefined);
  const check=after.tables.checks.find((r:{url:string})=>r.url===f.url);
  const snapshot=after.tables.snapshots.find((r:{key:string})=>r.key===check.snapshot_key);
  assert(readSnapshot(folder+'/policy-radar-export.json',snapshot).subarray(0,5).equals(Buffer.from('%PDF-')));
 }
});

test('UK intake date corrections preserve history and separate legal commencement from application',()=>{
 const corrected=read('data/exports/2026-10-07-uk-backfill-date-review-184206/policy-radar-export.json');
 validateSelection(after,corrected,new Date(corrected.exportedAt));
 const display=createStaticData(corrected);
 assert.equal(display.intake.records.filter(r=>r.id.startsWith('gb-catalog-')).length,1675);
 for(const code of ['wsi-2026-11','uksi-2026-38','uksi-2026-39']){
  const oldId='gb-catalog-'+code;
  assert.deepEqual(corrected.tables.intake.find((r:{id:string})=>r.id===oldId),after.tables.intake.find((r:{id:string})=>r.id===oldId));
  assert(!display.intake.records.some(r=>r.id===oldId));
  const r=display.intake.records.find(r=>r.id===oldId+'-date-correction')!;
  assert.equal(r.effectiveDate,code.startsWith('wsi')?'2026-02-12':null);
  const l=createLocalization(display,read('data/translations/content.json'),read('data/translations/bindings.json'));
  assert.equal(l.intake[r.id],'current');
 }
 assert.deepEqual(corrected.tables.policies,after.tables.policies);
 assert.deepEqual(corrected.tables.scan_runs,after.tables.scan_runs);
});
