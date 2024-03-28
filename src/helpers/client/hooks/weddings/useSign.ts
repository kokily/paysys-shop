import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';
import { setBride, setHusband, setImage } from '../../atom';
import { addSignAPI } from '../../api/sign';
import { dataURItoBlob } from '../../utils/dataURItoBob';
import client from '../../api/client';

interface Props {
  id: string;
  refetch: any;
}

export function useSign({ id, refetch }: Props) {
  const queryClient = useQueryClient();

  // States
  const [currentImg, setCurrentImg] = useAtom(setImage);
  const [husbandView, setHusbandView] = useAtom(setHusband);
  const [brideView, setBrideView] = useAtom(setBride);

  // Mutations
  const addSignMutate = useMutation({ mutationFn: addSignAPI });

  const onToggleHusbandSign = () => {
    setHusbandView((prev) => !prev);
  };

  const onToggleBrideSign = () => {
    setBrideView((prev) => !prev);
  };

  const onUploadSign = async (sex: 'husband' | 'bride') => {
    if (currentImg) {
      const file = new File([dataURItoBlob(currentImg)], 'upload');
      const formData = new FormData();

      formData.set('file', file);

      try {
        const response = await client.post('/upload', formData);

        if (response.data) {
          await addSignMutate.mutateAsync(
            {
              weddingId: id,
              sex,
              image: response.data.url,
            },
            {
              onSuccess: () => {
                setCurrentImg('');
                setHusbandView(false);
                setBrideView(false);
                queryClient.invalidateQueries({ queryKey: ['wedding', id] });
                refetch();
              },
              onError: (err: any) => {
                toast.error(err.error);
              },
            },
          );
        } else {
          return;
        }
      } catch (err: any) {
        toast.error(err.error);
      }
    } else {
      return;
    }
  };

  return {
    husbandView,
    brideView,
    onUploadSign,
    onToggleHusbandSign,
    onToggleBrideSign,
  };
}
