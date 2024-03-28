import styles from './styles.module.scss';
import { OneInput } from '../common/OneInput';

interface Props {
  expense: ExpenseContents;
}

export function ContentName({ expense }: Props) {
  return (
    <div className={styles.container}>
      <strong>
        <OneInput
          title="신랑님"
          name="husbandName"
          value={expense.husbandName}
          onChange={expense.onChange}
        />
      </strong>

      <strong>
        <OneInput
          title="신부님"
          name="brideName"
          value={expense.brideName}
          onChange={expense.onChange}
        />
      </strong>
    </div>
  );
}
