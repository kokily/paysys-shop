import { getRepository } from 'typeorm';
import {
  ReadWeddingQueryArgs,
  ReadWeddingResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { adminResolver } from '../../../libs/authenticate';
import Wedding from '../../../entities/Wedding';

const resolvers: Resolvers = {
  Query: {
    ReadWedding: adminResolver(
      async (_, args: ReadWeddingQueryArgs): Promise<ReadWeddingResponse> => {
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

          return {
            ok: true,
            error: null,
            wedding,
          };
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
