# learn-playwright
เรียนการใช้งาน playwright ด้วย TypeScript

## โครงสร้างการเขียน → ให้ Test Report อ่านง่าย </br>
```lua
import { test, expect } from '@playwright/test';

test.describe('TS-01 Login', () => {

 // 1. ใช้ test.beforeEach() → รันโค้ดบางอย่างก่อนทุก Test Case
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('TC-01 Login success with standard_user', async ({ page }) => {

    // 2. เพิ่ม test.step() → ใช้สำหรับ แบ่งขั้นตอนของ Test Case
    await test.step('Step 1: Input username', async () => {
      await page.locator('#user-name').fill('standard_user');
    });

    await test.step('Step 2: Input password', async () => {
      await page.locator('#password').fill('secret_sauce');
    });

    await test.step('Step 3: Click login button', async () => {
      await page.locator('#login-button').click();
    });

    await test.step('Step 4: Verify login success', async () => {
      await expect(page).toHaveURL(/inventory/);
      await expect(page.locator('.inventory_list')).toBeVisible();
    });

  });

});
```
👉 `test.step()` → ใช้สำหรับ แบ่งขั้นตอนของ Test Case แนวคิดเหมือนกับ Test Step ใน Test Case document </br>


---

## โครงสร้างการเขียน → ให้สั้นขึ้น </br>
```lua
import { test, expect } from '@playwright/test';

test.describe('TS-1 Login', () => {

    //1. ใช้ test.beforeEach() → รันโค้ดบางอย่างก่อนทุก Test Case เช่นเข้าหน้า browser
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test('TC-01 Login standard_user success', async ({ page }) => {

        // 2. สร้างตัวแปร เพื่อเก็บเช็ค value ของ input ที่ใช้ซ้ำ
        const username = page.locator('#user-name');
        const password = page.locator('#password');
        const loginBtn = page.locator('#login-button');

        //3. เรียกใช้ตัวแปร 
        await username.fill('standard_user');
        await password.fill('secret_sauce');
        await loginBtn.click();

        //4. assert สิ่งที่ user เห็น → เช่น ตอน login สำเร็จควรเช็ค element บนหน้า เพราะเป็นสิ่งนี้คือ UI behavior
        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('.inventory_list')).toBeVisible();
    });

    test('TC-02 locked_out_user', async ({ page }) => {

        await page.locator('#user-name').fill('locked_out_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        await expect(page.locator('[data-test="error"]'))
        .toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });

});
```
👉 `test.beforeEach()` → เป็น Hook ของ Playwright Test หน้าที่ของมันคือ ให้รันโค้ดบางอย่างก่อนทุก Test Case </br>

เช่น
* page.goto()
* login()
* เตรียม test data
* reset state ของระบบ
📌 เพื่อลด code ซ้ำ / test อ่านง่าย

----

## โครงสร้างการเขียน Basic </br>
```lua
import { test, expect } from '@playwright/test';
test('ชื่อภาพรวมการทดสอบ', async ({ page }) => {
  test('ชื่อกรณีทดสอบ', async ({ page }) => {
    //หา element
    await page.getBy __something__ ().action();

    //หา ตรวจสอบผลลัมพธ์
    await ecpect (locator).mattcher();
  });
});
```
## อธิบายโครงสร้างการเขียน Basic </br>
1. import เครื่องมือจาก playwright มาใช้
```lua
import { test, expect } from '@playwright/test';
```
* `test`    → ใช้สร้าง Test Case
* `expect`  → ใช้ตรวจสอบผลลัพธ์ (Assertion)

2. สร้าง Test Scenario => ภาพรวมการทดสอบ
```lua
test('ชื่อภาพรวมการทดสอบ', async ({ page }) => {});
```

3. สร้าง Test CASE => กรณีทดสอบเฉพาะ
```lua
test('ชื่อกรณีทดสอบ', async ({ page }) => {});
```

4. สร้าง Test Step => ขั้นตอนการทดสอบ
```lua
await page.getBy __something__ ().action();

// หรือใช้ locator ชี้ไปที่ element ที่เราจะตรวจสอบ

await expect(page.locator('element')).toHaveValue('xxx');

```
* `locator()`    → มันคือ method กลางที่ใช้หา element ด้วย CSS selector ทุกแบบ
* มันรับได้หมด เช่น
```lua
'#id'
'.class'
'tagname'
'[attribute="value"]'
  ```

5. สร้าง assertion => ตรวจสอบผลลัพธ์
```lua
await ecpect (locator).matcher();

```
* การเลือกใช้ matcher
  
| Element | ใช้ matcher อะไร |
| --- | --- |
| `<input>` | toHaveValue() |
| `<textarea>` | toHaveValue() |
| `<div>` | toHaveText() |
| `<span>` | " |
| `<h1>` | " |
| `<button>` | toBeVisible() |
| `<img>` | toBeVisible() |

📌 `สรุปกฎเหล็ก`
* มีช่องให้กรอก → value ไม่มีช่องกรอก → text
* ถ้าไม่สนใจข้อความข้างใน → toBeVisible() แต่ถ้าต้องการเช็คข้อความ → toHaveText('ข้อความที่อยากเช็ค')

🔥 ตัวอย่าง การเขียนแบบ basic
```lua
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
```
