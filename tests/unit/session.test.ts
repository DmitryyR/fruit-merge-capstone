import {expect,test} from 'vitest';
import {createSession,advanceQueue,pause,resume,endGame,restart} from '../../src/game/domain/session';
test('FR-05 RNG bounds and queue shift',()=>{expect(createSession(()=>0,0).currentRank).toBe(1);const s=createSession(()=>0.999,100);expect(s.currentRank).toBe(5);expect(advanceQueue({...s,nextRank:3},()=>0)).toMatchObject({currentRank:3,nextRank:1,bestScore:100});});
test('paused and gameOver cannot consume queue; terminal mode cannot resume',()=>{const s=createSession(()=>0,0);for(const state of [pause(s),endGame(s)])expect(advanceQueue(state,()=>{throw new Error('must not consume RNG');})).toEqual(state);expect(resume(endGame(s)).mode).toBe('gameOver');expect(resume(pause(s)).mode).toBe('playing');});
test('restart clears score and retains best',()=>expect(restart({...createSession(()=>0,300),score:120,mode:'gameOver'},()=>0.9)).toEqual({mode:'playing',score:0,bestScore:300,currentRank:5,nextRank:5}));
