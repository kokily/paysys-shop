'use client';

import { NavItem } from './NavItem';
import styles from './styles.module.scss';

export function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.contents}>
        <NavItem href="/soldier" icon="military_tech" name="현 역" />
        <NavItem href="/reserve" icon="camera_enhance" name="예비역" />
        <NavItem href="/general" icon="face" name="일 반" />
        <NavItem href="/cart" icon="shopping_cart" name="전표확인" />
        <NavItem href="/fronts" icon="receipt_long" name="빌지목록" />
      </div>
    </footer>
  );
}
