import { expect, test } from '@playwright/test';

test('NutUI tabs navigate to list, member and examples', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/home');

  await page.locator('.nut-tabbar-item[data-testid="tab-list"]').click();
  await expect(page).toHaveURL(/\/list$/u);
  await expect(page.locator('.product-card').first()).toBeVisible();

  await page.locator('.nut-tabbar-item[data-testid="tab-member"]').click();
  await expect(page).toHaveURL(/\/member$/u);
  await expect(page.locator('.profile-panel')).toBeVisible();

  await page.locator('.nut-tabbar-item[data-testid="tab-examples"]').click();
  await expect(page).toHaveURL(/\/examples$/u);
  await expect(
    page.getByRole('heading', { name: 'Patterns for real mobile products' }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test('NutUI legacy URLs redirect to canonical pages', async ({ page }) => {
  await page.goto('/mine');
  await expect(page).toHaveURL(/\/member$/u);
  await expect(
    page.locator('.nut-tabbar-item[data-testid="tab-member"]'),
  ).toBeVisible();

  await page.goto('/example');
  await expect(page).toHaveURL(/\/examples$/u);
  await expect(
    page.locator('.nut-tabbar-item[data-testid="tab-examples"]'),
  ).toBeVisible();
});

test('NutUI mock login returns to member', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('button', { exact: true, name: 'Login' }).click();
  await expect(page).toHaveURL(/\/member$/u);
  await expect(page.locator('.profile-panel')).toBeVisible();
});
