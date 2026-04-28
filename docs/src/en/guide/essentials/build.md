# Build & Deploy

## Build

```bash
pnpm build           # Build all apps
pnpm build:nutui     # Build NutUI version
pnpm build:vant      # Build Vant version
pnpm build:varlet    # Build Varlet version
```

Output in each app's `dist/` directory.

## Preview

```bash
cd apps/h5-nutui
pnpm preview
```

## Docker

```bash
docker build -f scripts/deploy/Dockerfile -t vue-h5-template .
```

Nginx config template: `scripts/deploy/nginx.conf`

## Environment Variables

| Variable                  | Description            |
| ------------------------- | ---------------------- |
| `VITE_PORT`               | Dev server port        |
| `VITE_BASE`               | Base path              |
| `VITE_GLOB_API_URL`       | API request prefix     |
| `VITE_NITRO_MOCK`         | Enable mock service    |
| `VITE_DEVTOOLS`           | Enable DevTools        |
| `VITE_INJECT_APP_LOADING` | Inject global loading  |
