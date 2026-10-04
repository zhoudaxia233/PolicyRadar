import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createStaticData} from '../lib/static-data.ts';
import {exportRegistry} from '../lib/export-registry.ts';
import {coverageRows} from '../lib/domain/intake.ts';
const exported=JSON.parse(readFileSync(new URL('../data/exports/2026-10-03/policy-radar-export.json',import.meta.url),'utf8'));

test('static publication retains live policies, intake and honest historical coverage',()=>{
 const result=createStaticData(exported);
 assert.deepEqual(result.policies,exported.tables.policies.map((r:{data:string})=>JSON.parse(r.data)));
 assert.equal(result.intake.records.length,exported.tables.intake.length);
 assert.deepEqual(result.intake.coverage,coverageRows(exported.tables.scan_runs.map((r:{data:string})=>JSON.parse(r.data)),2026,exportRegistry(exported)));
 assert.equal(result.status.settings['lastReviewAt:DE'],exported.tables.settings.find((r:{key:string})=>r.key==='lastReviewAt').value);
 assert.equal('scheduleLabel' in result.status.settings,false);
});
test('publication rejects malformed policy data and missing evidence instead of a partial empty site',()=>{
 const malformed=structuredClone(exported);malformed.tables.policies[0].data='{}';
 assert.throws(()=>createStaticData(malformed));
 const missing=structuredClone(exported);missing.tables.snapshots=[];
 assert.throws(()=>createStaticData(missing),/Missing registered snapshot/);
});
test('a static snapshot never implies that a future annual source was checked',()=>{
 const result=createStaticData({...exported,exportedAt:'2026-12-31T23:00:00.000Z'});
 assert.deepEqual(result.intake.coverage,createStaticData(exported).intake.coverage);
});
