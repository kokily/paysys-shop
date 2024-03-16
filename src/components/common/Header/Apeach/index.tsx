import type { MouseEvent } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import styles from './styles.module.scss';

interface Props {
  onClick?: (e: MouseEvent) => void;
}

export function Apeach({ onClick }: Props) {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.image_box} />
      <MdArrowDropDown />
    </div>
  );
}
