import { getRepository } from 'typeorm';
import {
  AddReserveMutationArgs,
  AddReserveResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { adminResolver } from '../../../libs/authenticate';
import Bill from '../../../entities/Bill';

const resolvers: Resolvers = {
  Mutation: {
    AddReserve: adminResolver(
      async (_, args: AddReserveMutationArgs): Promise<AddReserveResponse> => {
        const { bill_id, reserve } = args;

        try {
          const bill = await getRepository(Bill).findOne({ id: bill_id });

          if (!bill) {
            return {
              ok: false,
              error: '존재하지 않는 빌지입니다.',
            };
          }

          let modify_bill = { ...bill, reserve };

          await getRepository(Bill).update({ id: bill_id }, { ...modify_bill });

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
