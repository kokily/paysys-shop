import type { Wedding } from '@prisma/client';
import styles from './styles.module.scss';
import { Skelton } from '@/components/common/Skelton';

interface Props {
  weddings: Array<Wedding>;
  onReadWedding: (id: string) => void;
  setTarget: TargetType;
}

export function WeddingsTable({ weddings, onReadWedding, setTarget }: Props) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <th>웨딩일자</th>
          <th>웨딩시간</th>
          <th>신랑</th>
          <th>신부</th>
        </thead>

        <tbody>
          {weddings.length > 0 ? (
            <>
              {weddings.map((wedding) => (
                <tr key={wedding.id}>
                  <td>
                    <strong onClick={() => onReadWedding(wedding.id)}>
                      {wedding.weddingAt.toString()}
                    </strong>
                  </td>
                  <td>{wedding.eventAt}</td>
                  <td>{wedding.husbandName}</td>
                  <td>{wedding.brideName}</td>
                </tr>
              ))}
            </>
          ) : (
            <>
              {Array.from(Array(20), (_, i) => (
                <Skelton key={i} />
              ))}
            </>
          )}
        </tbody>
      </table>

      <div ref={setTarget} />
    </div>
  );
}

/*
        <tbody>
          {rest.weddings.length > 0 ? (
            rest.weddings.map((wedding) => (
              <tr key={wedding.id}>
                <td className={cx(styles.table_data)}>
                  <strong onClick={() => rest.onReadWedding(wedding.id)}>
                    {wedding.weddingAt.toString()}
                  </strong>
                </td>
                <td className={cx(styles.table_data)}>{wedding.eventAt}</td>
                <td className={cx(styles.table_data)}>{wedding.husbandName}</td>
                <td className={cx(styles.table_data)}>{wedding.brideName}</td>
              </tr>
            ))
          ) : (
            <>
              {Array.from(Array(20), (_, i) => (
                <Skelton key={i} />
              ))}
            </>
          )}
        </tbody>
      </table>

      <div ref={rest.setTarget} />
    </div>
  );
}
*/
