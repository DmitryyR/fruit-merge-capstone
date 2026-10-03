import {spawnSync} from 'node:child_process';
import {readdirSync,readFileSync} from 'node:fs';
const tasks=[
 ['typecheck','node_modules/typescript/bin/tsc','--noEmit'],
 ['lint','node_modules/eslint/bin/eslint.js','src','tests'],
 ['unit','node_modules/vitest/vitest.mjs','run','tests/unit'],
 ['integration','node_modules/vitest/vitest.mjs','run','tests/integration'],
 ['production build','node_modules/vite/bin/vite.js','build'],
 ['test build','node_modules/vite/bin/vite.js','build','--mode','e2e'],
 ['browser acceptance + production smoke','node_modules/playwright/cli.js','test']
];
for(const [label,...args] of tasks){
 console.log(`\nCHECK: ${label}`);
 const result=spawnSync(process.execPath,args,{stdio:'inherit'});
 if(result.error || result.status!==0){console.error(`FAILED: ${label}`,result.error?.message??'');process.exit(result.status||1);}
}
for(const file of readdirSync('dist/assets'))if(file.endsWith('.js') && readFileSync(`dist/assets/${file}`,'utf8').includes('__FRUIT_MERGE_TEST__'))throw new Error('Test API leaked into production');
console.log('\nCHECK PASSED — types, lint, unit, integration, both builds, browsers, production isolation.');
