import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { READ_ITEM, REMOVE_ITEM } from 'graphql/items';
import ReadItem from 'components/items/ReadItem';

const ReadItemContainer = () => {
  const client = useApolloClient();
  const history = useHistory();
  const { itemId }: any = useParams();
  const { data, loading, error } = useQuery(READ_ITEM, {
    variables: { id: itemId },
  });
  const [RemoveItem] = useMutation(REMOVE_ITEM);

  const onList = () => {
    history.push('/items');
  };

  const onEdit = () => {
    history.push(`/item/update/${itemId}`);
  };

  const onRemoveItem = async () => {
    try {
      const response = await RemoveItem({
        variables: { id: itemId },
      });

      if (!response) return;

      await client.clearStore();

      toast.success('삭제 완료');
      history.goBack();
    } catch (err) {
      toast.error(err);
    }
  };

  if (loading) return null;
  if (error) return null;

  return (
    <ReadItem
      item={data.ReadItem.item}
      onList={onList}
      onEdit={onEdit}
      onRemoveItem={onRemoveItem}
    />
  );
};

export default ReadItemContainer;
