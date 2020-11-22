import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import { READ_USER, REMOVE_USER, SET_ADMIN, SET_EMPLOYEE } from 'graphql/users';
import { toast } from 'react-toastify';
import ReadUser from 'components/users/ReadUser';

const ReadUserContainer = () => {
  const client = useApolloClient();
  const history = useHistory();
  const { userId }: any = useParams();
  const { data, loading, error } = useQuery(READ_USER, {
    variables: { id: userId },
  });
  const [RemoveUser] = useMutation(REMOVE_USER);
  const [SetAdmin] = useMutation(SET_ADMIN);
  const [SetEmployee] = useMutation(SET_EMPLOYEE);

  const onBack = () => {
    history.push('/users');
  };

  const onRemoveUser = async () => {
    try {
      const response = await RemoveUser({
        variables: { id: userId },
      });

      if (!response) return;

      await client.clearStore();

      toast.success('사용자 삭제 완료');
      history.push('/users');
    } catch (err) {
      toast.error(err);
    }
  };

  const onSetAdmin = async () => {
    try {
      const response = await SetAdmin({
        variables: { id: userId },
      });

      if (!response || !response.data) return;

      await client.clearStore();

      toast.success('관리자 권한 부여!');
      history.push('/users');
    } catch (err) {
      toast.error(err);
    }
  };

  const onSetEmployee = async () => {
    try {
      const response = await SetEmployee({
        variables: { id: userId },
      });

      if (!response || !response.data) return;

      await client.clearStore();

      toast.success('일반 권한 부여');
      history.push('/users');
    } catch (err) {
      toast.error(err);
    }
  };

  if (loading) return null;
  if (error) return null;

  return (
    <ReadUser
      user={data.ReadUser.user}
      onBack={onBack}
      onRemoveUser={onRemoveUser}
      onSetAdmin={onSetAdmin}
      onSetEmployee={onSetEmployee}
    />
  );
};

export default ReadUserContainer;
