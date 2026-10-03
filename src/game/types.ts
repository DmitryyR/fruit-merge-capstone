export type FruitBody = {sourceSize:number;cx:number;cy:number;diameter:number};
export type FruitDefinition = {id:string; rank:number; name:string; texture:string; radius:number;body:FruitBody};
export type FruitInstance = {id:string; rank:number; status:'active'|'merging'|'removed'};
export type GameMode = 'playing'|'paused'|'gameOver';
export type GameState = {mode:GameMode; score:number; bestScore:number; currentRank:number; nextRank:number};
export type FruitSample = {id:string; topY:number; speedPxPerSecond:number; ageMs:number};
export type DangerState = {elapsedMsByFruit:Record<string,number>;shouldEnd:boolean};
