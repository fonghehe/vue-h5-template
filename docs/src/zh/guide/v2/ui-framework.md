# UI Framework 策略

Vant 顶栏使用 `--app-primary`，标题、图标和文字操作为白色。导航变量定义在 `.van-nav-bar` 上，避免 Vant 延迟加载的根级默认样式覆盖主题。

三个应用采用相同的 Tab 顺序和功能：**Home → List → Member → Examples**，对应 `/home`、`/list`、`/member`、`/examples`。旧的 `/mine`、`/example` 继续可用。Member 支持游客访问，切换语言不要求登录；受保护接口仍统一处理 401。

## 共享功能，独立主题

`packages/mobile-ui` 负责框架无关的首页、商品、详情、购物车、支付、会员、示例、AI Chat、Query、Request 和移动 Web 页面。各应用保留懒加载路由包装层，传入框架名称和会话数据。REST、Streaming 协议继续由 `api-client` 和 `ai-chat` 管理。商品查询属于服务端状态；购物车数量和选中状态属于 Pinia 客户端状态。

三个应用保留自己的原生导航和 `/examples/components` 组件展示。NutUI 使用 `NutTabbarItem.to` 导航，不把 `tab-switch` 返回的组件实例当成路由。每个生产包只引入选中的 UI 框架。

`packages/styles` 统一控制 Vant 蓝色（`#1989fa`）、NutUI 红色（`#fa2c19`）、Varlet 紫色（`#6750a4`）。共享商品页采用响应式网格，排除 px-to-vw 转换，确保按钮保持真实 44px 触控尺寸。修改内部构建配置后执行 `pnpm -F @vh5/vite-config stub`。

## 页面语言与 AI 入口

页面默认英文，Member 可切换 English、简体中文、日本語；选择保存在 `vh5:locale`。页面文案、路由标题、浏览器标题、占位符和无障碍标签必须同步翻译。REST 请求携带 `Accept-Language`，Nitro Mock 返回对应语言的商品数据；真实业务服务自行提供翻译内容。Query 缓存键包含语言，避免串用缓存。

主题色 AI 悬浮按钮位于底部 Tab 上方，打开懒加载的 `/ai/chat`。Member、Chat、Login、Cart、Payment、Details 隐藏入口，避免和输入或结算操作冲突。三端共享流式响应、停止、重新生成、复制和安全 Markdown 渲染。

继续支持 `pnpm dev:<ui>`（Nitro Mock）和 `pnpm dev:services:<ui>`（AI 8001、Business 8002）。前端环境变量不能保存服务商密钥。

SVG 与可选 PWA 示例也已在三端统一；Vant 原有应用级 SVG 资产仍可单独使用。NutUI 未提供的日语语言包由类型化的 `apps/h5-nutui/src/locales/nutui-ja.ts` 补充。保留繁体中文字典供定制集成使用，默认选择器提供上述三种产品语言。语言偏好由 Vue I18n 与 localStorage 管理，不存入 Pinia。

NutUI 将导航变量定义在 `.nut-navbar` 上，返回按钮插槽使用原生 `Left` 图标并继承 `currentColor`，避免库内硬编码灰色在红色顶栏上看不清。

## 入口收敛

四个底部 Tab 负责主导航。首页仅展示项目概览，不再重复放功能链接或语言选择器。会员页本身就是个人中心：展示传入的头像/名称、登录状态、账户信息和偏好设置，根据状态显示登录或退出；不虚构资料编辑字段或新后端接口。语言切换只保留在此处。

商品列表提供购物车主入口，详情返回列表，不再额外放购物车快捷入口。AI Chat 只保留共享悬浮按钮，首页卡片和示例列表不再重复跳转。Query、Request、移动 Web 能力、SVG、PWA 和原生组件统一从示例页进入。结算中的返回/继续购物属于流程操作，仍保留。三端共享相同结构，各自沿用主题色。
