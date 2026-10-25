import test from 'node:test';
import assert from 'node:assert/strict';
import {readExport} from '../lib/export-store.ts';
import {createStaticData} from '../lib/static-data.ts';
import {policySchema,lifecycle} from '../lib/domain/model.ts';

const store=readExport('data/store') as any;
const data=createStaticData(store);
const revision=(id:string,version:number)=>policySchema.parse(JSON.parse(store.tables.revisions.find((r:any)=>r.id===`${id}:${version}`).data));
const keepsEvents=(id:string,from:number)=>{const a=revision(id,from),b=revision(id,from+1);for(const e of a.events)assert.deepEqual(b.events.find(x=>x.id===e.id),e,id);};

test('PFHxA stays phased after the October stage, with the 2027 textile stage next',()=>{
 const p=revision('eu-pfhxa-consumer-2026',3);keepsEvents('eu-pfhxa-consumer-2026',2);
 assert.equal(p.status,'phased');assert.equal(p.nextDate,'2027-10-10');assert.equal(p.nextKind,'implementation');
 // Annex XVII entry 79(1): 25 ppb PFHxA and salts, 1 000 ppb related substances; (7) placed before 10 October 2026.
 assert.match(p.after,/25 ppb/);assert.match(p.after,/1,000 ppb/);assert.match(p.rules![1].detail,/2026年10月10日前已投放市场/);
 assert.equal(p.effectiveDate,'2026-10-10');assert.equal(p.effectiveDateKind,'application');
 assert(p.sources.some(s=>s.kind==='law'&&s.id==='eu-pfhxa-regulation'));
 assert.equal(lifecycle(p,'2026-10-25'),'已适用 · 分步实施');
});

test('a passed DiscoverEU deadline is closed only with the portal evidence and invents no spring date',()=>{
 const p=revision('eu-discovereu-autumn-2026',2);keepsEvents('eu-discovereu-autumn-2026',1);
 assert.equal(revision('eu-discovereu-autumn-2026',1).status,'application_announced');
 assert.equal(p.status,'application_closed');assert.equal(p.nextDate,null);assert.equal(p.nextKind,undefined);
 assert.equal(p.events.find(e=>e.kind==='closed')!.sourceId,'portal');
 assert.match(p.statusNote!,/开放日期尚未公布/);
});

test('the Bremen regulation is in force and no longer shows a pending start',()=>{
 const p=revision('explain-doc-57be003982e82ac753a52394',3);keepsEvents('explain-doc-57be003982e82ac753a52394',2);
 assert.equal(p.effectiveDate,'2026-10-16');assert.equal(p.nextDate,null);assert.equal(p.nextLabel,'');
 assert(p.events.some(e=>e.kind==='effective'&&e.date==='2026-10-16'));
});

test('Baden-Württemberg feed aid moves to the 30 November deadline and corrects the evidence year',()=>{
 const p=revision('bw-drought-feed-aid-2026',2);keepsEvents('bw-drought-feed-aid-2026',1);
 assert.equal(p.status,'application_announced');assert.equal(p.nextDate,'2026-11-30');assert.equal(p.nextKind,'deadline');
 // VwV Futtermittelhilfe 7.2.3: evidence until 31 January 2027; the press release's "2026" is a typo.
 assert.match(p.limits,/第7\.2\.3条明确为2027年1月31日/);assert.doesNotMatch(p.limits,/应向主管部门确认/);
 assert(p.sources.some(s=>s.id==='vwv'&&s.kind==='law'));
});

test('weekend Official Journal days close with zero items and 23 October reconciles with intake',()=>{
 const scan=(id:string)=>JSON.parse(store.tables.scan_runs.find((x:any)=>x.id===id).data);
 for(const day of [17,18,24]){const s=scan(`eu-oj-20261025-${day}`);assert.equal(s.status,'complete');assert.equal(s.totalListed,0);assert.deepEqual(s.recordIds,[]);}
 const s=scan('eu-oj-20261025-23');assert.equal(s.status,'complete');assert.equal(s.totalListed,24);
 const items=data.intake.records.filter((r:any)=>r.region==='EU'&&r.sourceUrl==='https://eur-lex.europa.eu/oj/direct-access.html'&&r.date==='2026-10-23');
 assert.deepEqual([...s.recordIds].sort(),items.map((r:any)=>r.id).sort());
});
