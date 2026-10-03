export function getMergeResult(a: number, b: number, max = 30): {nextRank:number;points:number}|null {
  if (!Number.isInteger(max) || max < 1 || !Number.isInteger(a) || a < 1 || a >= max || a !== b) return null;
  return { nextRank: a + 1, points: 10 * a };
}
