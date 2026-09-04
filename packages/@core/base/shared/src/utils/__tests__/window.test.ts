import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { openWindow } from '../window';

describe('openWindow', () => {
  // 保存原始的 window.open 函数
  let originalOpen: typeof window.open;

  beforeEach(() => {
    originalOpen = window.open;
  });

  afterEach(() => {
    window.open = originalOpen;
  });

  it('should call window.open with correct arguments', () => {
    const url = 'https://example.com';
    const options = { noopener: true, noreferrer: true, target: '_blank' };

    window.open = vi.fn();

    // 调用函数
    openWindow(url, options);

    // 验证 window.open 是否被正确地调用
    expect(window.open).toHaveBeenCalledWith(
      new URL(url).href,
      options.target,
      'noopener=yes,noreferrer=yes',
    );
  });

  it('resolves relative application URLs before opening them', () => {
    window.open = vi.fn();

    openWindow('/account');

    expect(window.open).toHaveBeenCalledWith(
      new URL('/account', window.location.href).href,
      '_blank',
      'noopener=yes,noreferrer=yes',
    );
  });

  it('rejects executable URL schemes', () => {
    window.open = vi.fn();

    expect(() => openWindow('javascript:alert(1)')).toThrow(TypeError);
    expect(window.open).not.toHaveBeenCalled();
  });
});
