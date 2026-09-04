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
