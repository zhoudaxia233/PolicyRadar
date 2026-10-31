import test from 'node:test';
import assert from 'node:assert/strict';
import {recentCoverage} from '../lib/domain/recent-coverage.ts';
const source={region:'DE',url:'https://example.org/news',title:'News',publisher:'Government'};
const scan=(start:string,end:string,status='complete')=>({id:start+end,sourceUrl:source.url,checkedAt:'2026-10-07T12:00:00Z',windowStart:start,windowEnd:end,status,pages:[source.url],recordIds:[],excluded:[],allPagesChecked:status==='complete',totalListed:status==='complete'?0:null,note:'Checked'});
const now=new Date('2026-10-07T20:00:00Z');
test('partial homepage checks cannot hide a recent monitoring gap',()=>{
 const rows=recentCoverage([source],[scan('2026-01-01','2026-10-06','partial')],now);
 assert.equal(rows[0].missingDays.length,7);
});
test('recent coverage merges closed windows without requiring historical backfill',()=>{
 assert.deepEqual(recentCoverage([source],[scan('2026-09-30','2026-10-02'),scan('2026-10-03','2026-10-06')],now)[0].missingDays,[]);
});
test('a hole, another source, or a malformed complete scan cannot pass',()=>{
 const rows=recentCoverage([source],[scan('2026-09-30','2026-10-02'),scan('2026-10-04','2026-10-06'),{...scan('2026-10-03','2026-10-03'),sourceUrl:'https://example.org/other'}],now);
 assert.deepEqual(rows[0].missingDays,['2026-10-03']);
 assert.throws(()=>recentCoverage([source],[{...scan('2026-09-30','2026-10-06'),allPagesChecked:false}],now));
});
test('newly registered sources and future ongoing-day claims remain visible',()=>{
 assert.equal(recentCoverage([source],[],now)[0].missingDays.length,7);
 assert.throws(()=>recentCoverage([source],[scan('2026-09-30','2026-10-07')],now));
});
test('late-evening scans stay valid in winter and summer time',()=>{
 const winter={...scan('2026-10-29','2026-10-30','partial'),checkedAt:'2026-10-30T22:34:49Z'};
 const summer={...scan('2026-10-06','2026-10-07','partial'),checkedAt:'2026-10-07T21:30:00Z'};
 assert.equal(recentCoverage([source],[winter],new Date('2026-10-30T22:36:00Z'))[0].windowEnd,'2026-10-29');
 assert.equal(recentCoverage([source],[summer],new Date('2026-10-07T21:31:00Z'))[0].windowEnd,'2026-10-06');
});
test('the Berlin date turns over at local midnight, whatever the season',()=>{
 assert.equal(recentCoverage([source],[],new Date('2026-10-30T23:30:00Z'))[0].windowEnd,'2026-10-30');
 assert.equal(recentCoverage([source],[],new Date('2026-10-07T22:30:00Z'))[0].windowEnd,'2026-10-07');
});
test('a scan checked after the current moment is rejected',()=>{
 assert.throws(()=>recentCoverage([source],[{...scan('2026-10-05','2026-10-06','partial'),checkedAt:'2026-10-07T20:02:00Z'}],now),/future/);
});
