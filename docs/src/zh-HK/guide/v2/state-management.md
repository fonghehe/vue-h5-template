# State Management

Pinia 管 Token 同其他偏好等 Client State；TanStack Query 管 Cache、Retry、Pagination、Mutation 等 Server State。唔好將 Query Data 再複製入 Pinia。

表單等 Local State 用 Vue refs，串流對話由 `useStreamingChat` 管。`/examples/query` 有 Pagination、Mutation 同 Infinite Query 例子。
購物車商品、數量同選取狀態屬於 Pinia Client State；商品列表、Loading 同 Retry 等 Remote State 唔會複製入購物車 Store。

語言偏好由 Vue I18n 同 localStorage 管理，唔存入 Pinia。
