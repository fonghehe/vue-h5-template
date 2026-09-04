# 狀態管理

Pinia 管 session 同 client state；TanStack Query 管商品、載入、重試、分頁同更新；Vue refs 管局部互動。聊天歸 `useStreamingChat`，語言歸 Vue I18n 同 localStorage 嘅 `vh5:locale`。

每個應用裝一個 QueryClient，`staleTime: 30_000`、`retry: 1`。`packages/mobile-ui/src/queries.ts` 提供 `useProductPage(page, pageSize)`、`useInfiniteProducts(pageSize)`，key 包含語言。Query 頁示範分頁、收藏更新同按鈕載入更多，唔係自動無限捲動。唔好將結果複製入 Pinia。

Session 位於 Vant/Varlet 嘅 `src/stores/user.ts`、NutUI 嘅 `src/store/modules/user.ts`。購物車保存所選商品快照、數量同選取狀態，冇後端同步。

`initStores` 嘅 key 係 `${namespace}-${storeId}`。預設開發用 localStorage、正式環境用 SecureLS；但目前 user/cart 都明確用 localStorage。前端加密唔能夠防止 XSS。`resetAllStores()` 唔會清 Query 快取或者語言設定。

參見[狀態邊界](../v2/state-management.md)同[API](./api.md)。
