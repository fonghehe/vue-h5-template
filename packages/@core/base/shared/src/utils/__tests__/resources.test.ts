import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { loadScript } from '../resources';

const testJsPath =
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';

describe('loadScript', () => {
  beforeEach(() => {
    // Happy DOM intentionally disables network script execution. These tests
    // dispatch load/error events themselves, so suppress that environment log.
    vi.spyOn(console, 'error').mockImplementation(() => {});
    // 每个测试前清空 head，保证环境干净
    document.head.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should resolve when the script loads successfully', async () => {
    const promise = loadScript(testJsPath, {
      allowedOrigins: ['https://cdnjs.cloudflare.com'],
    });

    // 此时脚本元素已被创建并插入
    const script = [...document.scripts].find(
      (item) => item.src === testJsPath,
    ) as HTMLScriptElement;
    expect(script).toBeTruthy();

    // 模拟加载成功
    script.dispatchEvent(new Event('load'));

    // 等待 promise resolve
    await expect(promise).resolves.toBeUndefined();
  });

  it('should not insert duplicate script and resolve immediately if already loaded', async () => {
    // 先手动插入一个相同 src 的 script
    const existing = document.createElement('script');
    existing.src = 'bar.js';
    document.head.append(existing);

    // 再次调用
    const promise = loadScript('bar.js');

    // 立即 resolve
    await expect(promise).resolves.toBeUndefined();

    // head 中只保留一个
    const scripts = [...document.scripts].filter(
      (script) => script.src === new URL('bar.js', document.baseURI).href,
    );
    expect(scripts).toHaveLength(1);
  });

  it('should reject when the script fails to load', async () => {
    vi.spyOn(document.head, 'append').mockImplementation((...nodes) => {
      const script = nodes[0];
      if (script instanceof HTMLScriptElement) {
        queueMicrotask(() => script.dispatchEvent(new Event('error')));
      }
    });
    const promise = loadScript('error.js');

    await expect(promise).rejects.toThrow('Failed to load script: error.js');
  });

  it('should handle multiple concurrent calls and only insert one script tag', async () => {
    const options = { allowedOrigins: ['https://cdnjs.cloudflare.com'] };
    const p1 = loadScript(testJsPath, options);
    const p2 = loadScript(testJsPath, options);

    const script = [...document.scripts].find(
      (item) => item.src === testJsPath,
    ) as HTMLScriptElement;
    expect(script).toBeTruthy();

    // 触发一次 load，两个 promise 都应该 resolve
    script.dispatchEvent(new Event('load'));

    await expect(p1).resolves.toBeUndefined();
    await expect(p2).resolves.toBeUndefined();

    // 只插入一次
    const scripts = [...document.scripts].filter(
      (item) => item.src === testJsPath,
    );
    expect(scripts).toHaveLength(1);
  });

  it('blocks cross-origin and non-HTTP script URLs by default', async () => {
    await expect(loadScript(testJsPath)).rejects.toThrow(
      'Script origin is not allowed',
    );
    await expect(loadScript('javascript:alert(1)')).rejects.toThrow(
      'Only HTTP(S) scripts can be loaded',
    );
    expect(document.scripts).toHaveLength(0);
  });
});
