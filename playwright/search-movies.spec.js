// @ts-check
import { test, expect } from '@playwright/test';

test('when searching for a movie it shows it in a list', async ({ page }) => {
  page.goto('/');

  await page
    .getByRole('textbox', { name: /search/i })
    .type('eternal sunshine of the spotless mind');

  await page.getByRole('button', { name: /search/i }).click();

  await expect(
    page.getByRole('button', { name: 'Searching ...' })
  ).toBeVisible();

  await expect(page.getByRole('listitem').first()).toContainText(
    /eternal sunshine of the spotless mind/i
  );
});
