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

## 入口整合

四個底部 Tab 負責主導覽。首頁僅展示專案概覽，不再重複放功能連結或語言選單。會員頁本身就是個人中心：展示傳入的頭像/名稱、登入狀態、帳戶資訊與偏好設定，依狀態顯示登入或登出；不虛構資料編輯欄位或新後端 API。語言切換只保留於此。

商品列表提供購物車主入口，詳情返回列表，不再額外放購物車捷徑。AI Chat 僅保留共用浮動按鈕，首頁卡片與範例列表不再重複導向。Query、Request、行動 Web 能力、SVG、PWA 與原生元件統一由範例頁進入。結帳中的返回/繼續購物屬於流程操作，仍保留。三端共用相同結構，各自沿用主題色。

## 底部間距

共用頁面底部保留 20px 內容間距。正常布局中的 Tab 明確處理底部安全區，因此 Tab 頁面不重複預留；無 Tab 頁面保留自身安全區。購物車與付款頁僅在需要結帳控制時渲染 `CommerceDock`：ResizeObserver 測量固定欄實際高度（包含安全區及文字換行），由等高的正常布局占位避免遮擋內容。頁面只額外保留 20px，不重複加入安全區。空購物車及付款成功時同步移除操作欄與占位，商品列表不預留結帳欄高度。
