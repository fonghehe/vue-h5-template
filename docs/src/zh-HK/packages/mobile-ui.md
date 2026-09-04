# 共享 Mobile UI

`@vh5/mobile-ui` 直接用 source，唔綁 UI 框架；提供業務頁、AI 按鈕、語言選單、安全 Markdown、SVG。應用傳入框架/session/端點 props，唔好喺包內匯入 UI 庫。

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

[參考: UI](../guide/v2/ui-framework.md) · [參考: Query / Pinia](../guide/essentials/state.md) · [參考: i18n](../guide/essentials/locale.md)

## 購物車同模擬付款

共用 `/list → /cart → /payment` 流程使用 `commerce.css` 同各應用主題變數：Vant 藍、NutUI 紅、Varlet 紫。商品列表有購物袋數量入口同膠囊加入按鈕；購物車支援勾選、移除、44px 數量控制，安全區域底欄會開啟延遲載入嘅付款頁。

揀微信支付、支付寶或者銀行卡再確認。呢個係純前端示範，冇付款 SDK、後端訂單或者真實扣款。收據金額按勾選商品計算，成功會清空**成個持久化購物車，包括未勾選商品**。收據只喺目前頁面保存，重新整理唔會還原；空購物車或者冇勾選商品時唔可以付款。Mock 同真實服務資料模式行為一致，真實付款需要另外接後端。

介面同無障礙標籤同步提供英文、中文、日文。元件測試涵蓋數量邊界、勾選、移除、三種付款方式同持久化清空；Playwright 喺三個應用驗證完整流程、320px 排版同日文介面。
