import type { ProductItem } from '../packages/api-client/src/types';

import { expect, test } from '@playwright/test';

const product: ProductItem = {
  id: 1,
  title: 'Everyday essentials for a small home',
  price: '12.50',
  vipPrice: '11.00',
  imgUrl: '',
  shopName: 'Example shop',
  shopDesc: 'Official',
  delivery: 'Available',
  description: 'A useful everyday item',
};

// Fixtures belong to the browser, never to the production application/server.
test.beforeEach(async ({ page }) => {
  await page.route('**/api/product/list**', (route) =>
    route.fulfill({
      json: {
        code: 0,
        message: 'ok',
        data: {
          items: [product],
          page: 1,
          pageSize: 4,
          total: 1,
          hasMore: false,
        },
      },
    }),
  );
  await page.route('**/api/product/detail**', (route) =>
    route.fulfill({
      json: { code: 0, message: 'ok', data: product },
    }),
  );
  await page.route('**/api/ai/suggestions**', (route) =>
    route.fulfill({
      json: { code: 0, data: [], message: 'ok' },
    }),
  );
});

test('a failed bootstrap replaces the loading screen with a reload action', async ({
  page,
}) => {
  const chunk =
    process.env.E2E_PREVIEW === '1'
      ? '**/js/bootstrap-*.js'
      : '**/src/bootstrap.ts';
  await page.route(chunk, (route) =>
    route.fulfill({
      status: 503,
      contentType: 'application/javascript',
      headers: { 'Cache-Control': 'no-store' },
      body: '',
    }),
  );
  await page.goto('/home');
  const alert = page.getByRole('alert');
  await expect(alert).toContainText('This page could not load');
  await expect(page.locator('#__app-loading__')).toBeHidden();
  const retry = alert.getByRole('button', { name: 'Reload page' });
  await expect(retry).toBeEnabled();
  await page.unroute(chunk);
  const navigation = page.waitForRequest(
    (request) =>
      request.isNavigationRequest() &&
      new URL(request.url()).pathname === '/home',
  );
  await retry.click();
  await navigation;
});

test('a failed lazy route stops progress and recovers with a document reload', async ({
  page,
}) => {
  await page.goto('/examples');
  const requestLink = page.locator('a[href="/examples/request"]');
  await expect(requestLink).toBeVisible();
  const chunk =
    process.env.E2E_PREVIEW === '1'
      ? '**/js/request-*.js'
      : '**/src/views/examples/request/index.vue';
  await page.route(chunk, (route) =>
    route.fulfill({
      status: 503,
      contentType: 'application/javascript',
      headers: { 'Cache-Control': 'no-store' },
      body: '',
    }),
  );
  await requestLink.click();
  const alert = page.getByRole('alert');
  await expect(alert).toContainText('This page could not load');
  await expect(page.locator('#nprogress')).toHaveCount(0);
  const reload = alert.getByRole('link', { name: 'Reload page' });
  await expect(reload).toHaveAttribute('href', '/examples/request');
  await page.unroute(chunk);
  await reload.click();
  await expect(page).toHaveURL(/\/examples\/request$/u);
  await expect(
    page.getByRole('button', { name: 'Public query' }),
  ).toBeVisible();
  await expect(page.getByRole('alert')).toHaveCount(0);
});

for (const size of [
  { width: 320, height: 640 },
  { width: 844, height: 390 },
  { width: 1280, height: 800 },
]) {
  test(`shared routes scroll without horizontal overflow at ${size.width}x${size.height}`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize(size);
    for (const path of [
      '/home',
      '/list',
      '/cart',
      '/details?id=1',
      '/payment',
      '/member',
      '/examples',
      '/examples/query',
      '/ai/chat',
      '/examples/mobile',
    ]) {
      await page.goto(path);
      await expect(page.locator('.app-content')).not.toBeEmpty();
      const geometry = await page
        .locator('.app-content')
        .evaluate((element) => {
          const rect = element.getBoundingClientRect();
          return {
            scrollWidth: element.scrollWidth,
            width: element.clientWidth,
            bottom: rect.bottom,
            viewportHeight: innerHeight,
          };
        });
      expect(geometry.scrollWidth, path).toBeLessThanOrEqual(
        geometry.width + 1,
      );
      expect(geometry.bottom, path).toBeLessThanOrEqual(
        geometry.viewportHeight + 1,
      );
      if (path === '/examples/mobile') {
        const input = page.getByRole('textbox');
        await input.scrollIntoViewIfNeeded();
        await expect(input).toBeInViewport();
        await input.fill('Keyboard access');
        await expect(input).toHaveValue('Keyboard access');
        expect(
          await input.evaluate((element) => {
            const rect = element.getBoundingClientRect();
            return (
              document.elementFromPoint(rect.right - 5, rect.bottom - 5) ===
              element
            );
          }),
          'The floating entry must not cover the focused input',
        ).toBe(true);
      }
    }
    await page.screenshot({
      path: testInfo.outputPath(`mobile-${size.width}.png`),
    });
  });
}

test('chat controls remain reachable after viewport shrink and restore', async ({
  page,
  browserName,
}) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/ai/chat');
  const input = page.getByRole('textbox', { name: 'Message' });
  await input.fill('Draft survives resizing');
  await input.focus();
  // This simulates available viewport space, not a real OS keyboard.
  await page.setViewportSize({ width: 320, height: 320 });
  await expect(input).toBeInViewport();
  const send = page.getByRole('button', { name: 'Send message' });
  await expect(send).toBeInViewport();
  const rect = await send.boundingBox();
  expect(rect?.width).toBeGreaterThanOrEqual(44);
  expect(rect?.height).toBeGreaterThanOrEqual(44);
  // Safari's default keyboard mode uses Option+Tab to include buttons.
  await input.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
  await expect(send).toBeFocused();
  await expect(send).toHaveCSS('outline-style', 'solid');
  await page.setViewportSize({ width: 320, height: 640 });
  await expect(input).toHaveValue('Draft survives resizing');
  await expect(input).toBeInViewport();
});

test('production login starts with empty credentials', async ({ page }) => {
  test.skip(process.env.E2E_PREVIEW !== '1', 'Production build only');
  await page.goto('/login');
  const username = page
    .getByPlaceholder('Enter username')
    .or(page.getByRole('textbox', { name: 'Enter username' }));
  await expect(username).toHaveValue('');
  await expect(page.locator('input[type="password"]:visible')).toHaveValue('');
});

test('production preview does not serve the development API', async ({
  request,
}) => {
  test.skip(process.env.E2E_PREVIEW !== '1', 'Production build only');
  const response = await request.get('/api/product/list');
  expect(response.headers()['content-type']).not.toContain('application/json');
  expect(await response.text()).not.toContain('hasMore');
});

for (const mode of ['ios', 'md']) {
  test(`Ionic header titles stay centered in ${mode} mode`, async ({
    page,
  }) => {
    test.skip(process.env.E2E_APP !== 'ionic', 'Ionic toolbar only');
    await page.setViewportSize({ width: 320, height: 640 });

    for (const { path, label } of [
      { path: '/home', label: 'Home' },
      { path: '/examples/mobile', label: 'Mobile Web APIs' },
    ]) {
      await page.goto(`${path}?ionic:mode=${mode}`);
      await expect(page.locator('html')).toHaveAttribute('mode', mode);

      const toolbar = page.locator('ion-header ion-toolbar');
      const title = toolbar.getByText(label, { exact: true });
      await expect(title).toBeVisible();
      await expect
        .poll(() =>
          title.evaluate((element) => {
            const range = document.createRange();
            range.selectNodeContents(element);
            const text = range.getBoundingClientRect();
            return Math.abs(text.left + text.width / 2 - innerWidth / 2);
          }),
        )
        .toBeLessThanOrEqual(1);
    }
  });
}

test('the header back control has a name, visible focus and keyboard activation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/examples');
  await page.locator('a[href="/examples/mobile"]').click();
  const back = page.getByRole('button', { name: 'Back', exact: true });
  await expect(back).toBeVisible();
  const rect = await back.boundingBox();
  expect(rect?.width).toBeGreaterThanOrEqual(44);
  expect(rect?.height).toBeGreaterThanOrEqual(44);
  await page.keyboard.press('Tab');
  await back.focus();
  await expect(back).toBeFocused();
  await expect(back).toHaveCSS('outline-style', 'solid');
  await back.press('Enter');
  await expect(page).toHaveURL(/\/examples$/u);
});

test('bottom tabs support keyboard activation with a visible focus indicator', async ({
  page,
}) => {
  await page.goto('/home');
  const tabControl = (name: string) => {
    const tab = page
      .locator(`[data-testid="tab-${name}"]:not(.nut-badge)`)
      .first();
    return process.env.E2E_APP === 'ionic' ? tab.getByRole('button') : tab;
  };
  const list = tabControl('list');
  await list.focus();
  await expect(list).toBeFocused();
  await list.press('Enter');
  await expect(page).toHaveURL(/\/list$/u);
  if (process.env.E2E_APP === 'ionic') {
    await expect(list).toHaveCSS('color', 'rgb(0, 84, 233)');
  }
  const examples = tabControl('examples');
  await examples.focus();
  await examples.press('Space');
  await expect(page).toHaveURL(/\/examples$/u);
  await expect(examples).toBeFocused();
  await expect(examples).toHaveCSS('outline-style', 'solid');
});
