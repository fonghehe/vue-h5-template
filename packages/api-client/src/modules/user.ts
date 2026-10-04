import type { UserInfo } from '../types';

import { httpClient } from '../singleton';

export const fetchUserInfoApi = (signal?: AbortSignal) =>
  httpClient.get<UserInfo>('/user/info', { signal });
