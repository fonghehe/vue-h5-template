import { defineConfig } from "vitepress";

import { shared } from "./shared.mts";
import { en } from "./en.mts";
import { ja } from "./ja.mts";
import { zh } from "./zh.mts";
import { zhHK } from "./zh-HK.mts";
import { zhTW } from "./zh-TW.mts";

export default defineConfig({
  ...shared,
  locales: {
    root: {
      label: "简体中文",
      lang: "zh-CN",
      ...zh,
    },
    en: { ...en },
    ja: { ...ja },
    "zh-TW": { ...zhTW },
    "zh-HK": { ...zhHK },
  },
});
