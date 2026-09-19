# 共享移动 UI

`@vh5/mobile-ui` 直接消费源码，不依赖具体 UI 框架，提供共享业务页、`FloatingAiButton`、`LanguageSelect`、安全 Markdown 和 SVG 组件。应用包装传入框架/会话/端点参数，不要在包内导入三种 UI 库。

```ts
import HomePage from '@vh5/mobile-ui/HomePage.vue';
import FloatingAiButton from '@vh5/mobile-ui/FloatingAiButton.vue';
import { useCartStore } from '@vh5/mobile-ui/cart';
import { useProductPage, useInfiniteProducts } from '@vh5/mobile-ui/queries';
```

`src/surface.css` · `src/cart.ts` · `src/queries.ts` · `src/assets/icons`

```bash
pnpm -F @vh5/mobile-ui type-check
```

[参考: UI](../guide/v2/ui-framework.md) · [参考: Query / Pinia](../guide/essentials/state.md) · [参考: i18n](../guide/essentials/locale.md)

## 购物车与模拟支付

共享 `/list → /cart → /payment` 流程使用 `commerce.css` 和各应用主题变量：Vant 蓝、NutUI 红、Varlet 紫。商品列表提供购物袋数量入口和胶囊加购按钮；购物车支持勾选、移除、44px 数量控件，适配安全区域的底栏进入懒加载支付页。

选择微信支付、支付宝或银行卡后确认。这是纯前端演示，没有支付 SDK、后端订单或真实扣款。回执金额按勾选商品计算，成功后会按演示约定清空**整个持久化购物车，包括未勾选商品**。回执只存在于当前页面，刷新不会恢复；空购物车或没有选中商品时不能支付。Mock 与真实服务数据模式下行为一致，真实支付需要另行接入后端。

页面与无障碍标签同步支持英文、中文、日文。组件测试覆盖数量边界、勾选、移除、三种支付方式及持久化清空；Playwright 在三个应用验证完整流程、320px 排版和日文界面。

## 入口收敛

四个底部 Tab 负责主导航。首页仅展示项目概览，不再重复放功能链接或语言选择器。会员页本身就是个人中心：展示传入的头像/名称、登录状态、账户信息和偏好设置，根据状态显示登录或退出；不虚构资料编辑字段或新后端接口。语言切换只保留在此处。

商品列表提供购物车主入口，详情返回列表，不再额外放购物车快捷入口。AI Chat 只保留共享悬浮按钮，首页卡片和示例列表不再重复跳转。Query、Request、移动 Web 能力、SVG、PWA 和原生组件统一从示例页进入。结算中的返回/继续购物属于流程操作，仍保留。三端共享相同结构，各自沿用主题色。

## 底部间距

共享页面底部保留 20px 内容间距。正常布局中的 Tab 显式处理底部安全区，因此 Tab 页面不重复预留；无 Tab 页面保留自身安全区。购物车与支付页只在需要结算控件时渲染 `CommerceDock`：ResizeObserver 测量固定栏实际高度（包含安全区与文案换行），由等高的正常布局占位避免遮挡内容。页面只额外保留 20px，不再重复安全区。空购物车和支付成功时同步移除操作栏与占位，商品列表始终不预留结算栏高度。

## 商品收藏与聊天建议

### 收藏交互与会话隔离

`FavoriteButton` 接收数值 `productId` 和当前 `session` Token。未登录时显示登录链接，不请求私有状态；登录后先读取已保存的状态，再启用操作。读取失败可重试，写入失败保留最后确认的状态并提示错误。读取和保存期间禁用重复提交。

收藏状态由 TanStack Query 管理。缓存键包含控件实例、会话代数和商品 ID，不包含 Token。Mutation 捕获提交时的缓存键，旧响应只更新原来的缓存，不能覆盖另一个账号或商品。重新挂载、切换会话后重新读取服务端。操作提交明确的布尔值，不让服务端反转一个未知状态。

### 按语言加载聊天建议

聊天空状态通过 JSON 请求加载 `GET /api/ai/suggestions`。Query 按语言区分，五分钟内视为新鲜数据，不自动重试。加载中、结果为空或请求失败时继续显示本地翻译建议。点击建议仍走原有发送与停止流程，不改变 SSE 协议，也不保存会话历史。

客户端把 `zh-*` 映射为 `zh-CN`、`ja-*` 映射为 `ja-JP`，其他语言映射为 `en-US`。FastAPI 本身只接受这三个精确值，省略时默认 `en-US`，非法值返回 HTTP 422。语言由显式 `locale` 查询参数决定，不能只依赖 `Accept-Language`。

Monorepo 从 `ChatPage.endpoint` 移除末尾 `/chat` 得到建议接口 base URL，并把该地址与语言都加入缓存键。`VITE_AI_CHAT_ENDPOINT` 应与 AI 代理配置一致。JSON 请求位于 `@vh5/api-client`，SSE 协议继续放在 `@vh5/ai-chat`。

[API](./api-client.md) · [Mock](../apps/backend-mock.md) · [测试](../guide/v2/testing.md)
