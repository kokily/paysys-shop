import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { listMenuAPI } from '../../api/menu';

export function useListMenu() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  // QueryString
  const divide = searchParams.get('divide') as string;
  const native = searchParams.get('native') as string;

  // Data Fetching
  const { data: menu } = useQuery({
    queryKey: ['listMenu'],
    queryFn: () => listMenuAPI({ divide, native }),
    enabled: !!divide && !!native,
    staleTime: 0,
  });

  const onBack = () => {
    router.back();
  };

  const onReadMenu = (id: string) => {
    queryClient.invalidateQueries({ queryKey: ['readMenu', id] });
    router.push(`/menu/${id}`);
  };

  return {
    menu,
    onBack,
    onReadMenu,
  };
}
