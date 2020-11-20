import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { LOGIN_USER } from 'graphql/auth';
import { setAccessToken } from 'libs/accessToken';
import AuthTemplate from 'components/auth/AuthTemplate';
import AuthForm from 'components/auth/AuthForm';

interface StateProps {
  username: string;
  password: string;
}

const reducer = (state: StateProps, action: any) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

const LoginPage = () => {
  const [state, dispatch] = useReducer(reducer, {
    username: '',
    password: '',
  });
  const { username, password } = state;
  const [LoginUser, { client }] = useMutation(LOGIN_USER);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  };

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if ([username, password].includes('')) {
      toast.error('빈 칸을 모두 입력하세요!');
      return;
    }

    try {
      const response = await LoginUser({
        variables: { username, password },
      });

      if (!response || !response.data) return;
      if (response.data.LoginUser.error) {
        toast.error(response.data.LoginUser.error);
        return;
      }

      setAccessToken(response.data.LoginUser.token);
      await client?.clearStore();

      window.location.href = '/soldier';
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <AuthTemplate mode="login">
      <AuthForm
        mode="login"
        username={username}
        password={password}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </AuthTemplate>
  );
};

export default LoginPage;
