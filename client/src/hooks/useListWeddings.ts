import { useQuery } from '@apollo/react-hooks';
import { LIST_WEDDINGS } from 'graphql/weddings';
import { WeddingType } from 'libs/types';
import { useState, useCallback } from 'react';
import useScroll from './useScroll';

const useListWeddings = (date?: string) => {
  const { data, loading, error, fetchMore } = useQuery<{
    ListWeddings: { weddings: WeddingType[] };
  }>(LIST_WEDDINGS, {
    variables: { date },
  });
  const [isFinished, setIsFinished] = useState(false);

  const onLoadMore = useCallback(
    (cursor: string) => {
      fetchMore({
        variables: {
          date,
          cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          if (fetchMoreResult.ListWeddings.weddings.length === 0) {
            setIsFinished(true);
          }

          return {
            ListWeddings: {
              ...prev.ListWeddings,
              weddings: [...prev.ListWeddings.weddings, ...fetchMoreResult.ListWeddings.weddings],
            },
          };
        },
      });
    },
    [fetchMore, date]
  );

  const cursor = data?.ListWeddings?.weddings[data.ListWeddings.weddings.length - 1]?.id;

  useScroll({
    cursor,
    onLoadMore,
  });

  return { data, loading, error, isFinished };
};

export default useListWeddings;
