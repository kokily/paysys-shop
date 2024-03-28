'use client';

import { AddExpense } from '@/components/expense/AddExpense';
import { useExpense } from '@/helpers/client/hooks/expense/useExpense';

export default function AddExpensePage() {
  const props = useExpense({});

  return <AddExpense expense={props} />;
}
