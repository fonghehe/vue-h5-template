# UI Framework 策略

Vant 頂欄使用 `--app-primary`，標題、圖示同文字操作為白色。導覽變數定義喺 `.van-nav-bar` 上，避免 Vant 延遲載入嘅根層預設樣式覆蓋主題。

三個應用採用相同 Tab 順序與業務功能：**Home → List → Member → Examples**，對應 `/home`、`/list`、`/member`、`/examples`。舊 `/mine`、`/example` 仍可使用。Member 開放訪客存取，語言切換不需要登入；受保護 API 仍統一處理 401。

## 共用功能，獨立主題

`packages/mobile-ui` 提供框架無關的首頁、商品、詳情、購物車、付款、會員、範例、Chat、Query、Request 與 Mobile Web 頁面。各應用以延遲載入包裝層傳入框架名稱及會話資料。REST 與串流協定分別由 `api-client`、`ai-chat` 負責。商品屬於 Query 伺服器狀態；購物車數量與選取屬於 Pinia 用戶端狀態。

各應用保留原生導覽與 `/examples/components` 元件展示。NutUI 使用 `NutTabbarItem.to` 導覽，不把 `tab-switch` 回傳的元件實例當成路由。正式建置只包含選定的一套 UI。

`packages/styles` 統一管理 Vant 藍色（`#1989fa`）、NutUI 紅色（`#fa2c19`）、Varlet 紫色（`#6750a4`）。共用頁面以響應式 Grid 排版，排除 px-to-vw 轉換，保持實際 44px 觸控尺寸。修改內部建置設定後執行 `pnpm -F @vh5/vite-config stub`。

## 語言與 AI 入口

介面預設英文，Member 提供 English、简体中文、日本語切換，選擇儲存在 `vh5:locale`。同步翻譯本文、路由與文件標題、提示文字及無障礙標籤。REST 請求傳送 `Accept-Language`，Nitro Mock 回傳翻譯後的商品；真實業務服務自行提供翻譯。Query 快取鍵包含語言。

主題色 AI 浮動按鈕位於 Tab 上方，開啟延遲載入的 `/ai/chat`。Member、Chat、Login、Cart、Payment、Details 隱藏入口，避免遮擋輸入與結帳。三端共用串流、停止、重新產生、複製及安全 Markdown。

繼續支援 `pnpm dev:<ui>`（Nitro Mock）及 `pnpm dev:services:<ui>`（AI 8001、Business 8002）。前端環境變數不得存放服務商金鑰。

SVG 同可選 PWA 範例亦已喺三端統一，Vant App 級 SVG 資產仍可獨立使用。NutUI 日文語系由型別化嘅 `apps/h5-nutui/src/locales/nutui-ja.ts` 補充。現有繁體中文字典保留畀自訂整合，預設選單提供上面三種產品語言。語言偏好由 Vue I18n 同 localStorage 管理，唔存入 Pinia。

NutUI 將導覽變數設喺 `.nut-navbar`，返回按鈕插槽用原生 `Left` 圖示並繼承 `currentColor`，避免套件固定灰色喺紅色頂欄上睇唔清。

## 入口整合

四個底部 Tab 負責主導覽。首頁只展示專案概覽，唔再重複放功能連結或者語言選單。會員頁本身就係個人中心：展示傳入嘅頭像/名稱、登入狀態、帳戶資訊同偏好設定，按狀態顯示登入或者登出；唔虛構資料編輯欄位或者新後端 API。語言切換只保留喺呢度。

商品列表提供購物車主入口，詳情返回列表，唔再額外放購物車捷徑。AI Chat 只保留共用浮動按鈕，首頁卡片同範例列表唔再重複跳轉。Query、Request、Mobile Web 能力、SVG、PWA 同原生元件統一由範例頁進入。結帳入面嘅返回/繼續購物屬於流程操作，會繼續保留。三端共用相同結構，各自沿用主題色。
