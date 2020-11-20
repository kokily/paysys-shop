import { getRepository } from 'typeorm';
import {
  RemoveUserMutationArgs,
  RemoveUserResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { adminResolver } from '../../../libs/authenticate';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    RemoveUser: adminResolver(
      async (_, args: RemoveUserMutationArgs): Promise<RemoveUserResponse> => {
        const { id } = args;

        try {
          const user = await getRepository(User).findOne(id);

          if (!user) {
            return {
              ok: false,
              error: '잘못된 요청',
            };
          }

          await getRepository(User).delete(id);

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
