import {countryOf,countries,type Policy} from './domain/model.ts';
import type {IntakeRecord,coverageRows} from './domain/intake.ts';
import type {DiscoverySource} from './domain/coverage.ts';
import type {Topic} from './domain/topics.ts';
import type {Disposition} from './domain/dispositions.ts';
import {policyTextFields,emptyLocalization,type Localization,type ContentCatalog} from './i18n/content.ts';

// The site is published as one small shell plus one file per country. A reader
// downloads the shell and the country they look at; other countries load only
// when they switch to them.
export type CheckRow={url:string;checked_at:string;last_success_at:string|null;error:string|null;changed:number;snapshot_key:string|null};
export type CoverageRow=ReturnType<typeof coverageRows>[number];
export type SiteData={
 exportedAt:string;policies:Policy[];
 status:{checks:CheckRow[];settings:Record<string,string>;coverage:string[];discovery:DiscoverySource[]};
 intake:{trackingStart:string;records:IntakeRecord[];coverage:CoverageRow[]};
 topics:Topic[];dispositions:Disposition[];areas:Record<string,string>;localization:Localization;
};
export type SiteShell={
 exportedAt:string;
 // Enough of every policy to resolve a shared link to its country before that country has loaded.
 policies:{id:string;region:string}[];
 status:Omit<SiteData['status'],'checks'>;
 intake:Pick<SiteData['intake'],'trackingStart'>;
 topics:Topic[];dispositions:Disposition[];areas:Record<string,string>;
};
export type CountryBundle={
 country:string;policies:Policy[];records:IntakeRecord[];checks:CheckRow[];coverage:CoverageRow[];
 // This country's translation states; the English catalog entries its texts use are a separate file,
 // fetched only when the page is read in English.
 localization:Omit<Localization,'messages'>;
};
export type CountryFiles={bundle:CountryBundle;messages:ContentCatalog};

// The title a source panel looks up: the year in a registered title is normalised to 2026 first.
export function sourceTitleKey(title:string){const year=title.match(/20\d{2}/)?.[0];return year?title.replace(year,'2026'):title;}

function countryTexts(country:string,data:SiteData,policies:Policy[],records:IntakeRecord[],discovery:DiscoverySource[],coverage:CoverageRow[]){
 const texts:string[]=[];
 for(const p of policies)texts.push(...policyTextFields(p),p.topic,...(p.tags??[]));
 for(const r of records)texts.push(r.title,r.titleZh??'',r.note,...r.tags);
 for(const d of discovery)texts.push(d.title,sourceTitleKey(d.title));
 for(const c of coverage)if(c.latestScan)texts.push(c.latestScan.note);
 texts.push(data.status.settings['reviewNote:'+country]??'');
 return texts;
}

export function splitSiteData(data:SiteData):{shell:SiteShell;countries:Map<string,CountryFiles>}{
 const shell:SiteShell={
  exportedAt:data.exportedAt,
  policies:data.policies.map(p=>({id:p.id,region:p.region})),
  status:{settings:data.status.settings,coverage:data.status.coverage,discovery:data.status.discovery},
  intake:{trackingStart:data.intake.trackingStart},
  topics:data.topics,dispositions:data.dispositions,areas:data.areas,
 };
 const bundles=new Map<string,CountryFiles>();
 for(const {id:country} of countries){
  const policies=data.policies.filter(p=>countryOf(p.region)===country);
  const records=data.intake.records.filter(r=>countryOf(r.region)===country);
  const discovery=data.status.discovery.filter(d=>countryOf(d.region)===country);
  const coverage=data.intake.coverage.filter(c=>countryOf(c.region)===country);
  // Same scope as the source panel: a check is published with every country whose panel shows it.
  const urls=new Set([...policies.flatMap(p=>p.sources.map(s=>s.url)),...records.map(r=>r.url),...discovery.map(d=>d.url)]);
  const checks=data.status.checks.filter(c=>urls.has(c.url));
  const messages:ContentCatalog={};
  for(const text of countryTexts(country,data,policies,records,discovery,coverage))if(text&&Object.hasOwn(data.localization.messages,text))messages[text]=data.localization.messages[text];
  const pick=<T,>(map:Record<string,T>,ids:string[])=>Object.fromEntries(ids.filter(id=>Object.hasOwn(map,id)).map(id=>[id,map[id]]));
  const policyIds=policies.map(p=>p.id),recordIds=records.map(r=>r.id);
  bundles.set(country,{messages,bundle:{country,policies,records,checks,coverage,localization:{
   policies:pick(data.localization.policies,policyIds),intake:pick(data.localization.intake,recordIds),
   sourceLanguages:pick(data.localization.sourceLanguages,[...policyIds,...recordIds]),originalIntakeTitles:pick(data.localization.originalIntakeTitles,recordIds),
  }}});
 }
 return {shell,countries:bundles};
}

// What the page works with: the shell plus every country loaded so far, in registry order,
// and whichever English catalogs have arrived.
export function mergeSiteData(shell:SiteShell,bundles:CountryBundle[],catalogs:ContentCatalog[]=[]):SiteData{
 const ordered=countries.map(c=>bundles.find(b=>b.country===c.id)).filter((b):b is CountryBundle=>!!b);
 const checks=new Map<string,CheckRow>();
 for(const b of ordered)for(const c of b.checks)checks.set(c.url,c);
 const localization:Localization={...emptyLocalization,messages:{},policies:{},intake:{},sourceLanguages:{},originalIntakeTitles:{}};
 for(const b of ordered)for(const key of ['policies','intake','sourceLanguages','originalIntakeTitles'] as const)Object.assign(localization[key],b.localization[key]);
 for(const catalog of catalogs)Object.assign(localization.messages,catalog);
 return {
  exportedAt:shell.exportedAt,
  policies:ordered.flatMap(b=>b.policies),
  status:{...shell.status,checks:[...checks.values()]},
  intake:{trackingStart:shell.intake.trackingStart,records:ordered.flatMap(b=>b.records),coverage:ordered.flatMap(b=>b.coverage)},
  topics:shell.topics,dispositions:shell.dispositions,areas:shell.areas,localization,
 };
}
