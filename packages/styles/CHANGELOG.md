# @vh5/styles

## 1.0.2

### Patch Changes

- [`9bf9456`](https://github.com/fonghehe/vue-h5-template/commit/9bf9456eb439f646d9229410df58e9ae7684b03b) Thanks [@fonghehe](https://github.com/fonghehe)! - Refresh the themed catalog and cart with SVG actions, quantity steppers and a
  safe-area checkout bar. Add a localized demo payment page with method selection,
  success summary and full cart clearing, without real orders or payment requests.
  Keep the NutUI back arrow visible against the header theme and refresh shared
  SVG sprites correctly after hot module updates.
  
  Disable unnecessary Cart/Query page caching and reset each app's actual mobile
  scroll container on navigation, without clearing client or server-state caches.

## 1.0.1

### Patch Changes

- [`f1d9bac`](https://github.com/fonghehe/vue-h5-template/commit/f1d9bac6646b4220cbd1164c3c062c569e3f2d9e) Thanks [@fonghehe](https://github.com/fonghehe)! - Scope Vant navigation tokens to the component so late-loaded library styles
  cannot reset the header to white. Use the app primary color with white titles,
  icons and text actions.
