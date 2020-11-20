import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';
import useListBills from 'hooks/useListBills';
import qs from 'qs';
import ListFronts from 'components/front/ListFronts';

interface QueryType {
  user_id?: string;
  hall?: string;
}

const ListFrontsContainer = () => {
  const client = useApolloClient();
  const history = useHistory();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [user_id, setUserId] = useState('');
  const [hall, setHall] = useState('');
  const { data, loading, error, refetch } = useListBills(title, user_id, hall);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearch = (e: React.MouseEvent) => {
    e.preventDefault();

    if (search === '') {
      return;
    } else {
      setTitle(search);
    }
  };

  const onUserList = async (user_id: string) => {
    history.push(`/fronts?user_id=${user_id}`);
    await client.clearStore();
    await refetch();
  };

  const onHallList = async (hall: string) => {
    history.push(`/fronts?hall=${hall}`);
    await client.clearStore();
    await refetch();
  };

  const onDetail = (id: string) => {
    history.push(`/front/${id}`);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // @ts-ignore
      onSearch(e);
    }
  };

  useEffect(() => {
    const { user_id, hall }: QueryType = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    if (user_id) setUserId(user_id);
    if (hall) setHall(hall);
  }, [location.search]);

  if (loading) return null;
  if (error) return null;

  return (
    <ListFronts
      fronts={data.ListBills.bills}
      search={search}
      onChange={onChange}
      onSearch={onSearch}
      onUserList={onUserList}
      onHallList={onHallList}
      onDetail={onDetail}
      onKeyPress={onKeyPress}
    />
  );
};

export default ListFrontsContainer;
