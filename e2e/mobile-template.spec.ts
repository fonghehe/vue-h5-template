import { expect, test } from '@playwright/test';

test('tab navigation and browser back reset the mobile content scroll', async ({
  page,
}) => {
  await page.goto('/list');
  await expect(
    page.getByRole('button', { exact: true, name: 'Add to cart' }).first(),
  ).toBeVisible();
  const content = page.locator('.app-content');
  await content.evaluate((element) => {
    element.scrollTop = 250;
  });
  await expect
    .poll(() => content.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(0);
  // Fixed tabs avoid Playwright scrolling the content to reach a top-of-page link.
  await page.getByTestId('tab-examples').first().click();
  await expect(page).toHaveURL(/\/examples$/u);
  await expect
    .poll(() => content.evaluate((element) => element.scrollTop))
    .toBe(0);
  await content.evaluate((element) => {
    element.scrollTop = 250;
  });
  await expect
    .poll(() => content.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(0);
  await page.goBack();
  await expect(page).toHaveURL(/\/list$/u);
  await expect
    .poll(() => content.evaluate((element) => element.scrollTop))
    .toBe(0);
});

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
  await expect(page.getByTestId('catalog-cart')).toHaveAccessibleName(
    'Shopping cart, 1 item(s)',
  );
  await page.getByTestId('catalog-cart').click();

  await expect(page).toHaveURL(/\/cart$/u);
  await expect(page.getByText('Checkout (1)')).toBeVisible();
});

test('cart checkout supports demo payment, clears persistence and guards empty checkout', async ({
  page,
}, testInfo) => {
  await page.goto('/list');
  await page
    .getByRole('button', { exact: true, name: 'Add to cart' })
    .first()
    .click();
  await page.getByTestId('catalog-cart').click();
  await page.getByRole('button', { name: 'Increase quantity' }).click();
  await expect(page.getByRole('spinbutton', { name: 'Quantity' })).toHaveValue(
    '2',
  );
  await page.screenshot({ path: testInfo.outputPath('cart.png') });
  await page.getByRole('button', { name: 'Checkout (2)', exact: true }).click();
  await expect(page).toHaveURL(/\/payment$/u);
  await expect(page.getByTestId('ai-entry')).toHaveCount(0);
  await page.getByRole('radio', { name: 'Alipay', exact: true }).check();
  await expect(
    page.getByRole('radio', { name: 'Alipay', exact: true }),
  ).toBeChecked();
  await page.screenshot({ path: testInfo.outputPath('payment.png') });
  await page.getByRole('button', { name: 'Confirm demo payment' }).click();
  await expect(
    page.getByRole('heading', { name: 'Payment successful' }),
  ).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('payment-success.png') });
  await page.getByRole('link', { name: 'Back to cart' }).click();
  await page.reload();
  await expect(
    page.getByRole('heading', { name: 'Your cart is empty' }),
  ).toBeVisible();
  await page.goto('/payment');
  await expect(
    page.getByRole('heading', { name: 'Nothing to check out' }),
  ).toBeVisible();
});

test('commerce controls remain accessible at 320px and follow the selected locale', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/list');
  await page
    .getByRole('button', { exact: true, name: 'Add to cart' })
    .first()
    .click();
  await page.getByTestId('catalog-cart').click();
  for (const control of ['Increase quantity', 'Decrease quantity']) {
    const box = await page.getByRole('button', { name: control }).boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('cart-320.png') });
  await page.goto('/member');
  await page.getByRole('combobox').selectOption('ja-JP');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja-JP');
  await page.goto('/payment');
  await expect(
    page.getByRole('heading', { name: '支払い方法を選択' }),
  ).toBeVisible();
  await expect(page.getByRole('radio', { name: '銀行カード' })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('payment-ja-320.png') });
});
