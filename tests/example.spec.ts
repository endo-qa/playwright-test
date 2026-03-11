import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
 await page.goto('https://www.google.com'); // ページを開く
 await expect(page).toHaveTitle(/Google/);  // タイトルに"Google"が含まれるか確認
});

test('google search', async ({ page }) => {
 await page.goto('https://www.google.com');
 await page.getByRole('combobox').fill('Playwright'); // 検索窓に入力
 await page.keyboard.press('Enter');          // Enterキー押下
 await expect(page).toHaveTitle(/Playwright/);     // 検索結果タイトルを確認
});