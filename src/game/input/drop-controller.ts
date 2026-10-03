import {config} from '../config';
export function clientToWorldX(x:number,left:number,width:number,world:number):number {
 if (![x,left,width,world].every(Number.isFinite) || width<=0 || world<=0) throw new Error('Invalid canvas dimensions');
 return (x-left)*world/width;
}
export function clampDropX(x:number,radius:number):number {return Math.max(config.left+radius,Math.min(config.right-radius,x));}
export class DropController {
 private pointer:number|null=null;
 begin(id:number,primary:boolean) {if(primary && this.pointer===null)this.pointer=id;}
 end(id:number,x:number,y:number,rect:{left:number;top:number;width:number;height:number}):number|null {
  if(id!==this.pointer)return null;
  this.pointer=null;
  if(rect.width<=0 || rect.height<=0 || x<rect.left || x>rect.left+rect.width || y<rect.top || y>rect.top+rect.height)return null;
  return clientToWorldX(x,rect.left,rect.width,config.width);
 }
 reset() {this.pointer=null;}
}
