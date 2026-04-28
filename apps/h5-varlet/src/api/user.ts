export interface UserInfo {
  id?: number;
  realName?: string;
  avatar?: string;
  roles?: string[];
  username?: string;
}

interface ApiResponse<T> {
  code: number;
  data: T;
  message?: string;
}

interface LoginResponse extends UserInfo {
  accessToken: string;
}

export async function loginApi(username: string, password: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return (await res.json()) as ApiResponse<LoginResponse>;
}

export async function fetchUserInfoApi(token: string) {
  const res = await fetch('/api/user/info', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return (await res.json()) as ApiResponse<UserInfo>;
}

export async function logoutApi() {
  await fetch('/api/auth/logout', { method: 'POST' });
}
