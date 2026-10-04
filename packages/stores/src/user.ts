import { computed, onScopeDispose, shallowRef } from 'vue';

import { defineStore } from 'pinia';

export interface UserStoreDependencies<TUser extends object> {
  createAbortError(): Error;
  fetchUserInfo(signal: AbortSignal): Promise<TUser>;
  login(credentials: { password: string; username: string }): Promise<{
    info: TUser;
    token: string;
  }>;
  logout(): Promise<unknown>;
}

/** Share session state and request ownership; applications supply their API adapter. */
export function defineUserStore<TUser extends object>(
  dependencies: UserStoreDependencies<TUser>,
) {
  return defineStore(
    'user',
    () => {
      const token = shallowRef('');
      const info = shallowRef<Partial<TUser>>({});
      const getUserInfo = computed(() => info.value);
      const isLoggedIn = computed(() => !!token.value);
      let revision = 0;
      let profile: AbortController | undefined;

      function invalidateSession(): number {
        revision++;
        profile?.abort();
        profile = undefined;
        return revision;
      }

      function clearSession() {
        invalidateSession();
        token.value = '';
        info.value = {};
      }

      function setInfo(value: Partial<TUser>) {
        info.value = value ?? {};
      }

      function setToken(value: string) {
        invalidateSession();
        if (value !== token.value) info.value = {};
        token.value = value;
      }

      async function login(username: string, password: string) {
        const currentRevision = invalidateSession();
        const result = await dependencies.login({ password, username });
        if (revision !== currentRevision) throw dependencies.createAbortError();
        setToken(result.token);
        setInfo(result.info);
        return result.info;
      }

      async function fetchUserInfo() {
        if (!token.value) return null;
        profile?.abort();
        const controller = new AbortController();
        profile = controller;
        const currentRevision = revision;
        const currentToken = token.value;
        try {
          const data = await dependencies.fetchUserInfo(controller.signal);
          if (
            controller.signal.aborted ||
            revision !== currentRevision ||
            token.value !== currentToken
          )
            return null;
          setInfo(data);
          return data;
        } catch (error: unknown) {
          if (controller.signal.aborted) return null;
          throw error;
        } finally {
          if (profile === controller) profile = undefined;
        }
      }

      async function logout() {
        const currentRevision = invalidateSession();
        const currentToken = token.value;
        await dependencies.logout().catch(() => {});
        if (revision === currentRevision && token.value === currentToken)
          clearSession();
      }

      onScopeDispose(invalidateSession);

      return {
        $reset: clearSession,
        clearSession,
        fetchUserInfo,
        getUserInfo,
        info,
        isLoggedIn,
        login,
        logout,
        setInfo,
        setToken,
        token,
      };
    },
    {
      persist: { pick: ['token', 'info'], storage: localStorage },
    },
  );
}
