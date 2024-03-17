import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { removeCartAPI, removeOneCartAPI, viewCartAPI } from '../../api/cart';
import { addBillAPI } from '../../api/bills';
import { useRemoveModal } from '../common/useRemoveModal';

export function useViewCart() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // States
  const [payload, setPayload] = useState({
    title: '',
    hall: '',
    etc: '',
    totalAmount: 0,
  });
  const { title, hall, etc, totalAmount } = payload;

  // Data Fetching
  const { data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: () => viewCartAPI(),
    enabled: true,
    staleTime: 0,
  });

  // Data Mutations
  const addBillMutate = useMutation({ mutationFn: addBillAPI });
  const removeCartMutate = useMutation({ mutationFn: removeCartAPI });
  const removeOneCartMutate = useMutation({ mutationFn: removeOneCartAPI });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const onAddBill = async (e: SyntheticEvent) => {
    e.preventDefault();

    if ([title, hall].includes('')) {
      toast.error('빈 칸없이 입력해 주세요');
      return;
    }

    if (totalAmount < 1) {
      toast.error('금액을 확인해 주세요');
      return;
    }

    await addBillMutate.mutateAsync(
      {
        title,
        hall,
        etc: etc === '' ? ' ' : etc,
      },
      {
        onSuccess: (data) => {
          onRemoveAllCart();
          queryClient.invalidateQueries({ queryKey: ['fronts', 'cart'] });
          router.replace(`/fronts/${data.id}`);
        },
        onError: (err: any) => {
          toast.error(err.error);
        },
      },
    );
  };

  const onRemoveAllCart = async () => {
    await removeCartMutate.mutateAsync(undefined, {
      onSuccess: () => {
        setPayload({ title: '', hall: '', etc: '', totalAmount: 0 });
        queryClient.invalidateQueries({ queryKey: ['cart'] });
        toast.success('카트 삭제');
      },
      onError: (err: any) => {
        toast.error(err.error);
      },
    });
  };

  const onRemoveOneCart = async (id: string, name: string) => {
    if (window.confirm(`${name} 품목을 삭제합니다.`)) {
      await removeOneCartMutate.mutateAsync(id, {
        onSuccess: (data: any) => {
          queryClient.invalidateQueries({ queryKey: ['cart'] });

          if (data.id) {
            toast.success(`${name} 품목 삭제`);
            onCal(data.items);
          } else {
            toast.success(`카트 삭제`);
          }
        },
        onError: (err: any) => {
          toast.error(err.error);
        },
      });
    } else {
      return;
    }
  };

  const onCal = (items: Array<any>) => {
    let total = 0;

    for (let key in items as any) {
      total += items[key as any].amount;
    }

    setPayload({ ...payload, totalAmount: total });
  };

  // Remove Modal
  const removeCartModal = useRemoveModal({ onRemove: onRemoveAllCart });

  useEffect(() => {
    if (cart?.items && cart.items.length > 0) {
      onCal(cart.items);
    }
  }, [cart?.items]);

  return {
    cart,
    title,
    hall,
    etc,
    totalAmount,
    onChange,
    onAddBill,
    onRemoveOneCart,
    removeCartModal,
  };
}
