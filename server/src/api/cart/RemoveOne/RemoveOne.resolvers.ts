import { Context } from 'koa';
import { getManager, getRepository } from 'typeorm';
import { RemoveOneMutationArgs, RemoveOneResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { authResolver } from '../../../libs/authenticate';
import Cart from '../../../entities/Cart';

const resolvers: Resolvers = {
  Mutation: {
    RemoveOne: authResolver(
      async (
        _,
        args: RemoveOneMutationArgs,
        { ctx }: { ctx: Context }
      ): Promise<RemoveOneResponse> => {
        const { user_id } = ctx.state;
        const { item_id } = args;

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

          // 카트 품목이 하나 남았을 경우 RemoveCart
          if (cart.items.length === 1) {
            let remove_cart = { ...cart };
            let update_cart = {
              id: remove_cart.id,
              user_id,
              deleted: true,
            };

            await getRepository(Cart).update(
              { id: cart.id },
              { ...update_cart }
            );

            return {
              ok: true,
              error: null,
            };
          } else {
            // 카트 품목 두 개 이상일시시
            let new_cart = { ...cart };

            const idx = new_cart.items.findIndex((item) => {
              return item.id === item_id;
            });

            if (idx > -1) {
              new_cart.items.splice(idx, 1);
            }

            await getRepository(Cart).update({ id: cart.id }, { ...new_cart });

            return {
              ok: true,
              error: null,
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
