import type { ChangeEvent, SyntheticEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addReserveAPI } from '../../api/bills';

interface Props {
  id: string;
}

export function useAddReserve({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // State
  const [reserve, setReserve] = useState('');

  // Mutations
  const addReserveMutate = useMutation({ mutationFn: addReserveAPI });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReserve(e.target.value);
  };

  const onBack = () => {
    router.back();
  };

  const onAddReserve = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (reserve === '' || reserve === '0') {
      toast.error('빈 칸 없이 입력하세요');
      return;
    }

    await addReserveMutate.mutateAsync(
      { billId: id, reserve: parseInt(reserve) },
      {
        onSuccess: () => {
          toast.success('예약금 저장');
          queryClient.invalidateQueries({ queryKey: ['fronts', 'front', id] });
          router.back();
        },
        onError: (err: any) => {
          toast.error(err.error);
        },
      },
    );
  };

  return {
    reserve,
    onChange,
    onBack,
    onAddReserve,
  };
}
