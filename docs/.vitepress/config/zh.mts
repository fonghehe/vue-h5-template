import type { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const zh: LocaleSpecificConfig<DefaultTheme.Config> = {
  label: "简体中文",
  lang: "zh-CN",
  link: "/zh/",
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
      { text: "指南", link: "/zh/guide/introduction/about" },
      { text: "应用", link: "/zh/apps/nutui" },
      { text: "包", link: "/zh/packages/stores" },
    ],
    sidebar: {
      "/zh/guide/": [
        {
          text: "简介",
          items: [
            { text: "关于", link: "/zh/guide/introduction/about" },
            { text: "为什么选择我们", link: "/zh/guide/introduction/why" },
            { text: "快速开始", link: "/zh/guide/introduction/quick-start" },
          ],
        },
        {
          text: "基础",
          items: [
            { text: "构建部署", link: "/zh/guide/essentials/build" },
            { text: "路由与导航", link: "/zh/guide/essentials/route" },
            { text: "服务端交互", link: "/zh/guide/essentials/server" },
            { text: "国际化", link: "/zh/guide/essentials/locale" },
            { text: "样式", link: "/zh/guide/essentials/styles" },
            { text: "创建应用", link: "/zh/guide/essentials/create-app" },
          ],
        },
        {
          text: "工程",
          items: [
            { text: "目录结构", link: "/zh/guide/project/dir" },
            { text: "Vite 配置", link: "/zh/guide/project/vite" },
            { text: "代码规范", link: "/zh/guide/project/standard" },
          ],
        },
        {
          text: "其他",
          items: [
            { text: "常见问题", link: "/zh/guide/other/faq" },
            { text: "项目更新", link: "/zh/guide/other/project-update" },
            { text: "致谢", link: "/zh/guide/other/credits" },
          ],
        },
      ],
      "/zh/apps/": [
        {
          text: "应用",
          items: [
            { text: "NutUI 版", link: "/zh/apps/nutui" },
            { text: "Vant 版", link: "/zh/apps/vant" },
            { text: "Varlet 版", link: "/zh/apps/varlet" },
            { text: "Mock 服务", link: "/zh/apps/backend-mock" },
          ],
        },
      ],
      "/zh/packages/": [
        {
          text: "共享包",
          items: [
            { text: "Stores", link: "/zh/packages/stores" },
            { text: "Locales", link: "/zh/packages/locales" },
            { text: "Utils", link: "/zh/packages/utils" },
            { text: "Styles", link: "/zh/packages/styles" },
            { text: "Vite Config", link: "/zh/packages/vite-config" },
          ],
        },
      ],
    },
  },
};
