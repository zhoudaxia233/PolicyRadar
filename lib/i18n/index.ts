import {messages, type MessageKey} from './messages.ts';
import {regions,countries} from '../domain/model.ts';

export const locales = ['zh', 'de', 'en'] as const;
export type Locale = typeof locales[number];
export const localeNames: Record<Locale,string> = {zh:'中文',de:'Deutsch',en:'English'};
export const languageTags: Record<Locale,string> = {zh:'zh-CN',de:'de',en:'en'};
export function normalizeLocale(value:string|null|undefined):Locale|undefined {
 const base=value?.toLowerCase().split(/[-_]/)[0];
 return locales.find(l=>l===base);
}
export function resolveLocale(search:string,saved?:string|null,languages:readonly string[]=[]):Locale {
 return normalizeLocale(new URLSearchParams(search).get('lang'))??normalizeLocale(saved)??languages.map(normalizeLocale).find(Boolean)??'en';
}
export function localeSearch(search:string,locale:Locale){const p=new URLSearchParams(search);p.set('lang',locale);return '?'+p.toString();}
export function readLocale():Locale {
 if(typeof window==='undefined')return 'en';
 let saved:string|null=null;try{saved=localStorage.getItem('language');}catch{}
 let languages:readonly string[]=[];try{languages=navigator.languages?.length?navigator.languages:navigator.language?[navigator.language]:[];}catch{}
 return resolveLocale(location.search,saved,languages);
}
// A '#context' suffix separates keys whose Chinese text is shared but whose translations differ.
export function translator(locale:Locale){return (key:MessageKey,values:readonly (string|number)[]=[])=>{
 const text=locale==='zh'?key.replace(/#.*$/,''):messages[key][locale==='de'?0:1];
 return text.replace(/\{(\d+)\}/g,(_,i)=>String(values[Number(i)]??'{'+i+'}'));
};}
export function formatDate(value:string,locale:Locale,options:Intl.DateTimeFormatOptions={year:'numeric',month:locale==='en'?'short':'2-digit',day:'2-digit'}){
 return new Intl.DateTimeFormat(languageTags[locale],{timeZone:'Europe/Berlin',...options}).format(new Date(value.length===10?value+'T12:00:00Z':value));
}

export function regionName(id:string,locale:Locale){const r=regions.find(r=>r.id===id);return locale==='zh'?r?.name??id:locale==='de'?r?.de??id:(r&&'en' in r?r.en:undefined)??r?.de??id;}
export function countryName(id:string,locale:Locale){const country=countries.find(c=>c.id===id);return country?.[locale==='zh'?'name':locale]??id;}

export function originalRegionName(id:string){const r=regions.find(r=>r.id===id);return r&&'originalName' in r?{name:r.originalName,language:r.originalLanguage}:r&&'nl' in r?{name:r.nl,language:'nl'}:r&&'fr' in r?{name:r.fr,language:'fr'}:{name:r?.de??id,language:'de'};}
