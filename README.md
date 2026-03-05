# learn-playwright
เรียนการใช้งาน playwright ด้วย TypeScript

## โครงสร้างการเขียน Basic </br>
```lua
import { test, expect } from '@playwright/test';
test('ชื่อภาพรวมการทดสอบ', async ({ page }) => {
  test('ชื่อกรณีทดสอบ', async ({ page }) => {
    await page.getBy __something__ ().action();
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
await ecpect (locator).mattcher();

```

