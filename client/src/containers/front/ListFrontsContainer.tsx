import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useListBills from 'hooks/useListBills';
import ListFronts from 'components/front/ListFronts';

const ListFrontsContainer = () => {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [user_id, setUserId] = useState('');
  const [hall, setHall] = useState('');
  const { data, loading, error } = useListBills(title, user_id, hall);

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
    setUserId(user_id);
  };

  const onHallList = async (hall: string) => {
    setHall(hall);
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

  if (loading) return null;
  if (error) return null;

  return (
    <ListFronts
      fronts={data?.ListBills.bills || []}
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
