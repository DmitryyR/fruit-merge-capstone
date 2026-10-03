import {test,expect} from '@playwright/test';
test('production boots without test API',async({page})=>{const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');await expect(page.locator('canvas')).toBeVisible();await expect(page.getByRole('button',{name:'Пауза',exact:true})).toBeEnabled();expect(await page.evaluate(()=>('__FRUIT_MERGE_TEST__' in window))).toBe(false);expect(errors).toEqual([]);});
test('missing asset produces actionable error',async({page})=>{await page.route('**/assets/fruits/fruit-01.webp',r=>r.abort());await page.goto('/');await expect(page.getByRole('alert')).toContainText('Не вдалося завантажити');});

