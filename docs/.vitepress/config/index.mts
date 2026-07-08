import { defineConfig } from 'vitepress';

import { en } from './en.mts';
import { ja } from './ja.mts';
import { shared } from './shared.mts';
import { zhHK } from './zh-HK.mts';
import { zhTW } from './zh-TW.mts';
import { zh } from './zh.mts';

export default defineConfig({
  ...shared,
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      ...en,
    },
    zh: { ...zh },
    ja: { ...ja },
    'zh-TW': { ...zhTW },
    'zh-HK': { ...zhHK },
  },
});
