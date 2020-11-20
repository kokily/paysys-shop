import { getRepository } from 'typeorm';
import {
  SetEmployeeMutationArgs,
  SetEmployeeResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { adminResolver } from '../../../libs/authenticate';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    SetEmployee: adminResolver(
      async (
        _,
        args: SetEmployeeMutationArgs
      ): Promise<SetEmployeeResponse> => {
        const { id } = args;

        try {
          const user = await getRepository(User).findOne(id);

          if (!user) {
            return {
              ok: false,
              error: '잘못된 요청',
            };
          }

          await getRepository(User).update({ id }, { ...user, admin: false });

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
