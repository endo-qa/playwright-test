import { Page } from '@playwright/test';

/**
 * TODOリストを全件削除する
 * @param page - PlaywrightのPageオブジェクト
 */
export async function clearAllTodos(page: Page) {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  
  // TODOが1件以上ある場合は全件削除する
  const todos = page.getByTestId('todo-item');
  const count = await todos.count();
  for (let i = 0; i < count; i++) {
    // 削除ボタンはホバー時に表示されるため、先にホバーする
    await todos.nth(0).hover();
    await todos.nth(0).getByLabel('Delete').click();
  }
}