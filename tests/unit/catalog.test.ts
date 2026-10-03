import { expect, test } from 'vitest';
import raw from '../../src/game/catalog/fruits.json';
import { validateCatalog, getFruitDefinition } from '../../src/game/catalog/catalog';
test('FR-01 complete catalog and lookup', () => { expect(validateCatalog(raw)).toHaveLength(30); expect(getFruitDefinition(30).rank).toBe(30); expect(()=>getFruitDefinition(31)).toThrow(); });
test.each(['id','rank','name','texture','radius'])('rejects invalid %s', key => { const rows=structuredClone(raw); Object.assign(rows[1], {[key]: key==='id'?rows[0].id:key==='rank'?1:key==='radius'?0:''}); expect(()=>validateCatalog(rows)).toThrow(); });
test.each([-1,NaN,Infinity])('rejects radius %s', radius => { const rows=structuredClone(raw); rows[0].radius=radius; expect(()=>validateCatalog(rows)).toThrow(); });
test('rejects missing levels', () => expect(()=>validateCatalog(raw.slice(1))).toThrow());
