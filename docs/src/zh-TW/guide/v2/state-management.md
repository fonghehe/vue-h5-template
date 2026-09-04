# 狀態管理

Pinia 管理 Token 與其他偏好等 Client State；TanStack Query 管理快取、重試、分頁、Mutation 等 Server State。不要將 Query 結果複製到 Pinia。

表單等局部狀態使用 Vue refs，串流對話由 `useStreamingChat` 管理。`/examples/query` 提供分頁、Mutation 與 Infinite Query 實例。
購物車商品行、數量與選取狀態屬於 Pinia Client State；商品列表、Loading 與 Retry 等 Remote State 不複製進購物車 Store。

語言偏好由 Vue I18n 與 localStorage 管理，不存入 Pinia。
