import type { ChangeEvent, SyntheticEvent } from 'react';
import styles from './styles.module.scss';
import { PasswordTable } from './PasswordTable';
import { PasswordButtons } from './PasswordButtons';

interface Props {
  password: string;
  onBack: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: SyntheticEvent) => void;
}

export function ChangePassword(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.logo_box}>
        <h2>비밀번호 변경</h2>
      </div>

      <PasswordTable
        password={props.password}
        onChange={props.onChange}
        onChangePassword={props.onChangePassword}
      />
      <PasswordButtons
        onBack={props.onBack}
        onChangePassword={props.onChangePassword}
      />
    </div>
  );
}
