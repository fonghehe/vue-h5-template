# UI Framework Strategy

Vant headers use `--app-primary` with white titles, icons and text actions. Navigation tokens are scoped to `.van-nav-bar` so lazy-loaded Vant root defaults cannot reset the theme.

All three apps expose the same tabs in the same order: **Home → List → Member → Examples**, at `/home`, `/list`, `/member`, and `/examples`. Legacy `/mine` and `/example` URLs remain supported. Member is guest-accessible so language preferences do not require login; protected API requests still use centralized 401 handling.

## Shared functionality, separate themes

`packages/mobile-ui` owns framework-neutral Home, Catalog, Details, Cart, Payment, Member, Examples, Chat, Query, Request, and Mobile Web API views. App route wrappers supply framework identity and session data. REST and streaming protocols remain in `api-client` and `ai-chat`. Product queries are server state; cart quantity and selection are Pinia client state.

Each app retains native navigation and a native component showcase at `/examples/components`. NutUI navigation uses `NutTabbarItem.to`, not the `tab-switch` component-instance payload. A production build contains only its selected UI framework.

Design tokens in `packages/styles` keep Vant blue (`#1989fa`), NutUI red (`#fa2c19`), and Varlet purple (`#6750a4`). Shared product CSS uses responsive grids and is excluded from px-to-vw conversion, preserving real 44px touch targets. Rebuild the internal config after editing it: `pnpm -F @vh5/vite-config stub`.

## Language and AI entry

Pages default to English. Home and Member offer English, 简体中文 and 日本語; the choice persists under `vh5:locale`. Translate page copy, route/document titles, placeholders, and accessibility labels together. REST requests send `Accept-Language`; Nitro localizes product fixtures. Real business services are responsible for their own translated content. Query cache keys include locale.

The themed floating AI button opens the lazy `/ai/chat` route above the bottom tabs. It is hidden on Chat, Login, Cart, Payment and Details to avoid competing with input or checkout controls. Streaming, Stop, Regenerate, Copy and sanitized Markdown use the same implementation in all three apps.

Both `pnpm dev:<ui>` (Nitro Mock) and `pnpm dev:services:<ui>` (AI port 8001, Business port 8002) remain supported. No provider secret belongs in frontend environment variables.

SVG and optional PWA examples are also shared across all three apps. App-specific Vant SVG assets remain supported separately. NutUI’s missing Japanese locale is supplied by the typed `apps/h5-nutui/src/locales/nutui-ja.ts` adapter. Existing Traditional Chinese dictionaries remain available to custom integrations; the default selector exposes the three product languages above. Language preference is managed by Vue I18n and localStorage, not Pinia.

NutUI scopes navigation tokens to `.nut-navbar` and supplies a native `Left` icon in the back-button slot with `currentColor`, avoiding the library icon’s hardcoded gray on the red header.
