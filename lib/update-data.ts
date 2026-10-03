import {migrateExportRegions} from './export-regions.ts';
import {isDeepStrictEqual as equal} from 'node:util';
import {createStaticData} from './static-data.ts';
import {policySchema,validateRevision} from './domain/model.ts';
import {scanSchema,intakeSchema,validateScanTime,berlinDate} from './domain/intake.ts';
import {discoveryForYear} from './domain/coverage.ts';

type Row={id?:string;data?:string;[key:string]:unknown};
type Export={exportedAt:string;tables:Record<string,Row[]>};
function index(rows:Row[],key:(r:Row)=>unknown){
 const result=new Map();
 for(const row of rows){const id=key(row);if(id===undefined||result.has(id))throw Error('Missing or duplicate row identity');result.set(id,row);}
 return result;
}

// This gate checks evidence structure and history, not whether an AI interpretation is true.
export function validateUpdate(previous:unknown,candidate:unknown,now=new Date()){
 createStaticData(previous);createStaticData(candidate);
 if((previous as {schemaVersion:number}).schemaVersion>(candidate as {schemaVersion:number}).schemaVersion)throw Error('Export schema cannot regress');
 const old=migrateExportRegions(previous) as Export,next=migrateExportRegions(candidate) as Export;
 if(Date.parse(next.exportedAt)<Date.parse(old.exportedAt)||Date.parse(next.exportedAt)>now.getTime()+60000)throw Error('Invalid export time');
 for(const [table,key] of Object.entries({revisions:(r:Row)=>`${r.policy_id}:${r.version}`,intake:(r:Row)=>r.id,scan_runs:(r:Row)=>r.id,snapshots:(r:Row)=>r.key})){
  const saved=index(old.tables[table],key),incoming=index(next.tables[table],key);
  for(const [id,row] of saved)if(!equal(row,incoming.get(id)))throw Error(`Immutable ${table} row changed or removed: ${id}`);
 }
 const policies=index(next.tables.policies,r=>r.id),prior=index(old.tables.policies,r=>r.id);
 for(const id of prior.keys())if(!policies.has(id))throw Error('Existing policy removed: '+id);
 const revisions=index(next.tables.revisions,r=>`${r.policy_id}:${r.version}`);
 const snapshots=index(next.tables.snapshots,r=>r.key);
 const checks=index(next.tables.checks,r=>r.url);
 for(const row of old.tables.checks){
  const updated=checks.get(row.url);
  if(!updated||Date.parse(String(updated.checked_at))<Date.parse(String(row.checked_at)))throw Error('Source check removed or regressed');
 }
 for(const row of next.tables.policies){
  const p=policySchema.parse(JSON.parse(row.data!));
  if(row.id!==p.id)throw Error('Policy row identity mismatch');
  const before=prior.get(p.id);
  if(before&&equal(before,row))continue;
  if(row.version!==(before?Number(before.version)+1:1))throw Error('Policy version must advance exactly once');
  if(before)validateRevision(policySchema.parse(JSON.parse(before.data!)),p);
  if(p.verifiedAt>berlinDate(now))throw Error('Policy verification is in the future');
  const revision=revisions.get(`${p.id}:${row.version}`);
  if(!revision||revision.data!==row.data)throw Error('Policy needs a matching revision');
  // Every cited page needs an archived original; a search snippet is not evidence.
  for(const source of p.sources){
   const c=checks.get(source.url),s=c&&snapshots.get(c.snapshot_key);
   if(!s||s.url!==source.url||c.error)throw Error('Policy source needs successful archived evidence: '+source.url);
  }
 }
 for(const revision of next.tables.revisions){
  const p=policySchema.parse(JSON.parse(revision.data!)),current=policies.get(revision.policy_id);
  if(p.id!==revision.policy_id||!current||Number(revision.version)>Number(current.version))throw Error('Orphan revision');
 }
 const sources=new Map(Array.from({length:Math.max(1,now.getUTCFullYear()-2026+1)},(_,i)=>discoveryForYear(2026+i)).flat().map(s=>[s.url,s]));
 const records=new Map(next.tables.intake.map(row=>{const r=intakeSchema.parse(JSON.parse(row.data!));if(row.id!==r.id)throw Error('Intake row identity mismatch');return [r.id,r];}));
 const oldRecords=new Set(old.tables.intake.map(r=>r.id));
 for(const [id,r] of records)if(!oldRecords.has(id)){
  if(sources.get(r.sourceUrl)?.region!==r.region||r.date>berlinDate(now))throw Error('Invalid discovery source, region or date');
 }
 const oldScans=new Set(old.tables.scan_runs.map(r=>r.id));
 for(const row of next.tables.scan_runs){
  if(oldScans.has(row.id))continue;
  const scan=scanSchema.parse(JSON.parse(row.data!));validateScanTime(scan,now);
  if(row.id!==scan.id||row.source_url!==scan.sourceUrl||row.checked_at!==scan.checkedAt)throw Error('Scan row identity mismatch');
  if(!sources.has(scan.sourceUrl))throw Error('Unregistered scan source');
  for(const id of scan.recordIds){const r=records.get(id);if(!r||r.region!==sources.get(scan.sourceUrl)!.region||r.date<scan.windowStart||r.date>scan.windowEnd)throw Error('Scan references a missing or out-of-window record');}
 }
 return {policies:policies.size,revisions:revisions.size,scans:next.tables.scan_runs.length};
}
