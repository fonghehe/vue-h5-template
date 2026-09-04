import type { UserInfo } from '../types';

import { httpClient } from '../singleton';

export const fetchUserInfoApi = () => httpClient.get<UserInfo>('/user/info');
