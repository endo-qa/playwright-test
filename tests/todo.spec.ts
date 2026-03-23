import { test, expect } from '@playwright/test';
import { addTodo } from './helpers/todo-actions';
import { clearAllTodos } from './helpers/todo-cleanup';

// ファイル全体：全テストで共通の前処理
test.beforeEach(async ({ page }) => {
  // TODOアプリにアクセスする
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  // 各テストの前にTODOリストを全件削除し、クリーンな状態から始める
  await clearAllTodos(page);
});

test.describe('TODOの追加', () => {
  test('TODOを追加できる', async ({ page }) => {

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
});

test.describe('TODOの編集', () => {
  test.beforeEach(async ({ page }) => {
    await addTodo(page, '牛乳を買う');
  });

  test('TODOを編集できる', async ({ page }) => {
    // ダブルクリックで編集モードに入る
    await page.getByText('牛乳を買う').dblclick();

    // テキストを変更してEnterで確定
    await page.getByRole('textbox', { name: 'Edit' }).fill('紅茶を買う');
    await page.getByRole('textbox', { name: 'Edit' }).press('Enter');

    // 変更後のテキストが表示されることを確認
    await expect(page.locator('body')).toContainText('紅茶を買う');
  });
});

test.describe('TODOの削除', () => {
  test.beforeEach(async ({ page }) => {
    await addTodo(page, '牛乳を買う');
  });

  test('TODOを削除できる', async ({ page }) => {
    // ホバーして削除ボタンをクリック
    await page.getByTestId('todo-item').nth(0).hover();
    await page.getByRole('button', { name: 'Delete' }).click();

    // 削除されたことを確認
    await expect(page.getByTestId('todo-item')).toHaveCount(0);
  });
});