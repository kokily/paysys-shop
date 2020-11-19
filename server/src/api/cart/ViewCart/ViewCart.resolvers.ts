import { Context } from 'koa';
import { getManager } from 'typeorm';
import { ViewCartResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { authResolver } from '../../../libs/authenticate';
import Cart from '../../../entities/Cart';

const resolvers: Resolvers = {
  Query: {
    ViewCart: authResolver(
      async (_, __, { ctx }: { ctx: Context }): Promise<ViewCartResponse> => {
        const { user_id } = ctx.state;

        try {
          const query = await getManager()
            .createQueryBuilder(Cart, 'cart')
            .where('cart.user_id = :user_id', { user_id })
            .andWhere('cart.completed = false')
            .andWhere('cart.deleted = false');
          const cart = await query.getOne();

          if (!cart) {
            return {
              ok: false,
              error: '존재하지 않는 카트입니다.',
              cart: null,
            };
          }

          return {
            ok: true,
            error: null,
            cart,
          };
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            cart: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
