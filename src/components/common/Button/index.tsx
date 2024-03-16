import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface Props extends PropsWithChildren {
  cancel?: boolean;
  submit?: boolean;
  edit?: boolean;
  remove?: boolean;
  restore?: boolean;
  menu?: boolean;
  reserve?: boolean;
  employee?: boolean;
  admin?: boolean;
  fullSize?: boolean;
  onClick?: (e: any) => void;
}

export function Button(props: Props) {
  return (
    <button
      className={clsx(styles.button, {
        [styles.submit]: props.submit,
        [styles.cancel]: props.cancel,
        [styles.edit]: props.edit,
        [styles.restore]: props.restore,
        [styles.menu]: props.menu,
        [styles.employee]: props.employee,
      })}
      {...props}
      onClick={(e) => {
        if (props.onClick) {
          props.onClick(e);
        }
        (e.target as HTMLButtonElement).blur();
      }}
    >
      {props.children}
    </button>
  );
}
