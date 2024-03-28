import styles from './styles.module.scss';

export function Vacuity() {
  return (
    <tr>
      <th className={styles.table_header} colSpan={4}></th>
    </tr>
  );
}
