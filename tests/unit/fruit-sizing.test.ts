import {expect,test} from 'vitest';
import {fruits} from '../../src/game/catalog/catalog';
import {config} from '../../src/game/config';

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
