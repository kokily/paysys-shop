import type { Wedding } from '@prisma/client';
import styles from './styles.module.scss';
import { useSign } from '@/helpers/client/hooks/weddings/useSign';
import { unitOfDate } from '@/helpers/client/utils/conversionUnit';
import { AddSign } from './AddSign';
import { RemoveSign } from './RemoveSign';

interface Props {
  id: string;
  wedding: Wedding;
  onRemoveSign: (sex: string) => void;
  refetch: any;
}

export function WeddingTitle({ id, wedding, onRemoveSign, refetch }: Props) {
  const props = useSign({ id, refetch });

  return (
    <div className={styles.container}>
      <h3 className={styles.name}>
        신랑님:{' '}
        <strong className={styles.select} onClick={props.onToggleHusbandSign}>
          {wedding.husbandName}
        </strong>{' '}
        <strong className={styles.pink}>♡</strong> 신부님:{' '}
        <strong className={styles.select} onClick={props.onToggleBrideSign}>
          {wedding.brideName}
        </strong>
      </h3>

      {(wedding.husbandImage || wedding.brideImage) && (
        <RemoveSign
          husbandImage={wedding.husbandImage || undefined}
          brideImage={wedding.brideImage || undefined}
          onRemoveSign={onRemoveSign}
        />
      )}

      <h4>
        웨딩 일시 : {unitOfDate(new Date(wedding.weddingAt))}, {wedding.eventAt}
      </h4>

      <AddSign
        visible={props.husbandView}
        title="신랑 서명"
        onConfirm={() => props.onUploadSign('husband')}
        onCancel={props.onToggleHusbandSign}
      />

      <AddSign
        visible={props.brideView}
        title="신부 서명"
        onConfirm={() => props.onUploadSign('bride')}
        onCancel={props.onToggleBrideSign}
      />

      <hr className={styles.split} />

      <h3 className={styles.subTitle}>웨딩 비용</h3>
    </div>
  );
}
