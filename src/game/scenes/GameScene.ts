import Phaser from 'phaser';
import {config} from '../config';
import {fruits,getFruitDefinition} from '../catalog/catalog';
import {createSession,advanceQueue,pause,resume,endGame,restart} from '../domain/session';
import {advanceDanger} from '../domain/danger';
import {readBest,writeBest,type StoragePort} from '../services/high-score';
import {MergeCoordinator} from '../services/merge-coordinator';
import {DropController,clampDropX,clientToWorldX} from '../input/drop-controller';
import {addBody,installWalls,sampleFruit,type LiveFruit} from '../physics/matter-adapter';
import {renderHud,showError} from '../../ui/hud';
import type {DangerState,GameState} from '../types';
export class GameScene extends Phaser.Scene {
 state!:GameState;
 readonly fruitBodies=new Map<string,LiveFruit>();
 simTime=0;
 private danger:DangerState={elapsedMsByFruit:{},shouldEnd:false};
 private generation=0;private serial=0;private accumulator=0;private lastDrop=-Infinity;private aim=240;
 private controller=new DropController();private coordinator!:MergeCoordinator;private guide!:Phaser.GameObjects.Graphics;private preview!:Phaser.GameObjects.Image;
 private abort!:AbortController;
 private storage:StoragePort={getItem:key=>window.localStorage.getItem(key),setItem:(key,value)=>window.localStorage.setItem(key,value)};
 constructor(){super('Game');}
 create(){
  this.state=createSession(Math.random,readBest(this.storage));installWalls(this);
  const bg=this.add.graphics();bg.lineStyle(1,0xa4b88c,0.28);for(let y=170;y<696;y+=32){for(let x=45;x<456;x+=32)bg.fillStyle(0xc6d5b1,0.4).fillCircle(x,y,1);}
  bg.lineStyle(1.5,0xc58b69,0.65);for(let x=24;x<456;x+=13)bg.lineBetween(x,140,x+6,140);
  this.add.text(34,119,'ЗАЛИШ МІСЦЕ ДЛЯ ВРОЖАЮ',{fontFamily:'Arial',fontSize:'9px',color:'#af987d',letterSpacing:1});
  bg.lineStyle(3,0xb7c8a1,0.7).strokeRoundedRect(23,149,434,546,{tl:0,tr:0,bl:25,br:25});
  this.guide=this.add.graphics();this.preview=this.add.image(this.aim,config.spawnY,getFruitDefinition(this.state.currentRank).id).setAlpha(0.8);
  this.coordinator=new MergeCoordinator({get:id=>this.fruitBodies.get(id),mode:()=>this.state.mode,replace:(a,b,rank)=>{
   const first=this.fruitBodies.get(a.id)!,second=this.fruitBodies.get(b.id)!;
   const x=clampDropX((first.image.x+second.image.x)/2,getFruitDefinition(rank).radius),y=(first.image.y+second.image.y)/2;
   this.spawnFruit(rank,x,y);first.image.destroy();second.image.destroy();this.fruitBodies.delete(a.id);this.fruitBodies.delete(b.id);
  },award:points=>{this.state.score+=points;if(this.state.score>this.state.bestScore){this.state.bestScore=this.state.score;writeBest(this.storage,this.state.bestScore);}this.paint();}});
  this.matter.world.on('collisionstart',this.onCollision,this);
  this.abort=new AbortController();const signal=this.abort.signal;const canvas=this.game.canvas;
  canvas.setAttribute('aria-label','Посудина для фруктів');
  canvas.addEventListener('pointerdown',e=>{if(this.state.mode!=='playing')return;e.preventDefault();this.controller.begin(e.pointerId,e.isPrimary);},{signal});
  canvas.addEventListener('pointermove',e=>{if(!e.isPrimary)return;const r=canvas.getBoundingClientRect();this.aim=clientToWorldX(e.clientX,r.left,r.width,config.width);this.paintGuide();},{signal});
  window.addEventListener('pointerup',e=>{const x=this.controller.end(e.pointerId,e.clientX,e.clientY,canvas.getBoundingClientRect());if(x!==null)this.drop(x);},{signal});
  window.addEventListener('pointercancel',()=>this.controller.reset(),{signal});
  document.getElementById('pause')!.addEventListener('click',()=>this.togglePause(),{signal});
  document.getElementById('restart')!.addEventListener('click',()=>this.restart(),{signal});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){this.state=pause(this.state);this.accumulator=0;this.controller.reset();this.paint();}},{signal});
  this.events.once('shutdown',()=>{this.abort.abort();this.matter.world.off('collisionstart',this.onCollision,this);this.coordinator.reset();});
  this.paint();
  if(__E2E__)void import('../testing/test-api').then(({attachTestApi})=>attachTestApi(this));
 }
 private onCollision(event:{pairs:{bodyA:{label:string};bodyB:{label:string}}[]}){for(const pair of event.pairs)this.coordinator.tryMerge(pair.bodyA.label,pair.bodyB.label);}
 spawnFruit(rank:number,x:number,y:number,isStatic=false){const id=`${this.generation}:${++this.serial}`;const fruit=addBody(this,id,rank,x,y,isStatic);this.fruitBodies.set(id,fruit);return fruit;}
 drop(x:number){if(this.state.mode!=='playing'||this.simTime-this.lastDrop<config.cooldownMs)return;const def=getFruitDefinition(this.state.currentRank);this.spawnFruit(def.rank,clampDropX(x,def.radius),config.spawnY);this.lastDrop=this.simTime;this.state=advanceQueue(this.state,Math.random);this.paint();}
 togglePause(){this.state=this.state.mode==='paused'?resume(this.state):pause(this.state);this.accumulator=0;this.controller.reset();this.paint();}
 restart(){this.coordinator.reset();for(const fruit of this.fruitBodies.values())fruit.image.destroy();this.fruitBodies.clear();this.generation++;this.serial=0;this.simTime=0;this.accumulator=0;this.lastDrop=-Infinity;this.controller.reset();this.danger={elapsedMsByFruit:{},shouldEnd:false};this.state=restart(this.state,Math.random);this.paint();}
 update(_time:number,delta:number){
  if(!this.state||this.state.mode!=='playing')return;
  this.accumulator=Math.min(this.accumulator+delta,config.stepMs*config.maxSteps);
  while(this.accumulator>=config.stepMs && this.state.mode==='playing'){
   this.accumulator-=config.stepMs;this.simTime+=config.stepMs;
   for(const f of this.fruitBodies.values())f.ageMs+=config.stepMs;
   this.matter.world.step(config.stepMs);
   try{this.coordinator.flushMerges();}catch{this.state=pause(this.state);showError('Не вдалося об’єднати фрукти. Почни нову гру.');this.paint();break;}
   this.danger=advanceDanger(this.danger,[...this.fruitBodies.values()].map(sampleFruit),config.stepMs,this.state.mode);
   if(this.danger.shouldEnd){this.state=endGame(this.state);this.coordinator.reset();this.paint();}
  }
 }
 paint(){renderHud(this.state);this.paintGuide();}
 private paintGuide(){if(!this.preview)return;const f=getFruitDefinition(this.state.currentRank);const x=clampDropX(this.aim,f.radius);this.preview.setTexture(f.id).setDisplaySize(f.radius*2,f.radius*2).setPosition(x,config.spawnY).setVisible(this.state.mode==='playing');this.guide.clear();if(this.state.mode==='playing'){this.guide.lineStyle(1,0x91a97c,0.35);for(let y=95;y<680;y+=14)this.guide.lineBetween(x,y,x,y+4);}}
 textureCount(){return fruits.filter(f=>this.textures.exists(f.id)).length;}
}
