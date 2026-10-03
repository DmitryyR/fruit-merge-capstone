export type StoragePort={getItem(key:string):string|null;setItem(key:string,value:string):void};
export function readBest(_storage:StoragePort):number {throw new Error('Not implemented');}
export function writeBest(_storage:StoragePort,_best:number):boolean {throw new Error('Not implemented');}
