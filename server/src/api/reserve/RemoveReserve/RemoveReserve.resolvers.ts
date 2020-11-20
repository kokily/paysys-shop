import { getRepository } from 'typeorm';
import {
  RemoveReserveMutationArgs,
  RemoveReserveResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { adminResolver } from '../../../libs/authenticate';
import Bill from '../../../entities/Bill';

const resolvers: Resolvers = {
  Mutation: {
    RemoveReserve: adminResolver(
      async (
        _,
        args: RemoveReserveMutationArgs
      ): Promise<RemoveReserveResponse> => {
        const { id } = args;

        try {
          const bill = await getRepository(Bill).findOne(id);

          if (!bill) {
            return {
              ok: false,
              error: '존재하지 않는 빌지입니다.',
            };
          }

          if (bill.reserve) {
            let remove_bill = { ...bill, reserve: 0 };

            await getRepository(Bill).update({ id }, { ...remove_bill });

            return {
              ok: true,
              error: null,
            };
          } else {
            return {
              ok: false,
              error: '예약금이 없습니다.',
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
