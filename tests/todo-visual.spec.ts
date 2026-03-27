import { test, expect } from '@playwright/test';
import { addTodo } from './helpers/todo-actions';
import { clearAllTodos } from './helpers/todo-cleanup';

// ファイル全体：全テストで共通の前処理
test.beforeEach(async ({ page }) => {
  // baseURLを基準にルートページに遷移する（playwright.config.tsのbaseURLを参照）
  await page.goto('/todomvc/#/');
  // 各テストの前にTODOリストを全件削除し、クリーンな状態から始める
  await clearAllTodos(page);
});

test.describe('ビジュアルリグレッション', () => {
  test.beforeEach(async ({ page }) => {
    await addTodo(page, '買い物リストを作成');
  });

  test('TODOを追加した後の画面が変わっていないことを確認する', async ({ page }) => {
    await expect(page).toHaveScreenshot({
      mask: [page.locator('footer.info p').first()],
    });
  });

  test('TODOを追加した後のDOMが変わっていないことを確認する', async ({ page }) => {
    await expect(page.locator('.todo-list')).toMatchAriaSnapshot();
  });
});