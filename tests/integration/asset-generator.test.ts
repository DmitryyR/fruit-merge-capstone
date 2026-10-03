import {test,expect} from 'vitest';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import catalog from '../../src/game/catalog/fruits.json';

test('legacy SVG generator refuses raster catalog before overwriting artwork or provenance',()=>{
 const workspace=mkdtempSync(join(tmpdir(),'fruit-legacy-'));
 try {
  for(const path of ['src/game/catalog','public/assets/fruits','docs'])mkdirSync(join(workspace,path),{recursive:true});
  writeFileSync(join(workspace,'src/game/catalog/fruits.json'),JSON.stringify(catalog));
  const artwork=join(workspace,'public',catalog[0].texture);
  const register=join(workspace,'docs/asset-register.md');
  writeFileSync(artwork,'existing raster asset');writeFileSync(register,'existing provenance');
  const result=spawnSync(process.execPath,[resolve('scripts/create-assets.mjs')],{cwd:workspace,encoding:'utf8'});
  expect(result.error).toBeUndefined();
  expect(result.status).not.toBe(0);
  expect(result.stderr).toContain('legacy SVG');
  expect(readFileSync(artwork,'utf8')).toBe('existing raster asset');
  expect(readFileSync(register,'utf8')).toBe('existing provenance');
 } finally {rmSync(workspace,{recursive:true,force:true});}
});
