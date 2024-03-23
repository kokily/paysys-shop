import type { ChangeEvent, SyntheticEvent } from 'react';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import useLocalStorage from 'use-local-storage';
import { listUsersAPI } from '../../api/users';
import { useObserver } from '../common/useObserver';

export function useListUsers() {
  const router = useRouter();
  const [scrollY, setScrollY] = useLocalStorage('listUsersScroll', 0);

  const [search, setSearch] = useState('');

  // Data Fetching
  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    initialPageParam: '',
    queryKey: ['users'],
    queryFn: ({ pageParam }) =>
      listUsersAPI({ cursor: pageParam, username: search }),
    getNextPageParam: (data) =>
      data && data.length === 40 ? data[data.length - 1].id : undefined,
  });

  const users = useMemo(() => {
    if (!data) return [];

    return ([] as Array<SerializedUser>).concat(...data.pages);
  }, [data]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    await refetch();
  };

  const onReadUser = (id: string) => {
    setScrollY(window.scrollY);
    router.push(`/user/${id}`);
  };

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && fetchNextPage();
  };

  const { setTarget } = useObserver({ onIntersect });

  return {
    users,
    search,
    onChange,
    onSearch,
    onReadUser,
    setTarget,
  };
}
