import { Context } from 'koa';
import { getManager, getRepository } from 'typeorm';
import { AddCartMutationArgs, AddCartResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { authResolver } from '../../../libs/authenticate';
import Cart from '../../../entities/Cart';
import Item from '../../../entities/Item';

const resolvers: Resolvers = {
  Mutation: {
    AddCart: authResolver(
      async (
        _,
        args: AddCartMutationArgs,
        { ctx }: { ctx: Context }
      ): Promise<AddCartResponse> => {
        const { user_id } = ctx.state;
        const { item_id, count, price } = args;

        try {
          const query = await getManager()
            .createQueryBuilder(Cart, 'cart')
            .where('cart.user_id = :user_id', { user_id })
            .andWhere('cart.completed = false')
            .andWhere('cart.deleted = false');
          const prev_cart = await query.getOne();
          const item = await getRepository(Item).findOne({ id: item_id });

          if (!item) {
            return {
              ok: false,
              error: '존재하지 않는 품목입니다.',
              cart: null,
            };
          }

          const add_item = {
            ...item,
            count,
            price,
            amount: count * price,
          };

          if (!prev_cart) {
            // Not Cart
            const cart = await getRepository(Cart).create({
              items: [add_item],
              user_id,
              completed: false,
              deleted: false,
            });

            await cart.save();

            return {
              ok: true,
              error: null,
              cart,
            };
          } else {
            // One Cart
            await getRepository(Cart).update(
              { id: prev_cart.id },
              {
                ...prev_cart,
                items: [...prev_cart.items, add_item],
              }
            );

            const cart = await getRepository(Cart).findOne({
              id: prev_cart.id,
            });

            if (!cart) {
              return {
                ok: false,
                error: '알 수 없는 오류',
                cart: null,
              };
            } else {
              return {
                ok: true,
                error: null,
                cart,
              };
            }
          }
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
