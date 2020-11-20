import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import qs from 'qs';
import { LIST_ITEMS } from 'graphql/items';
import ListMenu from 'components/home/ListMenu';

interface QueryType {
  native?: string;
  divide?: string;
}

const ListMenuContainer = () => {
  const history = useHistory();
  const location = useLocation();
  const [native, setNative] = useState('');
  const [divide, setDivide] = useState('');
  const { data, loading, error } = useQuery(LIST_ITEMS, {
    variables: { native, divide },
  });

  const onBack = () => {
    history.goBack();
  };

  const onMenu = (id: string) => {
    history.push(`/menu/${id}`);
  };

  useEffect(() => {
    const { native, divide }: QueryType = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    if (native) setNative(native);
    if (divide) setDivide(divide);
  }, [location.search]);

  if (loading) return null;
  if (error) return null;

  return <ListMenu menu={data.ListItems.items} onBack={onBack} onMenu={onMenu} />;
};

export default ListMenuContainer;
