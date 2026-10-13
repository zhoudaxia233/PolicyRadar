import test from 'node:test';
import assert from 'node:assert/strict';
import {readExport} from '../lib/export-store.ts';

// Freeze the editorial correction in its retained revision, not a political
// outcome in today's projection: a later enacted law may legitimately differ.
const data=readExport('data/store');
const revisions=data.tables.revisions.filter(r=>r.policy_id==='de-reserve-service-2026');
const corrected=revisions.map(r=>JSON.parse(r.data)).find(p=>
 p.events.some((e:{id:string})=>e.id==='baseline-correction-20261013'));

test('reserve correction preserves compulsory exercises in the current-law baseline',()=>{
 assert(corrected);
 assert.match(corrected.before,/第59、61条/);
 assert.match(corrected.before,/强制.*演习/);
 assert(corrected.sources.some((s:{url:string})=>s.url==='https://www.gesetze-im-internet.de/sg/__59.html'));
 assert(corrected.sources.some((s:{url:string})=>s.url==='https://www.gesetze-im-internet.de/sg/__61.html'));
 assert(revisions.length>=2);
});

test('reserve correction retains grandfathering and conditions on the employer payment',()=>{
 assert.match(corrected.limits,/2011年6月30日/);
 for(const condition of ['249','30天','税级VI','每员工每年最多一次','六个月'])assert(corrected.limits.includes(condition),condition);
 assert.equal(corrected.phase,'pending');
 assert.equal(corrected.nextDate,'2026-10-15');
 assert.equal(corrected.events.find((e:{id:string})=>e.id==='baseline-correction-20261013').kind,'correction');
});
