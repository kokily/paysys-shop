import type { Bill } from '@prisma/client';
import styles from './styles.module.scss';
import { unitOfDate, unitOfTime } from '@/helpers/client/utils/conversionUnit';

interface Props {
  front: Bill;
}

export function FrontHeader({ front }: Props) {
  return (
    <>
      <div className={styles.header}>
        <h2>
          전표 세부내역
          <br />
          <small>[ {front.title} ]</small>
        </h2>
      </div>

      <div className={styles.contents}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>작성자</th>
              <td>{front.username} 님</td>
            </tr>

            <tr>
              <th>작성일자</th>
              <td>{unitOfDate(front.createdAt)}</td>
            </tr>

            <tr>
              <th>작성시간</th>
              <td>{unitOfTime(front.createdAt)}</td>
            </tr>

            <tr>
              <th>행사장소</th>
              <td>{front.hall}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
