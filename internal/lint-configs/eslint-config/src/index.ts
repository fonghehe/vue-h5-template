import type { Linter } from 'eslint';

import {
  ignores,
  javascript,
  jsonc,
  node,
  oxlintCompatibility,
  perfectionist,
  pnpm,
  typescript,
  vue,
  yaml,
} from './configs';
import { customConfig } from './custom-config';

type FlatConfig = Linter.Config;

type FlatConfigPromise =
  | FlatConfig
  | FlatConfig[]
  | Promise<FlatConfig>
  | Promise<FlatConfig[]>;

async function defineConfig(config: FlatConfig[] = []) {
  const configs: FlatConfigPromise[] = [
    vue(),
    javascript(),
    ignores(),
    typescript(),
    jsonc(),
    node(),
    perfectionist(),
    yaml(),
    pnpm(),
    ...oxlintCompatibility(),
    ...customConfig,
    ...config,
  ];

  const resolved = await Promise.all(
    configs.map((config) => Promise.resolve(config)),
  );

  return resolved.flat();
}

export { defineConfig };
