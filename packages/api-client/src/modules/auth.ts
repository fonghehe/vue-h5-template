import type { LoginParams, LoginResult } from '../types';

import { httpClient } from '../singleton';

export const loginApi = (params: LoginParams) =>
  httpClient.post<LoginResult, LoginParams>('/auth/login', params);

export const logoutApi = () => httpClient.post<null>('/auth/logout');
