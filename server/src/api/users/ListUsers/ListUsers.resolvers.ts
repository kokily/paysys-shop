import { getManager, getRepository } from 'typeorm';
import { ListUsersQueryArgs, ListUsersResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { adminResolver } from '../../../libs/authenticate';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Query: {
    ListUsers: adminResolver(
      async (_, args: ListUsersQueryArgs): Promise<ListUsersResponse> => {
        const { cursor, username } = args;

        try {
          const query = await getManager()
            .createQueryBuilder(User, 'user')
            .limit(30)
            .orderBy('user.created_at', 'DESC')
            .addOrderBy('user.id', 'DESC');

          if (cursor) {
            const user = await getRepository(User).findOne({ id: cursor });

            if (!user) {
              return {
                ok: false,
                error: '잘못된 요청',
                users: null,
              };
            }

            query.andWhere('user.created_at < :date', {
              date: user.created_at,
            });

            query.orWhere('user.created_at = :date AND user.id < :id', {
              date: user.created_at,
              id: user.id,
            });
          }

          if (username) {
            query.andWhere('user.username like :username', {
              username: `%${username}%`,
            });
          }

          const users = await query.getMany();

          return {
            ok: true,
            error: null,
            users,
          };
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            users: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
