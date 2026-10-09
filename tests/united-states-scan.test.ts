import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createStaticData} from '../lib/static-data.ts';
import {validateSelection} from '../lib/update-data.ts';
import {resolveTopicRegistry} from '../lib/domain/topics.ts';
import {selectListing} from '../lib/domain/listing.ts';
import {readFilters} from '../lib/domain/filters.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {localizeIntake,localizePolicy,searchText} from '../lib/i18n/content.ts';
import {readExport} from '../lib/export-store.ts';
const read=(p:string)=>JSON.parse(readFileSync(p,'utf8'));
const folder='data/exports/2026-10-08-us-scan-release';
const manifest=read(folder+'/manifest.json'),after=read(folder+'/policy-radar-export.json');
const data=createStaticData(after),records=data.intake.records.filter(r=>r.region.startsWith('US'));
const topics=resolveTopicRegistry(read('data/topics.json'),data);
const l=createLocalization(data,read('data/translations/content.json'),read('data/translations/bindings.json'));
const lookup=new Map([...data.policies,...data.intake.records].map(r=>[r.id,r]));
const listing=(q:string)=>selectListing(data.policies,data.intake.records,readFilters('?country=US&'+q),r=>searchText(lookup.get(r.id)!,l),'2026-10-08',topics);

test('adding US delivers actual discoveries and explanations, preserving the complete prior history',()=>{
 validateSelection(read(manifest.baseExport),after,new Date(after.exportedAt));
 assert.equal(records.length,120);assert.equal(data.policies.filter(p=>p.region.startsWith('US')).length,5);
 const current=createStaticData(readExport(read('data/current-export.json').path));
 assert(current.intake.records.some(r=>r.region==='US'));
 assert(current.intake.records.some(r=>r.region.startsWith('US-')));
 assert(current.policies.some(p=>p.region.startsWith('US')));
 for(const r of records){assert(!['Discover More','Flag Status',"Delaware's Government"].includes(r.title));assert.equal(l.intake[r.id],'current');}
});

test('real attempts do not claim full coverage or archive challenge pages as evidence',()=>{
 const coverage=data.intake.coverage.filter(r=>r.region.startsWith('US'));
 assert.equal(coverage.length,58);assert(coverage.every(r=>r.latestScan&&r.coveredThrough===null));
 const scans=after.tables.scan_runs.filter((r:{id:string})=>manifest.scanIds.includes(r.id)).map((r:{data:string})=>JSON.parse(r.data));
 assert(scans.every((s:{status:string;allPagesChecked:boolean})=>s.status!=='complete'&&!s.allPagesChecked));
 assert.equal(scans.filter((s:{windowStart:string;status:string})=>s.windowStart==='2026-10-01'&&s.status==='blocked').length,19);
 for(const url of ['https://www.illinois.gov/','https://www.illinois.gov/search-results.html?q=&contentType=news']){
  assert(!after.tables.snapshots.some((s:{url:string})=>s.url===url));
  const check=after.tables.checks.find((c:{url:string})=>c.url===url);
  assert.equal(check.snapshot_key,null);assert.match(check.error,/withheld from publication/);
 }
 const attempts=read(folder+'/fetch-attempts.json');
 for(const r of attempts.filter((a:{error:string})=>a.error))assert.equal(r.snapshot_key,null,r.url);
 const blocked=records.find(r=>r.titleZh?.includes('医疗补助规则变化的合作机构工具包'))!;
 assert(blocked);assert.equal(blocked.stage,'unverified');assert.match(blocked.note,/403/);
});

test('scholarship temporary and proposed rules stay distinct inside one bilingual matter',()=>{
 const t=topics.find(t=>t.id==='us-scholarship-credit-2026')!;
 assert.equal(t.recordIds.length,3);assert.deepEqual(t.policyIds,['us-scholarship-tax-credit-rules-2026']);
 const temp=records.find(r=>r.officialId==='TD 10057')!,proposal=records.find(r=>r.officialId==='REG-117199-25')!;
 assert.equal(temp.stage,'adopted');assert.equal(temp.effectiveDate,'2026-12-01');
 assert.equal(proposal.stage,'pending');assert.equal(proposal.effectiveDate,null);
 assert.equal(localizeIntake(proposal,'en',l).stage,'pending');
 const p=data.policies.find(p=>p.id===t.policyIds[0])!;
 assert.match(p.limits,/不是每名学生直接领1700/);assert.match(localizePolicy(p,'en',l).limits,/nonrefundable/);
 for(const q of ['view=intake&q=REG-117199-25','view=pending&q=REG-117199-25']){
  const result=listing(q);assert.equal(result.count,1);
  const children=q.includes('view=intake')?result.progress:result.raw;
  assert.deepEqual(children.map(r=>r.id),[proposal.id]);
 }
 const byTag=listing('view=intake&tags=教育&q=Federal%20Scholarship%20Tax%20Credit');
 assert.equal(byTag.count,1);
});

test('US matter counts preserve every child once and avoid cross-territory or broad-program merges',()=>{
 const progress=listing('view=intake');assert.equal(progress.progress.length,120);assert.equal(progress.count,116);
 const ids=progress.progressGroups.flatMap(g=>g.records.map(r=>r.id));assert.equal(new Set(ids).size,120);
 assert.equal(listing('view=all').count,116);
 const ia=topics.find(t=>t.id==='us-ia-dyed-diesel-2026')!;assert.equal(ia.recordIds.length,2);
 assert(ia.recordIds.every(id=>records.find(r=>r.id===id)!.region==='US-IA'));
 assert(topics.find(t=>t.id==='us-de-film-production-credit-2026')!.recordIds.every(id=>records.find(r=>r.id===id)!.region==='US-DE'));
 const awards=records.filter(r=>/Community Care|Minnie Hamilton/.test(r.title));assert.equal(awards.length,2);
 assert(!topics.some(t=>awards.every(r=>t.recordIds.includes(r.id))));
 assert(listing('view=intake&region=US-DE').progress.every(r=>r.region==='US-DE'));
 assert.equal(listing('view=intake&region=US-DE').count,records.filter(r=>r.region==='US-DE').length-1);
});

test('applications, conditional tax relief and source conflicts keep their material limits',()=>{
 const byId=(id:string)=>data.policies.find(p=>p.id===id)!;
 const diesel=byId('us-diesel-emergency-relief-2026');assert.equal(diesel.effectiveDate,null);assert.match(diesel.limits,/尚未核得后续实施公告/);
 const flood=byId('us-ct-september-flood-sba-loans-2026');assert.equal(flood.nextDate,'2026-12-01');assert.match(flood.dateExplanation!,/2027年7月2日/);assert.match(flood.summary,/须偿还/);
 const hi=byId('us-hi-agricultural-lease-qualification-2026');assert.equal(hi.nextDate,'2026-11-23');assert.match(hi.limits,/资格通过不等于获租/);
 const lift=byId('us-nd-lift-autumn-2026');assert.equal(lift.nextDate,'2026-11-09');assert.match(lift.after,/前三年利率为0%/);
 assert(records.some(r=>r.region==='US-WV'&&/来源表述存在差异/.test(r.note)));
});
