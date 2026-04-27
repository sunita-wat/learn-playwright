import {test, expect} from '@playwright/test';
    test.describe('TS01 : ตรวจสอบการเปิดหน้าเว็บ', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('https://automationexercise.com/');
        });
        test('TC01: เปิดหน้าแรกแล้วเห็น header', async ({ page }) => {
            await test.step('step 01: ตรวจสอบว่ามี logo แสดงอยู่', async () => {
                await expect(page.locator('div.logo')).toBeVisible();
            });
            await test.step('step 02: ตรวจสอบว่ามีปุ่ม Signup / Login', async () => {
                await expect(page.getByRole('link', { name: 'Signup / Login'})).toBeVisible();
            });
        });
    });

    test.describe('TS02 : ทดสอบการสมัครสมาชิก กรณีกรอกข้อมูลถูกต้อง', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('https://automationexercise.com/');
        });
        test('TC01: สมัครสมาชิกใหม่', async ({ page }) => {
            await test.step('step 01: กดปุ่ม  Signup / Login ', async () => {
                await page.getByRole('link', { name: 'Signup / Login' }).click()
            });
            await test.step('step 02: เว็บแสดงส่วนสมัครสมาชิก', async () => {
               await expect (page.getByText(' New User Signup! ')).toBeVisible();
            });
            //สร้าง random เพื่อให้สามารถรันเทสได้แบบไม่ต้องกลับมาแก้
            const randomEmail = `testuser_${Date.now()}@gmail.com`;
            const randomName = `TestUser${Date.now()}`;

            await test.step('step 03 : กรอก name', async () => {
                await page.locator('[data-qa = "signup-name"]').fill(randomName);
            });
            await test.step('step 04 : กรอก email', async () => {
                await page.locator('[data-qa = "signup-email"]').fill(randomEmail);
            });
            await test.step('step 05 : กด signup', async () => {
                await page.locator('[data-qa = "signup-button"]').click();
            });
            await test.step('step 06 : เว็บแสดงหน้า Enter Account Information', async () => {
                await expect(page.locator('h2.title', { hasText: 'Enter Account Information' })).toBeVisible();
            });
            await test.step('step 07 : เลือกคำนำหน้า', async () => {
                await page.locator('#id_gender2').click();
            });
            await test.step('step 08 : กรอกรหัสผ่าน', async () => {
                await page.locator('[data-qa = "password"]').fill('123456');
            });
            await test.step('step 09 : เลือกวันเกิด', async () => {
                await page.locator('[data-qa="days"]').selectOption('15');
            });
            await test.step('step 10 : เลือกเดือนเกิด', async () => {
                await page.locator('[data-qa="months"]').selectOption({ label: 'October' });
            });
            await test.step('step 11 : เลือกปีเกิด', async () => {
                await page.locator('[data-qa="years"]').selectOption({ label: '1989' });
            });
            await test.step('step 12 : Check Sign up for our newsletter!', async () => {
                await page.getByLabel('Sign up for our newsletter!').check();
            });
            await test.step('step 13 : Check Receive special offers from our partners!', async () => {
                await page.getByLabel('Receive special offers from our partners!').check();
            });
            await test.step('step 14 : เว็บแสดงหน้า Address Information', async () => {
                await expect (page.getByText('Address Information ')).toBeVisible(); 
            });
            await test.step('step 15 : กรอกชื่อ', async () => {
                await page.locator('[data-qa="first_name"]').fill('Test');
            });
            await test.step('step 16 : กรอกสกุล', async () => {
                await page.locator('[data-qa="last_name"]').fill('Tests');
            });
            await test.step('step 17 : กรอกที่อยู่', async () => {
                await page.locator('[data-qa="address"]').fill('159');
            });
            await test.step('step 18 : เลือกประเทศ', async () => {
                await page.locator('[data-qa="country"]').selectOption({ label: 'Israel' });
            });
            await test.step('step 19 : กรอกรัฐ', async () => {
                await page.locator('[data-qa="state"]').fill('ทดสอบการกรอกชื่อรัฐ');
            });
            await test.step('step 20 : กรอกเมือง', async () => {
                await page.locator('[data-qa="city"]').fill('ทดสอบการกรอกชื่อเมือง');
            });
            await test.step('step 21 : กรอกรหัสไปษณีย์', async () => {
                await page.locator('[data-qa="zipcode"]').fill('123456');
            });
            await test.step('step 22 : กรอกเบอร์โทรศัพท์', async () => {
                await page.locator('[data-qa="mobile_number"]').fill('0904531269');
            });
            await test.step('step 23 : กด create account', async () => {
                await page.locator('[data-qa = "create-account"]').click();
            });
            await test.step('step 24 : เว็บแสดง Account Created', async () => {
                await expect(page.locator('h2.title', { hasText: 'Account Created!' })).toBeVisible();
            });
        });
    });