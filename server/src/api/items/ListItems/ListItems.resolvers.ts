import { getManager, getRepository } from 'typeorm';
import { ListItemsQueryArgs, ListItemsResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { authResolver } from '../../../libs/authenticate';
import Item from '../../../entities/Item';

const resolvers: Resolvers = {
  Query: {
    ListItems: authResolver(
      async (_, args: ListItemsQueryArgs): Promise<ListItemsResponse> => {
        const { cursor, name, divide, native } = args;

        try {
          const query = await getManager()
            .createQueryBuilder(Item, 'item')
            .limit(20)
            .orderBy('item.num', 'DESC')
            .addOrderBy('item.id', 'DESC');

          if (name) {
            query.andWhere('item.name like :name', { name: `%${name}%` });
          }

          if (divide) {
            query.andWhere('item.divide like :divide', {
              divide: `%${divide}%`,
            });
          }

          if (native) {
            query.andWhere('item.native like :native', {
              native: `%${native}%`,
            });
          }

          if (cursor) {
            const item = await getRepository(Item).findOne({ id: cursor });

            if (!item) {
              return {
                ok: false,
                error: '잘못된 요청',
                items: null,
              };
            }

            query.andWhere('item.id < :id', {
              id: item.id,
            });
          }

          const items = await query.getMany();

          return {
            ok: true,
            error: null,
            items,
          };
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            items: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
