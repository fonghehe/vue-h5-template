import type { Linter } from 'eslint';

import { oxlintConfig } from '@vh5/oxlint-config';

import oxlint from 'eslint-plugin-oxlint';

function oxlintCompatibility(): Linter.Config[] {
  const { categories, ignorePatterns, options, overrides, plugins, rules } =
    oxlintConfig;
  const entries = oxlint.buildFromOxlintConfig({
    categories: categories && { ...categories },
    options,
    overrides,
    plugins: plugins && [...plugins],
    rules: rules && { ...rules },
  });

  // Keep ESLint active wherever Oxlint skips a file.
  return entries.map((entry) => ({
    ...entry,
    ignores: [...(entry.ignores ?? []), ...(ignorePatterns ?? [])],
  }));
}

export { oxlintCompatibility };
