# 狀態管理

Pinia 管理 Token 與其他偏好等 Client State；TanStack Query 管理快取、重試、分頁、Mutation 等 Server State。不要將 Query 結果複製到 Pinia。

表單等局部狀態使用 Vue refs，串流對話由 `useStreamingChat` 管理。`/examples/query` 提供分頁、Mutation 與 Infinite Query 實例。
購物車商品行、數量與選取狀態屬於 Pinia Client State；商品列表、Loading 與 Retry 等 Remote State 不複製進購物車 Store。

語言偏好由 Vue I18n 與 localStorage 管理，不存入 Pinia。

## 商品路由與請求取消

詳情連結只接受單一正整數十進位 ID，數值必須在 JavaScript 安全整數範圍內。ID 缺漏、重複、格式錯誤或超出範圍時會顯示恢復指引，不發送詳情請求。同一頁面改看其他商品時，會清除先前的「已加入購物車」提示。

目錄、分頁與無限列表 Query 會透過 `getProductList(params, signal)`，將 TanStack Query 的 `AbortSignal` 傳給 HTTP 用戶端。切換語言、頁碼或卸載最後一個觀察者時會取消過時請求。延遲結果不會混入其他語言的目前畫面，快取仍以 Query Key 隔離。

## 工作階段與請求生命週期

各應用程式透過 `@vh5/stores/user` 的 `defineUserStore` 建立工作階段 store，注入具明確型別的 API 函式、登入回應映射及取消錯誤工廠。stores 套件只依賴底層基礎能力，不匯入 `@vh5/api-client` 或產生的後端契約。只持久化權杖與身分快照，請求控制器及版本保護不放入 Pinia 狀態。過期登入結果不能恢復已清除的工作階段，切換工作階段或銷毀 store 會取消個人資料請求，舊登出請求不能清除新登入。遠端快取仍由 TanStack Query 管理。

Query 範例與商品詳情共用 `FavoriteButton`。應用包裝頁傳入目前工作階段，私有讀取、寫入與延遲回應按工作階段隔離；訪客看到登入入口。
