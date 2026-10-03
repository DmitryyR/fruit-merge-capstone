import type {GameScene} from '../scenes/GameScene';
export function attachTestApi(scene:GameScene){
 window.__FRUIT_MERGE_TEST__={load(fruits,currentRank){scene.restart();scene.state.currentRank=currentRank;scene.state.nextRank=2;for(const f of fruits)scene.spawnFruit(f.rank,f.x,f.y,f.static);scene.paint();},snapshot(){return {state:{...scene.state},fruits:[...scene.fruitBodies.values()].map(f=>({id:f.id,rank:f.rank,x:f.image.x,y:f.image.y,ageMs:f.ageMs})),simTime:scene.simTime,textures:scene.textureCount(),collisionListeners:scene.matter.world.listenerCount('collisionstart')};}};
 scene.events.once('shutdown',()=>{delete window.__FRUIT_MERGE_TEST__;});
}
