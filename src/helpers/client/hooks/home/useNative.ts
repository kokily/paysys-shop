import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function useNative() {
  const router = useRouter();
  const link = usePathname().substring(1);

  const menu = [
    { id: 0, divide: '식사(뷔페)' },
    { id: 1, divide: '식사(중식)' },
    { id: 2, divide: '식사(양식)' },
    { id: 3, divide: '식사(한식)' },
    { id: 4, divide: '식사(수행)' },
    { id: 5, divide: '식사(다과)' },
    { id: 6, divide: '대관료' },
    { id: 7, divide: '레드와인' },
    { id: 8, divide: '화이트와인/샴페인' },
    { id: 9, divide: '주스/차' },
    { id: 10, divide: '민속주/고량주' },
    { id: 11, divide: '양주' },
    { id: 12, divide: '기타주류' },
    { id: 13, divide: '칵테일' },
    { id: 14, divide: '반입료' },
    { id: 15, divide: '부대비용' },
  ];

  const onMenu = useCallback(
    (divide: string) => {
      let native = '';

      switch (link) {
        case 'soldier':
          native = '현역';
          break;
        case 'reserve':
          native = '예비역';
          break;
        case 'general':
          native = '일반';
          break;
        default:
          break;
      }

      router.push(`/menu?native=${native}&divide=${divide}`);
    },
    [link],
  );

  return {
    menu,
    link,
    onMenu,
  };
}
