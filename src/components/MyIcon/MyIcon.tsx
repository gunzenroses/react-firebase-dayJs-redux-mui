import { FC } from 'react';
import classNames from 'classnames';

import { StatusEnum } from 'utils/constants';

import styles from './MyIcon.module.scss';

const cn = classNames.bind(styles);

type Props = {
  textTop: string, 
  textBottom: string,
  status: TaskStatusType,
  onClick?: () => void;
}

const MyIcon: FC<Props> = ({ status, textTop, textBottom, onClick }) => {
  const inProgress = status === StatusEnum.progress;
  const isCompleted = status === StatusEnum.completed;
  const isMissed = status === StatusEnum.missed;

  const onButtonClickHandler = () => {
    if (onClick && inProgress) onClick();
  }

  return (
    <div
      className={cn(styles.button, {
        [styles.button_disabled]: status !== 'progress',
      })}
      onClick={onButtonClickHandler}
    >
      <span
        className={cn(styles.icon, {
          [styles.icon_completed]: isCompleted,
          [styles.icon_missed]: isMissed,
        })}
      >
        <p className={styles.textTop}>{textTop}</p>
        <p
          className={cn(styles.textBottom, {
            [styles.textBottom_completed]: isCompleted,
            [styles.textBottom_missed]: isMissed,
          })}
        >
          {textBottom}
        </p>
      </span>
    </div>
  );
}

export { MyIcon };