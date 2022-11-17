// @ts-check
import { test, expect } from '@playwright/test';

test('shows movies in a list', async ({ page }) => {
  page.goto('/');

  await page.getByPlaceholder('Enter search word').click();
  await page.getByPlaceholder('Enter search word').fill('godfather');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.getByRole('listitem')).toContainText([
    'The Godfather',
    'The Godfather Part II',
    'The Godfather Part III',
  ]);

  await page.pause();
});
