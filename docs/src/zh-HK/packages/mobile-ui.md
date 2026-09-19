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

## 入口整合

四個底部 Tab 負責主導覽。首頁只展示專案概覽，唔再重複放功能連結或者語言選單。會員頁本身就係個人中心：展示傳入嘅頭像/名稱、登入狀態、帳戶資訊同偏好設定，按狀態顯示登入或者登出；唔虛構資料編輯欄位或者新後端 API。語言切換只保留喺呢度。

商品列表提供購物車主入口，詳情返回列表，唔再額外放購物車捷徑。AI Chat 只保留共用浮動按鈕，首頁卡片同範例列表唔再重複跳轉。Query、Request、Mobile Web 能力、SVG、PWA 同原生元件統一由範例頁進入。結帳入面嘅返回/繼續購物屬於流程操作，會繼續保留。三端共用相同結構，各自沿用主題色。

## 底部間距

共用頁面底部保留 20px 內容間距。正常布局嘅 Tab 會處理底部安全區，所以 Tab 頁面唔會重複預留；冇 Tab 嘅頁面保留自身安全區。購物車同付款頁只喺需要結帳操作時顯示 `CommerceDock`：ResizeObserver 量度固定欄實際高度（包括安全區同文字換行），用等高嘅正常布局占位避免遮住內容。頁面只額外保留 20px，唔重複加安全區。空購物車同付款成功時一齊移除操作欄同占位，商品列表唔預留結帳欄高度。

## 商品收藏與聊天建議

### 收藏操作與登入狀態隔離

`FavoriteButton` 接收數值 `productId` 及目前的 `session` Token。未登入時顯示登入連結，不讀取私人狀態；登入後先取得已儲存狀態，再開放操作。讀取失敗可重試，寫入失敗則保留最後確認的狀態並顯示錯誤。讀取及儲存期間會阻止重複提交。

收藏由 TanStack Query 管理。快取鍵包含元件實例、登入階段的代數及商品 ID，不包含 Token。Mutation 保留提交當時的鍵，舊回應不會覆寫另一帳戶或商品。重新掛載或切換登入狀態後會重新讀取。操作傳入明確布林值，不要求伺服器反轉未知狀態。

### 依語言載入聊天建議

聊天空白狀態透過 JSON 取得 `GET /api/ai/suggestions`，依語言快取五分鐘，不自動重試。載入中、回傳空陣列或失敗時保留本機翻譯建議。選取後沿用原有傳送與停止流程，不改變 SSE 協定，也不儲存對話。

用戶端將 `zh-*` 對應至 `zh-CN`、`ja-*` 對應至 `ja-JP`，其他語言使用 `en-US`。FastAPI 僅接受這三個精確值；省略時為 `en-US`，不支援的值回傳 HTTP 422。語言由 `locale` 查詢參數決定，不依賴 `Accept-Language`。

Monorepo 將 `ChatPage.endpoint` 尾端 `/chat` 移除，作為建議 API 的 base URL，並將網址與語言納入快取鍵。`VITE_AI_CHAT_ENDPOINT` 應與 AI 代理一致。JSON 放在 `@vh5/api-client`，SSE 保留在 `@vh5/ai-chat`。

[API](./api-client.md) · [Mock](../apps/backend-mock.md) · [測試](../guide/v2/testing.md)
