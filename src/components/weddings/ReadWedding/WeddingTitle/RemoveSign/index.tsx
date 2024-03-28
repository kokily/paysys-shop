import Image from 'next/image';
import styles from './styles.module.scss';

interface Props {
  husbandImage?: string;
  brideImage?: string;
  onRemoveSign: (sex: 'husband' | 'bride') => void;
}

export function RemoveSign({ husbandImage, brideImage, onRemoveSign }: Props) {
  const onConfirm = (sex: 'husband' | 'bride') => {
    if (
      window.confirm(
        `${
          sex === 'husband' ? '신랑님 서명을 삭제합니다' : '신부님 서명을 삭제합니다'
        }`,
      )
    ) {
      onRemoveSign(sex);
    } else {
      return;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.sign_box}>
          <label>신랑님 서명</label>
          {husbandImage && (
            <Image
              src={husbandImage}
              width={160}
              height={60}
              alt=""
              onClick={() => onConfirm('husband')}
            />
          )}
        </div>

        <div className={styles.sign_box}>
          <label>신부님 서명</label>
          {brideImage && (
            <Image
              src={brideImage}
              width={160}
              height={60}
              alt=""
              onClick={() => onConfirm('bride')}
            />
          )}
        </div>
      </div>
    </>
  );
}
