import type { App } from "vue";

import type { LocaleSetupOptions, SupportedLanguagesType } from "@vh5/locales";

import { $t, setupI18n as coreSetup, loadLocalesMapFromDir } from "@vh5/locales";

import { Locale as VantLocale } from "vant";
import vantEnUS from "vant/es/locale/lang/en-US";
import vantJaJP from "vant/es/locale/lang/ja-JP";
import vantZhCN from "vant/es/locale/lang/zh-CN";
import vantZhTW from "vant/es/locale/lang/zh-TW";

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
      VantLocale.use("en-US", vantEnUS);
      break;
    }
    case "ja-JP": {
      VantLocale.use("ja-JP", vantJaJP);
      break;
    }
    case "zh-CN": {
      VantLocale.use("zh-CN", vantZhCN);
      break;
    }
    case "zh-TW": {
      VantLocale.use("zh-TW", vantZhTW);
      break;
    }
    default: {
      VantLocale.use("zh-CN", vantZhCN);
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
