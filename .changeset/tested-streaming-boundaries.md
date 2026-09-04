---
'@vh5/ai-chat': patch
'@vh5/api-client': patch
'@vh5/mobile-ui': patch
'@vh5/utils': patch
---

Fix reactive streaming updates and isolate cancelled chat requests from newer
conversations. Validate SSE chunks, handle split CRLF/UTF-8 boundaries and release
cancelled readers. Normalize Axios default timeouts and cart quantity bounds.
Fix standalone route metadata types and expand regression tests for shared UI,
requests, query caches and streaming lifecycle behavior.
