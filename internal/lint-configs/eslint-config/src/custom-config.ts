import type { Linter } from 'eslint';

const restrictedImportIgnores = ['**/vite.config.mts'];

const customConfig: Linter.Config[] = [
  // shadcn-ui 内部组件是自动生成的，不做太多限制
  {
    files: ['packages/@core/ui-kit/shadcn-ui/**/**'],
    rules: {
      'vue/require-default-prop': 'off',
    },
  },
  {
    files: [
      'apps/**/**',
      'packages/effects/**/**',
      'packages/utils/**/**',
      'packages/types/**/**',
      'packages/locales/**/**',
    ],
    ignores: restrictedImportIgnores,
    rules: {
      'perfectionist/sort-interfaces': 'off',
    },
  },
  {
    // apps内部的一些基础规则
    files: ['apps/**/**'],
    ignores: restrictedImportIgnores,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['#/api/*'],
              message:
                'The #/api package cannot be imported, please use the @core package itself',
            },
            {
              group: ['#/layouts/*'],
              message:
                'The #/layouts package cannot be imported, please use the @core package itself',
            },
            {
              group: ['#/locales/*'],
              message:
                'The #/locales package cannot be imported, please use the @core package itself',
            },
            {
              group: ['#/stores/*'],
              message:
                'The #/stores package cannot be imported, please use the @core package itself',
            },
          ],
        },
      ],
    },
  },
  {
    // @core内部组件，不能引入@vh5/* 里面的包
    files: ['packages/@core/**/**'],
    ignores: restrictedImportIgnores,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@vh5/*'],
              message:
                'The @core package cannot import the @vh5 package, please use the @core package itself',
            },
          ],
        },
      ],
    },
  },
  {
    // @core/shared内部组件，不能引入@vh5/* 或者 @vh5-core/* 里面的包
    files: ['packages/@core/base/**/**'],
    ignores: restrictedImportIgnores,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@vh5/*', '@vh5-core/*'],
              message:
                'The @vh5-core/shared package cannot import the @vh5 package, please use the @core/shared package itself',
            },
          ],
        },
      ],
    },
  },

  {
    // 不能引入@vh5/*里面的包
    files: [
      'packages/types/**/**',
      'packages/utils/**/**',
      'packages/icons/**/**',
      'packages/constants/**/**',
      'packages/styles/**/**',
      'packages/stores/**/**',
      'packages/preferences/**/**',
      'packages/locales/**/**',
    ],
    ignores: restrictedImportIgnores,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@vh5/*'],
              message:
                'The @vh5 package cannot be imported, please use the @core package itself',
            },
          ],
        },
      ],
    },
  },
  // 后端模拟代码，不需要太多规则
  {
    files: ['apps/backend-mock/**/**', 'docs/**/**'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/**/playwright.config.ts'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['internal/**/**', 'scripts/**/**'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['packages/@core/base/shared/src/utils/inference.ts'],
    rules: {
      'vue/prefer-import-from-vue': 'off',
    },
  },
];

export { customConfig };
