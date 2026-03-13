import { Page } from '@playwright/test';

export async function addTodo(page: Page, text: string) {
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(text);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
}