import jwt from 'jsonwebtoken';
import { describe, expect, it } from 'vitest';

import { generateAccessToken } from '../jwt-utils';
import { MOCK_USERS, toPublicUser } from '../mock-data';

describe('mock JWT helpers', () => {
  it('never serializes the mock password into an access token', () => {
    const mockUser = MOCK_USERS[0];
    if (!mockUser) throw new Error('Expected a mock user fixture');
    const publicUser = toPublicUser(mockUser);
    const payload = jwt.decode(generateAccessToken(publicUser));

    expect(payload).toMatchObject({
      id: publicUser.id,
      username: publicUser.username,
    });
    expect(payload).not.toHaveProperty('password');
  });
});
