import type { App } from "vue";

import type { LocaleSetupOptions, SupportedLanguagesType } from "@vh5/locales";

import { $t, setupI18n as coreSetup, loadLocalesMapFromDir } from "@vh5/locales";

import { Locale as NutLocale } from "@nutui/nutui";

const modules = import.meta.glob("./langs/**/*.json");

const localesMap = loadLocalesMapFromDir(/\.\/langs\/([^/]+)\/(.*)\.json$/, modules);

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
    case "en-US": {
      const locale = await import("@nutui/nutui/dist/packages/locale/lang/en-US");
      NutLocale.use(lang, locale.default);
      break;
    }
    case "zh-CN":
    case "zh-TW": {
      const locale = await import("@nutui/nutui/dist/packages/locale/lang/zh-CN");
      NutLocale.use("zh-CN", locale.default);
      break;
    }
    // NutUI 没有 ja-JP，使用英文兜底
    default: {
      const locale = await import("@nutui/nutui/dist/packages/locale/lang/en-US");
      NutLocale.use("en-US", locale.default);
    }
  }
}

async function setupI18n(app: App, options: LocaleSetupOptions = {}) {
  await coreSetup(app, {
    defaultLocale: "zh-CN",
    loadMessages,
    missingWarn: !import.meta.env.PROD,
    ...options,
  });
}

const t = $t;

export { $t, setupI18n, t };
