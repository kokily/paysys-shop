import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import styles from './styles.module.scss';

interface Props {
  password: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: SyntheticEvent) => void;
}

export function PasswordTable(props: Props) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      props.onChangePassword(e);
    }
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>변경할 비밀번호</th>
            <td>
              <input
                className={styles.input}
                type="password"
                name="password"
                value={props.password}
                onChange={props.onChange}
                onKeyDown={onKeyDown}
                autoFocus
                required
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
/*
    <Container>
      <Table>
        <tbody>
          <Tr>
            <Th>변경할 비밀번호</Th>
            <td>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                onKeyDown={onKeyDown}
                autoFocus
              />
            </td>
          </Tr>
        </tbody>
      </Table>
    </Container>
  );
}
*/
