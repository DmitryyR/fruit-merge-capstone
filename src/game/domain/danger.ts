import type {DangerState,FruitSample,GameMode} from '../types';
import {config} from '../config';
export function advanceDanger(previous:DangerState,samples:FruitSample[],delta:number,mode:GameMode):DangerState {
 if(!Number.isFinite(delta)||delta<0)throw new Error('Invalid delta');
 if(mode!=='playing')return previous;
 const elapsedMsByFruit:Record<string,number>=Object.create(null);let shouldEnd=false;
 for(const sample of samples) {
  if(sample.ageMs>config.graceMs && sample.topY<config.dangerY && sample.speedPxPerSecond<config.dangerSpeed) {
   const elapsed=(previous.elapsedMsByFruit[sample.id]??0)+Math.min(delta,sample.ageMs-config.graceMs);
   elapsedMsByFruit[sample.id]=elapsed;shouldEnd ||= elapsed>=config.dangerMs;
  }
 }
 return {elapsedMsByFruit,shouldEnd};
}
