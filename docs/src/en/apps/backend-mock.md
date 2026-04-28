# Mock Server

Nitro-based mock backend providing API simulation for H5 apps during development.

## Start

The mock server auto-starts at `http://localhost:5320` via the `nitro-mock` Vite plugin.

Manual start:

```bash
cd apps/backend-mock
pnpm start
```

## API Endpoints

### Authentication

| Method | Path                | Description                 |
| ------ | ------------------- | --------------------------- |
| POST   | `/api/auth/login`   | Login, returns accessToken  |
| POST   | `/api/auth/logout`  | Logout, clears refreshToken |
| POST   | `/api/auth/refresh` | Refresh accessToken         |

### User

| Method | Path             | Description                           |
| ------ | ---------------- | ------------------------------------- |
| GET    | `/api/user/info` | Get user info (requires Bearer Token) |

### Products

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/product/list` | Product list (supports `?page=1&pageSize=10`) |
| GET | `/api/product/detail` | Product detail (`?id=1`) |

### Upload

| Method | Path          | Description                    |
| ------ | ------------- | ------------------------------ |
| POST   | `/api/upload` | File upload (returns mock URL) |

## Test Accounts

| Username | Password | Role         |
| -------- | -------- | ------------ |
| user     | 123456   | Regular user |
| admin    | 123456   | Admin        |

## JWT Authentication

- Access Token validity: 7 days
- Refresh Token validity: 30 days (stored in HttpOnly Cookie)
