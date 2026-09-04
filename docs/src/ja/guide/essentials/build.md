# ビルドとデプロイ

```bash
pnpm build:vant
pnpm -F @vh5/h5-vant preview
pnpm build:docs
pnpm -F @vh5/docs preview
```

別アプリは `vant` を `nutui` / `varlet` に変更します。全 build は docs を含む workspace を実行。`apps/h5-<ui>/dist` を history SPA として配信します。preview は Nitro や別サービスを起動しません。

本番に Vite proxy はありません。`/api/ai/**` を先に AI、残り `/api/**` を業務サービスへ転送し SSE buffering を無効にします。`VITE_NITRO_MOCK=false` を設定し、秘密鍵をフロントに置かないでください。

`VITE_BASE` だけでサブパス配信は保証されません。ホストの fallback、PWA start URL、ナビゲーション fallback、ルート相対リンクも確認が必要です。

PWA は `VITE_PWA_ENABLED=true`、静的 precache と SPA fallback のみで API cache はありません。画像最適化は build 時の `VITE_IMAGE_OPTIMIZE=true`、Vant 本番設定は有効です。

既存 Dockerfile は H5 ではなく **playground/dist** をコピーし、Nginx は 2 バックエンドを接続しません。利用前に両方を調整してください。

docs 成果物は `docs/.vitepress/dist`、base は `/vue-h5-template/`。docs workflow は main の対象変更または手動で公開。release workflow は Changesets で、公開には token 等の設定が必要です。[詳細](../v2/deployment.md)も参照してください。
