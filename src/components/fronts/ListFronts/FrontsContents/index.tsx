import type { Bill } from '@prisma/client';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { useMobile } from '@/helpers/client/hooks/common/useMobile';
import { unitOfDate } from '@/helpers/client/utils/conversionUnit';

interface Props {
  fronts: Array<Bill>;
  onReadFront: (id: string) => void;
  onUsersList: (userId: string) => void;
  onHallList: (hall: string) => void;
}

export function FrontsContents(props: Props) {
  const isMobile = useMobile();
  const fronts = props.fronts;

  return (
    <table className={styles.container}>
      <thead>
        <th className={styles.table_head}>날짜</th>
        {!isMobile && <th className={styles.table_head}>구분</th>}
        <th className={styles.table_head}>행사명</th>
        <th className={styles.table_head}>장소</th>
        <th className={styles.table_head}>작성자</th>
      </thead>

      {props.fronts === null || props.fronts.length === 0 ? (
        <tr>
          <td colSpan={4}>작성된 전표가 없습니다.</td>
        </tr>
      ) : (
        <>
          {props.fronts.map((front) => (
            <tr key={front.id}>
              <td className={styles.table_data}>{unitOfDate(front.createdAt)}</td>

              {!isMobile && (
                <td className={styles.table_data}>
                  {(front.items[0] as any).native}
                </td>
              )}

              <td
                className={clsx(styles.table_data, styles.link)}
                onClick={() => props.onReadFront(front.id)}
              >
                <strong>
                  {front.title.length > 20 ? front.title.slice(0, 20) : front.title}
                </strong>
              </td>

              <td
                className={clsx(styles.table_data, styles.link)}
                onClick={() => props.onHallList(front.hall)}
              >
                {front.hall}
              </td>

              <td
                className={clsx(styles.table_data, styles.link)}
                onClick={() => props.onUsersList(front.userId!)}
              >
                {front.username}님
              </td>
            </tr>
          ))}
        </>
      )}
    </table>
  );
}
