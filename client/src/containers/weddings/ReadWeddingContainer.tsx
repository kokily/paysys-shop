import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { BrowserView, MobileView } from 'react-device-detect';
import { READ_WEDDING, REMOVE_WEDDING } from 'graphql/weddings';
import { toast } from 'react-toastify';
import ReadWedding from 'components/weddings/ReadWedding';
import ReadWeddingMobile from 'components/weddings/ReadWeddingMobile';

const ReadWeddingContainer = () => {
  const history = useHistory();
  const { weddingId }: any = useParams();
  const { data, loading, error } = useQuery(READ_WEDDING, {
    variables: { id: weddingId },
  });
  const [RemoveWedding, { client }] = useMutation(REMOVE_WEDDING);

  const onList = () => {
    history.push('/weddings');
  };

  const onBack = () => {
    history.goBack();
  };

  const onUpdate = () => {
    history.push(`/wedding/update/${weddingId}`);
  };

  const onRemoveWedding = async () => {
    try {
      const response = await RemoveWedding({
        variables: { id: weddingId },
      });

      if (!response) return;

      await client?.clearStore();

      toast.success('웨딩 전표 삭제 완료');
      history.goBack();
    } catch (err) {
      toast.error(err);
    }
  };

  if (loading) return null;
  if (error) return null;

  return (
    <>
      <BrowserView>
        <ReadWedding
          wedding={data.ReadWedding.wedding}
          onList={onList}
          onBack={onBack}
          onRemove={onRemoveWedding}
          onUpdate={onUpdate}
        />
      </BrowserView>
      <MobileView>
        <ReadWeddingMobile
          wedding={data.ReadWedding.wedding}
          onList={onList}
          onBack={onBack}
          onRemove={onRemoveWedding}
          onUpdate={onUpdate}
        />
      </MobileView>
    </>
  );
};

export default ReadWeddingContainer;
