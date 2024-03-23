import type { Wedding } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import useLocalStorage from 'use-local-storage';
import { listWeddingsAPI } from '../../api/weddings';
import { useObserver } from '../common/useObserver';

export function useListWeddings() {
  const router = useRouter();
  const [scrollY, setScrollY] = useLocalStorage('listWeddingsSCroll', 0);

  // States
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState<string>('');

  // Data Fetching
  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    initialPageParam: '',
    queryKey: ['weddings'],
    queryFn: ({ pageParam }) =>
      listWeddingsAPI({
        cursor: pageParam,
        husbandName: select === 'husband' ? search : '',
        brideName: select === 'bride' ? search : '',
      }),
    getNextPageParam: (data) =>
      data && data.length === 40 ? data[data.length - 1].id : undefined,
  });

  const weddings = useMemo(() => {
    if (!data) return [];

    return ([] as Array<Wedding>).concat(...data.pages);
  }, [data]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  const onSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    await refetch();
  };

  const onReadWedding = (id: string) => {
    setScrollY(window.scrollY);
    router.push(`/wedding/${id}`);
  };

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && fetchNextPage();
  };

  const { setTarget } = useObserver({ onIntersect });

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return {
    weddings,
    search,
    select,
    onChange,
    onChangeSelect,
    onSearch,
    onReadWedding,
    setTarget,
  };
}
