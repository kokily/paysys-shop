import { useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LIST_BILLS } from 'graphql/bills';
import useScroll from './useScroll';

const useListBills = (title?: string, user_id?: string, hall?: string) => {
  const { data, loading, error, fetchMore, refetch } = useQuery(LIST_BILLS, {
    variables: {
      title,
      user_id,
      hall,
    },
  });
  const [isFinished, setIsFinished] = useState(false);

  const onLoadMore = useCallback(
    (cursor: string) => {
      fetchMore({
        variables: {
          title,
          user_id,
          hall,
          // @ts-ignore
          cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          if (fetchMoreResult.ListBills.bills.length === 0) {
            setIsFinished(true);
          }

          return {
            ListBills: {
              ...prev.ListBills,
              bills: [...prev.ListBills.bills, ...fetchMoreResult.ListBills.bills],
            },
          };
        },
      });
    },
    [fetchMore, title, user_id, hall]
  );

  const cursor = data?.ListBills?.bills[data.ListBills.bills.length - 1]?.id;

  useScroll({
    cursor,
    onLoadMore,
  });

  return { data, loading, error, isFinished, refetch };
};

export default useListBills;
