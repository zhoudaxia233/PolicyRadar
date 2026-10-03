import {migrateExportRegions,countryReviewSettings} from './export-regions.ts';
import { z } from 'zod';
import { policySchema } from './domain/model.ts';
import { intakeSchema, scanSchema, coverageRows, trackingStart } from './domain/intake.ts';
import { discoveryForYear } from './domain/coverage.ts';
import {currentRecords} from './domain/corrections.ts';

export const snapshotKey = /^sources\/[a-f0-9]{64}\/[a-f0-9]{64}\.(html|pdf)$/;
const dataRow = z.object({data:z.string()});
const exportSchema = z.object({
  format:z.literal('policy-radar-export'), schemaVersion:z.literal(3), exportedAt:z.string().datetime(),
  tables:z.object({
    policies:z.array(dataRow.extend({id:z.string(),version:z.number().int().positive()})),
    revisions:z.array(dataRow.extend({policy_id:z.string(),version:z.number().int().positive()})),
    intake:z.array(dataRow.extend({discovered_at:z.string().datetime()})),
    scan_runs:z.array(dataRow),
    checks:z.array(z.object({url:z.string().url(),checked_at:z.string(),last_success_at:z.string().nullable(),error:z.string().nullable(),changed:z.number(),snapshot_key:z.string().nullable()})),
    snapshots:z.array(z.object({key:z.string().regex(snapshotKey),hash:z.string().regex(/^[a-f0-9]{64}$/)})),
    settings:z.array(z.object({key:z.string(),value:z.string()})),
  }),
});

// Build-time projection only. The browser never opens a database or writes to the Site.
export function createStaticData(input:unknown) {
  const data=exportSchema.parse(migrateExportRegions(input));
  const year=new Date(data.exportedAt).getUTCFullYear();
  const policies=data.tables.policies.map(r=>{const p=policySchema.parse(JSON.parse(r.data));return {...p,events:currentRecords(p.events)};});
  for(const r of data.tables.revisions) policySchema.parse(JSON.parse(r.data));
  const scans=data.tables.scan_runs.map(r=>scanSchema.parse(JSON.parse(r.data)));
  const records=data.tables.intake.map(r=>({...intakeSchema.parse(JSON.parse(r.data)),discoveredAt:r.discovered_at}));
  const byId=new Map(records.map(r=>[r.id,r]));
  for(const record of records)if(record.supersedes){
    const before=byId.get(record.supersedes);
    if(!before||['region','url','sourceUrl','officialId'].some(key=>record[key as keyof typeof record]!==before[key as keyof typeof before])||record.discoveredAt<before.discoveredAt)throw Error('Intake correction must preserve document identity and discovery order');
  }
  const discovery=discoveryForYear(year);
  const keys=new Set(data.tables.snapshots.map(s=>s.key));
  for(const c of data.tables.checks) if(c.snapshot_key&&!keys.has(c.snapshot_key)) throw Error('Missing registered snapshot: '+c.snapshot_key);
  return {
    exportedAt:data.exportedAt,
    policies,
    policyVersions:Object.fromEntries(data.tables.policies.map(p=>[p.id,p.version])),
    status:{
      checks:data.tables.checks,
      settings:countryReviewSettings(data.tables.settings),
      coverage:[...new Set(discovery.map(s=>s.region))],discovery,
    },
    intake:{trackingStart,records:currentRecords(records),coverage:coverageRows(scans,year)},
  };
}
