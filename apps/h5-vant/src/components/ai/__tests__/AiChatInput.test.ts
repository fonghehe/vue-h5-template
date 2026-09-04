import { mount } from '@vue/test-utils';
import { createApp } from 'vue';

import { setupI18n } from '@vh5/locales';

import { beforeEach, describe, expect, it } from 'vitest';

import AiChatInput from '../AiChatInput.vue';

describe('ai chat input', () => {
  beforeEach(async () => {
    localStorage.removeItem('vh5:locale');
    await setupI18n(createApp({}));
  });
  it('sends trimmed content and clears the textarea', async () => {
    const wrapper = mount(AiChatInput, {
      global: { stubs: { 'van-icon': true } },
    });
    const textarea = wrapper.get('textarea');
    await textarea.setValue('  Explain Vue  ');
    await textarea.trigger('keydown', { key: 'Enter' });

    expect(wrapper.emitted('send')).toEqual([['Explain Vue']]);
    expect((textarea.element as HTMLTextAreaElement).value).toBe('');
  });

  it('shows stop while streaming', async () => {
    const wrapper = mount(AiChatInput, {
      global: { stubs: { 'van-icon': true } },
      props: { streaming: true },
    });
    await wrapper.get('[aria-label="Stop generating"]').trigger('click');
    expect(wrapper.emitted('stop')).toHaveLength(1);
  });

  it('does not submit while composing Japanese text or using Shift+Enter', async () => {
    const wrapper = mount(AiChatInput);
    await wrapper.get('textarea').setValue('こんにちは');
    await wrapper
      .get('textarea')
      .trigger('keydown', { key: 'Enter', isComposing: true });
    await wrapper
      .get('textarea')
      .trigger('keydown', { key: 'Enter', shiftKey: true });
    expect(wrapper.emitted('send')).toBeUndefined();
  });

  it('blocks new messages while streaming', async () => {
    const wrapper = mount(AiChatInput, { props: { streaming: true } });
    await wrapper.get('textarea').setValue('Do not send yet');
    await wrapper.get('textarea').trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('send')).toBeUndefined();
  });
});
