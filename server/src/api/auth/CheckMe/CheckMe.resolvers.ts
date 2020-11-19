import { Context } from 'koa';
import { authResolver } from '../../../libs/authenticate';
import { CheckMeResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

const resolvers: Resolvers = {
  Query: {
    CheckMe: authResolver(
      async (_, __, { ctx }: { ctx: Context }): Promise<CheckMeResponse> => {
        const { user_id, username, admin } = ctx.state;

        if (
          user_id === undefined ||
          username === undefined ||
          admin === undefined
        ) {
          return {
            ok: false,
            error: 'Undefined User',
            user: null,
          };
        } else {
          return {
            ok: true,
            error: null,
            user: {
              id: user_id,
              username,
              admin,
            },
          };
        }
      }
    ),
  },
};

export default resolvers;
