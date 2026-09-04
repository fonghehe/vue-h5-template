import type { UserInfo } from '@/api/user';

import { defineStore } from 'pinia';

import { fetchUserInfoApi, loginApi, logoutApi } from '@/api/user';

interface StoreUser {
  info: Partial<UserInfo>;
  token: string;
}

export const useUserStore = defineStore('user', {
  state: (): StoreUser => ({
    token: '',
    info: {},
  }),
  getters: {
    getUserInfo(): Partial<UserInfo> {
      return this.info || {};
    },
    isLoggedIn(): boolean {
      return !!this.token;
    },
  },
  actions: {
    clearSession() {
      this.token = '';
      this.info = {};
    },
    setInfo(info: Partial<UserInfo>) {
      this.info = info ?? {};
    },
    setToken(token: string) {
      this.token = token;
    },
    async login(username: string, password: string) {
      const { accessToken, ...userInfo } = await loginApi({
        password,
        username,
      });
      this.setToken(accessToken);
      this.setInfo(userInfo);
      return userInfo;
    },
    async fetchUserInfo() {
      if (!this.token) return null;
      const data = await fetchUserInfoApi();
      this.setInfo(data);
      return data;
    },
    async logout() {
      await logoutApi().catch(() => {});
      this.clearSession();
    },
  },
  persist: {
    pick: ['token', 'info'],
    storage: localStorage,
  },
});
