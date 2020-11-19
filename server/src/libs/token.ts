import { Context } from 'koa';
import jwt from 'jsonwebtoken';
import User from '../entities/User';
import { ENV } from '../constants';

// Create AccessToken
export const createAccessToken = (user: User) => {
  const token = {
    user_id: user.id,
    username: user.username,
    admin: user.admin,
  };

  return jwt.sign(token, ENV.ACCESS_SECRET!, {
    expiresIn: '15m',
  });
};

// Create RefreshToken
export const createRefreshToken = (user: User) => {
  const token = {
    user_id: user.id,
    username: user.username,
    admin: user.admin,
    token_version: user.token_version,
  };

  return jwt.sign(token, ENV.REFRESH_SECRET!, {
    expiresIn: '7d',
  });
};

// Refresh Token Sending
export const sendRefreshToken = (ctx: Context, token: string) => {
  ctx.cookies.set('paysys_token', token, {
    httpOnly: true,
    // domain: '.paysys.shop'
  });
};
