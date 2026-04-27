import {test, expect} from '@playwright/test';
    test.describe('TS01: การค้นหาบทความบทหน้าเว็บไซต์ kanexkane', () => {
        test.beforeEach(async ({page}) => {
            await page.goto('https://kanexkane.com/')
        });
        test('TC01: ค้นหาบทความบทหน้าเว็บ', async ({page}) => {
            await test.step('step 01: กดปุ่มค้นหา', async () =>{
                await page.locator('div.desk-header a.msearch').click();
            });
            await test.step('step 02: กรองคำค้นหา', async () =>{
                await page.getByPlaceholder('ค้นหา …').fill('php');
            });
            await test.step('step 03: กดปุ่มค้นหา', async () => {
                await page.locator('input.search-submit').click();
            });
            await test.step('step 04: เว็บแสดงบทความที่มีเนื้อหาเกี่ยวกับภาษา php', async () => {
               await expect(page.getByRole('heading', {name:'Search Results for:', exact: false})).toContainText('php');
            });
        });
        test('TC02: ค้นหาบทความที่ไม่มีในระบบ', async ({page}) => {
            await test.step('step 01: กดปุ่มค้นหา', async () =>{
                await page.locator('div.desk-header a.msearch').click();
            });
            await test.step('step 02: กรองคำค้นหา', async () =>{
                await page.getByPlaceholder('ค้นหา …').fill('แกงเขียนหวาน');
            });
            await test.step('step 03: กดปุ่มค้นหา', async () => {
                await page.locator('input.search-submit').click();
            });
            await test.step('step 04: เว็บแสดงข้อความว่าไม่พบบทความ', async () => {
               await expect(page.getByRole('heading', {name: 'Nothing Found'})).toBeVisible();
            });
        })
    });

