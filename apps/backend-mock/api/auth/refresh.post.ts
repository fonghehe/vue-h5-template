import { defineEventHandler } from 'h3';
import {
  clearRefreshTokenCookie,
  getRefreshTokenFromCookie,
  setRefreshTokenCookie,
} from '~/utils/cookie-utils';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '~/utils/jwt-utils';
import { MOCK_USERS, toPublicUser } from '~/utils/mock-data';
import { forbiddenResponse } from '~/utils/response';

export default defineEventHandler(async (event) => {
  const refreshToken = getRefreshTokenFromCookie(event);
  if (!refreshToken) {
    return forbiddenResponse(event);
  }

  clearRefreshTokenCookie(event);

  const userinfo = verifyRefreshToken(refreshToken);
  if (!userinfo) {
    return forbiddenResponse(event);
  }

  const findUser = MOCK_USERS.find(
    (item) => item.username === userinfo.username,
  );
  if (!findUser) {
    return forbiddenResponse(event);
  }
  const publicUser = toPublicUser(findUser);
  const accessToken = generateAccessToken(publicUser);
  const nextRefreshToken = generateRefreshToken(publicUser);

  setRefreshTokenCookie(event, nextRefreshToken);

  return accessToken;
});
