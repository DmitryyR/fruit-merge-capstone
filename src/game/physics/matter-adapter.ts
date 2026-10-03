import type Phaser from 'phaser';
import {config} from '../config';
import {getFruitDefinition} from '../catalog/catalog';
import {spriteGeometry} from '../catalog/sizing';
import type {FruitInstance,FruitSample} from '../types';
export type LiveFruit=FruitInstance & {image:Phaser.Physics.Matter.Image;ageMs:number};
export function installWalls(scene:Phaser.Scene) {
 scene.matter.add.rectangle(12,360,24,720,{isStatic:true});
 scene.matter.add.rectangle(468,360,24,720,{isStatic:true});
 scene.matter.add.rectangle(240,708,480,24,{isStatic:true});
}
export function addBody(scene:Phaser.Scene,id:string,rank:number,x:number,y:number,isStatic=false):LiveFruit {
 const def=getFruitDefinition(rank);
 const geometry=spriteGeometry(def);
 // Scale before creating the final body; changing scale afterwards also scales Matter.
 // Origin changes only rendering: the calibrated body centre rotates about the collider.
 const image=scene.matter.add.image(x,y,def.id).setDisplaySize(geometry.size,geometry.size).setCircle(def.radius).setOrigin(geometry.originX,geometry.originY).setBounce(0.12).setFriction(0.2).setFrictionAir(0.003).setStatic(isStatic);
 (image.body as MatterJS.BodyType).label=id;
 return {id,rank,status:'active',image,ageMs:0};
}
export function sampleFruit(fruit:LiveFruit):FruitSample {
 const body=fruit.image.body as MatterJS.BodyType;
 // Matter normalizes velocity to 1000/60 ms, verified against bundled Body.js.
 return {id:fruit.id,topY:body.position.y-getFruitDefinition(fruit.rank).radius,speedPxPerSecond:Math.hypot(body.velocity.x,body.velocity.y)*1000/config.stepMs,ageMs:fruit.ageMs};
}
