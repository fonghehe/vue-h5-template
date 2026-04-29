import type { CSSOptions, UserConfig } from "vite";

import type { DefineApplicationOptions } from "../typing";
import { defineConfig, loadEnv, mergeConfig } from "vite";

import autoprefixer from "autoprefixer";

import viewport from "postcss-mobile-forever";

import { defaultImportmapOptions, getDefaultPwaOptions } from "../options";
import { loadApplicationPlugins } from "../plugins";
import { loadAndConvertEnv } from "../utils/env";
import { getCommonConfig } from "./common";

function defineApplicationConfig(userConfigPromise?: DefineApplicationOptions) {
  return defineConfig(async (config) => {
    const options = await userConfigPromise?.(config);
    const { appTitle, base, port, ...envConfig } = await loadAndConvertEnv();
    const { command, mode } = config;
    const { application = {}, vite = {} } = options || {};
    const root = process.cwd();
    const isBuild = command === "build";
    const env = loadEnv(mode, root);
    const plugins = await loadApplicationPlugins({
      archiver: true,
      archiverPluginOptions: {},
      compress: false,
      compressTypes: ["brotli", "gzip"],
      devtools: true,
      env,
      extraAppConfig: true,
      html: true,
      i18n: true,
      importmapOptions: defaultImportmapOptions,
      injectAppLoading: true,
      injectMetadata: true,
      isBuild,
      license: true,
      mode,
      nitroMock: !isBuild,
      nitroMockOptions: {},
      print: !isBuild,
      pwa: true,
      pwaOptions: getDefaultPwaOptions(appTitle),
      unocss: true,
      vconsole: !isBuild,
      vxeTableLazyImport: true,
      ...envConfig,
      ...application,
    });
    const { pxToViewport = true, pxToViewportOptions } = application;

    const cssOptions = createCssOptions(pxToViewport, pxToViewportOptions);

    const applicationConfig: UserConfig = {
      base,
      build: {
        rolldownOptions: {
          output: {
            assetFileNames: "[ext]/[name]-[hash].[ext]",
            chunkFileNames: "js/[name]-[hash].js",
            entryFileNames: "jse/index-[name]-[hash].js",
            minify: isBuild
              ? {
                  compress: {
                    dropDebugger: true,
                  },
                }
              : false,
          },
        },
        target: "es2015",
      },
      css: cssOptions,
      esbuild: {
        drop: isBuild
          ? [
              // 'console',
              "debugger",
            ]
          : [],
        legalComments: "none",
      },
      plugins,
      server: {
        host: true,
        port,
        warmup: {
          // 预热文件
          clientFiles: [
            "./index.html",
            "./src/bootstrap.ts",
            "./src/{views,layouts,router,store,api,adapter}/*",
          ],
        },
      },
    };

    const mergedCommonConfig = mergeConfig(await getCommonConfig(), applicationConfig);
    // 合并 css 配置，确保我们的 postcss 配置不会被覆盖
    if (vite.css) {
      mergedCommonConfig.css = {
        ...mergedCommonConfig.css,
        ...vite.css,
        postcss: mergedCommonConfig.css?.postcss,
      };
    }
    return mergeConfig(mergedCommonConfig, vite);
  });
}

function createCssOptions(pxToViewport = true, pxToViewportOptions?: any): CSSOptions {
  const baseViewportOpts = {
    appSelector: "#app",
    viewportWidth: 375,
    unitPrecision: 3,
    maxDisplayWidth: 600,
    propList: ["*"],
    selectorBlackList: [".ignore", "keep-px"],
    valueBlackList: ["1px solid"],
    mobileUnit: "vw",
    rootContainingBlockSelectorList: ["van-popup--bottom"],
    ...pxToViewportOptions,
  };
  return {
    postcss: pxToViewport
      ? {
          plugins: [autoprefixer(), viewport(baseViewportOpts)],
        }
      : undefined,
  };
}

export { defineApplicationConfig };
