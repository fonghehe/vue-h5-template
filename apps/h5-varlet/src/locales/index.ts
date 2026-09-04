import type { App } from 'vue';

import type { LocaleSetupOptions, SupportedLanguagesType } from '@vh5/locales';

import {
  $t,
  setupI18n as coreSetup,
  loadLocalesMapFromDir,
} from '@vh5/locales';

import { Locale as VarletLocale } from '@varlet/ui';

const modules = import.meta.glob('./langs/**/*.json');

const localesMap = loadLocalesMapFromDir(
  /\.\/langs\/([^/]+)\/(.*)\.json$/,
  modules,
);

/**
 * 加载应用特有的语言包
 * @param lang
 */
async function loadMessages(lang: SupportedLanguagesType) {
  const [appLocaleMessages] = await Promise.all([
    localesMap[lang]?.(),
    loadThirdPartyMessage(lang),
  ]);
  return appLocaleMessages?.default;
}

/**
 * 加载第三方组件库的语言包
 * @param lang
 */
async function loadThirdPartyMessage(lang: SupportedLanguagesType) {
  switch (lang) {
    case 'en-US': {
      const locale = await import('@varlet/ui/es/locale/en-US.mjs');
      VarletLocale.add(lang, locale.default);
      VarletLocale.use(lang);
      break;
    }
    case 'ja-JP': {
      const locale = await import('@varlet/ui/es/locale/ja-JP.mjs');
      VarletLocale.add(lang, locale.default);
      VarletLocale.use(lang);
      break;
    }
    case 'zh-CN': {
      const locale = await import('@varlet/ui/es/locale/zh-CN.mjs');
      VarletLocale.add(lang, locale.default);
      VarletLocale.use(lang);
      break;
    }
    case 'zh-TW': {
      const locale = await import('@varlet/ui/es/locale/zh-TW.mjs');
      VarletLocale.add(lang, locale.default);
      VarletLocale.use(lang);
      break;
    }
    default: {
      const locale = await import('@varlet/ui/es/locale/zh-CN.mjs');
      VarletLocale.add(lang, locale.default);
      VarletLocale.use(lang);
    }
  }
}

async function setupI18n(app: App, options: LocaleSetupOptions = {}) {
  await coreSetup(app, {
    defaultLocale: 'en-US',
    loadMessages,
    missingWarn: !import.meta.env.PROD,
    ...options,
  });
}

const t = $t;

export { $t, setupI18n, t };
