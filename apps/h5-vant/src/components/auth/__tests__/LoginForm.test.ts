import { mount } from '@vue/test-utils';

import { describe, expect, it } from 'vitest';

import LoginForm from '../LoginForm.vue';

describe('login form', () => {
  it('submits typed credentials', async () => {
    const wrapper = mount(LoginForm);
    await wrapper.get('[data-testid="username"]').setValue('maintainer');
    await wrapper.get('[data-testid="password"]').setValue('secret');
    await wrapper.get('form').trigger('submit');

    expect(wrapper.emitted('submit')).toEqual([
      [{ password: 'secret', username: 'maintainer' }],
    ]);
  });

  it('disables submit while loading', () => {
    const wrapper = mount(LoginForm, { props: { loading: true } });
    expect(
      wrapper.get('[data-testid="login-submit"]').attributes('disabled'),
    ).toBeDefined();
  });
});
