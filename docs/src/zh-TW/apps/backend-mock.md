# Mock 後端

基於 [Nitro](https://nitro.build/) 的 Mock 後端服務。

## 功能

- 使用者認證（登入 / 重新整理 Token / 登出）
- 商品列表和詳情
- 檔案上傳
- JWT Token 管理

## 測試帳號

| 使用者名稱 | 密碼   | 角色       |
| ---------- | ------ | ---------- |
| user       | 123456 | 一般使用者 |
| admin      | 123456 | 管理員     |

## API 介面

| 方法 | 路徑                  | 說明           |
| ---- | --------------------- | -------------- |
| POST | `/api/auth/login`     | 登入           |
| POST | `/api/auth/refresh`   | 重新整理 Token |
| GET  | `/api/user/info`      | 使用者資訊     |
| GET  | `/api/product/list`   | 商品列表       |
| GET  | `/api/product/detail` | 商品詳情       |
