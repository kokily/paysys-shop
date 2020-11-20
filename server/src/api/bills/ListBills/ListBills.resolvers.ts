import { getManager, getRepository } from 'typeorm';
import { ListBillsQueryArgs, ListBillsResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { authResolver } from '../../../libs/authenticate';
import Bill from '../../../entities/Bill';

const resolvers: Resolvers = {
  Query: {
    ListBills: authResolver(
      async (_, args: ListBillsQueryArgs): Promise<ListBillsResponse> => {
        const { cursor, user_id, title, hall } = args;

        try {
          const query = await getManager()
            .createQueryBuilder(Bill, 'bill')
            .limit(20)
            .orderBy('bill.created_at', 'DESC')
            .addOrderBy('bill.id', 'DESC');

          if (cursor) {
            const bill = await getRepository(Bill).findOne({ id: cursor });

            if (!bill) {
              return {
                ok: false,
                error: '잘못된 요청',
                bills: null,
              };
            }

            query.andWhere('bill.created_at < :date', {
              date: bill.created_at,
            });

            query.orWhere('bill.created_at = :date AND bill.id < :id', {
              date: bill.created_at,
              id: bill.id,
            });
          }

          if (user_id) {
            query.andWhere('bill.user_id = :user_id', {
              user_id,
            });
          }

          if (title) {
            query.andWhere('bill.title like :title', {
              title: `%${title}%`,
            });
          }

          if (hall) {
            query.andWhere('bill.hall = :hall', {
              hall,
            });
          }

          const bills = await query.getMany();

          return {
            ok: true,
            error: null,
            bills,
          };
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            bills: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
