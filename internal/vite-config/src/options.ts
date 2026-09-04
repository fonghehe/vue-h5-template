import type { Options as PwaPluginOptions } from 'vite-plugin-pwa';

import type { ImportmapPluginOptions } from './typing';

const isDevelopment = process.env.NODE_ENV === 'development';

const UI_THEME = {
  nut: { background: '#fff8f6', primary: '#fa2c19' },
  vant: { background: '#f4f8fc', primary: '#1989fa' },
  varlet: { background: '#f8f6fc', primary: '#6750a4' },
} as const;

const getDefaultPwaOptions = (
  name: string,
  uiLibrary: 'none' | keyof typeof UI_THEME = 'none',
): Partial<PwaPluginOptions> => {
  const theme =
    uiLibrary === 'none'
      ? { background: '#f6f7fb', primary: '#1989fa' }
      : UI_THEME[uiLibrary];
  return {
    manifest: {
      description: 'Mobile H5 starter template with Turborepo monorepo',
      icons: [
        {
          sizes: '192x192',
          src: '/pwa-192x192.png',
          type: 'image/png',
        },
        {
          sizes: '512x512',
          src: '/pwa-512x512.png',
          type: 'image/png',
        },
      ],
      name: `${name}${isDevelopment ? ' dev' : ''}`,
      short_name: `${name}${isDevelopment ? ' dev' : ''}`,
      display: 'standalone',
      start_url: '/',
      theme_color: theme.primary,
      background_color: theme.background,
    },
  };
};

/**
 * importmap CDN 暂时不开启，因为有些包不支持，且网络不稳定
 */
const defaultImportmapOptions: ImportmapPluginOptions = {
  // 通过 Importmap CDN 方式引入,
  // 目前只有esm.sh源兼容性好一点，jspm.io对于 esm 入口要求高
  defaultProvider: 'esm.sh',
  importmap: [
    { name: 'vue' },
    { name: 'pinia' },
    { name: 'vue-router' },
    // { name: 'vue-i18n' },
    { name: 'dayjs' },
    { name: 'vue-demi' },
  ],
};

export { defaultImportmapOptions, getDefaultPwaOptions };
