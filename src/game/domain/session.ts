import type {GameState} from '../types';
function roll(rng:()=>number) {const n=rng();if(!Number.isFinite(n)||n<0||n>=1)throw new Error('RNG out of range');return 1+Math.floor(n*5);}
export function createSession(rng:()=>number,best:number):GameState {return {mode:'playing',score:0,bestScore:best,currentRank:roll(rng),nextRank:roll(rng)};}
export function advanceQueue(s:GameState,rng:()=>number):GameState {return s.mode==='playing'?{...s,currentRank:s.nextRank,nextRank:roll(rng)}:s;}
export function pause(s:GameState):GameState {return s.mode==='playing'?{...s,mode:'paused'}:s;}
export function resume(s:GameState):GameState {return s.mode==='paused'?{...s,mode:'playing'}:s;}
export function endGame(s:GameState):GameState {return {...s,mode:'gameOver'};}
export function restart(s:GameState,rng:()=>number):GameState {return createSession(rng,s.bestScore);}
