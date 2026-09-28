# State Management

Pinia 管 Token 同其他偏好等 Client State；TanStack Query 管 Cache、Retry、Pagination、Mutation 等 Server State。唔好將 Query Data 再複製入 Pinia。

表單等 Local State 用 Vue refs，串流對話由 `useStreamingChat` 管。`/examples/query` 有 Pagination、Mutation 同 Infinite Query 例子。
購物車商品、數量同選取狀態屬於 Pinia Client State；商品列表、Loading 同 Retry 等 Remote State 唔會複製入購物車 Store。

語言偏好由 Vue I18n 同 localStorage 管理，唔存入 Pinia。

## 商品路由與取消請求

詳情連結只接受一個正整數十進位 ID，數值要喺 JavaScript 安全整數範圍內。ID 缺漏、重複、格式錯誤或者超出範圍時會顯示返回指引，唔會發送詳情請求。同一頁面轉睇另一件商品時，會清除之前嘅「已加入購物車」提示。

目錄、分頁同無限列表 Query 會經 `getProductList(params, signal)` 將 TanStack Query 嘅 `AbortSignal` 傳到 HTTP 用戶端。切換語言、頁碼或者卸載最後一個觀察者時會取消過時請求。遲返結果唔會混入另一種語言嘅目前畫面，Cache 仍然由 Query Key 隔離。
