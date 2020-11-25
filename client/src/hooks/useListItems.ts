import { useQuery } from '@apollo/react-hooks';
import { useState, useCallback } from 'react';
import { LIST_ITEMS } from 'graphql/items';
import useScroll from './useScroll';
import { ItemType } from 'libs/types';

const useListItems = (name?: string) => {
  const { data, loading, error, fetchMore } = useQuery<{
    ListItems: { items: ItemType[] };
  }>(LIST_ITEMS, {
    variables: { name },
  });
  const [isFinished, setIsFinished] = useState(false);

  const onLoadMore = useCallback(
    (cursor: string) => {
      fetchMore({
        variables: {
          name,
          cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          if (fetchMoreResult.ListItems.items.length === 0) {
            setIsFinished(true);
          }

          return {
            ListItems: {
              ...prev.ListItems,
              items: [...prev.ListItems.items, ...fetchMoreResult.ListItems.items],
            },
          };
        },
      });
    },
    [fetchMore, name]
  );

  const cursor = data?.ListItems?.items[data.ListItems.items.length - 1]?.id;

  useScroll({
    cursor,
    onLoadMore,
  });

  return { data, loading, error, isFinished };
};

export default useListItems;
