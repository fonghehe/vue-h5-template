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
| POST | `/api/product/favorite` | `{ productId, favorite }` |
| POST | `/api/ai/chat` | SSE: start / delta / finish / [DONE] |

Nitro 账号：`user / 123456`、`admin / 123456`。登录返回公开用户字段与 token，不返回密码。Access token 有效期 7 天，refresh cookie 30 天。旧 refresh 接口返回 token 字符串，浏览器客户端未调用，也没有自动刷新流程。

商品根据 `Accept-Language` 返回英文（默认）、中文或日文。收藏接口校验并回传选择，不做持久化。聊天返回真实分块 SSE。当前**不存在 `/api/upload` handler**，也没有完整上传页面。

双后端接入见[后端模式](../guide/essentials/server.md)，其账号、持久化及鉴权与 Nitro fixture 独立。
