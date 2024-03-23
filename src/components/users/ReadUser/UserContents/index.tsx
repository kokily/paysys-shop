import { unitOfDate } from '@/helpers/client/utils/conversionUnit';
import styles from './styles.module.scss';

interface Props {
  user: SerializedUser;
}

export function UserContents({ user }: Props) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tr>
          <th>ID</th>
          <td>{user.id}</td>
        </tr>
        <tr>
          <th>등급</th>
          <td>{user.admin ? '관리자' : '일반'}</td>
        </tr>
        <tr>
          <th>성명</th>
          <td>{user.username} 님</td>
        </tr>
        <tr>
          <th>가입일</th>
          <td>{unitOfDate(user.createdAt)}</td>
        </tr>
      </table>
    </div>
  );
}
