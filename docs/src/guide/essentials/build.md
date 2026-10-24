# Build & Deploy

```bash
pnpm build:vant
pnpm -F @vh5/h5-vant preview
pnpm build:docs
pnpm -F @vh5/docs preview
```

Replace `vant` with `nutui`, `varlet`, `tdesign` or `ionic` for another app. `pnpm build` orchestrates all workspace build scripts, including docs. Deploy the selected `apps/h5-<ui>/dist` as a history-mode SPA. `preview` does not start Nitro or the companion services.

Vite's dev proxy is not included in the output. Configure production `/api/ai/**` to the AI service and other `/api/**` to the business service; put the AI rule first and disable SSE buffering. Set `VITE_NITRO_MOCK=false` for production. Provider keys and JWT secrets must never be frontend env values.

`VITE_BASE` configures the asset/router base. Subdirectory deployment also needs matching host fallback rules and a review of PWA start URL, navigation fallback and root-relative app links; changing that variable alone is not a verified subpath deployment.

Optional: `VITE_PWA_ENABLED=true` adds static precaching and the SPA shell fallback; APIs are not runtime-cached. `VITE_IMAGE_OPTIMIZE=true` enables build-only image optimization (already true in Vant production config).

For a container image, package the selected app’s `dist` directory and configure the production routes above. The legacy files in `scripts/deploy` target the retired playground.

Docs output is `docs/.vitepress/dist`, base `/vue-h5-template/`. `.github/workflows/docs.yml` deploys docs on relevant `main` changes or manual dispatch. `.github/workflows/release.yml` uses Changesets; public package publication needs repository/token configuration. See [deployment details](../v2/deployment.md).
