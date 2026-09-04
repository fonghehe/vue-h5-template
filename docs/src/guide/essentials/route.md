# Routing & Navigation

Routes are handwritten in each app's `src/router/index.ts`. Runtime records—not the retained legacy `typed-router.d.ts` files—are the source of truth. There is no active file-routing plugin or generated route-name guarantee.

All apps expose `/home`, `/list`, `/member`, `/examples`; `/mine` and `/example` redirect to the canonical URLs. `/details?id=1`, `/cart`, `/payment`, `/login`, `/ai/chat` and `/examples/{query,request,mobile,svg-icons,pwa,components}` are child pages. Route names differ: Vant/Varlet retain `mine` and `example`, while NutUI uses `member` and `examples`. Use canonical paths for cross-app links.

`title` stores a translation key such as `app.home`. Layout and browser titles translate reactively. The bottom tabs appear only on the four main routes. The themed floating AI entry hides on Member, Chat, Login, Cart, Payment and Details.

All apps implement `guestOnly` login redirection. Vant additionally evaluates `requiresAuth`; NutUI and Varlet currently do not. No demo route currently sets `requiresAuth: true`. HTTP 401 handling is centralized in all apps. `authority` is a shared metadata type, not automatic role enforcement; backend authorization is still required.

Product pages do not enable `keepAlive` by default. Cart persistence and Query data caching do not require cached page instances. The optional conditional wrapper remains available, but is removed on uncached routes; it is not a persistent cross-route cache. All three layouts reset the actual `.app-content` scroll container after `route.fullPath` changes, including tab switches and browser back, rather than relying only on window `scrollBehavior`. Validate post-login redirects using `getSafeRedirect`. See [architecture](../v2/architecture.md) and [API](./api.md).
