import {expect,test} from 'vitest';
import {readBest,writeBest} from '../../src/game/services/high-score';
test.each([null,'oops','-1','NaN','1e999','1.2','{}'])('invalid storage %s',raw=>expect(readBest({getItem:()=>raw,setItem:()=>{}})).toBe(0));
test('larger best only; throwing read and write are contained',()=>{let value='300';const storage={getItem:()=>value,setItem:(_key:string,v:string)=>{value=v;}};expect(readBest(storage)).toBe(300);writeBest(storage,100);expect(value).toBe('300');writeBest(storage,400);expect(readBest(storage)).toBe(400);const denied={getItem:()=>{throw new Error('denied');},setItem:()=>{throw new Error('full');}};expect(readBest(denied)).toBe(0);expect(writeBest(denied,100)).toBe(false);});
