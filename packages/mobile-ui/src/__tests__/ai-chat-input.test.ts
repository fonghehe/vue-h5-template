import { enableAutoUnmount, mount } from '@vue/test-utils';

import { afterEach, describe, expect, it, vi } from 'vitest';

import AiChatInput from '../AiChatInput.vue';

vi.mock('@vh5/locales', () => ({ $t: (key: string) => key }));
enableAutoUnmount(afterEach);

describe('shared chat composer', () => {
  it('does not send while an IME confirms text using legacy keyCode 229', async () => {
    const wrapper = mount(AiChatInput, { props: { modelValue: '你好' } });
    await wrapper
      .get('textarea')
      .trigger('keydown', { key: 'Enter', keyCode: 229 });
    expect(wrapper.emitted('send')).toBeUndefined();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('preserves Shift+Enter and composition, then sends trimmed content on Enter', async () => {
    const wrapper = mount(AiChatInput, { props: { modelValue: ' Hello ' } });
    const input = wrapper.get('textarea');
    await input.trigger('keydown', { key: 'Enter', shiftKey: true });
    await input.trigger('keydown', { key: 'Enter', isComposing: true });
    expect(wrapper.emitted('send')).toBeUndefined();
    await input.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('send')).toEqual([['Hello']]);
    expect(wrapper.emitted('update:modelValue')).toEqual([['']]);
  });

  it('keeps a draft during streaming and exposes stop instead of sending again', async () => {
    const wrapper = mount(AiChatInput, {
      props: { modelValue: 'Next question', streaming: true },
    });
    await wrapper.get('textarea').trigger('keydown', { key: 'Enter' });
    await wrapper.get('button').trigger('click');
    expect(wrapper.emitted('send')).toBeUndefined();
    expect(wrapper.emitted('stop')).toEqual([[]]);
    expect(wrapper.get('textarea').element.value).toBe('Next question');
  });

  it('prevents disabled or blank messages from being submitted', async () => {
    const wrapper = mount(AiChatInput, { props: { modelValue: '   ' } });
    expect(wrapper.get('button').attributes('disabled')).toBeDefined();
    await wrapper.setProps({ modelValue: 'Draft', disabled: true });
    await wrapper.get('textarea').trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('send')).toBeUndefined();
    expect(wrapper.get('textarea').attributes('disabled')).toBeDefined();
  });
});
