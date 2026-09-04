# 共享行動 UI

`@vh5/mobile-ui` 直接使用原始碼，與 UI 框架無關；公開業務頁、AI 按鈕、語言選單、安全 Markdown、SVG。應用傳入框架/工作階段/端點 props，不要於包內匯入 UI 庫。

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

## 購物車與模擬付款

共用 `/list → /cart → /payment` 流程使用 `commerce.css` 及各應用主題變數：Vant 藍、NutUI 紅、Varlet 紫。商品列表提供購物袋數量入口與膠囊加入按鈕；購物車支援勾選、移除、44px 數量控制，安全區域底欄進入延遲載入的付款頁。

選擇微信支付、支付寶或銀行卡後確認。這是純前端示範，沒有付款 SDK、後端訂單或真實扣款。收據金額依勾選商品計算，成功會清空**整個持久化購物車，包含未勾選商品**。收據僅存在當前頁面，重新整理不會還原；空購物車或未勾選商品時不能付款。Mock 與真實服務資料模式行為一致，真實付款需另外整合後端。

介面與無障礙標籤同步提供英文、中文、日文。元件測試涵蓋數量邊界、勾選、移除、三種付款方式與持久化清空；Playwright 在三個應用驗證完整流程、320px 排版與日文介面。
