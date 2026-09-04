import { describe, expect, it } from 'vitest';

import { ApiError, getErrorMessage, isApiError } from '../types';

describe('aPI error boundary', () => {
  it('preserves metadata and the original cause', () => {
    const cause = new Error('transport');
    const error = new ApiError('Retry later', {
      cause,
      code: 429,
      kind: 'http',
      requestId: 'trace',
      status: 429,
    });
    expect(isApiError(error)).toBe(true);
    expect(error.cause).toBe(cause);
    expect(error).toMatchObject({
      name: 'ApiError',
      code: 429,
      requestId: 'trace',
      status: 429,
    });
    expect(getErrorMessage(error)).toBe('Retry later');
  });

  it.each([
    null,
    undefined,
    'private text',
    new Error('private detail'),
    { kind: 'http', message: 'untrusted' },
  ])('uses a safe fallback for an unknown error', (error) => {
    expect(isApiError(error)).toBe(false);
    expect(getErrorMessage(error)).toBe('Request failed');
    expect(getErrorMessage(error, 'Try again')).toBe('Try again');
  });
});
