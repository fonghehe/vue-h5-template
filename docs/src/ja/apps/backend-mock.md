# Mock サーバー

Nitro ベースの Mock バックエンド、開発時に H5 アプリ向けの API シミュレーションを提供します。

## 起動

Mock サーバーは `nitro-mock` Vite プラグイン経由で `http://localhost:5320` に自動起動します。

手動起動：

```bash
cd apps/backend-mock
pnpm start
```

## API エンドポイント

### 認証

| メソッド | パス                | 説明                            |
| -------- | ------------------- | ------------------------------- |
| POST     | `/api/auth/login`   | ログイン、accessToken を返却    |
| POST     | `/api/auth/logout`  | ログアウト、refreshToken を削除 |
| POST     | `/api/auth/refresh` | accessToken を更新              |

### ユーザー

| メソッド | パス             | 説明                                  |
| -------- | ---------------- | ------------------------------------- |
| GET      | `/api/user/info` | ユーザー情報取得（Bearer Token 必要） |

### 商品

| メソッド | パス                  | 説明                                     |
| -------- | --------------------- | ---------------------------------------- |
| GET      | `/api/product/list`   | 商品リスト（`?page=1&pageSize=10` 対応） |
| GET      | `/api/product/detail` | 商品詳細（`?id=1`）                      |

### アップロード

| メソッド | パス          | 説明                                      |
| -------- | ------------- | ----------------------------------------- |
| POST     | `/api/upload` | ファイルアップロード（モック URL を返却） |

## テストアカウント

| ユーザー名 | パスワード | 役割         |
| ---------- | ---------- | ------------ |
| user       | 123456     | 一般ユーザー |
| admin      | 123456     | 管理者       |

## ログインリクエスト例

```bash
curl -X POST http://localhost:5320/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"123456"}'
```

レスポンス：

```json
{
  "code": 0,
  "data": {
    "id": 0,
    "realName": "テストユーザー",
    "avatar": "...",
    "roles": ["user"],
    "username": "user",
    "accessToken": "eyJhbGciOiJIUzI1NiI..."
  },
  "message": "ok"
}
```

## JWT 認証

- Access Token 有効期限：7日間
- Refresh Token 有効期限：30日間（HttpOnly Cookie に保存）
