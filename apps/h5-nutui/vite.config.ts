import { fileURLToPath } from "node:url";

import { defineConfig } from "@vh5/vite-config";

export default defineConfig(async () => {
  return {
    application: {
      uiLibrary: "nut",
    },
    vite: {
      server: {
        proxy: {
          "/api": {
            changeOrigin: true,
            // mock代理目标地址
            target: "http://localhost:5320",
            ws: true,
          },
        },
      },
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("src", import.meta.url)),
          "#": fileURLToPath(new URL("types", import.meta.url)),
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            // 仅对 app 自身的 scss 文件注入 nutui 变量，避免污染 packages/styles 等第三方包
            additionalData: (source: string, filename: string) => {
              if (filename.includes("/apps/h5-nutui/src/")) {
                return `@use "@nutui/nutui/dist/styles/variables.scss" as *;\n${source}`;
              }
              return source;
            },
            quietDeps: true,
          },
        },
      },
    },
  };
});
