import type { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const zhHK: LocaleSpecificConfig<DefaultTheme.Config> = {
  label: "繁體中文(港)",
  lang: "zh-HK",
  link: "/zh-HK/",
  themeConfig: {
    outline: {
      label: "頁面導覽",
    },
    lastUpdated: {
      text: "最後更新於",
    },
    editLink: {
      pattern: "https://github.com/fonghehe/vue-h5-template/edit/main/docs/src/:path",
      text: "喺 GitHub 上編輯此頁",
    },
    docFooter: {
      prev: "上一頁",
      next: "下一頁",
    },
    nav: [
      { text: "指南", link: "/zh-HK/guide/introduction/about" },
      { text: "應用", link: "/zh-HK/apps/nutui" },
      { text: "套件", link: "/zh-HK/packages/stores" },
    ],
    sidebar: {
      "/zh-HK/guide/": [
        {
          text: "簡介",
          items: [
            { text: "關於", link: "/zh-HK/guide/introduction/about" },
            { text: "點解揀我哋", link: "/zh-HK/guide/introduction/why" },
            { text: "快速開始", link: "/zh-HK/guide/introduction/quick-start" },
          ],
        },
        {
          text: "基礎",
          items: [
            { text: "構建部署", link: "/zh-HK/guide/essentials/build" },
            { text: "路由同導覽", link: "/zh-HK/guide/essentials/route" },
            { text: "伺服端互動", link: "/zh-HK/guide/essentials/server" },
            { text: "HTTP 同 API 層", link: "/zh-HK/guide/essentials/api" },
            { text: "狀態管理", link: "/zh-HK/guide/essentials/state" },
            { text: "國際化", link: "/zh-HK/guide/essentials/locale" },
            { text: "樣式", link: "/zh-HK/guide/essentials/styles" },
            { text: "建立應用", link: "/zh-HK/guide/essentials/create-app" },
            { text: "新增特性", link: "/zh-HK/guide/essentials/contributing-features" },
          ],
        },
        {
          text: "工程",
          items: [
            { text: "系統架構", link: "/zh-HK/guide/project/architecture" },
            { text: "目錄結構", link: "/zh-HK/guide/project/dir" },
            { text: "Vite 配置", link: "/zh-HK/guide/project/vite" },
            { text: "代碼規範", link: "/zh-HK/guide/project/standard" },
          ],
        },
        {
          text: "其他",
          items: [
            { text: "常見問題", link: "/zh-HK/guide/other/faq" },
            { text: "項目更新", link: "/zh-HK/guide/other/project-update" },
            { text: "致謝", link: "/zh-HK/guide/other/credits" },
          ],
        },
      ],
      "/zh-HK/apps/": [
        {
          text: "應用",
          items: [
            { text: "NutUI 版", link: "/zh-HK/apps/nutui" },
            { text: "Vant 版", link: "/zh-HK/apps/vant" },
            { text: "Varlet 版", link: "/zh-HK/apps/varlet" },
            { text: "Mock 服務", link: "/zh-HK/apps/backend-mock" },
          ],
        },
      ],
      "/zh-HK/packages/": [
        {
          text: "共享套件",
          items: [
            { text: "Stores", link: "/zh-HK/packages/stores" },
            { text: "Locales", link: "/zh-HK/packages/locales" },
            { text: "Utils", link: "/zh-HK/packages/utils" },
            { text: "Styles", link: "/zh-HK/packages/styles" },
            { text: "Vite Config", link: "/zh-HK/packages/vite-config" },
          ],
        },
      ],
    },
  },
};
