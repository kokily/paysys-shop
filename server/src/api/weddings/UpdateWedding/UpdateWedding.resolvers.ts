import { getRepository } from 'typeorm';
import {
  UpdateWeddingMutationArgs,
  UpdateWeddingResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { adminResolver } from '../../../libs/authenticate';
import { cleanAllNullArgs } from '../../../libs/utils';
import Wedding from '../../../entities/Wedding';

const resolvers: Resolvers = {
  Mutation: {
    UpdateWedding: adminResolver(
      async (
        _,
        args: UpdateWeddingMutationArgs
      ): Promise<UpdateWeddingResponse> => {
        const { id } = args;

        try {
          const wedding = await getRepository(Wedding).findOne(id);

          if (!wedding) {
            return {
              ok: false,
              error: '존재하지 않는 빌지입니다.',
              wedding: null,
            };
          }

          const notNull = cleanAllNullArgs(args);

          await getRepository(Wedding).update(
            { id },
            { ...notNull, updated_at: new Date() }
          );

          const updateWedding = await getRepository(Wedding).findOne(id);

          if (!updateWedding) {
            return {
              ok: false,
              error: '알 수 없는 오류',
              wedding: null,
            };
          } else {
            return {
              ok: true,
              error: null,
              wedding: updateWedding,
            };
          }
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            wedding: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
