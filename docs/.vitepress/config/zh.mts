import type { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const zh: LocaleSpecificConfig<DefaultTheme.Config> = {
  label: "简体中文",
  lang: "zh-CN",
  themeConfig: {
    outline: {
      label: "页面导航",
    },
    lastUpdated: {
      text: "最后更新于",
    },
    editLink: {
      pattern: "https://github.com/fonghehe/vue-h5-template/edit/main/docs/src/:path",
      text: "在 GitHub 上编辑此页",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    nav: [
      { text: "指南", link: "/guide/introduction/about" },
      { text: "应用", link: "/apps/nutui" },
      { text: "包", link: "/packages/stores" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "简介",
          items: [
            { text: "关于", link: "/guide/introduction/about" },
            { text: "为什么选择我们", link: "/guide/introduction/why" },
            { text: "快速开始", link: "/guide/introduction/quick-start" },
          ],
        },
        {
          text: "基础",
          items: [
            { text: "构建部署", link: "/guide/essentials/build" },
            { text: "路由与导航", link: "/guide/essentials/route" },
            { text: "服务端交互", link: "/guide/essentials/server" },
            { text: "国际化", link: "/guide/essentials/locale" },
            { text: "样式", link: "/guide/essentials/styles" },
            { text: "创建应用", link: "/guide/essentials/create-app" },
          ],
        },
        {
          text: "工程",
          items: [
            { text: "目录结构", link: "/guide/project/dir" },
            { text: "Vite 配置", link: "/guide/project/vite" },
            { text: "代码规范", link: "/guide/project/standard" },
          ],
        },
        {
          text: "其他",
          items: [
            { text: "常见问题", link: "/guide/other/faq" },
            { text: "项目更新", link: "/guide/other/project-update" },
            { text: "致谢", link: "/guide/other/credits" },
          ],
        },
      ],
      "/apps/": [
        {
          text: "应用",
          items: [
            { text: "NutUI 版", link: "/apps/nutui" },
            { text: "Vant 版", link: "/apps/vant" },
            { text: "Varlet 版", link: "/apps/varlet" },
            { text: "Mock 服务", link: "/apps/backend-mock" },
          ],
        },
      ],
      "/packages/": [
        {
          text: "共享包",
          items: [
            { text: "Stores", link: "/packages/stores" },
            { text: "Locales", link: "/packages/locales" },
            { text: "Utils", link: "/packages/utils" },
            { text: "Styles", link: "/packages/styles" },
            { text: "Vite Config", link: "/packages/vite-config" },
          ],
        },
      ],
    },
  },
};
