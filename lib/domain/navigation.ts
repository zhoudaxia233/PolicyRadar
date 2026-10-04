import {readFilters,filterSearch} from './filters.ts';
import {countryOf} from './model.ts';
export function readNavigation(search:string,policies:{id:string;region:string}[]){
 const filters=readFilters(search),selectedId=new URLSearchParams(search).get('policy');
 const selected=policies.find(p=>p.id===selectedId);
 if(selected&&countryOf(selected.region)!==filters.country){filters.country=countryOf(selected.region);filters.region='all';filters.tags=[];}
 return {...filters,selectedId};
}
export function navigationSearch(search:string,state:ReturnType<typeof readNavigation>){
 const params=new URLSearchParams(filterSearch(search,state));
 if(state.selectedId)params.set('policy',state.selectedId);else params.delete('policy');
 return params.size?'?'+params.toString():'';
}
