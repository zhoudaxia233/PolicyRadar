import {useState} from 'react';
import {areas} from '../lib/domain/areas.ts';
import {translator,regionName,countryName,type Locale} from '../lib/i18n/index';

type Counts=ReadonlyMap<string,number>;
type Props={
 locale:Locale;country:string;region:string;area:string;regions:readonly string[];
 // totals follow every list filter except the area; byRegion also ignores the region filter.
 totals:Counts;byRegion:ReadonlyMap<string,Counts>;
 onArea:(area:string)=>void;onCell:(region:string,area:string)=>void;onRegion:(region:string)=>void;
};
// On phones the heatmap keeps the leading areas and folds the rest into one "other" column.
const phoneColumns=6;
const sum=(m:Counts|undefined)=>[...(m?.values()??[])].reduce((a,b)=>a+b,0);

export function AreaChart({locale,country,region,area,regions,totals,byRegion,onArea,onCell,onRegion}:Props){
 const tr=translator(locale),i=locale==='zh'?0:1;
 const [open,setOpen]=useState(()=>{try{return localStorage.getItem('areaPanel')!=='closed';}catch{return true;}});
 const toggle=(next:boolean)=>{setOpen(next);try{if(next)localStorage.removeItem('areaPanel');else localStorage.setItem('areaPanel','closed');}catch{}};
 const bars=areas.map(a=>({...a,n:totals.get(a.id)??0})).filter(a=>a.n>0).sort((a,b)=>b.n-a.n);
 const max=Math.max(1,...bars.map(a=>a.n));
 const place=region==='all'?countryName(country,locale):regionName(region,locale);
 const countryTotals=new Map<string,number>();
 for(const row of byRegion.values())for(const [a,n] of row)countryTotals.set(a,(countryTotals.get(a)??0)+n);
 const columns=areas.filter(a=>countryTotals.has(a.id)).sort((a,b)=>countryTotals.get(b.id)!-countryTotals.get(a.id)!);
 const rows=regions.filter(r=>sum(byRegion.get(r))>0);
 // A heatmap needs at least two levels to compare; a country with only national records shows the bars alone.
 const showHeat=rows.length>1;
 return <section className="area-panel">
  <details open={open} onToggle={e=>toggle(e.currentTarget.open)}>
   <summary>
    <span className="area-heading">
     <strong>{tr('{0}在推进什么',[place])}</strong>
    </span>
   </summary>
   {bars.length?<div className="area-bars" role="group" aria-label={tr('{0}在推进什么',[place])}>
    {bars.map(a=><button key={a.id} className="area-bar" aria-pressed={area===a.id} data-dim={area!=='all'&&area!==a.id?'':undefined} onClick={()=>onArea(area===a.id?'all':a.id)}>
     <span className="area-label">{a.title[i]}</span>
     <span className="area-track"><span style={{width:a.n/max*100+'%'}} /></span>
     <b>{a.n}</b>
    </button>)}
   </div>:<p className="area-empty">{tr('当前列表没有已解读的事项。')}</p>}
   {showHeat&&<div className="area-heat-block">
    <h3>{tr('各地区对比')}</h3>
    <table className="area-heat">
     <thead><tr>
      <th scope="col"><span className="sr-only">{tr('地区')}</span></th>
      {columns.map((a,k)=><th scope="col" key={a.id} className={k>=phoneColumns?'minor':undefined} aria-current={area===a.id?'true':undefined} title={a.title[i]}><span>{a.short[i]}</span></th>)}
      {columns.length>phoneColumns&&<th scope="col" className="other-col"><span>{tr('其他')}</span></th>}
      <th scope="col" className="row-total"><span>{tr('合计')}</span></th>
     </tr></thead>
     <tbody>{rows.map(r=>{
      const row=byRegion.get(r)!,rowTotal=sum(row),rowMax=Math.max(...row.values()),name=regionName(r,locale);
      const other=columns.slice(phoneColumns).reduce((s,a)=>s+(row.get(a.id)??0),0);
      return <tr key={r} className={rowTotal<3?'sparse':undefined} aria-current={region===r?'true':undefined}>
       <th scope="row"><button onClick={()=>onRegion(region===r?'all':r)}>{name}</button></th>
       {columns.map((a,k)=>{
        const n=row.get(a.id)??0;
        // Shading compares areas within one region, so a small state's focus is as visible as a large one's.
        const step=n?Math.ceil(n/rowMax*4):0;
        return <td key={a.id} className={(k>=phoneColumns?'minor ':'')+'step-'+step}>
         {n>0&&<button aria-pressed={region===r&&area===a.id} title={tr('{0} · {1}：{2} 项',[name,a.title[i],n])} aria-label={tr('{0} · {1}：{2} 项',[name,a.title[i],n])} onClick={()=>onCell(r,a.id)}>{n}</button>}
        </td>;
       })}
       {columns.length>phoneColumns&&<td className="other-col">{other||''}</td>}
       <td className="row-total">{rowTotal}</td>
      </tr>;
     })}</tbody>
    </table>
   </div>}
  </details>
 </section>;
}
