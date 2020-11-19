import { Context } from 'koa';
import { getManager, getRepository } from 'typeorm';
import { RemoveCartResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { authResolver } from '../../../libs/authenticate';
import Cart from '../../../entities/Cart';

const resolvers: Resolvers = {
  Mutation: {
    RemoveCart: authResolver(
      async (_, __, { ctx }: { ctx: Context }): Promise<RemoveCartResponse> => {
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
            };
          }

          let remove_cart = { ...cart };
          let update_cart = {
            id: remove_cart.id,
            user_id,
            deleted: true,
          };

          await getRepository(Cart).update({ id: cart.id }, { ...update_cart });

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
