# @vh5/mobile-ui

## 2.2.0

### Minor Changes

- [`2cbcc60`](https://github.com/fonghehe/vue-h5-template/commit/2cbcc605290d13dd0c748ce3d90ca06c7f753ac6) Thanks [@fonghehe](https://github.com/fonghehe)! - Add authenticated product favorite reads and explicit state updates, with shared
  controls that isolate account changes and prevent duplicate submissions across
  Vant, NutUI and Varlet.
  
  Load localized starter prompts from the AI service and keep translated local
  prompts available when requests fail. Synchronize the API contracts and add
  request, component and browser regression coverage.

- [`541f90c`](https://github.com/fonghehe/vue-h5-template/commit/541f90caa45be337339aced1beeafd0a666b4ce6) Thanks [@fonghehe](https://github.com/fonghehe)! - Consolidate navigation across all three apps. Keep Home informational, AI Chat
  in its floating entry, cart access in the catalog, and technical demos in Examples.
  Turn Member into a personal center with account details and the sole language
  selector, removing unrelated shortcuts without removing the underlying features.

- [`9bf9456`](https://github.com/fonghehe/vue-h5-template/commit/9bf9456eb439f646d9229410df58e9ae7684b03b) Thanks [@fonghehe](https://github.com/fonghehe)! - Refresh the themed catalog and cart with SVG actions, quantity steppers and a
  safe-area checkout bar. Add a localized demo payment page with method selection,
  success summary and full cart clearing, without real orders or payment requests.
  Keep the NutUI back arrow visible against the header theme and refresh shared
  SVG sprites correctly after hot module updates.
  
  Disable unnecessary Cart/Query page caching and reset each app's actual mobile
  scroll container on navigation, without clearing client or server-state caches.

### Patch Changes

- [`541f90c`](https://github.com/fonghehe/vue-h5-template/commit/541f90caa45be337339aced1beeafd0a666b4ce6) Thanks [@fonghehe](https://github.com/fonghehe)! - Use a compact 20px content bottom gap instead of blanket 90/190px padding.
  Reserve the measured checkout bar height only while the bar is mounted, and
  let in-flow tabs or checkout bars own their bottom safe area without duplication.

- [`d02e989`](https://github.com/fonghehe/vue-h5-template/commit/d02e989250ce014f529ac5281c0d0326a5a17fc3) Thanks [@fonghehe](https://github.com/fonghehe)! - Close chat streams at finish and on scope disposal, keep clipboard feedback scoped to the latest attempt, reject invalid product detail links, reset feedback when switching products, and cancel obsolete catalog and pagination requests.

- [`9bf9456`](https://github.com/fonghehe/vue-h5-template/commit/9bf9456eb439f646d9229410df58e9ae7684b03b) Thanks [@fonghehe](https://github.com/fonghehe)! - Fix reactive streaming updates and isolate cancelled chat requests from newer
  conversations. Validate SSE chunks, handle split CRLF/UTF-8 boundaries and release
  cancelled readers. Normalize Axios default timeouts and cart quantity bounds.
  Fix standalone route metadata types and expand regression tests for shared UI,
  requests, query caches and streaming lifecycle behavior.
- Updated dependencies [[`2cbcc60`](https://github.com/fonghehe/vue-h5-template/commit/2cbcc605290d13dd0c748ce3d90ca06c7f753ac6), [`541f90c`](https://github.com/fonghehe/vue-h5-template/commit/541f90caa45be337339aced1beeafd0a666b4ce6), [`9bf9456`](https://github.com/fonghehe/vue-h5-template/commit/9bf9456eb439f646d9229410df58e9ae7684b03b), [`d02e989`](https://github.com/fonghehe/vue-h5-template/commit/d02e989250ce014f529ac5281c0d0326a5a17fc3), [`9bf9456`](https://github.com/fonghehe/vue-h5-template/commit/9bf9456eb439f646d9229410df58e9ae7684b03b)]:
  - @vh5/api-client@2.2.0
  - @vh5/locales@1.2.0
  - @vh5/ai-chat@2.0.1

## 2.1.0

### Minor Changes

- [`f1d9bac`](https://github.com/fonghehe/vue-h5-template/commit/f1d9bac6646b4220cbd1164c3c062c569e3f2d9e) Thanks [@fonghehe](https://github.com/fonghehe)! - Share the themed mobile product experience across Vant, NutUI and Varlet. Add an AI floating entry, English-first Chinese/Japanese localization, locale-aware requests, and responsive catalog touch targets.

### Patch Changes

- [`f1d9bac`](https://github.com/fonghehe/vue-h5-template/commit/f1d9bac6646b4220cbd1164c3c062c569e3f2d9e) Thanks [@fonghehe](https://github.com/fonghehe)! - Include the persisted-state Pinia type augmentation in the cart module so the
  shared package type-checks independently of application bootstrap imports.
  Add standalone type-check commands for shared UI, API, AI and Vite configuration.
- Updated dependencies [[`f1d9bac`](https://github.com/fonghehe/vue-h5-template/commit/f1d9bac6646b4220cbd1164c3c062c569e3f2d9e), [`f1d9bac`](https://github.com/fonghehe/vue-h5-template/commit/f1d9bac6646b4220cbd1164c3c062c569e3f2d9e)]:
  - @vh5/locales@1.1.0
  - @vh5/api-client@2.1.0
