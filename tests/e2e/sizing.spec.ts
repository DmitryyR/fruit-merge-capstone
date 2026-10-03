import {test,expect} from '@playwright/test';

const radius=(rank:number)=>432*.035*Math.pow(.4/.035,(rank-1)/29);
test.beforeEach(async({page})=>{await page.goto('/');await page.waitForFunction(()=>!!window.__FRUIT_MERGE_TEST__);});

test('SIZ-02 all rendered bodies match physics through rotation',async({page})=>{
 for(let rank=1;rank<=30;rank++){
  const fruit=await page.evaluate(rank=>{const api=window.__FRUIT_MERGE_TEST__!;api.load([{rank,x:240,y:400,static:true,angle:1.17}],1);return api.snapshot().fruits[0];},rank);
  expect(fruit.radius).toBeCloseTo(radius(rank),8);
  expect(fruit.visibleDiameter).toBeCloseTo(radius(rank)*2,8);
  expect(fruit.visibleCenterX).toBeCloseTo(fruit.x,4);
  expect(fruit.visibleCenterY).toBeCloseTo(fruit.y,4);
 }
});

test('SIZ-03 all ranks stay within either wall and floor after settling',async({page})=>{
 for(let rank=1;rank<=30;rank++)for(const side of ['left','right']){
  const r=radius(rank),x=side==='left'?24+r:456-r;
  const fruit=await page.evaluate(({rank,r,x})=>{const api=window.__FRUIT_MERGE_TEST__!;api.load([{rank,x,y:696-r-5}],1);api.advance(90);return api.snapshot().fruits[0];},{rank,r,x});
  expect(fruit.left).toBeGreaterThanOrEqual(23.5);
  expect(fruit.right).toBeLessThanOrEqual(456.5);
  expect(fruit.bottom).toBeLessThanOrEqual(696.5);
 }
});

test('SIZ-03 merged fruit uses the same sizing and is born above floor',async({page})=>{
 for(const rank of [1,14,29]){
  const result=await page.evaluate(({rank,r})=>{const api=window.__FRUIT_MERGE_TEST__!;api.load([{rank,x:24+r,y:696-r},{rank,x:24+r+1,y:696-r}],1);api.advance(1);return api.snapshot();},{rank,r:radius(rank)});
  expect(result.state.score).toBe(10*rank);
  expect(result.fruits).toHaveLength(1);
  const fruit=result.fruits[0];expect(fruit.rank).toBe(rank+1);
  expect(fruit.radius).toBeCloseTo(radius(rank+1),8);
  expect(fruit.visibleDiameter).toBeCloseTo(2*radius(rank+1),8);
  expect(fruit.x-fruit.radius).toBeGreaterThanOrEqual(24-1e-8);
  expect(fruit.y+fruit.radius).toBeLessThanOrEqual(696+1e-8);
 }
});

test('SIZ-05 filled vessel keeps every body inside and stable in size',async({page})=>{
 const seeds=[{rank:25,x:156,y:560},{rank:22,x:358,y:585},{rank:20,x:280,y:410},{rank:18,x:100,y:365},{rank:16,x:385,y:435},{rank:14,x:192,y:300},{rank:12,x:315,y:280},{rank:10,x:82,y:265}];
 const result=await page.evaluate(seeds=>{const api=window.__FRUIT_MERGE_TEST__!;api.load(seeds,1);api.advance(180);return api.snapshot();},seeds);
 expect(result.state.mode).toBe('playing');expect(result.fruits).toHaveLength(seeds.length);
 for(const f of result.fruits){expect(f.left).toBeGreaterThanOrEqual(23);expect(f.right).toBeLessThanOrEqual(457);expect(f.bottom).toBeLessThanOrEqual(697);expect(f.visibleDiameter).toBeCloseTo(radius(f.rank)*2,8);}
});
