import { expect, test } from 'vitest';
import { getMergeResult } from '../../src/game/domain/merge';
for (let n = 1; n < 30; n++) test(`FR-03/04 level ${n}`, () => expect(getMergeResult(n,n)).toEqual({nextRank:n+1,points:10*n}));
test('unequal and terminal pairs never merge', () => { expect(getMergeResult(1,2)).toBeNull(); expect(getMergeResult(30,30)).toBeNull(); });
test.each([0,-1,1.5,31,NaN,Infinity])('invalid rank %s', n => expect(getMergeResult(n,n)).toBeNull());
