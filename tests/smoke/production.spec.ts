import {test,expect} from '@playwright/test';
test('production boots without test API',async({page})=>{const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');await expect(page.locator('canvas')).toBeVisible();await expect(page.getByRole('button',{name:'Пауза',exact:true})).toBeEnabled();expect(await page.evaluate(()=>('__FRUIT_MERGE_TEST__' in window))).toBe(false);expect(errors).toEqual([]);});
test('missing asset produces actionable error',async({page})=>{await page.route('**/assets/fruits/fruit-01.webp',r=>r.abort());await page.goto('/');await expect(page.getByRole('alert')).toContainText('Не вдалося завантажити');});

test('SIZ-04 diagnostic shows all 30 at equal scale without changing progress',async({page})=>{
 await page.goto('/');await page.evaluate(()=>localStorage.setItem('fruit-merge.best.v1','22310'));
 await page.goto('/?view=sizes');await expect(page.locator('[data-ready="true"]')).toBeVisible();
 await expect(page.locator('.size-grid canvas')).toHaveCount(30);
 expect(await page.locator('.size-grid canvas').evaluateAll(nodes=>nodes.every(node=>node.getBoundingClientRect().width===480))).toBe(true);
 await page.locator('#size-zoom').selectOption('0.7375');
 expect(await page.locator('.size-grid canvas').evaluateAll(nodes=>nodes.every(node=>node.getBoundingClientRect().width===354))).toBe(true);
 expect(await page.evaluate(()=>localStorage.getItem('fruit-merge.best.v1'))).toBe('22310');
 expect(await page.evaluate(()=>('__FRUIT_MERGE_TEST__' in window))).toBe(false);
 await page.goto('/');await expect(page.locator('#best')).toContainText('22');
});

