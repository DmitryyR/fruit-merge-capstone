import type {FruitInstance,GameMode} from '../types';
import {getMergeResult} from '../domain/merge';
export interface MergeWorld {get(id:string):FruitInstance|undefined;mode():GameMode;replace(a:FruitInstance,b:FruitInstance,rank:number):void;award(points:number):void;}
export class MergeCoordinator {
 private queue:{a:FruitInstance;b:FruitInstance;rank:number;points:number}[]=[];
 constructor(private world:MergeWorld) {}
 tryMerge(aId:string,bId:string):boolean {
  if(aId===bId || this.world.mode()!=='playing')return false;
  const a=this.world.get(aId),b=this.world.get(bId);
  if(!a || !b || a.status!=='active' || b.status!=='active')return false;
  const result=getMergeResult(a.rank,b.rank);if(!result)return false;
  a.status=b.status='merging';this.queue.push({a,b,rank:result.nextRank,points:result.points});return true;
 }
 flushMerges():void {
  const queue=this.queue;this.queue=[];
  for(const item of queue) {
   const {a,b,rank,points}=item;
   if(this.world.mode()!=='playing' || this.world.get(a.id)!==a || this.world.get(b.id)!==b) {a.status=b.status='active';continue;}
   try {this.world.replace(a,b,rank);a.status=b.status='removed';this.world.award(points);}
   catch(error) {a.status=b.status='active';for(const rest of queue.slice(queue.indexOf(item)+1)){rest.a.status=rest.b.status='active';}throw error;}
  }
 }
 reset():void {for(const {a,b} of this.queue)a.status=b.status='active';this.queue=[];}
}
