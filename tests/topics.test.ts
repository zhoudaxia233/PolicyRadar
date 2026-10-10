import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createStaticData} from '../lib/static-data.ts';
import {resolveTopics,resolveTopicRegistry,groupRecords,type TopicDefinition} from '../lib/domain/topics.ts';
import {selectListing} from '../lib/domain/listing.ts';
import {readFilters,filterSearch} from '../lib/domain/filters.ts';
import {createLocalization} from '../lib/i18n/build.ts';
import {localizeIntake,localizePolicy,searchText} from '../lib/i18n/content.ts';
import {readExport} from '../lib/export-store.ts';
const read=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const data=createStaticData(readExport(process.env.POLICY_RADAR_EXPORT??read('data/current-export.json').path));
const definitions:TopicDefinition[]=read('data/topics.json').topics;
const topics=resolveTopicRegistry(read('data/topics.json'),data);
const localization=createLocalization(data,read('data/translations/content.json'),read('data/translations/bindings.json'));
const base={...readFilters('?country=EU&view=intake')};
const select=(filters=base)=>selectListing(data.policies,data.intake.records,filters,undefined,'2026-10-08',topics);

test('a later group preserves prior groups and still validates missing references',()=>{
 const prior=createStaticData(read('data/exports/2026-10-08-bmf-timeline-213634/policy-radar-export.json'));
 const registry=read('data/topics.json');
 const groups=resolveTopicRegistry(registry,prior);
 assert(groups.some(t=>t.id==='de-crypto-information-exchange'));
 assert(groups.some(t=>t.id==='us-scholarship-credit-2026'));
 assert(!groups.some(t=>t.id==='de-eudi-wallet-2026'));
 const future=registry.topics.find((t:TopicDefinition)=>t.id==='de-eudi-wallet-2026')!;
 assert(future.appliesFromExport);
 assert.throws(()=>resolveTopicRegistry(registry,{...prior,exportedAt:future.appliesFromExport}),/Unresolved topic document/);
});

test('PRIMA is one matter containing three distinct originals, with facts intact',()=>{
 const before=JSON.stringify(data),result=select(),group=result.progressGroups.find(g=>g.id==='topic:eu-morocco-prima')!;
 assert(group);
 assert.equal(group.records.length,3);
 assert.deepEqual(group.records.map(r=>r.officialId),['OJ:L_202602217','OJ:L_202602218','OJ:L_202602219']);
 assert(group.records.every(r=>r.stage==='unverified'&&r.date==='2026-10-05'));
 assert.equal(result.count,result.progressGroups.length);
 const expectedRecords=data.intake.records.filter(r=>r.region==='EU').length;
 assert.equal(result.progress.length,expectedRecords);
 assert.equal(new Set(result.progressGroups.flatMap(g=>g.records.map(r=>r.id))).size,expectedRecords);
 assert.equal(JSON.stringify(data),before);
});

test('every grouped or independent record remains reachable exactly once',()=>{
 const grouped=groupRecords(data.intake.records,topics).flatMap(g=>g.records.map(r=>r.id));
 assert.deepEqual([...grouped].sort(),data.intake.records.map(r=>r.id).sort());
 // A single-record matter is allowed only when it is explicitly linked to its explanation.
 const linked=new Set(definitions.filter(d=>d.explanations).map(d=>d.id));
 for(const t of topics){assert(t.recordIds.length>=2||(linked.has(t.id)&&t.policyIds.length>0),t.id);assert(t.title.every(s=>s.trim()));}
});

test('same gazette URLs, generic corrigenda, different cases and territories stay independent',()=>{
 const records=data.intake.records;
 for(const subset of [
  records.filter(r=>r.officialId==='https://www.bundesregierung.de/breg-de/suche/gesetzliche-neuregelungen-september-2026-2450158'),
  records.filter(r=>r.title==='The corrigendum does not concern the English version.'),
  records.filter(r=>r.title.includes('Lasseigne')&&r.region==='EU'),
  records.filter(r=>/Case C-399\/25|Case C-400\/25/.test(r.title)),
 ]){assert(subset.length>1);assert.equal(groupRecords(subset,topics).length,subset.length);}
 const law=records.filter(r=>r.title.includes('Renters’ Rights Act 2025'));
 for(const g of groupRecords(law,topics))assert.equal(new Set(g.records.map(r=>r.region)).size,1);
});

test('searching any child or any translated matter title returns its group without adding nonmatching documents',()=>{
 for(const query of ['2218','摩洛哥参与 PRIMA','Morocco’s participation in PRIMA']){
  const result=select({...base,query});
  assert.equal(result.count,1,query);
  assert.equal(result.progressGroups[0].id,'topic:eu-morocco-prima');
  if(query==='2218'){assert.equal(result.progress.length,1);assert.equal(result.progress[0].officialId,'OJ:L_202602218');}
  assert.deepEqual(select(readFilters(filterSearch('',{...base,query}))),result);
 }
});

test('country, region, stage and tags filter children before group counts are computed',()=>{
 for(const view of ['all','adopted','pending','intake'])for(const country of ['DE','FR','EU','GB','ES']){
  const result=select({...base,country,view});
  assert.equal(result.count,view==='intake'?result.progressGroups.length:result.policies.length+result.rawGroups.length+result.explainedGroups.length);
  if(view==='adopted'||view==='pending')assert(result.raw.every(r=>r.stage===view));
 }
 const empty=select({...base,query:'PRIMA',tags:['银行与支付']});
 assert.equal(empty.count,0);
 assert.equal(select({...base,query:'PRIMA',view:'adopted'}).count,0);
 const region=select({...base,country:'GB',region:'GB-SCT'});
 assert(region.progressGroups.every(g=>g.records.every(r=>r.region==='GB-SCT')));
});

test('related raw documents do not duplicate an existing explanation, and remain expandable with it',()=>{
 const state={...base,country:'FR',view:'all',query:'2026-921'};
 const result=select(state);
 assert.equal(result.count,1);
 assert.equal(result.policies.length,1);
 assert.equal(result.rawGroups.length,0);
 assert.equal(result.policyGroups.length,1);
 assert.equal(result.policyGroups[0].records.length,2);
});

test('all locales group identical records and search original titles as well as translations',()=>{
 for(const locale of ['zh','en'] as const){
  const records=data.intake.records.map(r=>localizeIntake(r,locale,localization));
  const policies=data.policies.map(p=>localizePolicy(p,locale,localization));
  const index=new Map(data.intake.records.map(r=>[r.id,searchText(r,localization)]));
  const result=selectListing(policies,records,{...base,query:'PRIMA'},r=>index.get(r.id)??'','2026-10-08',topics);
  assert.equal(result.count,1);
  assert.equal(result.progress.length,3);
  assert.equal(result.progressGroups[0].title?.[locale==='zh'?0:1],topics[0].title[locale==='zh'?0:1]);
 }
});

test('document references survive display-title corrections but reject dangling and conflicting relations',()=>{
 const prima=definitions[0],records=data.intake.records.map(r=>({...r,id:r.id+'-new',titleZh:'更正译文'}));
 assert.equal(resolveTopics([prima],records,data.policies)[0].recordIds.length,3);
 assert.throws(()=>resolveTopics([{...prima,documents:[{region:'EU',officialId:'missing'}]}],records,[]),/Unresolved/);
 assert.throws(()=>resolveTopics([prima,{...prima,id:'duplicate-members'}],records,[]),/multiple topics/);
 assert.throws(()=>resolveTopics([prima,{...prima}],records,[]),/Duplicate topic/);
});


test('two explanations of the same Italian benefit appear under one matter without losing either',()=>{
 const result=select({...base,country:'IT',view:'all',query:'新生儿补助'});
 const group=result.explainedGroups.find(g=>g.id==='topic:it-newborn-bonus')!;
 assert(group);assert.equal(group.records.length,2);assert.equal(group.policyIds.length,2);
 assert(group.policyIds.every(id=>!result.policies.some(p=>p.id===id)));
 assert.equal(result.count,result.policies.length+result.rawGroups.length+result.explainedGroups.length);
 const narrow=select({...base,country:'IT',view:'adopted',tags:['家庭补助'],query:'新生儿'});
 assert.equal(narrow.explainedGroups[0].records.length,1);
});


test('historical builds do not inherit newer grouping judgments and timeline events remain intact',()=>{
 const historical=createStaticData(read('data/exports/2026-10-03/policy-radar-export.json'));
 assert.deepEqual(resolveTopicRegistry(read('data/topics.json'),historical),[]);
 const filters={...base,country:'IT',view:'updates',query:'新生儿'};
 const original=selectListing(data.policies,data.intake.records,filters,undefined,'2026-10-08');
 assert.deepEqual(select(filters).policies.map(p=>p.id),original.policies.map(p=>p.id));
});

test('the latest matching document orders a matter, without changing child dates',()=>{
 const sample=data.intake.records.slice(0,3).map((r,i)=>({...r,id:'chronology-'+i,date:['2026-01-01','2026-10-01','2026-08-01'][i]}));
 const grouped=groupRecords(sample,[{id:'one',title:['事项','Matter'],recordIds:sample.slice(0,2).map(r=>r.id),policyIds:[]}]);
 assert.equal(grouped[0].id,'topic:one');
 assert.deepEqual(grouped[0].records.map(r=>r.date),['2026-01-01','2026-10-01']);
 const filtered=groupRecords([sample[0],sample[2]],[{id:'one',title:['事项','Matter'],recordIds:sample.slice(0,2).map(r=>r.id),policyIds:[]}]);
 assert.equal(filtered[0].records[0].id,sample[2].id);
});

test('a matter with several explanations is one dated card in the place of its first matching explanation',()=>{
 for(const view of ['all','adopted','pending'])for(const country of ['DE','IT','EU','GB','ES'])for(const query of ['','加密','新生儿']){
  const result=select({...base,country,view,query});
  assert.equal(result.cards.length,result.policies.length+result.explainedGroups.length);
  assert.equal(result.count,result.cards.length+result.rawGroups.length);
  assert.deepEqual(result.cards.filter(c=>!c.group).map(c=>c.policy),result.policies);
  assert.deepEqual(result.cards.filter(c=>c.group).map(c=>c.group),result.explainedGroups);
  for(const c of result.cards)if(c.group)assert(c.group.policyIds.includes(c.policy.id));
 }
 const pending=select({...base,country:'DE',view:'pending'});
 const crypto=pending.cards.find(c=>c.group?.id==='topic:de-crypto-holding-period')!;
 assert(crypto);
 // In the pending list the card is dated and labelled by the pending ministry draft, not the rejected bill.
 assert.equal(crypto.policy.id,'de-bmf-crypto-tax-reform-2027');
 assert.equal(pending.cards.filter(c=>c.group?.id==='topic:de-crypto-holding-period').length,1);
 // With every version listed, the rejected bill still does not label the matter as ended.
 const all=select({...base,country:'DE',view:'all'});
 const matter=all.cards.filter(c=>c.group?.id==='topic:de-crypto-holding-period');
 assert.equal(matter.length,1);assert.equal(matter[0].policy.id,'de-bmf-crypto-tax-reform-2027');
 // Only closed versions match: the closed version leads rather than hiding the matter.
 const withoutDraft=data.policies.filter(p=>p.id!=='de-bmf-crypto-tax-reform-2027');
 const closed=selectListing(withoutDraft,data.intake.records,{...base,country:'DE',view:'all'},undefined,'2026-10-08',topics);
 assert.deepEqual(closed.cards.filter(c=>c.group?.id==='topic:de-crypto-holding-period').map(c=>c.policy.id),['de-crypto-holding-proposal']);
});

test('rejected Green crypto bill remains reachable in all-policy searches',()=>{
 const green=data.policies.find(p=>p.officialId==='BT-Drs. 21/5752')??data.policies.find(p=>p.officialId?.includes('21/5752'));
 assert(green);
 assert.equal(green.phase,'closed');
 for(const query of ['21/5752','绿党']){
  const result=select({...base,country:'DE',view:'all',query});
  assert(result.cards.some(c=>c.policy.id===green.id||c.group?.policyIds.includes(green.id)),query);
 }
 const adopted=select({...base,country:'DE',view:'adopted',query:'21/5752'});
 assert(!adopted.cards.some(c=>c.policy.id===green.id||c.group?.policyIds.includes(green.id)));
});

test('an explicit explanation link attaches an explanation whose identifier is not a record identity',()=>{
 // The 2027 social-insurance explanation is keyed by the regulation's name; the cabinet notice has only a URL.
 const records=data.intake.records.filter(r=>r.id==='kab61-ea9de67f46');
 const policy=data.policies.find(p=>p.id==='de-social-insurance-ceilings-2027')!;
 assert.equal(records.length,1);
 const one:TopicDefinition={id:'t',title:['甲','A'],basis:'Reviewed.',documents:[{region:'DE',url:records[0].url,title:records[0].title}]};
 assert.throws(()=>resolveTopics([one],records,data.policies),/at least two/);
 const [linked]=resolveTopics([{...one,explanations:[policy.id]}],records,data.policies);
 assert.deepEqual(linked.policyIds,[policy.id]);
 assert.throws(()=>resolveTopics([{...one,explanations:['missing-policy']}],records,data.policies),/Unresolved topic explanation/);
 const foreign=data.policies.find(p=>p.region==='FR')!;
 assert.throws(()=>resolveTopics([{...one,explanations:[foreign.id]}],records,data.policies),/Cross-country/);
 const result=selectListing(data.policies,records,{...readFilters('?country=DE&view=all')},undefined,'2026-10-10',[linked]);
 assert(!result.raw.some(r=>r.id===records[0].id));
});

test('a document added to an older group later does not break builds of earlier snapshots',()=>{
 const prior=createStaticData(read('data/exports/2026-10-08-bmf-timeline-213634/policy-radar-export.json'));
 const registry=read('data/topics.json');
 const later='2026-10-10T12:00:00.000Z';
 const extended={...registry,topics:registry.topics.map((t:TopicDefinition)=>t.id==='de-crypto-information-exchange'?{...t,documents:[...t.documents,{region:'DE',officialId:'BGBl. 2099 II Nr. 1',appliesFromExport:later}]}:t)};
 assert.deepEqual(resolveTopicRegistry(extended,prior),resolveTopicRegistry(registry,prior));
 assert.throws(()=>resolveTopicRegistry(extended,{...prior,exportedAt:later}),/Unresolved topic document/);
});

test('an explanation linked to an older group later does not break builds of earlier snapshots',()=>{
 const prior=createStaticData(read('data/exports/2026-10-08-bmf-timeline-213634/policy-radar-export.json'));
 const registry=read('data/topics.json');
 const later='2026-10-10T12:00:00.000Z';
 const extended={...registry,topics:registry.topics.map((t:TopicDefinition)=>t.id==='de-crypto-information-exchange'?{...t,explanations:[{id:'not-yet-written',appliesFromExport:later}]}:t)};
 assert.deepEqual(resolveTopicRegistry(extended,prior),resolveTopicRegistry(registry,prior));
 assert.throws(()=>resolveTopicRegistry(extended,{...prior,exportedAt:later}),/Unresolved topic explanation/);
});
