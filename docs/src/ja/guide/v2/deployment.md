# デプロイ

選択したアプリの `dist` を History Fallback 対応 SPA として配信します。実環境では `/api/ai/**` を先に `vue-h5-template-ai-service` へ、それ以外の `/api/**` を `vue-h5-template-business-service` へ proxy します。`text/event-stream` の proxy buffering と response transformation は無効にします。対象は Safari 16.4+ と Chrome 111+ です。

PWA は `VITE_PWA_ENABLED`、本番画像最適化は `VITE_IMAGE_OPTIMIZE` で切替できます。Service Worker は `/api/**` をキャッシュしません。Secret や AI Key を `VITE_*` に置かないでください。

WeChat/WeCom WebView も対象エンジンの能力が必要で、旧クライアントは保証しません。旧 Dockerfile は playground 向けです。サブパスでは PWA URL、SPA fallback、ルート相対リンクも確認します。[配信の境界](../essentials/build.md)を参照してください。
