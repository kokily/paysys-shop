import styles from './styles.module.scss';

interface Props {
  etc: string;
}

export function FrontEtc({ etc }: Props) {
  return (
    <>
      <hr />
      <div className={styles.container}>
        <span className={styles.contents}>{etc}</span>
      </div>
    </>
  );
}
