import type {FruitInstance,GameMode} from '../types';
export interface MergeWorld {get(id:string):FruitInstance|undefined;mode():GameMode;replace(a:FruitInstance,b:FruitInstance,rank:number):void;award(points:number):void;}
export class MergeCoordinator {
 constructor(_world:MergeWorld) {}
 tryMerge(_a:string,_b:string):boolean {throw new Error('Not implemented');}
 flushMerges():void {throw new Error('Not implemented');}
 reset():void {throw new Error('Not implemented');}
}
