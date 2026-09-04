import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchUserInfoApi, loginApi, logoutApi } from '@/api/user';

import { useUserStore } from '../user';

vi.mock('@/api/user', () => ({
  fetchUserInfoApi: vi.fn(),
  loginApi: vi.fn(),
  logoutApi: vi.fn(),
}));

describe('user store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('stores client auth state after login', async () => {
    vi.mocked(loginApi).mockResolvedValue({
      accessToken: 'access-token',
      avatar: 'https://example.test/avatar.png',
      id: 1,
      realName: 'Template User',
      roles: ['user'],
      username: 'user',
    });
    const store = useUserStore();

    await store.login('user', '123456');

    expect(loginApi).toHaveBeenCalledWith({
      password: '123456',
      username: 'user',
    });
    expect(store.token).toBe('access-token');
    expect(store.getUserInfo.username).toBe('user');
  });

  it('clears state even when the logout request fails', async () => {
    vi.mocked(logoutApi).mockRejectedValue(new Error('offline'));
    const store = useUserStore();
    store.setToken('token');

    await store.logout();

    expect(store.isLoggedIn).toBe(false);
    expect(store.info).toEqual({});
    expect(fetchUserInfoApi).not.toHaveBeenCalled();
  });
});
