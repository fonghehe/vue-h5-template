# 狀態管理

Pinia 管工作階段與客戶端狀態；TanStack Query 管商品、載入、重試、分頁與更新；Vue refs 管局部互動。聊天歸 `useStreamingChat`，語言歸 Vue I18n 與 localStorage 的 `vh5:locale`。

每個應用安裝一個 QueryClient，`staleTime: 30_000`、`retry: 1`。`packages/mobile-ui/src/queries.ts` 提供 `useProductPage(page, pageSize)`、`useInfiniteProducts(pageSize)`，鍵包含語言。Query 頁示範分頁、收藏更新與按鈕載入更多，不是自動無限捲動。不要將結果複製到 Pinia。

工作階段位於 Vant/Varlet 的 `src/stores/user.ts`、NutUI 的 `src/store/modules/user.ts`。購物車保存所選商品快照、數量與選取狀態，沒有後端同步。

`initStores` 的鍵為 `${namespace}-${storeId}`。預設開發使用 localStorage，正式環境使用 SecureLS；但目前 user/cart 均明確指定 localStorage。前端加密不能防止 XSS。`resetAllStores()` 不會清除 Query 快取或語言設定。

參見[狀態邊界](../v2/state-management.md)與[API](./api.md)。
