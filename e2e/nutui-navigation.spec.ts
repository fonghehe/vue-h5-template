import { expect, test } from '@playwright/test';

test('NutUI back icon stays white against the theme and navigates back', async ({
  page,
}) => {
  await page.goto('/list');
  await page.getByTestId('catalog-cart').click();
  const back = page.getByRole('button', { name: 'Back', exact: true });
  await expect(back.locator('svg')).toHaveCSS('color', 'rgb(255, 255, 255)');
  await page.addStyleTag({
    content:
      ':root { --nut-navbar-color: #979797; --nut-cell-desc-color: #ccc; }',
  });
  await expect(back.locator('svg')).toHaveCSS('color', 'rgb(255, 255, 255)');
  await back.click();
  await expect(page).toHaveURL(/\/list$/u);
});

test('NutUI tabs navigate to list, member and examples', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/home');

  await page.getByRole('button', { name: 'List', exact: true }).click();
  await expect(page).toHaveURL(/\/list$/u);
  await expect(page.locator('.product-card').first()).toBeVisible();

  await page.getByRole('button', { name: 'Member', exact: true }).click();
  await expect(page).toHaveURL(/\/member$/u);
  await expect(page.locator('.profile-panel')).toBeVisible();

  await page.getByRole('button', { name: 'Examples', exact: true }).click();
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
    page.getByRole('button', { name: 'Member', exact: true }),
  ).toBeVisible();

  await page.goto('/example');
  await expect(page).toHaveURL(/\/examples$/u);
  await expect(
    page.getByRole('button', { name: 'Examples', exact: true }),
  ).toBeVisible();
});

test('NutUI mock login returns to member', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('button', { exact: true, name: 'Login' }).click();
  await expect(page).toHaveURL(/\/member$/u);
  await expect(page.locator('.profile-panel')).toBeVisible();
});
