import type { SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { employeeUserAPI, readUserAPI, removeUserAPI } from '../../api/users';
import { useRemoveModal } from '../common/useRemoveModal';

interface Props {
  id: string;
}

export function useReadUser({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Data Fetching
  const { data: user, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: () => readUserAPI(id),
    enabled: !!id,
  });

  // Data Mutations
  const removeUserMutate = useMutation({ mutationFn: removeUserAPI });
  const employeeUserMutate = useMutation({ mutationFn: employeeUserAPI });

  const onBack = () => {
    router.back();
  };

  const onRemoveUser = async (e: SyntheticEvent) => {
    e.preventDefault();

    await removeUserMutate.mutateAsync(id, {
      onSuccess: () => {
        toast.success('사용자 삭제 완료');
        queryClient.invalidateQueries({ queryKey: ['users', 'user', id] });
        router.back();
      },
      onError: (err: any) => {
        toast.error(err.error);
      },
    });
  };

  const onSetIdentity = async (e: SyntheticEvent) => {
    e.preventDefault();

    await employeeUserMutate.mutateAsync(id, {
      onSuccess: () => {
        toast.success('권한 변경!');
        queryClient.invalidateQueries({ queryKey: ['users', 'user', id] });
        refetch();
      },
      onError: (err: any) => {
        toast.error(err.error);
      },
    });
  };

  // Remove User Modal
  const userModal = useRemoveModal({ onRemove: onRemoveUser });

  return {
    user,
    onBack,
    onSetIdentity,
    userModal,
  };
}
