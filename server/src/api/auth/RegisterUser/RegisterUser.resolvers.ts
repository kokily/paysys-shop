import { getRepository } from 'typeorm';
import {
  RegisterUserMutationArgs,
  RegisterUserResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { ENV } from '../../../constants';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    RegisterUser: async (
      _,
      args: RegisterUserMutationArgs
    ): Promise<RegisterUserResponse> => {
      const { username, password } = args;
      let admin = false;

      try {
        const exists = await getRepository(User).findOne({ username });

        if (exists) {
          return {
            ok: false,
            error: '이미 가입된 사원입니다.',
          };
        }

        if (
          username === ENV.ADMIN_NAME1 ||
          username === ENV.ADMIN_NAME2 ||
          username === ENV.ADMIN_NAME3 ||
          username === ENV.ADMIN_NAME4
        ) {
          admin = true;
        }

        const user = await getRepository(User).create({ ...args, admin });

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
    },
  },
};

export default resolvers;
