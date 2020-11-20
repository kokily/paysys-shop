import { Context } from 'koa';
import { getManager, getRepository } from 'typeorm';
import { AddBillMutationArgs, AddBillResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { authResolver } from '../../../libs/authenticate';
import Cart from '../../../entities/Cart';
import Bill from '../../../entities/Bill';

const resolvers: Resolvers = {
  Mutation: {
    AddBill: authResolver(
      async (
        _,
        args: AddBillMutationArgs,
        { ctx }: { ctx: Context }
      ): Promise<AddBillResponse> => {
        const { user_id, username } = ctx.state;

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
              error: '카트가 존재하지 않습니다.',
            };
          }

          let input_cart = { ...cart };
          let total = 0;

          input_cart.items.map((item) => {
            return (total += item.amount);
          });

          const bill = await getRepository(Bill).create({
            ...args,
            username,
            user_id,
            cart_id: input_cart.id,
            total_amount: total,
            items: input_cart.items,
          });

          await bill.save();

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
