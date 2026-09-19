# Nitro Mock 后端

`pnpm dev:<ui>` 在 5320 启动或复用 Nitro。单独运行可用 `pnpm -F @vh5/backend-mock exec nitro dev --port 5320`。不要将测试数据服务当作生产业务后端。

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

Nitro 账号：`user / 123456`、`admin / 123456`。登录返回公开用户字段与 token，不返回密码。Access token 有效期 7 天，refresh cookie 30 天。旧 refresh 接口返回 token 字符串，浏览器客户端未调用，也没有自动刷新流程。

商品根据 `Accept-Language` 返回英文（默认）、中文或日文。聊天返回真实分块 SSE。当前**不存在 `/api/upload` handler**，也没有完整上传页面。

双后端接入见[后端模式](../guide/essentials/server.md)，其账号、持久化及鉴权与 Nitro fixture 独立。

## Mock 收藏保存与鉴权

Nitro 的收藏读写都校验登录，按用户 ID 保存在进程内 Map：浏览器刷新后仍在，重启 Nitro 后清空。它是开发夹具，不代表 PostgreSQL 持久化。非法 ID 返回 400，未知商品返回 404，未登录返回 401。真实 Gin/FastAPI 的校验错误与夹具不完全相同。

建议接口夹具直接返回本地化数组，不调用 Provider。严格语言校验、Request ID 和 `/api/v1` 别名应使用真实 FastAPI 验证；Mock 与浏览器通过不能证明真实数据库或模型联调已通过。
