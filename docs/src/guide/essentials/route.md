# Routing & Navigation

Routes are handwritten in each app's `src/router/index.ts`. Runtime records—not the retained legacy `typed-router.d.ts` files—are the source of truth. There is no active file-routing plugin or generated route-name guarantee.

All apps expose `/home`, `/list`, `/member`, `/examples`; `/mine` and `/example` redirect to the canonical URLs. `/details?id=1`, `/cart`, `/login`, `/ai/chat` and `/examples/{query,request,mobile,svg-icons,pwa,components}` are child pages. Route names differ: Vant/Varlet retain `mine` and `example`, while NutUI uses `member` and `examples`. Use canonical paths for cross-app links.

`title` stores a translation key such as `app.home`. Layout and browser titles translate reactively. The bottom tabs appear only on the four main routes. The themed floating AI entry hides on Chat, Login, Cart and Details.

All apps implement `guestOnly` login redirection. Vant additionally evaluates `requiresAuth`; NutUI and Varlet currently do not. No demo route currently sets `requiresAuth: true`. HTTP 401 handling is centralized in all apps. `authority` is a shared metadata type, not automatic role enforcement; backend authorization is still required.

All layouts conditionally wrap the current route using `keepAlive`. Leaving for an uncached route removes that wrapper; this is not a persistent cross-route cache. Validate post-login redirects using `getSafeRedirect`. See [architecture](../v2/architecture.md) and [API](./api.md).
