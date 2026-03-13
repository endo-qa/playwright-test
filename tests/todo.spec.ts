import { test, expect, Page } from '@playwright/test';

async function addTodo(page: Page, text: string) {
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(text);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
}

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
 await addTodo(page, '買い物リストを作成');
await expect(page.getByTestId('todo-title').nth(0)).toBeVisible();
await expect(page.getByTestId('todo-title').nth(0)).toContainText('買い物リストを作成');
  await addTodo(page, '牛乳を買う');
  await expect(page.getByTestId('todo-title').nth(1)).toBeVisible();
  await expect(page.locator('body')).toContainText('牛乳を買う');
  await page.getByRole('listitem').filter({ hasText: '買い物リストを作成' }).getByLabel('Toggle Todo').check();
  await expect(page.locator('body')).toContainText('1 item left');
});