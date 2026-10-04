import {
  ApiError,
  fetchUserInfoApi,
  loginApi,
  logoutApi,
} from '@vh5/api-client';
import { defineUserStore } from '@vh5/stores/user';

export const useUserStore = defineUserStore({
  createAbortError: () =>
    new ApiError('Login superseded by a session change', { kind: 'aborted' }),
  fetchUserInfo: fetchUserInfoApi,
  login: async (credentials) => {
    const { accessToken, ...info } = await loginApi(credentials);
    return { info, token: accessToken };
  },
  logout: logoutApi,
});
