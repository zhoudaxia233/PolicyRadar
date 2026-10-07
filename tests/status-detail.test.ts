import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {lifecycle} from '../lib/domain/model.ts';
// Candidate translations must be checked against their candidate record version.
const data=JSON.parse(readFileSync(process.env.POLICY_RADAR_EXPORT??JSON.parse(readFileSync('data/current-export.json','utf8')).path,'utf8'));
const policies=data.tables.policies.map((r:{data:string})=>JSON.parse(r.data));
const by=(id:string)=>policies.find((p:{id:string})=>p.id===id);
test('an expiry date does not make rent regulations temporary measures',()=>{
 const rent=policies.filter((p:{status:string;nextLabel:string})=>p.status==='已生效'&&/期限结束|有效期结束|条例到期/.test(p.nextLabel));
 assert(rent.length>=7);
 for(const p of rent)assert.equal(lifecycle(p,'2026-10-04'),'已生效',p.id);
 assert.equal(lifecycle(by('he-rent-protection-2025'),'2026-10-04'),'已生效');
});
test('announced applications stay distinct from legal commencement',()=>{
 for(const p of policies.filter((p:{status:string})=>p.status==='申请安排已公布'))assert.equal(lifecycle(p,'2026-10-04'),'申请安排已公布',p.id);
});
test('elapsed next steps do not cast doubt on confirmed adoption',()=>{
 const p={...by('fr-11-daeu-grant'),status:'adopted',effectiveDate:null,nextDate:'2026-10-01',nextKind:'scheduled' as const};
 assert.equal(lifecycle(p,'2026-10-04'),'已通过 · 后续进展待核实');
 assert.equal(lifecycle({...p,nextKind:'deadline'},'2026-10-04'),'已通过 · 期限已到，后续待核实');
});

import {legacyStatus} from '../lib/domain/legacy-status.ts';
import {policyStatusNote,policySchema} from '../lib/domain/model.ts';
import {buildSync} from 'esbuild';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createStaticData} from '../lib/static-data.ts';
import {createLocalization} from '../lib/i18n/build.ts';
const bundle=buildSync({entryPoints:['app/policy-status-note.tsx'],bundle:true,write:false,platform:'node',format:'esm',jsx:'automatic'}).outputFiles[0].text;
const {PolicyStatusNote}=await import('data:text/javascript;base64,'+Buffer.from(bundle).toString('base64'));
const catalog=JSON.parse(readFileSync('data/translations/content.json','utf8'));
test('detail notes suppress identical labels while preserving additional legacy details',()=>{
 for(const p of policies){
  const before=JSON.stringify(p);
  const expectedNote=p.statusNote??(Object.hasOwn(legacyStatus,p.status)?p.status:undefined);
  assert.equal(policyStatusNote(p),expectedNote,p.id);
  const html=renderToStaticMarkup(createElement(PolicyStatusNote,{policy:p,locale:'zh',messages:catalog,today:'2026-10-04'}));
  if(!expectedNote||expectedNote===lifecycle(p,'2026-10-04'))assert.equal(html,'',p.id);
  else {assert(html.includes('上次核实时的说明：'),p.id);assert(html.includes(p.statusNote??p.status),p.id);}
  assert.equal(JSON.stringify(p),before);
 }
 for(const id of ['de-crypto-holding-proposal','ch-thirteenth-ahv','ch-vd-energy-law','th-kita-third-free-year-2026','he-rent-protection-2025'])assert(policyStatusNote(by(id)));
});
test('saved status explanations retain German and English translations',()=>{
 const localized=createLocalization(createStaticData(data),catalog,JSON.parse(readFileSync('data/translations/bindings.json','utf8')));
 for(const p of policies){
  assert.equal(localized.policies[p.id],'current',p.id);
  for(const locale of ['de','en']){
   const html=renderToStaticMarkup(createElement(PolicyStatusNote,{policy:p,locale,messages:catalog,today:'2026-10-04'}));
   assert(!/[\u3400-\u9fff]/.test(html),p.id+' '+locale);
  }
 }
});
test('explicit notes override legacy fallback and enum codes are never shown as notes',()=>{
 const p=by('ch-thirteenth-ahv');
 assert.equal(policyStatusNote({...p,statusNote:'Confirmed payment month: December 2026'}),'Confirmed payment month: December 2026');
 assert.equal(policyStatusNote({...p,status:'adopted'}),undefined);
 assert.equal(renderToStaticMarkup(createElement(PolicyStatusNote,{policy:{...p,status:'adopted'},locale:'zh',messages:catalog,today:'2026-10-04'})), '');
});
test('structured application and temporary statuses preserve the same distinctions',()=>{
 for(const status of ['application_announced','temporary'])assert(policySchema.safeParse({...by('de-fuel-relief-2026'),status}).success);
 const p={...by('de-fuel-relief-2026'),status:'adopted',nextKind:'expiry' as const};
 assert.equal(lifecycle(p,'2026-10-04'),'已生效');
 assert.equal(lifecycle({...p,status:'temporary'},'2026-10-04'),'已生效 · 临时措施');
 assert.equal(lifecycle({...p,status:'application_announced'},'2026-10-04'),'申请安排已公布');
 assert.equal(lifecycle({...p,status:'application_announced'},'2027-01-01'),'申请安排已公布 · 期限已到，后续待核实');
});


test('detail-note comparison follows the date and also deduplicates translated text',()=>{
 const p=by('ch-be-information-security');
 const render=(policy:typeof p,today:string,locale='zh')=>renderToStaticMarkup(createElement(PolicyStatusNote,{policy,today,locale,messages:catalog}));
 assert.equal(render(p,'2026-10-04'),'');
 assert(render(p,'2026-11-01').includes('已通过 · 待生效'));
 for(const locale of ['de','en'])assert.equal(render(by('de-rent-cap-2029'),'2026-10-04',locale),'');
 const explicit={...p,status:'adopted',statusNote:'In effect'};
 assert.equal(render(explicit,'2026-11-01','en'),'');
});

import {validateSelection} from '../lib/update-data.ts';
test('weekly candidates accept both newer status codes through the operational selection gate',()=>{
 for(const [id,status,nextKind] of [
  ['de-fuel-relief-2026','temporary','expiry'],
  ['nl-dr-rural-investment','application_announced','deadline']
 ]){
  const next=structuredClone(data);
  next.discoveryRegistry=JSON.parse(readFileSync('data/discovery-registry.json','utf8'));
  const row=next.tables.policies.find((r:{id:string})=>r.id===id);
  const policy=JSON.parse(row.data);
  row.version++;
  row.data=JSON.stringify({...policy,status,statusNote:policy.status,nextKind});
  next.tables.revisions.push({policy_id:id,version:row.version,data:row.data});
  assert.doesNotThrow(()=>validateSelection(data,next),id);
 }
});
