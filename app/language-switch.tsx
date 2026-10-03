import {CompactSelect} from './compact-select';
import {locales,localeNames,languageTags,type Locale} from '../lib/i18n/index';

export function LanguageSwitch({locale,label,onChange}:{locale:Locale;label:string;onChange:(locale:Locale)=>void}){
 return <CompactSelect value={locale} label={label} onChange={onChange} options={locales.map(value=>({value,label:value.toUpperCase(),accessibleLabel:localeNames[value],lang:languageTags[value]}))}/>;
}
