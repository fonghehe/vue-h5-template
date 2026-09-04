import { describe, expect, it } from 'vitest';

import { getSafeRedirect } from '../safe-redirect';

describe('getSafeRedirect', () => {
  it('keeps local paths with query and hash', () => {
    expect(getSafeRedirect('/mine?tab=profile#bio')).toBe(
      '/mine?tab=profile#bio',
    );
  });

  it.each([
    'https://evil.example',
    '//evil.example/path',
    String.raw`/\evil.example`,
  ])('rejects unsafe redirect %s', (redirect) =>
    expect(getSafeRedirect(redirect)).toBe('/home'),
  );
});
