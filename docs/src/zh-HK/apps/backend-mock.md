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
| GET | `/api/product/favorite?id=1` | Bearer; `{ productId, favorite }` |
| POST | `/api/product/favorite` | Bearer; `{ productId, favorite }` |
| GET | `/api/ai/suggestions?locale=en-US` | `string[]` |
| POST | `/api/ai/chat` | SSE: start / delta / finish / [DONE] |

帳號係 `user / 123456`、`admin / 123456`。登入只回傳公開資料同 token，冇密碼。access token 7 日，refresh cookie 30 日。舊 refresh 回傳 token 字串，瀏覽器未接入自動更新。

商品按 `Accept-Language` 支援英文預設、中日文；AI 回傳真 SSE。**冇 `/api/upload` handler 或完整上傳頁**。

兩個配套服務見[後端模式](../guide/essentials/server.md)，帳號、儲存同驗證獨立。

## Mock 收藏儲存與驗證

Nitro 的收藏讀寫均驗證登入，依使用者 ID 儲存在處理程序內 Map：重新整理瀏覽器後仍在，重啟 Nitro 後清空。這是開發用資料，不代表 PostgreSQL 持久化。無效 ID 回傳 400、未知商品回傳 404、未登入回傳 401；實際服務的驗證錯誤可能不同。

建議 Mock 直接回傳本地化陣列，不呼叫 Provider。嚴格語言驗證、Request ID 與 `/api/v1` 別名應以實際 FastAPI 驗證；Mock／瀏覽器成功不代表實際資料庫或模型整合成功。
