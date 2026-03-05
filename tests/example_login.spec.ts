import { test, expect } from '@playwright/test';

    test.describe('TS-1 Login page', () => {
        test('TC-01 Login standard_user secces', async ({ page }) => {
            await page.goto('https://www.saucedemo.com/');

            await page.locator('#user-name').fill('standard_user');
            await expect (page.locator('#user-name')).toHaveValue('standard_user');

            await page.locator('#password').fill('secret_sauce');
            await expect (page.locator('#password')).toHaveValue('secret_sauce');

            await page.locator('#login-button').click();
            await expect (page).toHaveURL('https://www.saucedemo.com/inventory.html');
            await expect (page).toHaveTitle('Swag Labs');
        });

        test('TC-02 locked_out_user', async ({ page }) => {
            await page.goto('https://www.saucedemo.com/');
    
            await page.locator('#user-name').fill('locked_out_user');
            await expect (page.locator('#user-name')).toHaveValue('locked_out_user');

            await page.locator('#password').fill('secret_sauce');
            await expect (page.locator('#password')).toHaveValue('secret_sauce');

            await page.locator('#login-button').click();
            await expect (page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
        });
    });