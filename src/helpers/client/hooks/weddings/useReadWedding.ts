import type { SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { removeSignAPI } from '../../api/sign';
import { readWeddingAPI, removeWeddingAPI } from '../../api/weddings';
import { useRemoveModal } from '../common/useRemoveModal';

interface Props {
  id: string;
}

export function useReadWedding({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Data Fetching
  const { data: wedding, refetch } = useQuery({
    queryKey: ['wedding'],
    queryFn: () => readWeddingAPI(id),
    enabled: !!id,
  });

  // Data Mutations
  const removeSignMutate = useMutation({ mutationFn: removeSignAPI });
  const removeWeddingMutate = useMutation({ mutationFn: removeWeddingAPI });

  const onBack = () => {
    router.back();
  };

  const onUpdateWedding = () => {
    router.push(`/expense/update/${id}`);
  };

  const onRemoveSign = async (sex: string) => {
    await removeSignMutate.mutateAsync(
      { id, payload: { sex } },
      {
        onSuccess: () => {
          toast.success(`${sex === 'husband' ? '신랑' : '신부'} 서명 삭제`);
          queryClient.invalidateQueries({ queryKey: ['wedding', id] });
          refetch();
        },
        onError: (err: any) => {
          toast.error(err.error);
        },
      },
    );
  };

  const onRemoveWedding = async (e: SyntheticEvent) => {
    e.preventDefault();

    await removeWeddingMutate.mutateAsync(id!, {
      onSuccess: () => {
        toast.success('웨딩빌지 삭제');
        queryClient.invalidateQueries({ queryKey: ['weddings', 'wedding', id] });
        router.replace('/weddings');
      },
      onError: (err: any) => {
        toast.error(err.error);
      },
    });
  };

  // Remove Wedding Modal
  const weddingModal = useRemoveModal({ onRemove: onRemoveWedding });

  return {
    wedding,
    onBack,
    onUpdateWedding,
    onRemoveSign,
    weddingModal,
    refetch,
  };
}
