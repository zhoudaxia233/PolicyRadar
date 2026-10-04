import registry from '../../data/discovery-registry.json' with {type:'json'};
export function sourceSupportsRegion(source:{region:string;supportedRegions?:string[]}|undefined,region:string){return !!source&&(source.supportedRegions??[source.region]).includes(region);}
// Official discovery entries for Germany, France, the Netherlands and Switzerland.
// A registered entry is not a claim of exhaustive coverage or a successful fetch.
export const discovery:DiscoverySource[] = registry;
export type DiscoverySource={region:string;url:string;title:string;publisher:string;kind?:string;supportedRegions?:string[]};

// Resolve the calendar year during a request: Worker module initialization has no live clock.
export function discoveryForYear(year:number,sources:DiscoverySource[]=discovery){return sources.map(d=>/[/-]2026(?:\/|$)/.test(d.url)?{...d,title:d.title.replace('2026',String(year)),url:d.url.replace(/([/-])2026(?=\/|$)/,(_,separator)=>separator+year)}:d);}
