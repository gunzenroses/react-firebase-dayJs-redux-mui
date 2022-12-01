import { FC } from 'react';
import classNames from 'classnames';

import { StatusEnum } from 'utils/constants';

import styles from './MyIcon.module.scss';

const cn = classNames.bind(styles);

/** 
 * @description Properties required for MyIcon component
 * @type {Props}
*/
type Props = {
  textTop: string, 
  textBottom: string,
  status: TaskStatusType,
  onClick?: () => void;
}

/**
 * @component
 * @description Component draw a Custom button, which:
 * - represent a basic information;
 * - toggles on/off.
 * @param {Props} MyIconProps
 * @returns {ReactElement}
 * 
 * @example 
 * return (
 *     <MyIcon 
 *       status='progress' 
 *       textTop='hey' 
 *       textBottom='you' 
 *       onClick={()=>{}}
 *     />
 * )
 * 
*/

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