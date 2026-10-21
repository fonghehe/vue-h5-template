# @vh5/locales

## 1.2.0

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

- [`d02e989`](https://github.com/fonghehe/vue-h5-template/commit/d02e989250ce014f529ac5281c0d0326a5a17fc3) Thanks [@fonghehe](https://github.com/fonghehe)! - Close chat streams at finish and on scope disposal, keep clipboard feedback scoped to the latest attempt, reject invalid product detail links, reset feedback when switching products, and cancel obsolete catalog and pagination requests.

## 1.1.0

### Minor Changes

- [`f1d9bac`](https://github.com/fonghehe/vue-h5-template/commit/f1d9bac6646b4220cbd1164c3c062c569e3f2d9e) Thanks [@fonghehe](https://github.com/fonghehe)! - Share the themed mobile product experience across Vant, NutUI and Varlet. Add an AI floating entry, English-first Chinese/Japanese localization, locale-aware requests, and responsive catalog touch targets.

### Patch Changes

- [`f1d9bac`](https://github.com/fonghehe/vue-h5-template/commit/f1d9bac6646b4220cbd1164c3c062c569e3f2d9e) Thanks [@fonghehe](https://github.com/fonghehe)! - Add translated login hints that distinguish Nitro Mock from Business Service mode.
