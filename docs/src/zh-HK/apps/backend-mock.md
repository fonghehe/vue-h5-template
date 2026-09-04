# Nitro Mock 後端

`pnpm dev:<ui>` 喺 5320 啟動或重用 Nitro。單獨執行 `pnpm -F @vh5/backend-mock exec nitro dev --port 5320`。唔好當正式業務後端。

| Method | Path | Result |
| --- | --- | --- |
| POST | `/api/auth/login` | public user + accessToken |
| POST | `/api/auth/logout` | refresh cookie cleared |
| POST | `/api/auth/refresh` | access token string (legacy endpoint) |
| GET | `/api/user/info` | user; Bearer token required |
| GET | `/api/product/list?page=1&pageSize=4` | paginated products |
| GET | `/api/product/detail?id=1` | product |
| POST | `/api/product/favorite` | `{ productId, favorite }` |
| POST | `/api/ai/chat` | SSE: start / delta / finish / [DONE] |

帳號係 `user / 123456`、`admin / 123456`。登入只回傳公開資料同 token，冇密碼。access token 7 日，refresh cookie 30 日。舊 refresh 回傳 token 字串，瀏覽器未接入自動更新。

商品按 `Accept-Language` 支援英文預設、中日文；收藏只驗證同回傳，唔持久化；AI 回傳真 SSE。**冇 `/api/upload` handler 或完整上傳頁**。

兩個配套服務見[後端模式](../guide/essentials/server.md)，帳號、儲存同驗證獨立。
