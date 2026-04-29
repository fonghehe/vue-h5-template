# Mock 服务

基于 [Nitro](https://nitro.unjs.io/) 的 Mock 后端服务，为 H5 应用提供开发时的接口模拟。

## 启动

Mock 服务通过 Vite 插件 `nitro-mock` 自动启动在 `http://localhost:5320`。

也可以手动启动：

```bash
cd apps/backend-mock
pnpm start
```

## API 接口

### 认证

| 方法 | 路径                | 说明                    |
| ---- | ------------------- | ----------------------- |
| POST | `/api/auth/login`   | 登录，返回 accessToken  |
| POST | `/api/auth/logout`  | 登出，清除 refreshToken |
| POST | `/api/auth/refresh` | 刷新 accessToken        |

### 用户

| 方法 | 路径             | 说明                            |
| ---- | ---------------- | ------------------------------- |
| GET  | `/api/user/info` | 获取用户信息（需 Bearer Token） |

### 商品

| 方法 | 路径                  | 说明                                       |
| ---- | --------------------- | ------------------------------------------ |
| GET  | `/api/product/list`   | 商品列表（支持分页 `?page=1&pageSize=10`） |
| GET  | `/api/product/detail` | 商品详情（`?id=1`）                        |

### 上传

| 方法 | 路径          | 说明                     |
| ---- | ------------- | ------------------------ |
| POST | `/api/upload` | 文件上传（返回模拟 URL） |

## 测试账号

| 用户名 | 密码   | 角色     |
| ------ | ------ | -------- |
| user   | 123456 | 普通用户 |
| admin  | 123456 | 管理员   |

## 登录请求示例

```bash
curl -X POST http://localhost:5320/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"123456"}'
```

响应：

```json
{
  "code": 0,
  "data": {
    "id": 0,
    "realName": "测试用户",
    "avatar": "...",
    "roles": ["user"],
    "username": "user",
    "accessToken": "eyJhbGciOiJIUzI1NiI..."
  },
  "message": "ok"
}
```

## JWT 认证

- Access Token 有效期：7 天
- Refresh Token 有效期：30 天（存储在 HttpOnly Cookie 中）
