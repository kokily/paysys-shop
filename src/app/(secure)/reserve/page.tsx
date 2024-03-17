'use client';

import { Home } from '@/components/home/Home';
import { useNative } from '@/helpers/client/hooks/home/useNative';

export default function Page() {
  const props = useNative();

  return <Home {...props} />;
}
