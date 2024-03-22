import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addItemAPI, readItemAPI, updateItemAPI } from '../../api/items';

interface Props {
  id?: string;
}

export function useAddItem({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const initialState: AddItemState = {
    name: '',
    divide: '식사(뷔페)',
    native: '현역',
    unit: '',
    price: '',
  };

  const [payload, setPayload] = useState(initialState);
  const { name, divide, native, unit, price } = payload;

  // Data Fetching for Update
  const { data: item } = useQuery({
    queryKey: ['updateItem'],
    queryFn: () => readItemAPI(id!),
    enabled: !!id && id.length > 3,
  });

  // Mutations
  const addItemMutate = useMutation({ mutationFn: addItemAPI });
  const updateItemMutate = useMutation({ mutationFn: updateItemAPI });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const onBack = () => {
    router.back();
  };

  const onSubmitItem = async (e: SyntheticEvent) => {
    e.preventDefault();

    if ([name, divide, native, unit, price].includes('')) {
      toast.warning('빈 칸 없이 입력해 주세요');
      return;
    }

    if (id && id.length > 3) {
      // Update Item
      await updateItemMutate.mutateAsync(
        {
          id,
          payload: { name, divide, native, unit, price: parseInt(price) },
        },
        {
          onSuccess: () => {
            toast.success('품목 수정!');
            setPayload(initialState);
            queryClient.invalidateQueries({ queryKey: ['items', 'item', id] });
            router.back();
          },
          onError: (err: any) => {
            toast.error(err.error);
          },
        },
      );
    } else {
      // Add Item
      await addItemMutate.mutateAsync(
        { name, divide, native, unit, price: parseInt(price) },
        {
          onSuccess: () => {
            toast.success('품목 추가!');
            setPayload(initialState);
            queryClient.invalidateQueries({ queryKey: ['items', 'item'] });
            router.back();
          },
          onError: (err: any) => {
            toast.error(err.error);
          },
        },
      );
    }
  };

  useEffect(() => {
    if (item) {
      setPayload({
        name: item.name,
        divide: item.divide,
        native: item.native,
        unit: item.unit,
        price: item.price.toString(),
      });
    }
  }, [item]);

  return {
    name,
    divide,
    native,
    unit,
    price,
    onChange,
    onBack,
    onSubmitItem,
  };
}
