import type {GameScene} from '../scenes/GameScene';
import {getFruitDefinition} from '../catalog/catalog';
import {config} from '../config';
export function attachTestApi(scene:GameScene){
 window.__FRUIT_MERGE_TEST__={
  load(fruits,currentRank){scene.restart();scene.state.currentRank=currentRank;scene.state.nextRank=2;for(const f of fruits)scene.spawnFruit(f.rank,f.x,f.y,f.static).image.setRotation(f.angle??0);scene.paint();},
  advance(frames){for(let i=0;i<frames;i++)scene.update(0,config.stepMs);},
  snapshot(){return {state:{...scene.state},fruits:[...scene.fruitBodies.values()].map(f=>{
   const body=f.image.body as MatterJS.BodyType;const def=getFruitDefinition(f.rank);
   const center=f.image.getWorldTransformMatrix().transformPoint(def.body.cx-f.image.displayOriginX,def.body.cy-f.image.displayOriginY);
   return {id:f.id,rank:f.rank,x:f.image.x,y:f.image.y,ageMs:f.ageMs,collisionWidth:body.bounds.max.x-body.bounds.min.x,radius:body.circleRadius,visibleDiameter:f.image.displayWidth*def.body.diameter/def.body.sourceSize,visibleCenterX:center.x,visibleCenterY:center.y,left:body.bounds.min.x,right:body.bounds.max.x,bottom:body.bounds.max.y};
  }),simTime:scene.simTime,textures:scene.textureCount(),collisionListeners:scene.matter.world.listenerCount('collisionstart')};}
 };
 scene.events.once('shutdown',()=>{delete window.__FRUIT_MERGE_TEST__;});
}
