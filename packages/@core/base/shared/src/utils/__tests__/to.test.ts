import { describe, expect, it } from 'vitest';

import { to } from '../to';

describe('promise result tuple', () => {
  it('preserves successful values, including falsy values', async () => {
    await expect(to(Promise.resolve(0))).resolves.toEqual([null, 0]);
    await expect(to(Promise.resolve(undefined))).resolves.toEqual([
      null,
      undefined,
    ]);
  });

  it('preserves the rejected error identity', async () => {
    const failure = new Error('offline');
    const [error, value] = await to(Promise.reject(failure));
    expect(error).toBe(failure);
    expect(value).toBeUndefined();
  });

  it('adds caller metadata without mutating the original rejection', async () => {
    const failure = Object.assign(new Error('Request failed'), { code: 42 });
    const [error] = await to<never, { code: number; requestId: string }>(
      Promise.reject(failure),
      { requestId: 'trace' },
    );
    expect(error).toEqual({ code: 42, requestId: 'trace' });
    expect(failure).toMatchObject({ code: 42 });
    expect(failure).not.toHaveProperty('requestId');
  });
});
