import { Context } from 'koa';
import { LogoutUserResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { authResolver } from '../../../libs/authenticate';
import { sendRefreshToken } from '../../../libs/token';

const resolvers: Resolvers = {
  Mutation: {
    LogoutUser: authResolver(
      async (_, __, { ctx }: { ctx: Context }): Promise<LogoutUserResponse> => {
        sendRefreshToken(ctx, '');

        return {
          ok: true,
          error: null,
        };
      }
    ),
  },
};

export default resolvers;
