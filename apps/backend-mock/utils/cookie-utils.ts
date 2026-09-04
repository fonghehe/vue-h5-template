import type { EventHandlerRequest, H3Event } from 'h3';

import { deleteCookie, getCookie, setCookie } from 'h3';

export function clearRefreshTokenCookie(event: H3Event<EventHandlerRequest>) {
  deleteCookie(event, 'jwt', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}

export function setRefreshTokenCookie(
  event: H3Event<EventHandlerRequest>,
  refreshToken: string,
) {
  setCookie(event, 'jwt', refreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60, // unit: seconds; matches refresh JWT expiry
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}

export function getRefreshTokenFromCookie(event: H3Event<EventHandlerRequest>) {
  const refreshToken = getCookie(event, 'jwt');
  return refreshToken;
}
