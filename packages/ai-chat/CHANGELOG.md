# @vh5/ai-chat

## 2.0.1

### Patch Changes

- [`d02e989`](https://github.com/fonghehe/vue-h5-template/commit/d02e989250ce014f529ac5281c0d0326a5a17fc3) Thanks [@fonghehe](https://github.com/fonghehe)! - Close chat streams at finish and on scope disposal, keep clipboard feedback scoped to the latest attempt, reject invalid product detail links, reset feedback when switching products, and cancel obsolete catalog and pagination requests.

- [`9bf9456`](https://github.com/fonghehe/vue-h5-template/commit/9bf9456eb439f646d9229410df58e9ae7684b03b) Thanks [@fonghehe](https://github.com/fonghehe)! - Fix reactive streaming updates and isolate cancelled chat requests from newer
  conversations. Validate SSE chunks, handle split CRLF/UTF-8 boundaries and release
  cancelled readers. Normalize Axios default timeouts and cart quantity bounds.
  Fix standalone route metadata types and expand regression tests for shared UI,
  requests, query caches and streaming lifecycle behavior.
