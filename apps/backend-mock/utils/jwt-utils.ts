import type { EventHandlerRequest, H3Event } from 'h3';

import type { PublicUserInfo } from './mock-data';

import { getHeader } from 'h3';
import jwt from 'jsonwebtoken';

import { MOCK_USERS, toPublicUser } from './mock-data';

function resolveSecret(name: 'ACCESS_TOKEN_SECRET' | 'REFRESH_TOKEN_SECRET') {
  const configured = process.env[name];
  if (configured) return configured;
  if (process.env.NODE_ENV === 'production') {
    throw new Error(`${name} is required in production`);
  }
  return `development-only-${name.toLowerCase()}`;
}

const ACCESS_TOKEN_SECRET = resolveSecret('ACCESS_TOKEN_SECRET');
const REFRESH_TOKEN_SECRET = resolveSecret('REFRESH_TOKEN_SECRET');

export interface UserPayload extends PublicUserInfo {
  iat: number;
  exp: number;
}

export function generateAccessToken(user: PublicUserInfo) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
}

export function generateRefreshToken(user: PublicUserInfo) {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  });
}

export function verifyAccessToken(
  event: H3Event<EventHandlerRequest>,
): null | PublicUserInfo {
  const authHeader = getHeader(event, 'Authorization');
  if (!authHeader?.startsWith('Bearer')) {
    return null;
  }

  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2) {
    return null;
  }
  const token = tokenParts[1] as string;
  try {
    const decoded = jwt.verify(
      token,
      ACCESS_TOKEN_SECRET,
    ) as unknown as UserPayload;

    const username = decoded.username;
    const user = MOCK_USERS.find((item) => item.username === username);
    if (!user) {
      return null;
    }
    return toPublicUser(user);
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): null | PublicUserInfo {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as UserPayload;
    const username = decoded.username;
    const user = MOCK_USERS.find((item) => item.username === username);
    if (!user) {
      return null;
    }
    return toPublicUser(user);
  } catch {
    return null;
  }
}
