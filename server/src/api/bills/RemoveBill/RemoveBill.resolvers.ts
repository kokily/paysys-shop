import { Context } from 'koa';
import { getRepository } from 'typeorm';
import {
  RemoveBillMutationArgs,
  RemoveBillResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { authResolver } from '../../../libs/authenticate';
import Bill from '../../../entities/Bill';

const resolvers: Resolvers = {
  Mutation: {
    RemoveBill: authResolver(
      async (
        _,
        args: RemoveBillMutationArgs,
        { ctx }: { ctx: Context }
      ): Promise<RemoveBillResponse> => {
        const { user_id, admin } = ctx.state;
        const { id } = args;

        try {
          const bill = await getRepository(Bill).findOne(id);

          if (!bill) {
            return {
              ok: false,
              error: '존재하지 않는 빌지입니다.',
            };
          }

          if (admin || user_id === bill.user_id) {
            await getRepository(Bill).delete(id);

            return {
              ok: true,
              error: null,
            };
          } else {
            return {
              ok: false,
              error: '삭제 권한이 없습니다.',
            };
          }
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
