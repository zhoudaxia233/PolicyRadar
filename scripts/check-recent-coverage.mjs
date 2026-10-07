import {readFile} from 'node:fs/promises';
import {recentCoverage} from '../lib/domain/recent-coverage.ts';
import {berlinDate} from '../lib/domain/intake.ts';
import {discoveryForYear} from '../lib/domain/coverage.ts';
import {registrySchema} from '../lib/export-registry.ts';

const [path,region]=process.argv.slice(2);
const selected=path??JSON.parse(await readFile('data/current-export.json','utf8')).path;
const data=JSON.parse(await readFile(selected,'utf8'));
// Use the maintained registry, so channels absent from old exports remain gaps.
const registry=registrySchema.parse(JSON.parse(await readFile('data/discovery-registry.json','utf8')));
if(region&&!registry.some(s=>s.region===region))throw Error('Unknown monitoring region');
const today=berlinDate();
const sources=discoveryForYear(Number(today.slice(0,4)),registry).filter(s=>!region||s.region===region);
const rows=recentCoverage(sources,data.tables.scan_runs.map(r=>JSON.parse(r.data)),today);
const gaps=rows.filter(r=>r.missingDays.length);
console.log(JSON.stringify({checkedAt:new Date().toISOString(),scope:region??'all',channels:rows.length,incompleteChannels:gaps.length,gaps},null,2));
// Operational alarm, not a publication veto: preserve useful partial updates.
if(gaps.length)process.exitCode=2;
