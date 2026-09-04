import type { Options, ResultPromise } from 'execa';

import { execa, parseCommandString } from 'execa';

export * from './constants';
export * from './date';
export * from './fs';
export * from './git';
export { getStagedFiles, add as gitAdd } from './git';
export { generatorContentHash } from './hash';
export * from './monorepo';
export { toPosixPath } from './path';
export { prettierFormat } from './prettier';
export * from './spinner';
export type { Package } from '@manypkg/get-packages';
export { default as colors } from 'chalk';
export { consola } from 'consola';
export * from 'execa';

// execa dropped the `execaCommand` named export in v6+. Keep a compatibility
// wrapper, but parse the command into argv instead of invoking a shell. This
// preserves quoted arguments without exposing CLI input to shell expansion.
export const execaCommand = (
  command: string,
  options: Options = {},
): ResultPromise => {
  const [file, ...arguments_] = parseCommandString(command);
  if (!file) throw new Error('Command must not be empty');
  return execa(file, arguments_, options);
};

export { default as fs } from 'node:fs/promises';

export { type PackageJson, readPackageJSON } from 'pkg-types';
export { rimraf } from 'rimraf';
