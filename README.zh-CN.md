<div align="center">

<h1>Vue H5 Template</h1>

基于 Vue 3 + TypeScript + Turborepo 的移动端 H5 开发模板

[English](./README.md) | 简体中文 | [日本語](./README.ja-JP.md) | [繁體中文(台)](./README.zh-TW.md) | [繁體中文(港)](./README.zh-HK.md)

</div>

## 简介

Vue H5 Template 是一个免费开源的移动端 H5 开发模板，基于 Turborepo Monorepo 架构，使用最新的 Vue 3、Vite、TypeScript 等主流技术栈，提供 NutUI、Vant、Varlet 三套 UI 框架的 H5 应用模板。

## 特性

- **Monorepo 架构**：基于 Turborepo + pnpm workspace，统一管理多个 H5 应用和共享包
- **三套 UI 框架**：分别提供 NutUI、Vant、Varlet 版本，自由选择适合的 UI 组件库
- **TypeScript**：全面的 TypeScript 支持，配合 unplugin-vue-router 实现类型安全的文件路由
- **Vite 构建**：基于 Vite 的构建配置，支持自动导入和组件自动注册
- **UnoCSS**：原子化 CSS 引擎，全局使用 utility-first 风格写样式
- **状态管理**：Pinia + 持久化插件，生产环境 AES 加密存储
- **Mock 服务**：基于 Nitro 的 Mock 后端，提供登录认证、商品列表等接口
- **Eruda**：内置移动端调试控制台，仅在非生产环境开启
- **统一规范**：共享 ESLint / Prettier / Stylelint / Commitlint 配置
- **移动适配**：postcss-mobile-forever 移动端适配方案（设计稿宽 375px，最大显示宽 600px）
- **国际化**：支持简体中文、繁体中文、英文、日文四种语言

## 技术栈

| 技术                | 版本  | 说明               |
| ------------------- | ----- | ------------------ |
| Vue 3               | 3.5   | 前端框架           |
| TypeScript          | 6.0   | 类型安全           |
| Vite                | 8.0   | 构建工具           |
| UnoCSS              | 66.x  | 原子化 CSS 引擎    |
| Turborepo           | 2.9   | Monorepo 管理      |
| pnpm                | 10.27 | 包管理器           |
| Pinia               | 3.0   | 状态管理           |
| Vue Router          | 5.0   | 路由               |
| unplugin-vue-router | 0.19  | 类型安全的文件路由 |
| Vue I18n            | 11.3  | 国际化             |
| Nitro               | 2.x   | Mock 服务器        |
| NutUI               | 4.3   | UI 组件库          |
| Vant                | 4.9   | UI 组件库          |
| Varlet              | 3.12  | UI 组件库          |
| VueUse              | 14.x  | 组合式工具集       |
| Eruda               | 3.x   | 移动端调试控制台   |

## 环境要求

- [Node.js](https://nodejs.org/) >= 20.12.0
- [pnpm](https://pnpm.io/) >= 10.0.0
- [Git](https://git-scm.com/)

## 安装使用

```bash
# 克隆项目
git clone https://github.com/fonghehe/vue-h5-template.git
cd vue-h5-template

# 安装依赖
pnpm install

# 启动开发（交互式选择应用）
pnpm dev

# 启动指定应用
pnpm dev:nutui    # NutUI 版
pnpm dev:vant     # Vant 版
pnpm dev:varlet   # Varlet 版
```

## 构建

```bash
# 构建所有应用
pnpm build

# 构建指定应用
pnpm build:nutui
pnpm build:vant
pnpm build:varlet

# 构建文档
pnpm build:docs
```

## 项目结构

```
vue-h5-template/
├── apps/
│   ├── backend-mock/       # Nitro Mock 服务
│   ├── h5-nutui/           # NutUI H5 应用（端口 5777）
│   ├── h5-vant/            # Vant H5 应用（端口 5778）
│   └── h5-varlet/          # Varlet H5 应用（端口 5779）
├── docs/                   # VitePress 文档站
├── internal/
│   ├── lint-configs/       # ESLint、Stylelint、Commitlint 配置
│   ├── node-utils/         # Node.js 工具
│   ├── tsconfig/           # 共享 TypeScript 配置
│   └── vite-config/        # 共享 Vite 配置
├── packages/
│   ├── @core/              # 核心包（base、composables、preferences）
│   ├── locales/            # 国际化语言包
│   ├── stores/             # Pinia 状态管理
│   ├── styles/             # 共享样式
│   └── utils/              # 共享工具
└── scripts/                # 构建脚本和 CLI 工具
```

## 测试账号

Mock 服务提供以下测试账号：

| 用户名 | 密码   | 角色     |
| ------ | ------ | -------- |
| user   | 123456 | 普通用户 |
| admin  | 123456 | 管理员   |

## 文档

- [在线文档](https://fonghehe.github.io/vue-h5-template/)

## 浏览器支持

支持现代浏览器和移动端浏览器，不支持 IE。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge ≥ 80                                                                                                                                                                                              | Firefox ≥ 78                                                                                                                                                                                                      | Chrome ≥ 80                                                                                                                                                                                                   | Safari ≥ 14                                                                                                                                                                                                   |

## 贡献

欢迎参与贡献，请参考 [贡献指南](https://github.com/fonghehe/vue-h5-template/blob/main/CONTRIBUTING.md)。

Git 提交规范请遵循 [Conventional Commits](https://www.conventionalcommits.org/) 约定。

## License

[MIT](./LICENSE)

详细的说明文档请[点击](https://fonghehe.github.io/vue-h5-template/)查看

如果对你有帮助送我一颗珍贵的小星星（づ￣ 3 ￣）づ ╭❤ ～

# 关于我

扫描添加下方的微信并备注加交流群(已超过 200 人，只能邀请)，交流学习，及时获取代码最新动态。

 <p>
  <img src="https://cdn.jsdelivr.net/gh/fonghehe/picture/personal/account.jpg" width="256">
</p>

如果你觉得该项目有给你带来帮助，方便了你的日常开发，可以请作者喝一杯 ☕ 支持持续的迭代

 <table >
  <tr align="center">
  <td>WechatPay</td>
  <td>AliPay</td>
  </tr>
  <tr style="text-align:center">
    <td> <img src="https://cdn.jsdelivr.net/gh/fonghehe/picture/contribute/wechatPay.jpeg" width="256" /></td>
    <td>
      <img src="https://cdn.jsdelivr.net/gh/fonghehe/picture/contribute/aliPay.jpeg" width="256" />
    </td>
  </tr>
</table>
