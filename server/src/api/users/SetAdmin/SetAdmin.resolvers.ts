import { getRepository } from 'typeorm';
import { SetAdminMutationArgs, SetAdminResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { adminResolver } from '../../../libs/authenticate';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    SetAdmin: adminResolver(
      async (_, args: SetAdminMutationArgs): Promise<SetAdminResponse> => {
        const { id } = args;

        try {
          const user = await getRepository(User).findOne({ id });

          if (!user) {
            return {
              ok: false,
              error: '잘못된 요청',
            };
          }

          console.log(user);

          await getRepository(User).update({ id }, { admin: true });

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
