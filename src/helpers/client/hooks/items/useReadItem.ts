import type { SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { readItemAPI, removeItemAPI } from '../../api/items';
import { useRemoveModal } from '../common/useRemoveModal';

interface Props {
  id: string;
}

export function useReadItem({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Data Fetching
  const { data: item } = useQuery({
    queryKey: ['item'],
    queryFn: () => readItemAPI(id),
    enabled: !!id,
  });

  // Mutations
  const removeItemMutate = useMutation({ mutationFn: removeItemAPI });

  const onBack = () => {
    router.back();
  };

  const onUpdateItemPage = () => {
    router.push(`/items/update/${id}`);
  };

  const onRemoveItem = async (e: SyntheticEvent) => {
    e.preventDefault();

    await removeItemMutate.mutateAsync(id, {
      onSuccess: () => {
        toast.success('품목 삭제');
        queryClient.invalidateQueries({ queryKey: ['items', 'item', id] });
        router.back();
      },
      onError: (err: any) => {
        toast.error(err.error);
      },
    });
  };

  // Remove Item Modal
  const itemModal = useRemoveModal({ onRemove: onRemoveItem });

  return {
    item,
    onBack,
    onUpdateItemPage,
    onRemoveItem,
    itemModal,
  };
}
