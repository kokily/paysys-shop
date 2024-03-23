import { unitOfDate } from '@/helpers/client/utils/conversionUnit';
import styles from './styles.module.scss';

interface Props {
  users: Array<SerializedUser>;
  onReadUser: (id: string) => void;
}

export function UsersTable({ users, onReadUser }: Props) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>성명</th>
            <th>가입일</th>
            <th>관리자</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user.id}
                className={styles.point}
                onClick={() => onReadUser(user.id)}
              >
                <td>{user.username}</td>
                <td>{unitOfDate(user.createdAt)}</td>
                <td>{user.admin ? '관리자' : '일반'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
