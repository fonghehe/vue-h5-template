# @vh5/api-client

## 2.2.0

### Minor Changes

- [`2cbcc60`](https://github.com/fonghehe/vue-h5-template/commit/2cbcc605290d13dd0c748ce3d90ca06c7f753ac6) Thanks [@fonghehe](https://github.com/fonghehe)! - Add authenticated product favorite reads and explicit state updates, with shared
  controls that isolate account changes and prevent duplicate submissions across
  Vant, NutUI and Varlet.
  
  Load localized starter prompts from the AI service and keep translated local
  prompts available when requests fail. Synchronize the API contracts and add
  request, component and browser regression coverage.

### Patch Changes

- [`d02e989`](https://github.com/fonghehe/vue-h5-template/commit/d02e989250ce014f529ac5281c0d0326a5a17fc3) Thanks [@fonghehe](https://github.com/fonghehe)! - Close chat streams at finish and on scope disposal, keep clipboard feedback scoped to the latest attempt, reject invalid product detail links, reset feedback when switching products, and cancel obsolete catalog and pagination requests.

- [`9bf9456`](https://github.com/fonghehe/vue-h5-template/commit/9bf9456eb439f646d9229410df58e9ae7684b03b) Thanks [@fonghehe](https://github.com/fonghehe)! - Fix reactive streaming updates and isolate cancelled chat requests from newer
  conversations. Validate SSE chunks, handle split CRLF/UTF-8 boundaries and release
  cancelled readers. Normalize Axios default timeouts and cart quantity bounds.
  Fix standalone route metadata types and expand regression tests for shared UI,
  requests, query caches and streaming lifecycle behavior.

## 2.1.0

### Minor Changes

- [`f1d9bac`](https://github.com/fonghehe/vue-h5-template/commit/f1d9bac6646b4220cbd1164c3c062c569e3f2d9e) Thanks [@fonghehe](https://github.com/fonghehe)! - Share the themed mobile product experience across Vant, NutUI and Varlet. Add an AI floating entry, English-first Chinese/Japanese localization, locale-aware requests, and responsive catalog touch targets.
