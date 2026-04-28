import type { PluginOption } from "vite";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { VueUseComponentsResolver } from "unplugin-vue-components/resolvers";
import { VantResolver } from "@vant/auto-import-resolver";
import { VarletImportResolver } from "@varlet/import-resolver";
import NutUIResolver from "@nutui/auto-import-resolver";

export interface UnPluginOptions {
  /**
   * UI 库类型
   * - vant: Vant UI 库
   * - nut: NutUI 库
   * - varlet: Varlet UI 库
   */
  uiLibrary: "vant" | "nut" | "varlet";
  /**
   * 是否启用自动导入
   * @default true
   */
  autoImport?: boolean;
  /**
   * 是否启用组件自动注册
   * @default true
   */
  components?: boolean;
}

/**
 * 创建 UI 组件自动导入和注册插件
 * @param options 插件选项
 */
export function viteUnpluginPlugin(options: UnPluginOptions): PluginOption[] {
  const { uiLibrary, autoImport = true, components = true } = options;

  const plugins: PluginOption[] = [];

  // 根据 UI 库类型获取对应的 resolver
  let componentResolvers: any[] = [VueUseComponentsResolver()];
  let autoImportResolvers: any[] = [];

  switch (uiLibrary) {
    case "vant":
      componentResolvers.push(VantResolver());
      autoImportResolvers.push(VantResolver());
      break;
    case "nut":
      componentResolvers.push(NutUIResolver());
      break;
    case "varlet":
      componentResolvers.push(VarletImportResolver());
      autoImportResolvers.push(VarletImportResolver({ autoImport: true }));
      break;
  }

  // 自动导入插件
  if (autoImport) {
    plugins.push(
      AutoImport({
        dts: "./types/auto-imports.d.ts",
        imports: [
          "vue",
          "pinia",
          "vue-router",
          {
            "@vueuse/core": [],
          },
        ],
        eslintrc: {
          enabled: true,
        },
        resolvers: autoImportResolvers,
      }),
    );
  }

  // 组件自动注册插件
  if (components) {
    plugins.push(
      Components({
        dirs: ["src/components"],
        extensions: ["vue", "md"],
        deep: true,
        dts: "./types/components.d.ts",
        directoryAsNamespace: false,
        globalNamespaces: [],
        directives: true,
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
        resolvers: componentResolvers,
      }),
    );
  }

  return plugins;
}
