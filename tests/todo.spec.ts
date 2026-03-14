import { test, expect } from '@playwright/test';
import { addTodo } from './helpers/todo-actions';
import { clearAllTodos } from './helpers/todo-cleanup';

// 各テストの前にTODOリストを全件削除し、クリーンな状態から始める
test.beforeEach(async ({ page }) => {
  await clearAllTodos(page);
});

test('TODOアプリの基本操作', async ({ page }) => {
    // TODOアプリにアクセスする ※clearAllTodos内でgotoしているため不要
  //await page.goto('https://demo.playwright.dev/todomvc/#/');

    // TODO「買い物リストを作成」を追加し、表示されることを確認する
  await addTodo(page, '買い物リストを作成');
  await expect(page.getByTestId('todo-title').nth(0)).toBeVisible();
  await expect(page.getByTestId('todo-title').nth(0)).toContainText('買い物リストを作成');

  // TODO「牛乳を買う」を追加し、表示されることを確認する
  await addTodo(page, '牛乳を買う');
  await expect(page.getByTestId('todo-title').nth(1)).toBeVisible();
  await expect(page.locator('body')).toContainText('牛乳を買う');

  // 「買い物リストを作成」を完了状態にし、残り件数が1件であることを確認する
  await page.getByRole('listitem').filter({ hasText: '買い物リストを作成' }).getByLabel('Toggle Todo').check();
  await expect(page.locator('body')).toContainText('1 item left');
});