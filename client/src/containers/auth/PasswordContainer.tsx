import { useMutation } from '@apollo/react-hooks';
import Password from 'components/auth/Password';
import { CHANGE_PASSWORD } from 'graphql/auth';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const PasswordContainer = () => {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [ChangePassword, { client }] = useMutation(CHANGE_PASSWORD);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const response = await ChangePassword({
        variables: { password },
      });

      if (!response || !response.data) return;

      await client?.clearStore();

      toast.success('비밀번호 변경 완료');
      history.push('/soldier');
    } catch (err) {
      toast.error(err);
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // @ts-ignore
      onSubmit(e);
    }
  };

  const onCancel = () => {
    history.push('/soldier');
  };

  return (
    <Password
      password={password}
      onChange={onChange}
      onSubmit={onSubmit}
      onKeyPress={onKeyPress}
      onCancel={onCancel}
    />
  );
};

export default PasswordContainer;
