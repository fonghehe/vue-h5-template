import { expect, test } from '@playwright/test';

test('Vant header follows the theme even when library styles load later', async ({
  page,
}) => {
  test.skip((process.env.E2E_APP ?? 'vant') !== 'vant', 'Vant theme adapter');
  await page.goto('/home');
  await expect(page.locator('.van-nav-bar')).toHaveCSS(
    'background-color',
    'rgb(25, 137, 250)',
  );
  await expect(page.locator('.van-nav-bar__title')).toHaveCSS(
    'color',
    'rgb(255, 255, 255)',
  );
  await page.getByTestId('ai-entry').click();
  await expect(page.locator('.van-nav-bar__arrow')).toHaveCSS(
    'color',
    'rgb(255, 255, 255)',
  );
  // Reproduce Vant's late-loaded root defaults without depending on chunk order.
  await page.addStyleTag({
    content:
      ':root { --van-nav-bar-background: white; --van-nav-bar-title-text-color: black; --van-nav-bar-icon-color: blue; --app-primary: #0969da; }',
  });
  await expect(page.locator('.van-nav-bar')).toHaveCSS(
    'background-color',
    'rgb(9, 105, 218)',
  );
  await expect(page.locator('.van-nav-bar__title')).toHaveCSS(
    'color',
    'rgb(255, 255, 255)',
  );
  await expect(page.locator('.van-nav-bar__arrow')).toHaveCSS(
    'color',
    'rgb(255, 255, 255)',
  );
});

test('home presents product capabilities', async ({ page }) => {
  await page.goto('/home');
  await expect(page.getByText('Streaming AI Chat')).toBeVisible();
  await expect(page.getByText('Vite 8 + Rolldown')).toBeVisible();
});

test('mock API returns typed pagination', async ({ request }) => {
  const response = await request.get('/api/product/list?page=1&pageSize=2');
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.data.items).toHaveLength(2);
  expect(body.data.total).toBeGreaterThan(2);
});

test('login and protected request handle 401 redirect', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('button', { exact: true, name: 'Login' }).click();
  await expect(page).toHaveURL(/\/member$/u);

  await page.goto('/examples/request');
  await page.route('**/api/user/info', (route) =>
    route.fulfill({
      body: JSON.stringify({ code: 401, data: null, message: 'Expired' }),
      contentType: 'application/json',
      status: 401,
    }),
  );
  await page.getByRole('button', { name: 'Protected request' }).click();
  await expect(page).toHaveURL(/\/login\?redirect=/u);
});

test('AI chat streams chunks and can be stopped', async ({ page }) => {
  await page.goto('/ai/chat');
  await page.getByRole('button', { name: /What is Vue/u }).click();
  await expect(
    page.getByText('Vue is a progressive JavaScript framework', {
      exact: false,
    }),
  ).toBeVisible();
  const stop = page.getByRole('button', { name: 'Stop generating' });
  if (await stop.isVisible()) await stop.click();
  await expect(page.getByRole('button', { name: 'Regenerate' })).toBeVisible();
});

test('mobile capabilities expose runtime-safe browser fallbacks', async ({
  page,
}) => {
  await page.goto('/examples/mobile');

  await expect(
    page.getByRole('heading', { name: 'Device-aware interaction' }),
  ).toBeVisible();
  await expect(page.getByText('Online', { exact: true })).toBeVisible();
  await expect(
    page.getByText('Visual viewport', { exact: true }),
  ).toBeVisible();
  await expect(page.getByPlaceholder('Open mobile keyboard')).toBeVisible();
});

test('product can be added to the persisted cart', async ({ page }) => {
  await page.goto('/list');

  await page
    .getByRole('button', { exact: true, name: 'Add to cart' })
    .first()
    .click();
  await expect(page.getByText('1 item(s)', { exact: true })).toBeVisible();
  await expect(page.getByText('Shopping cart')).toBeVisible();
  await page.getByText('Shopping cart').click();

  await expect(page).toHaveURL(/\/cart$/u);
  await expect(page.getByText('Checkout (1)')).toBeVisible();
});
