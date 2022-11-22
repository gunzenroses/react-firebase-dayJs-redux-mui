import { FC } from 'react';
import classNames from 'classnames';

import styles from './MyIcon.module.scss';

const cn = classNames.bind(styles);

type Props = {
  completed: boolean,
  textTop: string, 
  textBottom: string,
  onClick?: () => void;
}

const MyIcon: FC<Props> = ({ completed, textTop, textBottom, onClick }) => {
  const onButtonClickHandler = () => {
    if (onClick && !completed) onClick();
  }

  return (
    <div
      className={cn(styles.button, {
        [styles.button_disabled]: completed
      })}
      onClick={onButtonClickHandler}
    >
      <span
        className={cn(styles.icon, {
          [styles.icon_completed]: completed,
        })}
      >
        <p className={styles.textTop}>{textTop}</p>
        <p
          className={cn(styles.textBottom, {
            [styles.textBottom_completed]: completed,
          })}
        >
          {textBottom}
        </p>
      </span>
    </div>
  );
}

export { MyIcon };