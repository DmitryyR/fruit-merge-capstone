export type StoragePort={getItem(key:string):string|null;setItem(key:string,value:string):void};
const key='fruit-merge.best.v1';
export function readBest(storage:StoragePort):number {try {const n:unknown=JSON.parse(storage.getItem(key)??'0');return typeof n==='number' && Number.isSafeInteger(n) && n>=0?n:0;}catch{return 0;}}
export function writeBest(storage:StoragePort,best:number):boolean {try {if(!Number.isSafeInteger(best)||best<0)return false;storage.setItem(key,JSON.stringify(Math.max(best,readBest(storage))));return true;}catch{return false;}}
