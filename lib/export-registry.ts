import legacyOverrides from '../data/registries/legacy-overrides.json' with {type:'json'};
import {z} from 'zod';
import legacy from '../data/registries/legacy.json' with {type:'json'};
import {type DiscoverySource} from './domain/coverage.ts';
export const registrySchema=z.array(z.object({region:z.string(),url:z.string().url(),title:z.string().min(1),publisher:z.string().min(1),kind:z.string().optional(),supportedRegions:z.array(z.string()).optional()})).min(1).superRefine((rows,c)=>{if(new Set(rows.map(r=>r.url)).size!==rows.length)c.addIssue({code:'custom',message:'Duplicate registry URL'});});
// Freeze compatibility independently of the current registry. This one saved run
// preceded the evidenced Schwyz URL correction; do not validate it against today's URL.
export function exportRegistry(data:{exportedAt:string;discoveryRegistry?:unknown}):DiscoverySource[]{
 if(data.discoveryRegistry)return registrySchema.parse(data.discoveryRegistry);
 const overrides:Record<string,Record<string,string>>=legacyOverrides;
 const urls=overrides[data.exportedAt]??{};
 return legacy.map(row=>urls[row.url]?{...row,url:urls[row.url]}:row);
}
