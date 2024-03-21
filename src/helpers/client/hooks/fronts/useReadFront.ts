import type { SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  readBillAPI,
  removeBillAPI,
  removeReserveAPI,
  restoreBillAPI,
} from '../../api/bills';
import { useRemoveModal } from '../common/useRemoveModal';

interface Props {
  id: string;
}

export function useReadFront({ id }: Props) {
  const { data } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Data Fetching
  const { data: front, refetch } = useQuery({
    queryKey: ['front'],
    queryFn: () => readBillAPI(id),
    enabled: !!id,
    staleTime: 150,
  });

  // Data Mutations
  const restoreBillMutate = useMutation({ mutationFn: restoreBillAPI });
  const removeReserveMutate = useMutation({ mutationFn: removeReserveAPI });
  const removeBillMutate = useMutation({ mutationFn: removeBillAPI });

  const onBack = () => {
    router.back();
  };

  const onRestoreBill = async () => {
    if (window.confirm('주의! 빌지가 삭제되고 전표확인으로 돌아갑니다.')) {
      await restoreBillMutate.mutateAsync(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['fronts', 'front', id, 'cart'],
          });
          router.replace('/cart');
        },
        onError: (err: any) => {
          toast.error(err.error);
        },
      });
    } else {
      return;
    }
  };

  const onAddReservePage = () => {
    router.push(`/fronts/update/${id}`);
  };

  const onRemoveReserve = async (e: SyntheticEvent) => {
    e.preventDefault();

    await removeReserveMutate.mutateAsync(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['fronts', 'front', id] });
        refetch();
      },
      onError: (err: any) => {
        toast.error(err.error);
      },
    });
  };

  const onRemoveBill = async (e: SyntheticEvent) => {
    e.preventDefault();

    await removeBillMutate.mutateAsync(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['fronts', 'front', id] });
        router.replace('/fronts');
      },
      onError: (err: any) => {
        toast.error(err.error);
      },
    });
  };

  // Remove Bill Modal
  const frontModal = useRemoveModal({ onRemove: onRemoveBill });

  return {
    front,
    userId: data?.user.id,
    isAdmin: data?.user.admin,
    onBack,
    onRestoreBill,
    onAddReservePage,
    onRemoveReserve,
    frontModal,
  };
}
