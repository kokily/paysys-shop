import React, { useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { READ_ITEM, UPDATE_ITEM } from 'graphql/items';
import UpdateItem from 'components/items/UpdateItem';

interface StateProps {
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: string;
}

const reducer = (state: StateProps, action: any) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

const UpdateItemContainer = () => {
  const history = useHistory();
  const { itemId }: any = useParams();
  const { data, loading, error } = useQuery(READ_ITEM, {
    variables: { id: itemId },
  });
  const [UpdateItemResolver, { client }] = useMutation(UPDATE_ITEM);
  const [state, dispatch] = useReducer(reducer, {
    name: data?.ReadItem?.ok && data.ReadItem.item.name,
    divide: data?.ReadItem?.ok && data.ReadItem.item.divide,
    native: data?.ReadItem?.ok && data.ReadItem.item.native,
    unit: data?.ReadItem?.ok && data.ReadItem.item.unit,
    price: data?.ReadItem?.ok && data.ReadItem.item.price,
  });
  const { name, divide, native, unit, price } = state;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(e.target);
  };

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const response = await UpdateItemResolver({
        variables: {
          id: itemId,
          name,
          divide,
          native,
          unit,
          price: parseInt(price),
        },
      });

      if (!response || !response.data) return;

      await client?.clearStore();

      toast.success('품목 수정 완료');
      history.goBack();
    } catch (err) {
      toast.error(err);
    }
  };

  const onBack = () => {
    history.goBack();
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // @ts-ignore
      onSubmit(e);
    }
  };

  if (loading) return null;
  if (error) return null;

  return (
    <UpdateItem
      name={name}
      divide={divide}
      native={native}
      unit={unit}
      price={price}
      onChange={onChange}
      onSubmit={onSubmit}
      onBack={onBack}
      onKeyPress={onKeyPress}
    />
  );
};

export default UpdateItemContainer;
