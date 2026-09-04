import { expect, test } from '@playwright/test';

const tab = (name: string) => `[data-testid="tab-${name}"]:not(.nut-badge)`;

test('direct route loads resolve shared modules without browser errors', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    const url = new URL(response.url());
    const isModule = /\.(?:vue|[cm]?js|ts)$/u.test(url.pathname);
    if (isModule && response.status() >= 400) {
      errors.push(`${response.status()} ${url.pathname}`);
    }
  });
  for (const path of [
    '/home',
    '/list',
    '/member',
    '/examples',
    '/cart',
    '/payment',
    '/details?id=1',
    '/ai/chat',
    '/examples/query',
    '/examples/request',
    '/examples/mobile',
    '/examples/svg-icons',
    '/examples/pwa',
  ]) {
    await page.goto(path);
    await expect(page.locator('.app-content')).not.toBeEmpty();
    await expect(page.locator('vite-error-overlay')).toHaveCount(0);
    expect(errors, `Browser errors while loading ${path}`).toEqual([]);
  }
});

test('all four tabs expose the same business features', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/home');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
  await page.locator(tab('list')).first().click();
  await expect(page).toHaveURL(/\/list$/u);
  await expect(page.locator('.product-card').first()).toBeVisible();
  await page.locator(tab('member')).first().click();
  await expect(page).toHaveURL(/\/member$/u);
  await expect(page.getByRole('combobox', { name: 'Language' })).toBeVisible();
  await page.locator(tab('examples')).first().click();
  await expect(page).toHaveURL(/\/examples$/u);
  for (const path of [
    '/ai/chat',
    '/examples/query',
    '/examples/request',
    '/examples/mobile',
    '/examples/svg-icons',
    '/examples/pwa',
    '/examples/components',
  ]) {
    await expect(page.locator(`.row-link[href="${path}"]`)).toBeVisible();
  }
  await page.locator('.row-link[href="/examples/components"]').click();
  await expect(page.getByText('Buttons', { exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test('language changes translate pages and persist after reload', async ({
  page,
}) => {
  await page.goto('/member');
  await page.getByRole('combobox').selectOption('zh-CN');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(
    page.getByRole('heading', { name: '欢迎来到这里' }),
  ).toBeVisible();
  await page.locator(tab('list')).first().click();
  await expect(page.getByRole('heading', { name: '日常好物' })).toBeVisible();
  await expect(page.locator('.product-title').first()).toContainText('活蟹');
  await page.locator(tab('member')).first().click();
  await page.getByRole('combobox').selectOption('ja-JP');
  await expect(page.getByRole('heading', { name: 'ようこそ' })).toBeVisible();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja-JP');
  await page.locator(tab('list')).first().click();
  await expect(
    page.getByRole('heading', { name: '暮らしのアイテム' }),
  ).toBeVisible();
  await expect(page.locator('.product-title').first()).toContainText('活ガニ');
  await expect(page).toHaveTitle(/リスト|一覧|リスト/u);
  await page.getByTestId('ai-entry').click();
  await expect(
    page.getByRole('heading', { name: 'アイデアを形にしよう' }),
  ).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'メッセージ' })).toBeVisible();
});

test('floating chat entry uses the app theme and clears the bottom tabs', async ({
  page,
}) => {
  await page.goto('/home');
  const entry = page.getByTestId('ai-entry');
  await expect(entry).toBeVisible();
  const geometry = await entry.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const app = document.querySelector('.app-shell');
    if (!app) throw new Error('Missing application shell');
    return {
      bottom: rect.bottom,
      height: rect.height,
      color: getComputedStyle(element).backgroundColor,
      theme: getComputedStyle(app).getPropertyValue('--app-primary').trim(),
    };
  });
  expect(geometry.height).toBeGreaterThanOrEqual(44);
  const viewport = page.viewportSize();
  if (!viewport) throw new Error('Expected a mobile viewport');
  expect(geometry.bottom).toBeLessThan(viewport.height - 48);
  expect(geometry.theme).toBeTruthy();
  await entry.click();
  await expect(page).toHaveURL(/\/ai\/chat$/u);
  await expect(entry).toHaveCount(0);
  await expect(page.getByRole('textbox', { name: 'Message' })).toBeVisible();
});

test('shared SVG and optional PWA examples remain reachable', async ({
  page,
}) => {
  await page.goto('/examples/svg-icons');
  await expect(page.getByRole('heading', { name: 'SVG Icons' })).toBeVisible();
  await expect(
    page.locator('.icon-item svg use[href="#vh5-shared-icon-shopping-bag"]'),
  ).toHaveCount(1);
  await expect(
    page.locator('.icon-item svg use[href="#vh5-shared-icon-shield-check"]'),
  ).toHaveCount(1);
  await page.goto('/examples/pwa');
  await expect(
    page.getByRole('heading', { name: 'PWA & Offline' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Install prompt unavailable' }),
  ).toBeDisabled();
});

test('catalog stays readable at 320px with long titles', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/list');
  await expect(page.locator('.product-card').first()).toBeVisible();
  const bounds = await page
    .locator('.product-card')
    .first()
    .evaluate((card) => {
      const contentElement = card.querySelector('.product-content');
      const imageElement = card.querySelector('.product-image');
      const buttonElement = card.querySelector('button');
      if (!contentElement || !imageElement || !buttonElement)
        throw new Error('Incomplete product card');
      const content = contentElement.getBoundingClientRect();
      const image = imageElement.getBoundingClientRect();
      const button = buttonElement.getBoundingClientRect();
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        gap: content.left - image.right,
        content: content.width,
        button: button.width,
      };
    });
  expect(bounds.overflow).toBe(false);
  expect(bounds.gap).toBeGreaterThanOrEqual(10);
  expect(bounds.content).toBeGreaterThan(140);
  expect(bounds.button).toBeGreaterThanOrEqual(44);
  await page.screenshot({
    path: testInfo.outputPath('catalog-320.png'),
    fullPage: true,
  });
});

test('query pagination, mutation and infinite loading work', async ({
  page,
}) => {
  await page.goto('/examples/query');
  await expect(page.locator('article.row-link')).toHaveCount(4);
  const favorite = page.getByRole('button', { name: 'Favorite' }).first();
  await favorite.click();
  await expect(favorite).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(page.getByText('Page 2', { exact: true })).toBeVisible();
  await expect(page.locator('article.row-link')).toHaveCount(1);
  await page.getByRole('button', { name: 'Infinite', exact: true }).click();
  await expect(page.locator('article.row-link')).toHaveCount(4);
  await page.getByRole('button', { name: 'Load more', exact: true }).click();
  await expect(page.locator('article.row-link')).toHaveCount(5);
});
