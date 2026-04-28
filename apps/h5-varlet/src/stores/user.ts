import { defineStore } from 'pinia';

import { fetchUserInfoApi, loginApi, logoutApi } from '@/api/user';

interface UserInfo {
  id?: number;
  realName?: string;
  avatar?: string;
  roles?: string[];
  username?: string;
}

interface StoreUser {
  token: string;
  info: UserInfo;
}

export const useUserStore = defineStore('user', {
  state: (): StoreUser => ({
    token: '',
    info: {},
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.info || {};
    },
    isLoggedIn(): boolean {
      return !!this.token;
    },
  },
  actions: {
    setInfo(info: UserInfo) {
      this.info = info ?? {};
    },
    setToken(token: string) {
      this.token = token;
    },
    async login(username: string, password: string) {
      const data = await loginApi(username, password);
      if (data.code === 0) {
        const { accessToken, ...userInfo } = data.data;
        this.setToken(accessToken);
        this.setInfo(userInfo);
        return userInfo;
      }
      throw new Error(data.message || '登录失败');
    },
    async fetchUserInfo() {
      if (!this.token) return null;
      const data = await fetchUserInfoApi(this.token);
      if (data.code === 0) {
        this.setInfo(data.data);
        return data.data;
      }
      return null;
    },
    async logout() {
      await logoutApi().catch(() => {});
      this.token = '';
      this.info = {};
    },
  },
  persist: {
    pick: ['token', 'info'],
    storage: localStorage,
  },
});
