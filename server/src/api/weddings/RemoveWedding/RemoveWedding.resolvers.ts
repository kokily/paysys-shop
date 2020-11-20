import { getRepository } from 'typeorm';
import {
  RemoveWeddingMutationArgs,
  RemoveWeddingResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { adminResolver } from '../../../libs/authenticate';
import Wedding from '../../../entities/Wedding';

const resolvers: Resolvers = {
  Mutation: {
    RemoveWedding: adminResolver(
      async (
        _,
        args: RemoveWeddingMutationArgs
      ): Promise<RemoveWeddingResponse> => {
        const { id } = args;

        try {
          await getRepository(Wedding).delete(id);

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
