import { test, expect } from '@playwright/test';

    // เพิ่ม test.describe ในกรณีที่รันโค้ดบางอย่างก่อนทุก Test Case 
    test.describe('TS-1 Login page', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('https://www.saucedemo.com/');
        });

        test('TC-01 Login standard_user secces', async ({ page }) => {

            // เพิ่มการใส่ Step เพื่อให้ตอนรันตรวจสอบอ่านได้ง่ายขึ้น
            await test.step('Step 1: input username', async () => {
                await page.locator('#user-name').fill('standard_user');
            });

            await test.step('Step 2: input password', async () => {
                await page.locator('#password').fill('secret_sauce');
            });

            await test.step('Step 3: Click login button', async () => {
                await page.locator('#login-button').click();
            });

            await test.step('Step 4: Verify login success', async () => {
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
            });

        });
    });