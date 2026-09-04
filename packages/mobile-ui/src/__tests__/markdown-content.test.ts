// @vitest-environment jsdom
// DOMPurify requires a supported DOM; happy-dom is not a sanitizer oracle.
import { enableAutoUnmount, mount } from '@vue/test-utils';

import { afterEach, describe, expect, it } from 'vitest';

import MarkdownContent from '../MarkdownContent.vue';

enableAutoUnmount(afterEach);

describe('markdownContent', () => {
  it('renders Markdown and fenced code while removing executable HTML', () => {
    const wrapper = mount(MarkdownContent, {
      props: {
        content: [
          '# Hello',
          '**Vue**',
          '```ts\nconst app = "safe";\n```',
          '<script>alert(1)</script>',
          '<img src="x" onerror="alert(1)">',
          '[unsafe](javascript:alert(1))',
          '<iframe src="https://evil.example"></iframe>',
          '<svg onload="alert(1)"></svg>',
        ].join('\n\n'),
      },
    });
    expect(wrapper.get('h1').text()).toBe('Hello');
    expect(wrapper.get('strong').text()).toBe('Vue');
    expect(wrapper.get('pre code').text()).toContain('const app = "safe";');
    expect(
      wrapper
        .find('script, iframe, svg, [onerror], [onload], [href^="javascript:"]')
        .exists(),
    ).toBe(false);
  });

  it('sanitizes every streaming update and keeps ordinary links', async () => {
    const wrapper = mount(MarkdownContent, { props: { content: 'Loading' } });
    await wrapper.setProps({
      content: '[Vue](https://vuejs.org) <img src="x" onerror="alert(1)">',
    });
    expect(wrapper.get('a').attributes('href')).toBe('https://vuejs.org');
    expect(wrapper.find('[onerror]').exists()).toBe(false);
    expect(wrapper.text()).not.toContain('Loading');
  });
});
