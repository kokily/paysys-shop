import { Context } from 'koa';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import User from '../entities/User';
import { ENV } from '../constants';

// Decode Token
export const decodeToken = async (token: string): Promise<User | undefined> => {
  const decoded: any = jwt.verify(token, ENV.ACCESS_SECRET!);
  const user = await getRepository(User).findOne({ id: decoded.user_id });

  if (user) {
    return user;
  } else {
    return undefined;
  }
};

export const adminResolver = (resolverFunction) => async (parent, args, context, info) => {
  const { ctx }: { ctx: Context } = context;
  const token = ctx.request.headers['paysys_auth'];

  if (!token) {
    throw new Error('Not Authenticated');
  }

  try {
    const user = await decodeToken(token.split(' ')[1]);

    if (user && user.admin) {
      ctx.state.user_id = user.id;
      ctx.state.username = user.username;
      ctx.state.admin = user.admin;
    } else {
      ctx.state.user_id = undefined;
      ctx.state.username = undefined;
      ctx.state.admin = undefined;
    }
  } catch (err) {
    console.error(err);
    throw new Error('Not Authenticated');
  }

  const resolved = await resolverFunction(parent, args, context, info);

  return resolved;
};

// auth Resolver
export const authResolver = (resolverFunction) => async (parent, args, context, info) => {
  const { ctx }: { ctx: Context } = context;
  const token = ctx.request.headers['paysys_auth'];

  if (!token) {
    throw new Error('Not Authenticated');
  }

  try {
    const user = await decodeToken(token.split(' ')[1]);

    if (user) {
      ctx.state.user_id = user.id;
      ctx.state.username = user.username;
      ctx.state.admin = user.admin;
    } else {
      ctx.state.user_id = undefined;
      ctx.state.username = undefined;
      ctx.state.admin = undefined;
    }
  } catch (err) {
    console.error(err);
    throw new Error('Not Authenticated');
  }

  const resolved = await resolverFunction(parent, args, context, info);

  return resolved;
};
