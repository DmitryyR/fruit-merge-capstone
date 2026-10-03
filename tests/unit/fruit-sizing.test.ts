import {expect,test} from 'vitest';
import {fruits} from '../../src/game/catalog/catalog';
import {config} from '../../src/game/config';
import {fruitRadius,spriteGeometry} from '../../src/game/catalog/sizing';

test('SIZ-01 geometric radii cover 3.5% to 40% of inner vessel width',()=>{
 const width=config.right-config.left;
 expect(fruits[0].radius).toBeCloseTo(width*.035,10);
 expect(fruits[29].radius).toBeCloseTo(width*.40,10);
 const ratio=Math.pow(.40/.035,1/29);
 for(let i=1;i<30;i++){
  expect(fruits[i].radius/fruits[i-1].radius).toBeCloseTo(ratio,12);
  expect(fruits[i].radius).toBeGreaterThan(fruits[i-1].radius);
  expect(fruits[i].radius*2).toBeLessThan(width);
 }
});

test.each([0,31,1.5,NaN])('reject invalid sizing rank %s',rank=>expect(()=>fruitRadius(rank)).toThrow());
test('body calibration removes transparent margins without stretching the character',()=>{
 for(const fruit of fruits){
  const g=spriteGeometry(fruit);
  expect(g.size*fruit.body.diameter/fruit.body.sourceSize).toBeCloseTo(fruit.radius*2,10);
  expect(g.originX*fruit.body.sourceSize).toBe(fruit.body.cx);
  expect(g.originY*fruit.body.sourceSize).toBe(fruit.body.cy);
 }
 expect(fruitRadius(30,600)).toBeCloseTo(240);
});
