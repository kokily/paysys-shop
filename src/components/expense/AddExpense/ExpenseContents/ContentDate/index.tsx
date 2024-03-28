import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import styles from './styles.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ko', ko);

interface Props {
  expense: ExpenseContents;
}

export function ContentDate({ expense }: Props) {
  return (
    <div className={styles.container}>
      <span>웨딩일자</span>
      <DatePicker
        locale="ko"
        startDate={new Date(expense.weddingAt)}
        selected={new Date(expense.weddingAt)}
        onChange={expense.setStartDate as any}
        dateFormat="yyyy, MM, dd"
      />

      <span>웨딩시간</span>
      <select name="eventAt" value={expense.eventAt} onChange={expense.onChange}>
        <option value="">전체</option>
        <option value="11:30">11:30</option>
        <option value="13:00">13:00</option>
        <option value="14:30">14:30</option>
        <option value="16:00">16:00</option>
        <option value="17:30">17:30</option>
      </select>
    </div>
  );
}
