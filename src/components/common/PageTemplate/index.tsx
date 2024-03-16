import type { PropsWithChildren } from 'react';
import styles from './styles.module.scss';
import { Header } from '../Header';
import { Footer } from '../Footer';

export function PageTemplate({ children }: PropsWithChildren) {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>{children}</main>

      <Footer />
    </div>
  );
}
