import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { readMenuAPI } from '../../api/menu';
import { addCartAPI } from '../../api/cart';

interface Props {
  id: string;
}

export function useReadMenu({ id }: Props) {
  const { data } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [payload, setPayload] = useState({
    count: '',
    price: '',
  });
  const { count, price } = payload;

  // Data Fetching
  const { data: menu } = useQuery({
    queryKey: ['readMenu'],
    queryFn: () => readMenuAPI(id),
    enabled: !!id,
  });

  // Data Mutations
  const addCartMutate = useMutation({ mutationFn: addCartAPI });

  const onBack = () => {
    router.back();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const onAddCart = async (e: SyntheticEvent) => {
    e.preventDefault();

    if ([price, count].includes('')) {
      toast.error('빈 칸 없이 입력해 주세요');
      return;
    }

    await addCartMutate.mutateAsync(
      {
        userId: data?.user.id!,
        itemId: id,
        price: parseInt(price),
        count: parseInt(count),
      },
      {
        onSuccess: () => {
          toast.success('카트에 품목 추가!');
          queryClient.invalidateQueries({ queryKey: ['readMenu', id, 'cart'] });
          router.back();
        },
        onError: (err: any) => {
          toast.error(err.error);
        },
      },
    );
  };

  useEffect(() => {
    if (menu) {
      if (menu.price !== 0) {
        setPayload({ ...payload, price: menu.price.toString() });
      } else {
        setPayload({ ...payload, price: '' });
      }
    }
  }, [menu]);

  return {
    menu,
    price,
    count,
    onChange,
    onBack,
    onAddCart,
  };
}
