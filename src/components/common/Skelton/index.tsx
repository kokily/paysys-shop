import styles from './styles.module.scss';

export function Skelton() {
  return (
    <tr className={styles.container}>
      <td colSpan={5} className={styles.skelton}></td>
    </tr>
  );
}
