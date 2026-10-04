import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';

import { customConfig } from '../custom-config';

describe('workspace dependency boundaries', () => {
  // Exercise the shared boundary rules without loading unrelated format/type plugins.
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: [
      { files: ['**/*.ts'] },
      ...customConfig.filter(
        (config) => config.rules?.['no-restricted-imports'],
      ),
    ],
  });
  it.each([
    ['apps/h5-vant/src/stores/user.ts', '@vh5/api-client', false],
    ['packages/mobile-ui/src/queries.ts', '@vh5/api-client', false],
    ['packages/stores/src/user.ts', '@vh5/api-client', true],
    ['packages/stores/src/__tests__/user.test.ts', '@vh5/api-client', true],
    ['packages/stores/src/user.ts', '@vh5/mobile-ui/ChatPage.vue', true],
    ['packages/@core/composables/src/index.ts', '@vh5/api-client', true],
    ['packages/locales/src/index.ts', '@vh5/api-client', true],
  ])('%s restricts %s: %s', async (filePath, source, restricted) => {
    const results = await eslint.lintText(`import '${source}';\n`, {
      filePath,
    });
    const violations = results
      .flatMap((result) => result.messages)
      .filter((message) => message.ruleId === 'no-restricted-imports');
    expect(violations.length > 0).toBe(restricted);
  });
});
