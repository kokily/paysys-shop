'use client';

import { ReadMenu } from '@/components/menu/ReadMenu';
import { useReadMenu } from '@/helpers/client/hooks/menu/useReadMenu';

export default function ReadMenuPage({ params }: { params: { id: string } }) {
  const props = useReadMenu({ id: params.id });

  return <ReadMenu {...props} />;
}
