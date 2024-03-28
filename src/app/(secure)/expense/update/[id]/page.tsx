'use client';

import { AddExpense } from '@/components/expense/AddExpense';
import { useExpense } from '@/helpers/client/hooks/expense/useExpense';

export default function UpdateExpensePage({ params }: { params: { id: string } }) {
  const props = useExpense({ id: params.id });

  return <AddExpense id={params.id} expense={props} />;
}
