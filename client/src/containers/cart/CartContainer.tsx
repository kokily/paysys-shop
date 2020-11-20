import React, { useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { ADD_BILL } from 'graphql/bills';
import { REMOVE_CART, REMOVE_ONE, VIEW_CART } from 'graphql/carts';
import Cart from 'components/cart/Cart';

interface StateProps {
  title: string;
  hall: string;
  etc: string;
}

const reducer = (state: StateProps, action: any) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

const CartContainer = () => {
  const client = useApolloClient();
  const history = useHistory();
  const { data, loading, error, refetch } = useQuery(VIEW_CART);
  const [RemoveCart] = useMutation(REMOVE_CART);
  const [RemoveOne] = useMutation(REMOVE_ONE);
  const [AddBill] = useMutation(ADD_BILL);
  const [state, dispatch] = useReducer(reducer, {
    title: '',
    hall: '',
    etc: ' ',
  });
  const { title, hall, etc } = state;
  const [totalAmount, setTotalAmount] = useState(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  };

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if ([title, hall, etc].includes('')) {
      toast.error('빈 칸 없이 입력해주세요.');
      return;
    }

    try {
      const response = await AddBill({
        variables: { title, hall, etc },
      });

      if (!response || !response.data) return;

      await client.clearStore();
      toast.success('전표 전송 성공');

      await RemoveCart();
      history.push('/front');
    } catch (err) {
      toast.error(err);
    }
  };

  const onRemoveCart = async () => {
    try {
      await client.clearStore();
      await RemoveCart();

      toast.success('카트 전체 삭제!');
      history.push('/soldier');
    } catch (err) {
      toast.error(err);
    }
  };

  const onRemoveOne = async (id: string, name: string) => {
    if (window.confirm(`${name} 품목을 삭제합니다!!`)) {
      try {
        const response = await RemoveOne({
          variables: { item_id: id },
        });

        if (!response) return;

        await client.clearStore();
        toast.success('품목 삭제!');

        refetch();
        history.push('/cart');
      } catch (err) {
        toast.error(err);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    if (data?.ViewCart?.ok) {
      if (data.ViewCart.cart) {
        if (data.ViewCart.cart.items || data.ViewCart.cart.items.length !== 0) {
          let total = 0;
          let list = data.ViewCart.cart.items;

          if (list) {
            for (let key in list) {
              total += parseInt(list[key].amount);
            }
          }

          setTotalAmount(total);
        }
      }
    }
  }, [data]);

  if (loading) return null;
  if (error) return null;

  return (
    <Cart
      title={title}
      hall={hall}
      etc={etc}
      cart={data.ViewCart.cart}
      onChange={onChange}
      totalAmount={totalAmount}
      onRemoveCart={onRemoveCart}
      onRemoveOne={onRemoveOne}
      onSubmit={onSubmit}
    />
  );
};

export default CartContainer;
