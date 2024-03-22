import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { Button } from '@/components/common/Button';
import { ItemInput } from './ItemInput';
import { ItemSelect } from './ItemSelect';

interface Props {
  id?: string;
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBack: () => void;
  onSubmitItem: (e: SyntheticEvent) => void;
}

export function AddItem(props: Props) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      props.onSubmitItem(e);
    }
  };
  const divideArray = [
    '식사(뷔페)',
    '식사(중식)',
    '식사(양식)',
    '식사(한식)',
    '식사(수행)',
    '식사(다과)',
    '대관료',
    '레드와인',
    '화이트와인/샴페인',
    '주스/차',
    '민속주/고량주',
    '양주',
    '기타주류',
    '칵테일',
    '반입료',
    '부대비용',
  ];

  const nativeArray = ['현역', '예비역', '일반'];

  return (
    <div className={styles.container}>
      <div className={styles.logo}>품목 추가</div>

      <div className={styles.input_group}>
        <ItemInput
          name="name"
          value={props.name}
          onChange={props.onChange}
          label="품 명"
          focus
        />

        <ItemSelect
          name="divide"
          value={props.divide}
          onChange={props.onChange}
          data={divideArray}
        />

        <ItemSelect
          name="native"
          value={props.native}
          onChange={props.onChange}
          data={nativeArray}
        />

        <ItemInput
          name="unit"
          value={props.unit}
          onChange={props.onChange}
          label="단 위"
        />

        <ItemInput
          name="price"
          value={props.price}
          onChange={props.onChange}
          label="단 가"
          onKeyDown={onKeyDown}
        />

        <div className={styles.buttons_box}>
          <Button $submit $fullSize onClick={props.onSubmitItem}>
            {props.id ? '저장하기' : '등록하기'}
          </Button>
          <Button $cancel $fullSize onClick={props.onBack}>
            취소하기
          </Button>
        </div>
      </div>
    </div>
  );
}
