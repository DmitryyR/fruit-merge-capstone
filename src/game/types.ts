export type FruitDefinition = {id:string; rank:number; name:string; texture:string; radius:number};
export type FruitInstance = {id:string; rank:number; status:'active'|'merging'|'removed'};
export type GameMode = 'playing'|'paused'|'gameOver';
export type GameState = {mode:GameMode; score:number; bestScore:number; currentRank:number; nextRank:number};
export type FruitSample = {id:string; topY:number; speedPxPerSecond:number; ageMs:number};
export type DangerState = {elapsedMsByFruit:Record<string,number>;shouldEnd:boolean};
