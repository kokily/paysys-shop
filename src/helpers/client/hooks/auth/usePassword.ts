import type { ChangeEvent, SyntheticEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { changePasswordAPI } from '../../api/auth';

export function usePassword() {
  const router = useRouter();

  // State
  const [password, setPassword] = useState('');

  // Mutation
  const changePasswordMutate = useMutation({ mutationFn: changePasswordAPI });

  const onBack = () => {
    router.back();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangePassword = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (password === '') {
      toast.error('빈 칸 없이 작성하세요');
      return;
    }

    await changePasswordMutate.mutateAsync(
      { password },
      {
        onSuccess: () => {
          toast.success('비밀번호 변경!');
          setPassword('');
          router.refresh();
        },
        onError: (err: any) => {
          toast.error(err.error);
        },
      },
    );
  };

  return {
    password,
    onBack,
    onChange,
    onChangePassword,
  };
}
