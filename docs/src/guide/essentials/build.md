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

Nginx config template: `scripts/deploy/nginx.conf`.

## GitHub Pages Auto Deploy

The project includes a GitHub Actions workflow that automatically builds and deploys the documentation to GitHub Pages when pushing to the `main` branch.

**How to enable**: In repository Settings → Pages, set Source to **GitHub Actions**.

```yaml
# .github/workflows/docs.yml
on:
  push:
    branches: [main]
    paths: ["docs/**"]
```

Trigger condition: push to `main` with changes under `docs/**`, or manual `workflow_dispatch`.

## Environment Variables

| Variable                  | Description           |
| ------------------------- | --------------------- |
| `VITE_PORT`               | Dev server port       |
| `VITE_BASE`               | Base path             |
| `VITE_GLOB_API_URL`       | API request prefix    |
| `VITE_NITRO_MOCK`         | Enable mock service   |
| `VITE_DEVTOOLS`           | Enable DevTools       |
| `VITE_INJECT_APP_LOADING` | Inject global loading |
