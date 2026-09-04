import { createApp } from 'vue';

import { beforeEach, describe, expect, it } from 'vitest';

import { i18n, loadLocaleMessages, setupI18n } from '../i18n';
import enDemo from '../langs/en-US/demo.json';
import en from '../langs/en-US/mobile.json';
import jaDemo from '../langs/ja-JP/demo.json';
import ja from '../langs/ja-JP/mobile.json';
import zhDemo from '../langs/zh-CN/demo.json';
import zh from '../langs/zh-CN/mobile.json';

const createTestApp = () => createApp({});

describe('english-first mobile localization', () => {
  beforeEach(() => {
    localStorage.clear();
    i18n.global.locale.value = '';
  });
  it('keeps Chinese and Japanese page and component keys complete', () => {
    expect(Object.keys(zh).toSorted()).toEqual(Object.keys(en).toSorted());
    expect(Object.keys(ja).toSorted()).toEqual(Object.keys(en).toSorted());
    expect(Object.keys(zhDemo).toSorted()).toEqual(
      Object.keys(enDemo).toSorted(),
    );
    expect(Object.keys(jaDemo).toSorted()).toEqual(
      Object.keys(enDemo).toSorted(),
    );
  });
  it('defaults to English and restores an explicitly selected language', async () => {
    await setupI18n(createTestApp());
    expect(i18n.global.t('mobile.products')).toBe('Everyday essentials');
    await loadLocaleMessages('ja-JP');
    expect(document.documentElement.lang).toBe('ja-JP');
    expect(localStorage.getItem('vh5:locale')).toBe('ja-JP');
    i18n.global.locale.value = '';
    await setupI18n(createTestApp());
    expect(i18n.global.t('mobile.products')).toBe('暮らしのアイテム');
  });
  it('does not accept unsupported persisted locale values', async () => {
    localStorage.setItem('vh5:locale', 'invalid');
    await setupI18n(createTestApp());
    expect(document.documentElement.lang).toBe('en-US');
  });
});
