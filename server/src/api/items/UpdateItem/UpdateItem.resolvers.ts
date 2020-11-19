import { getRepository } from 'typeorm';
import {
  UpdateItemMutationArgs,
  UpdateItemResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { adminResolver } from '../../../libs/authenticate';
import { cleanAllNullArgs } from '../../../libs/utils';
import Item from '../../../entities/Item';

const resolvers: Resolvers = {
  Mutation: {
    UpdateItem: adminResolver(
      async (_, args: UpdateItemMutationArgs): Promise<UpdateItemResponse> => {
        const { id } = args;

        try {
          const item = await getRepository(Item).findOne(id);

          if (!item) {
            return {
              ok: false,
              error: '존재하지 않는 품목입니다.',
            };
          }

          const notNull = cleanAllNullArgs(args);

          await getRepository(Item).update(
            { id },
            { ...notNull, updated_at: new Date() }
          );

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
