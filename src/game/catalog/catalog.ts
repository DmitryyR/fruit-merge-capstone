import type { FruitDefinition } from '../types';
import raw from './fruits.json';
export function validateCatalog(raw: unknown): FruitDefinition[] {
  if (!Array.isArray(raw) || raw.length !== 30) throw new Error('Catalog must contain 30 fruits');
  const ids = new Set<string>(); const ranks = new Set<number>();
  for (const row of raw) {
    const f = row as FruitDefinition | null;
    if (!f || typeof f.id !== 'string' || !f.id.trim() || ids.has(f.id) || !Number.isInteger(f.rank) || f.rank < 1 || f.rank > 30 || ranks.has(f.rank) || typeof f.name !== 'string' || !f.name.trim() || typeof f.texture !== 'string' || !f.texture.trim() || !Number.isFinite(f.radius) || f.radius <= 0) throw new Error('Invalid fruit definition');
    ids.add(f.id); ranks.add(f.rank);
  }
  return [...raw].sort((a,b) => a.rank-b.rank);
}
export const fruits = validateCatalog(raw);
export function getFruitDefinition(rank: number): FruitDefinition {
  const fruit = fruits.find(f => f.rank === rank);
  if (!fruit) throw new Error(`Unknown fruit rank ${rank}`);
  return fruit;
}
