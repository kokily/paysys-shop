import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { ChangePasswordMutationArgs, ChangePasswordResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { authResolver } from '../../../libs/authenticate';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    ChangePassword: authResolver(
      async (
        _,
        args: ChangePasswordMutationArgs,
        { ctx }: { ctx: Context }
      ): Promise<ChangePasswordResponse> => {
        const { user_id } = ctx.state;
        const { password } = args;

        try {
          const user = await getRepository(User).findOne({ id: user_id });

          if (!user) {
            return {
              ok: false,
              error: 'Does not exist User',
            };
          }

          await user.setPassword(password);
          await user.save();

          return {
            ok: true,
            error: null,
          };
        } catch (err) {
          return {
            ok: false,
            error: err.message,
          };
        }
      }
    ),
  },
};

export default resolvers;
