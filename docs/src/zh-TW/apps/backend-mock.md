# Mock 服務

基於 [Nitro](https://nitro.unjs.io/) 的 Mock 後端服務，為 H5 應用提供開發時的接口模擬。

## 啟動

Mock 服務透過 Vite 外掛件 `nitro-mock` 自動啟動在 `http://localhost:5320`。

也可手動啟動：

```bash
cd apps/backend-mock
pnpm start
```

## API 介面

### 認證

| 方法 | 路徑                | 說明                    |
| ---- | ------------------- | ----------------------- |
| POST | `/api/auth/login`   | 登入，返回 accessToken  |
| POST | `/api/auth/logout`  | 登出，清除 refreshToken |
| POST | `/api/auth/refresh` | 重新整理 accessToken    |

### 使用者

| 方法 | 路徑             | 說明                              |
| ---- | ---------------- | --------------------------------- |
| GET  | `/api/user/info` | 取得使用者資訊（需 Bearer Token） |

### 商品

| 方法 | 路徑                  | 說明                                       |
| ---- | --------------------- | ------------------------------------------ |
| GET  | `/api/product/list`   | 商品列表（支援分頁 `?page=1&pageSize=10`） |
| GET  | `/api/product/detail` | 商品詳情（`?id=1`）                        |

### 上傳

| 方法 | 路徑          | 說明                     |
| ---- | ------------- | ------------------------ |
| POST | `/api/upload` | 檔案上傳（返回模擬 URL） |

## 測試帳號

| 使用者名稱 | 密碼   | 角色       |
| ---------- | ------ | ---------- |
| user       | 123456 | 一般使用者 |
| admin      | 123456 | 管理員     |

## 登入請求範例

```bash
curl -X POST http://localhost:5320/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"123456"}'
```

回應：

```json
{
  "code": 0,
  "data": {
    "id": 0,
    "realName": "測試使用者",
    "avatar": "...",
    "roles": ["user"],
    "username": "user",
    "accessToken": "eyJhbGciOiJIUzI1NiI..."
  },
  "message": "ok"
}
```

## JWT 認證

- Access Token 有效期：7 天
- Refresh Token 有效期：30 天（儲存在 HttpOnly Cookie 中）
