import { unitOfDate } from '@/helpers/client/utils/conversionUnit';
import styles from './styles.module.scss';
import { Skelton } from '@/components/common/Skelton';

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
          {users.length > 0
            ? users.map((user) => (
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
            : Array.from(Array(20), (_, i) => <Skelton key={i} />)}
        </tbody>
      </table>
    </div>
  );
}
