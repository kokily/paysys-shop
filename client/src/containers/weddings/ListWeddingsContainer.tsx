import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ListWeddings from 'components/weddings/ListWeddings';
import useListWeddings from 'hooks/useListWeddings';

const ListWeddingsContainer = () => {
  const history = useHistory();
  const [date, setDate] = useState('');
  const [search, setSearch] = useState('');
  const { data, loading, error } = useListWeddings(date);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearch(e.target.value);
  };

  const onSearch = (e: React.MouseEvent) => {
    e.preventDefault();

    if (search === '') {
      return;
    } else {
      setDate(search);
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // @ts-ignore
      onSearch(e);
    }
  };

  const onDetail = (id: string) => {
    history.push(`/wedding/${id}`);
  };

  if (error) return null;
  if (loading) return null;

  return (
    <ListWeddings
      weddings={data.ListWeddings.weddings}
      search={search}
      onChange={onChange}
      onSearch={onSearch}
      onKeyPress={onKeyPress}
      onDetail={onDetail}
    />
  );
};

export default ListWeddingsContainer;
