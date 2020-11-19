import { getRepository } from 'typeorm';
import { AddItemMutationArgs, AddItemResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { adminResolver } from '../../../libs/authenticate';
import Item from '../../../entities/Item';

const resolvers: Resolvers = {
  Mutation: {
    AddItem: adminResolver(
      async (_, args: AddItemMutationArgs): Promise<AddItemResponse> => {
        try {
          const item_count = await getRepository(Item).count();
          const item = await getRepository(Item).create({
            ...args,
            num: item_count + 1,
          });

          await item.save();

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
