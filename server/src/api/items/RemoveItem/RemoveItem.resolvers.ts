import { getRepository } from 'typeorm';
import {
  RemoveItemMutationArgs,
  RemoveItemResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { adminResolver } from '../../../libs/authenticate';
import Item from '../../../entities/Item';

const resolvers: Resolvers = {
  Mutation: {
    RemoveItem: adminResolver(
      async (_, args: RemoveItemMutationArgs): Promise<RemoveItemResponse> => {
        const { id } = args;

        try {
          const item = await getRepository(Item).findOne(id);

          if (!item) {
            return {
              ok: false,
              error: '존재하지 않는 품목입니다.',
            };
          }

          await getRepository(Item).delete(id);

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
