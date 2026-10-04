import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils';

import { ApiError, fetchUserInfoApi, getProductList } from '@vh5/api-client';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import RequestPage from '../RequestPage.vue';

vi.mock('@vh5/api-client', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@vh5/api-client')>()),
  fetchUserInfoApi: vi.fn(),
  getProductList: vi.fn(),
}));
vi.mock('@vh5/locales', () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));
enableAutoUnmount(afterEach);
beforeEach(() => vi.resetAllMocks());

describe('request example lifecycle', () => {
  it.each([false, true])(
    'cancels a pending request on navigation (profile=%s)',
    async (profile) => {
      const pending = Promise.withResolvers<never>();
      vi.mocked(getProductList).mockReturnValue(pending.promise);
      vi.mocked(fetchUserInfoApi).mockReturnValue(pending.promise);
      const wrapper = mount(RequestPage);
      const button = wrapper.findAll('button').at(profile ? 1 : 0);
      if (!button) throw new Error('Missing request action');
      await button.trigger('click');
      const signal = profile
        ? vi.mocked(fetchUserInfoApi).mock.calls[0]?.[0]
        : vi.mocked(getProductList).mock.calls[0]?.[1];
      expect(signal).toBeInstanceOf(AbortSignal);
      wrapper.unmount();
      expect(signal?.aborted).toBe(true);
      pending.reject(new ApiError('Cancelled', { kind: 'aborted' }));
      await flushPromises();
    },
  );

  it('shows a request error and allows a successful retry', async () => {
    vi.mocked(getProductList)
      .mockRejectedValueOnce(new ApiError('Offline', { kind: 'network' }))
      .mockResolvedValueOnce({
        items: [],
        total: 0,
        page: 1,
        pageSize: 3,
        hasMore: false,
      });
    const wrapper = mount(RequestPage);
    await wrapper.get('button').trigger('click');
    await flushPromises();
    expect(wrapper.get('output').text()).toBe('Offline');
    expect(wrapper.get('button').attributes('disabled')).toBeUndefined();
    await wrapper.get('button').trigger('click');
    await flushPromises();
    expect(wrapper.get('output').text()).toBe('mobile.received');
  });
});
