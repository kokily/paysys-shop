import { getRepository } from 'typeorm';
import { ReadBillQueryArgs, ReadBillResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { authResolver } from '../../../libs/authenticate';
import Bill from '../../../entities/Bill';

const resolvers: Resolvers = {
  Query: {
    ReadBill: authResolver(
      async (_, args: ReadBillQueryArgs): Promise<ReadBillResponse> => {
        const { id } = args;

        try {
          const bill = await getRepository(Bill).findOne(id);

          if (!bill) {
            return {
              ok: false,
              error: '존재하지 않는 빌지입니다.',
              bill: null,
            };
          }

          return {
            ok: true,
            error: null,
            bill,
          };
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            bill: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
