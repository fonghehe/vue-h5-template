---
'@vh5/stores': patch
'@vh5/api-client': patch
'@vh5-core/composables': patch
'@vh5/mobile-ui': patch
---

Share a session store factory with application-injected API adapters, preserving
foundation package dependency boundaries. Prevent obsolete profile,
login, logout and unauthorized responses from changing a newer session. Expose
request cancellation as an aborted ApiError and cancel the request example on
navigation. Reset cancelled pull gestures, prevent duplicate refreshes, and
preserve IME input with visible keyboard focus in the shared chat composer.
