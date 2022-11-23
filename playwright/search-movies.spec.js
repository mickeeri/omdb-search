// @ts-check
import { test, expect } from '@playwright/test';

test('shows movies in a list', async ({ page }) => {
  page.goto('/');

  await page.getByRole('textbox', { name: /search/i }).fill('godfather');
  await page.getByRole('button', { name: /search/i }).click();

  await expect(page.getByRole('listitem')).toContainText([
    'The Godfather',
    'The Godfather Part II',
    'The Godfather Part III',
  ]);
});
