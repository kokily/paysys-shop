import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { LoginUserMutationArgs, LoginUserResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from '../../../libs/token';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    LoginUser: async (
      _,
      args: LoginUserMutationArgs,
      { ctx }: { ctx: Context }
    ): Promise<LoginUserResponse> => {
      const { username, password } = args;

      try {
        const user = await getRepository(User).findOne({ username });

        if (!user) {
          return {
            ok: false,
            error: '존재하지 않는 아이디입니다.',
            token: null,
          };
        }

        const valid = await user.validPassword(password);

        if (!valid) {
          return {
            ok: false,
            error: '비밀번호가 틀렸습니다.',
            token: null,
          };
        }

        sendRefreshToken(ctx, createRefreshToken(user));

        return {
          ok: true,
          error: null,
          token: createAccessToken(user),
        };
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          token: null,
        };
      }
    },
  },
};

export default resolvers;
