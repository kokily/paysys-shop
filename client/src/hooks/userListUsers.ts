import { useQuery } from '@apollo/react-hooks';
import { LIST_USERS } from 'graphql/users';
import { useState, useCallback } from 'react';
import useScroll from './useScroll';

const useListUsers = (username?: string) => {
  const { data, loading, error, fetchMore } = useQuery(LIST_USERS, {
    variables: { username },
  });
  const [isFinished, setIsFinished] = useState(false);

  const onLoadMore = useCallback(
    (cursor: string) => {
      fetchMore({
        variables: {
          username,
          // @ts-ignore
          cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          if (fetchMoreResult.ListUsers.users.length === 0) {
            setIsFinished(true);
          }

          return {
            ListUsers: {
              ...prev.ListUsers,
              users: [...prev.ListUsers.users, ...fetchMoreResult.ListUsers.users],
            },
          };
        },
      });
    },
    [fetchMore, username]
  );

  const cursor = data?.ListUsers?.users[data.ListUsers.users.length - 1]?.id;

  useScroll({
    cursor,
    onLoadMore,
  });

  return { data, loading, error, isFinished };
};

export default useListUsers;
