import type { CSSOptions, UserConfig } from "vite";

import type { DefineApplicationOptions } from "../typing";
import { defineConfig, loadEnv, mergeConfig } from "vite";

import postcssPxToViewport from "postcss-px-to-viewport-8-plugin";
import autoprefixer from "autoprefixer";

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
  return {
    postcss: pxToViewport
      ? {
          plugins: [
            autoprefixer({
              overrideBrowserslist: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8"],
            }),
            postcssPxToViewport({
              unitToConvert: "px", // 要转化的单位
              viewportWidth: 375, // UI设计稿的宽度
              unitPrecision: 6, // 转换后的精度，即小数点位数
              propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
              viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
              fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
              minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
              mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
              replace: true, // 是否转换后直接更换属性值
              landscape: false, //是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
              landscapeUnit: "rem", //横屏时使用的单位
              landscapeWidth: 1134, //横屏时使用的视口宽度
              include: [],
              exclude: [], // 设置忽略文件，用正则做目录名匹配
              ...pxToViewportOptions,
            }),
          ],
        }
      : undefined,
  };
}

export { defineApplicationConfig };
