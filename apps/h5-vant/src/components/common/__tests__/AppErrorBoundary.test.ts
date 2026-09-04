import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick } from 'vue';

import { describe, expect, it, vi } from 'vitest';

import AppErrorBoundary from '../AppErrorBoundary.vue';

describe('app error boundary', () => {
  it('shows a safe fallback and can remount its child', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    let shouldThrow = true;
    const ThrowOnce = defineComponent({
      setup() {
        if (shouldThrow) {
          shouldThrow = false;
          throw new Error('render failed');
        }
        return () => h('p', 'Recovered content');
      },
    });

    const wrapper = mount(AppErrorBoundary, {
      slots: { default: ThrowOnce },
    });
    await nextTick();

    expect(wrapper.get('[role="alert"]').text()).toContain(
      'Something went wrong',
    );
    await wrapper.get('button').trigger('click');
    await nextTick();
    expect(wrapper.text()).toContain('Recovered content');

    consoleError.mockRestore();
  });
});
