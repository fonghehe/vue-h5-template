import type { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const zhTW: LocaleSpecificConfig<DefaultTheme.Config> = {
  label: "繁體中文",
  lang: "zh-TW",
  link: "/zh-TW/",
  themeConfig: {
    outline: {
      label: "頁面導覽",
    },
    lastUpdated: {
      text: "最後更新於",
    },
    editLink: {
      pattern: "https://github.com/fonghehe/vue-h5-template/edit/main/docs/src/:path",
      text: "在 GitHub 上編輯此頁",
    },
    docFooter: {
      prev: "上一頁",
      next: "下一頁",
    },
    nav: [
      { text: "指南", link: "/zh-TW/guide/introduction/about" },
      { text: "應用", link: "/zh-TW/apps/nutui" },
      { text: "套件", link: "/zh-TW/packages/stores" },
    ],
    sidebar: {
      "/zh-TW/guide/": [
        {
          text: "簡介",
          items: [
            { text: "關於", link: "/zh-TW/guide/introduction/about" },
            { text: "為什麼選擇我們", link: "/zh-TW/guide/introduction/why" },
            { text: "快速開始", link: "/zh-TW/guide/introduction/quick-start" },
          ],
        },
        {
          text: "基礎",
          items: [
            { text: "建置部署", link: "/zh-TW/guide/essentials/build" },
            { text: "路由與導覽", link: "/zh-TW/guide/essentials/route" },
            { text: "伺服端互動", link: "/zh-TW/guide/essentials/server" },
            { text: "國際化", link: "/zh-TW/guide/essentials/locale" },
            { text: "樣式", link: "/zh-TW/guide/essentials/styles" },
            { text: "建立應用", link: "/zh-TW/guide/essentials/create-app" },
          ],
        },
        {
          text: "工程",
          items: [
            { text: "目錄結構", link: "/zh-TW/guide/project/dir" },
            { text: "Vite 設定", link: "/zh-TW/guide/project/vite" },
            { text: "程式碼規範", link: "/zh-TW/guide/project/standard" },
          ],
        },
        {
          text: "其他",
          items: [
            { text: "常見問題", link: "/zh-TW/guide/other/faq" },
            { text: "專案更新", link: "/zh-TW/guide/other/project-update" },
            { text: "致謝", link: "/zh-TW/guide/other/credits" },
          ],
        },
      ],
      "/zh-TW/apps/": [
        {
          text: "應用",
          items: [
            { text: "NutUI 版", link: "/zh-TW/apps/nutui" },
            { text: "Vant 版", link: "/zh-TW/apps/vant" },
            { text: "Varlet 版", link: "/zh-TW/apps/varlet" },
            { text: "Mock 服務", link: "/zh-TW/apps/backend-mock" },
          ],
        },
      ],
      "/zh-TW/packages/": [
        {
          text: "共享套件",
          items: [
            { text: "Stores", link: "/zh-TW/packages/stores" },
            { text: "Locales", link: "/zh-TW/packages/locales" },
            { text: "Utils", link: "/zh-TW/packages/utils" },
            { text: "Styles", link: "/zh-TW/packages/styles" },
            { text: "Vite Config", link: "/zh-TW/packages/vite-config" },
          ],
        },
      ],
    },
  },
};
