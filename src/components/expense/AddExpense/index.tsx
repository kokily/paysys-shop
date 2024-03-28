import styles from './styles.module.scss';
import { ExpenseButton } from './ExpenseButtons';
import { ExpenseContents } from './ExpenseContents';

interface Props {
  id?: string;
  expense: ExpenseContents;
}

export function AddExpense({ id, expense }: Props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>웨딩 정산서</h2>

      <ExpenseContents expense={expense} />

      <ExpenseButton onBack={expense.onBack} onAddExpense={expense.onAddExpense} />
    </div>
  );
}
