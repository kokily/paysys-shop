import { getRepository } from 'typeorm';
import { ReadItemQueryArgs, ReadItemResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { authResolver } from '../../../libs/authenticate';
import Item from '../../../entities/Item';

const resolvers: Resolvers = {
  Query: {
    ReadItem: authResolver(
      async (_, args: ReadItemQueryArgs): Promise<ReadItemResponse> => {
        const { id } = args;

        try {
          const item = await getRepository(Item).findOne(id);

          if (!item) {
            return {
              ok: false,
              error: '존재하지 않는 품목입니다.',
              item: null,
            };
          }

          return {
            ok: true,
            error: null,
            item,
          };
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            item: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
