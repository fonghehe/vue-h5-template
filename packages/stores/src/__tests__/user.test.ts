import { createApp, nextTick } from 'vue';

import { createPinia, setActivePinia } from 'pinia';
import persistedState from 'pinia-plugin-persistedstate';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { defineUserStore } from '../user';

interface UserInfo {
  avatar: string;
  id: number;
  realName: string;
  roles: string[];
  username: string;
}
type LoginResult = UserInfo & { accessToken: string };
const fetchUserInfoApi = vi.fn<(signal: AbortSignal) => Promise<UserInfo>>();
const loginApi =
  vi.fn<
    (credentials: {
      password: string;
      username: string;
    }) => Promise<LoginResult>
  >();
const logoutApi = vi.fn<() => Promise<null>>();
const abortError = Object.assign(new Error('Session changed'), {
  kind: 'aborted',
});
const useUserStore = defineUserStore({
  createAbortError: () => abortError,
  fetchUserInfo: fetchUserInfoApi,
  login: async (credentials) => {
    const { accessToken, ...info } = await loginApi(credentials);
    return { info, token: accessToken };
  },
  logout: logoutApi,
});

describe('user store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('persists and restores only the token and identity snapshot', async () => {
    const rootComponent = {};
    const pinia = createPinia().use(persistedState);
    createApp(rootComponent).use(pinia);
    const store = useUserStore(pinia);
    store.setToken('persisted-token');
    store.setInfo({ username: 'persisted-user' });
    await nextTick();
    expect(JSON.parse(localStorage.getItem('user') ?? '{}')).toEqual({
      token: 'persisted-token',
      info: { username: 'persisted-user' },
    });
    store.$dispose();
    const restoredPinia = createPinia().use(persistedState);
    createApp(rootComponent).use(restoredPinia);
    const restored = useUserStore(restoredPinia);
    expect(restored.isLoggedIn).toBe(true);
    expect(restored.getUserInfo.username).toBe('persisted-user');
    restored.$dispose();
  });

  it('cancels an in-flight profile request when the store is disposed', async () => {
    const pending = Promise.withResolvers<UserInfo>();
    vi.mocked(fetchUserInfoApi).mockReturnValueOnce(pending.promise);
    const store = useUserStore();
    store.setToken('token');
    const request = store.fetchUserInfo();
    const signal = vi.mocked(fetchUserInfoApi).mock.calls[0]?.[0];
    store.$dispose();
    expect(signal?.aborted).toBe(true);
    pending.resolve({
      id: 1,
      username: 'old',
      realName: 'Old',
      avatar: '',
      roles: [],
    });
    await expect(request).resolves.toBeNull();
    expect(store.info).toEqual({});
  });

  it('does not fetch user data without a session', async () => {
    const store = useUserStore();
    await expect(store.fetchUserInfo()).resolves.toBeNull();
    expect(fetchUserInfoApi).not.toHaveBeenCalled();
  });

  it('updates the current profile after an authenticated fetch', async () => {
    const profile = {
      avatar: '',
      id: 1,
      realName: 'Updated',
      roles: ['user'],
      username: 'user',
    };
    vi.mocked(fetchUserInfoApi).mockResolvedValue(profile);
    const store = useUserStore();
    store.setToken('token');
    await expect(store.fetchUserInfo()).resolves.toEqual(profile);
    expect(store.getUserInfo).toEqual(profile);
    expect(store.token).toBe('token');
  });

  it('does not create a session when login fails', async () => {
    const failure = new Error('Invalid credentials');
    vi.mocked(loginApi).mockRejectedValue(failure);
    const store = useUserStore();
    await expect(store.login('user', 'wrong')).rejects.toBe(failure);
    expect(store.isLoggedIn).toBe(false);
    expect(store.info).toEqual({});
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

  it('ignores a profile response from a cleared session', async () => {
    const pending = Promise.withResolvers<UserInfo>();
    vi.mocked(fetchUserInfoApi).mockReturnValueOnce(pending.promise);
    const store = useUserStore();
    store.setToken('old-token');
    const request = store.fetchUserInfo();
    store.clearSession();
    pending.resolve({
      id: 1,
      username: 'old',
      realName: 'Old',
      avatar: '',
      roles: [],
    });
    await expect(request).resolves.toBeNull();
    expect(store.info).toEqual({});
  });

  it('keeps a new session when an old logout finishes', async () => {
    const pending = Promise.withResolvers<null>();
    vi.mocked(logoutApi).mockReturnValueOnce(pending.promise);
    const store = useUserStore();
    store.setToken('old-token');
    const logout = store.logout();
    store.setToken('new-token');
    store.setInfo({ username: 'new' });
    pending.resolve(null);
    await logout;
    expect(store.token).toBe('new-token');
    expect(store.info.username).toBe('new');
  });

  it('does not restore a session from a login completed after clearing it', async () => {
    const pending = Promise.withResolvers<LoginResult>();
    vi.mocked(loginApi).mockReturnValueOnce(pending.promise);
    const store = useUserStore();
    const login = store.login('old', 'password');
    const rejected = login.catch((error: unknown) => error);
    store.clearSession();
    pending.resolve({
      accessToken: 'old-token',
      id: 1,
      username: 'old',
      realName: 'Old',
      avatar: '',
      roles: [],
    });
    expect(await rejected).toMatchObject({ kind: 'aborted' });
    expect(store.isLoggedIn).toBe(false);
  });

  it('keeps the newest profile when a transport ignores cancellation', async () => {
    const pending = Promise.withResolvers<UserInfo>();
    vi.mocked(fetchUserInfoApi)
      .mockReturnValueOnce(pending.promise)
      .mockResolvedValueOnce({
        id: 2,
        username: 'new',
        realName: 'New',
        avatar: '',
        roles: [],
      });
    const store = useUserStore();
    store.setToken('token');
    const old = store.fetchUserInfo();
    const signal = vi.mocked(fetchUserInfoApi).mock.calls[0]?.[0];
    await store.fetchUserInfo();
    expect(signal?.aborted).toBe(true);
    pending.resolve({
      id: 1,
      username: 'old',
      realName: 'Old',
      avatar: '',
      roles: [],
    });
    await expect(old).resolves.toBeNull();
    expect(store.info.username).toBe('new');
  });

  it('keeps the latest login when an earlier login completes last', async () => {
    const pending = Promise.withResolvers<LoginResult>();
    vi.mocked(loginApi)
      .mockReturnValueOnce(pending.promise)
      .mockResolvedValueOnce({
        accessToken: 'new-token',
        id: 2,
        username: 'new',
        realName: 'New',
        avatar: '',
        roles: [],
      });
    const store = useUserStore();
    const old = store.login('old', 'password');
    const rejected = old.catch((error: unknown) => error);
    await store.login('new', 'password');
    pending.resolve({
      accessToken: 'old-token',
      id: 1,
      username: 'old',
      realName: 'Old',
      avatar: '',
      roles: [],
    });
    expect(await rejected).toMatchObject({ kind: 'aborted' });
    expect(store.token).toBe('new-token');
    expect(store.info.username).toBe('new');
  });

  it('invalidates a pending login on reset without affecting a different Pinia instance', async () => {
    const pending = Promise.withResolvers<LoginResult>();
    vi.mocked(loginApi).mockReturnValueOnce(pending.promise);
    const first = useUserStore();
    const second = useUserStore(createPinia());
    second.setToken('independent-token');
    const login = first.login('user', 'password');
    const rejected = login.catch((error: unknown) => error);
    first.$reset();
    pending.resolve({
      accessToken: 'old-token',
      id: 1,
      username: 'old',
      realName: 'Old',
      avatar: '',
      roles: [],
    });
    expect(await rejected).toMatchObject({ kind: 'aborted' });
    expect(first.isLoggedIn).toBe(false);
    expect(second.token).toBe('independent-token');
  });
});
