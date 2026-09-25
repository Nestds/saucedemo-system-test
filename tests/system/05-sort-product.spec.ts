import { test, expect } from '@playwright/test';

test('ST-05: Sort Product จากราคาต่ำไปสูงได้ถูกต้อง', async ({ page }) => {
  // =====================================================
  // Login
  // =====================================================
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/inventory\.html/);

  // =====================================================
  // Select Price Low to High
  // =====================================================
  await page.locator('[data-test="product-sort-container"]')
    .selectOption('lohi');

  // =====================================================
  // Verify prices are ascending
  // =====================================================
  const prices = await page.locator('.inventory_item_price').allTextContents();

  const numericPrices = prices.map(price =>
    Number(price.replace('$', ''))
  );

  const sortedPrices = [...numericPrices].sort((a, b) => a - b);

  expect(numericPrices).toEqual(sortedPrices);
});
