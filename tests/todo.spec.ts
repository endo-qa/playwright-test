import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('買い物リストを作成');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await expect(page.getByTestId('todo-title')).toBeVisible();
  await expect(page.getByTestId('todo-title')).toContainText('買い物リストを作成');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('牛乳を買う');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await expect(page.getByTestId('todo-title').nth(1)).toBeVisible();
  await expect(page.locator('body')).toContainText('牛乳を買う');
  await page.getByRole('listitem').filter({ hasText: '買い物リストを作成' }).getByLabel('Toggle Todo').check();
  await expect(page.locator('body')).toContainText('1 item left');
});