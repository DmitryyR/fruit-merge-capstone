import type { FruitDefinition } from '../types';
import raw from './fruits.json';
import {fruitRadius} from './sizing';
export function validateCatalog(raw: unknown): FruitDefinition[] {
  if (!Array.isArray(raw) || raw.length !== 30) throw new Error('Catalog must contain 30 fruits');
  const ids = new Set<string>(); const ranks = new Set<number>();
  for (const row of raw) {
    const f = row as FruitDefinition | null;
    if (!f || typeof f.id !== 'string' || !f.id.trim() || ids.has(f.id) || !Number.isInteger(f.rank) || f.rank < 1 || f.rank > 30 || ranks.has(f.rank) || typeof f.name !== 'string' || !f.name.trim() || typeof f.texture !== 'string' || !f.texture.trim()) throw new Error('Invalid fruit definition');
    const body=f.body;
    if(!body||![body.sourceSize,body.cx,body.cy,body.diameter].every(Number.isFinite)||body.sourceSize<=0||body.diameter<=0||body.diameter>body.sourceSize||body.cx<0||body.cx>body.sourceSize||body.cy<0||body.cy>body.sourceSize)throw new Error('Invalid fruit body calibration');
    ids.add(f.id); ranks.add(f.rank);
  }
  return raw.map(f=>({...f,radius:fruitRadius(f.rank)})).sort((a,b) => a.rank-b.rank);
}
export const fruits = validateCatalog(raw);
export function getFruitDefinition(rank: number): FruitDefinition {
  const fruit = fruits.find(f => f.rank === rank);
  if (!fruit) throw new Error(`Unknown fruit rank ${rank}`);
  return fruit;
}
