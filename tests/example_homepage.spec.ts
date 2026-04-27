import { test, expect } from "@playwright/test";

test.describe ('TS1: Example Web KaneKane Blog', () => {
    // beforeEach เฉพาะ describe นี้ -> goto หน้าแรกเสมอ
    test.beforeEach (async ({ page}) => {
        await page.goto('https://kanexkane.com/');
    });

    test('TC01: ทดสอบการค้นหาบทความ', async ({ page }) => {
        await test.step('Step 1: กดปุ่มค้นหา',async () => {
            //ค้นหา element ที่อยู่ใน div และไม่มีตัวที่สามารถตรวจจับได้ เช่น id, data-textid
            await page.locator('div.desk-header a.msearch').click();
        });

        await test.step('Step 2: กรอกคำค้นหา', async () => {
            await page.locator('input.search-field').fill('blazor');
        });

        await test.step('Step 3: กดปุ่มค้นหา', async () => {
            await page.locator('input.search-submit').click();
        });

        await test.step('Step 4: หน้าจอแสดงผลลัพธ์การค้นหาด้วยคำว่า blazor', async () => {

            /*
            สามารถตรวจสอบผลลัพธ์ได้ 2 แบบ
                1. ตรวจสอบว่า URL ของหน้าเว็บตรงกับค่าที่กำหนด -> ระบบ redirect หรือโหลดไปหน้า URL ที่ถูกต้อง
                    await expect (page).toHaveURL('https://kanexkane.com/?s=blazor');
                2. ตรวจสอบว่า ข้อความใน heading โดยตรงว่ามีคำว่า blazo -> UI แสดงผลถูกต้อง
                    await expect (page.getByRole('heading', { name: 'Search Results for:'})).toContainText('blazor');
            */
            await expect (page).toHaveURL('https://kanexkane.com/?s=blazor');
            await expect (page.getByRole('heading', { name: 'Search Results for:'})).toContainText('blazor');
        });
    });

    test('TC02: ค้นหาบทความที่มี tag ว่า blazor', async ({ page }) => {
        await page.goto('https://kanexkane.com/?s=blazor');
        await test.step('Step 1: ไปที่ช่องค้นหา tags', async () => {
            await page.getByRole('heading', {name: 'Tags'}).hover();
        });
        await test.step('Step 2: กดค้นหาที่ช่อง blazor', async () => {
            await page.locator('//a[@class="tag-cloud-link tag-link-160 tag-link-position-2" and text() = "blazor"]').click();
        });
    });
});


    test.describe('TS-01: test page blog', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('https://kanexkane.com/');
        });
        test('TC-001: test search',async ({ page }) => {
            await test.step('step 1: click search', async () => {
                await page.locator('div.desk-header a.msearch').click();
            });
            await test.step('step 2: show pupup search', async () => {
                await expect(page.getByPlaceholder('ค้นหา …')).toBeVisible();
            });
            await test.step('step 3: input text', async () => {
                await page.getByPlaceholder('ค้นหา …').fill('blazor');
            });
            await test.step('step 4: show text', async () => {
                await expect(page.getByPlaceholder('ค้นหา …')).toHaveValue('blazor');
            });
            await test.step('step 5: click search', async () => {
                //await page.locator('input.search-submit').click();
                await page.getByRole('button', {name: 'ค้นหา'}).click();
            });
            await test.step('step 6: show page', async () => {
                await expect(page).toHaveURL('https://kanexkane.com/?s=blazor');
                await expect(page.getByRole('heading', {name: 'Search Results for:', exact: false })).toContainText('blazor');
            });
        });
    });