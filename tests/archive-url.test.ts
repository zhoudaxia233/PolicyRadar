import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {archiveUrl,archiveBase} from '../lib/archive-url.ts';
import {readExport} from '../lib/export-store.ts';

test('evidence links point at the content-addressed repository archive',()=>{
 const hash='a'.repeat(64);
 assert.equal(archiveUrl(`sources/${'b'.repeat(64)}/${hash}.pdf`),archiveBase+hash+'.pdf');
 assert.match(archiveBase,/^https:\/\/raw\.githubusercontent\.com\/zhoudaxia233\/PolicyRadar\/main\/data\/sources\/$/);
});
test('every active evidence link resolves to archived bytes matching the recorded hash',()=>{
 const current=JSON.parse(readFileSync('data/current-export.json','utf8')).path;
 const {tables}=readExport(current);
 for(const s of tables.snapshots){
  const bytes=readFileSync('data/sources/'+archiveUrl(s.key).slice(archiveBase.length));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),s.hash,s.key);
 }
});
