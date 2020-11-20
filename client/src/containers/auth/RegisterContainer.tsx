import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { REGISTER_USER } from 'graphql/auth';
import AuthTemplate from 'components/auth/AuthTemplate';
import AuthForm from 'components/auth/AuthForm';

interface StateProps {
  username: string;
  password: string;
  password_confirm: string;
}

const reducer = (state: StateProps, action: any) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

const RegisterContainer = () => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, {
    username: '',
    password: '',
    password_confirm: '',
  });
  const { username, password, password_confirm } = state;
  const [RegisterUser] = useMutation(REGISTER_USER);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  };

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if ([username, password, password_confirm].includes('')) {
      toast.error('빈 칸 없이 입력해주세요!');
      return;
    }

    try {
      const response = await RegisterUser({
        variables: { username, password },
      });

      if (!response || !response.data) return;

      toast.error('사원등록 성공');
      history.push('/');
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <AuthTemplate mode="register">
      <AuthForm
        mode="register"
        username={username}
        password={password}
        password_confirm={password_confirm}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </AuthTemplate>
  );
};

export default RegisterContainer;
