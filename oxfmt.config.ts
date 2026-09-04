import { defineConfig } from '@vh5/oxfmt-config';

export default defineConfig({
  ignorePatterns: [
    'dist',
    'dev-dist',
    '.local',
    '.claude',
    '.agent',
    '.agents',
    '.codex',
    '.output.js',
    'node_modules',
    '.nvmrc',
    'coverage',
    'CODEOWNERS',
    '.nitro',
    '.output',
    '**/*.svg',
    '**/*.sh',
    '**/*.md',
    'public',
    '.npmrc',
    '*-lock.yaml',
    'skills-lock.json',

    // 自动生成文件

    '**/types/**/*.d.ts',
    '**/auto-imports.d.ts',
    '**/components.d.ts',
    '**/typed-router.d.ts',
  ],
});
