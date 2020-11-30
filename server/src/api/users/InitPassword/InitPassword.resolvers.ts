import { getRepository } from 'typeorm';
import { ENV } from '../../../constants';
import User from '../../../entities/User';
import { adminResolver } from '../../../libs/authenticate';
import { InitPasswordMutationArgs, InitPasswordResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';

const resolvers: Resolvers = {
  Mutation: {
    InitPassword: adminResolver(
      async (_, args: InitPasswordMutationArgs): Promise<InitPasswordResponse> => {
        const { id } = args;

        try {
          const user = await getRepository(User).findOne(id);

          if (!user) {
            return {
              ok: false,
              error: 'Does not exist User',
            };
          }

          await user.setPassword(ENV.BASE_PASSWORD!);
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
