import {createRequire} from 'node:module';
import {expect,test} from 'vitest';
import {sampleFruit,type LiveFruit} from '../../src/game/physics/matter-adapter';
const require=createRequire(import.meta.url);
const Bodies=require('phaser/src/physics/matter-js/lib/factory/Bodies') as {circle(x:number,y:number,r:number,options:object):MatterJS.BodyType};
const Body=require('phaser/src/physics/matter-js/lib/body/Body') as {setVelocity(body:MatterJS.BodyType,velocity:{x:number;y:number}):void};
type PhysicsEngine={gravity:{x:number;y:number};world:MatterJS.CompositeType};
const Engine=require('phaser/src/physics/matter-js/lib/core/Engine') as {create():PhysicsEngine;update(engine:PhysicsEngine,delta:number):void};
const Composite=require('phaser/src/physics/matter-js/lib/body/Composite') as {add(world:MatterJS.CompositeType,body:MatterJS.BodyType):void};
test('adapter speed agrees with measured 1-second Matter displacement',()=>{
 const engine=Engine.create();engine.gravity.x=0;engine.gravity.y=0;
 const body=Bodies.circle(100,400,12,{frictionAir:0});Composite.add(engine.world,body);Body.setVelocity(body,{x:1,y:0});
 const start=body.position.x;for(let i=0;i<60;i++)Engine.update(engine,1000/60);
 const fruit:LiveFruit={id:'sample',rank:1,status:'active',ageMs:1000,image:{body} as LiveFruit['image']};
 expect(body.position.x-start).toBeCloseTo(60,5);expect(sampleFruit(fruit).speedPxPerSecond).toBeCloseTo(60,5);
});
