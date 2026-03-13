import { Page } from '@playwright/test';

/**
 * TODOを追加する
 * @param page - PlaywrightのPageオブジェクト
 * @param text - 追加するTODOのテキスト
 */

export async function addTodo(page: Page, text: string) {
    // 入力欄にテキストを入力する
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(text);
    // Enterキーを押してTODOを追加する
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
}