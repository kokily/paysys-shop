import type { Item } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import useLocalStorage from 'use-local-storage';
import { listItemsAPI } from '../../api/items';
import { useObserver } from '../common/useObserver';

export function useListItems() {
  const router = useRouter();
  const [scrollY, setScrollY] = useLocalStorage('listItemsScroll', 0);

  // Search
  const [search, setSearch] = useState('');

  // Data Fetching
  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    initialPageParam: '',
    queryKey: ['items'],
    queryFn: ({ pageParam }) => listItemsAPI({ cursor: pageParam, name: search }),
    getNextPageParam: (data) =>
      data && data.length === 40 ? data[data.length - 1].id : undefined,
  });

  const items = useMemo(() => {
    if (!data) return [];

    return ([] as Array<Item>).concat(...data.pages);
  }, [data]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    await refetch();
  };

  const onReadItem = (id: string) => {
    setScrollY(window.scrollY);
    router.push(`/item/${id}`);
  };

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && fetchNextPage();
  };

  const { setTarget } = useObserver({ onIntersect });

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return {
    items,
    search,
    onChange,
    onSearch,
    onReadItem,
    setTarget,
  };
}
