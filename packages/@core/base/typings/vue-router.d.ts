/* eslint-disable no-restricted-imports */
import type { RouteMeta as IRouteMeta } from '@vh5-core/typings';

import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta extends IRouteMeta {}
}
