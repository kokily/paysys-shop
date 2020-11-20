import { Context } from 'koa';
import { getRepository } from 'typeorm';
import {
  RestoreBillMutationArgs,
  RestoreBillResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { authResolver } from '../../../libs/authenticate';
import Cart from '../../../entities/Cart';
import Bill from '../../../entities/Bill';

const resolvers: Resolvers = {
  Mutation: {
    RestoreBill: authResolver(
      async (
        _,
        args: RestoreBillMutationArgs,
        { ctx }: { ctx: Context }
      ): Promise<RestoreBillResponse> => {
        const { user_id } = ctx.state;
        const { id } = args;

        try {
          const bill = await getRepository(Bill).findOne(id);

          if (!bill) {
            return {
              ok: false,
              error: '존재하지 않는 빌지입니다.',
            };
          }

          if (user_id === bill.user_id) {
            const cart = await getRepository(Cart).findOne({
              id: bill.cart_id,
            });

            if (!cart) {
              return {
                ok: false,
                error: '관계설정 오류',
              };
            }

            let new_cart = { ...cart };

            new_cart.completed = false;

            await getRepository(Cart).update({ id: cart.id }, { ...new_cart });
            await getRepository(Bill).delete(id);

            return {
              ok: true,
              error: null,
            };
          } else {
            return {
              ok: false,
              error: '수정 권한이 없습니다.',
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
