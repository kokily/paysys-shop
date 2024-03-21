import type { Bill } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import useLocalStorage from 'use-local-storage';
import { listBillsAPI } from '../../api/bills';
import { useObserver } from '../common/useObserver';

export function useListFronts() {
  const router = useRouter();
  const [scrollY, setScrollY] = useLocalStorage('listFrontsScroll', 0);

  // States
  const [search, setSearch] = useState('');
  const [hall, setHall] = useState('');
  const [userId, setUserId] = useState('');

  // Data Fetching
  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    initialPageParam: '',
    queryKey: ['fronts'],
    queryFn: ({ pageParam }) =>
      listBillsAPI({ cursor: pageParam, title: search, hall, userId }),
    getNextPageParam: (data) =>
      data && data.length === 40 ? data[data.length - 1].id : undefined,
  });

  const fronts = useMemo(() => {
    if (!data) return [];

    return ([] as Array<Bill>).concat(...data.pages);
  }, [data]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const onReadFront = (id: string) => {
    setScrollY(window.scrollY);
    router.push(`/front/${id}`);
  };

  const onHallList = async (hall: string) => {
    await setHall(hall);
    await refetch();
  };

  const onUsersList = async (userId: string) => {
    await setUserId(userId);
    await refetch();
  };

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && fetchNextPage();
  };

  const { setTarget } = useObserver({ onIntersect });

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return {
    fronts,
    search,
    onChange,
    onSearch,
    onReadFront,
    setTarget,
    onHallList,
    onUsersList,
  };
}
