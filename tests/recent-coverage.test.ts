import test from 'node:test';
import assert from 'node:assert/strict';
import {recentCoverage} from '../lib/domain/recent-coverage.ts';
const source={region:'DE',url:'https://example.org/news',title:'News',publisher:'Government'};
const scan=(start:string,end:string,status='complete')=>({id:start+end,sourceUrl:source.url,checkedAt:'2026-10-07T12:00:00Z',windowStart:start,windowEnd:end,status,pages:[source.url],recordIds:[],excluded:[],allPagesChecked:status==='complete',totalListed:status==='complete'?0:null,note:'Checked'});
test('partial homepage checks cannot hide a recent monitoring gap',()=>{
 const rows=recentCoverage([source],[scan('2026-01-01','2026-10-06','partial')],'2026-10-07');
 assert.equal(rows[0].missingDays.length,7);
});
test('recent coverage merges closed windows without requiring historical backfill',()=>{
 assert.deepEqual(recentCoverage([source],[scan('2026-09-30','2026-10-02'),scan('2026-10-03','2026-10-06')],'2026-10-07')[0].missingDays,[]);
});
test('a hole, another source, or a malformed complete scan cannot pass',()=>{
 const rows=recentCoverage([source],[scan('2026-09-30','2026-10-02'),scan('2026-10-04','2026-10-06'),{...scan('2026-10-03','2026-10-03'),sourceUrl:'https://example.org/other'}],'2026-10-07');
 assert.deepEqual(rows[0].missingDays,['2026-10-03']);
 assert.throws(()=>recentCoverage([source],[{...scan('2026-09-30','2026-10-06'),allPagesChecked:false}],'2026-10-07'));
});
test('newly registered sources and future ongoing-day claims remain visible',()=>{
 assert.equal(recentCoverage([source],[],'2026-10-07')[0].missingDays.length,7);
 assert.throws(()=>recentCoverage([source],[scan('2026-09-30','2026-10-07')],'2026-10-07'));
});
