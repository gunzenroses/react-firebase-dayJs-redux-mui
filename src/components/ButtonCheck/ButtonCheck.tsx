import { FC } from 'react';
import { RadioButtonUnchecked, CheckCircle, RemoveCircle } from "@mui/icons-material";
import classNames from "classnames";

import { style100, StatusEnum } from 'utils/constants';

import styles from './ButtonCheck.module.scss';

const cn = classNames.bind(styles);

/** 
 * @description Properties required for ButtonCheck component
 * @type {Props}
*/

type Props = {
  status: TaskStatusType;
  isActive: boolean;
  onChange: (data: UpdateItem<'status'>) => void;
};

/**
 * @component
 * 
 * @param {Props} ButtonCheckProps
 * @returns {ReactElement}
 * @example
 * return (
 *     <ButtonCheck 
 *       status="progress" 
 *       isActive=false 
 *       onChange={({name: string, value: string})=>{}} 
 *     />
 * )
 */

const ButtonCheck: FC<Props> = ({ status, isActive, onChange }) => {
  const inProgress = status === StatusEnum.progress;
  const isCompleted = status === StatusEnum.completed;
  const isMissed = status === StatusEnum.missed;

  const onChangeHandler = () => {
    onChange({
      name: 'status',
      value: status === StatusEnum.completed ? 'progress' : 'completed'
    });
  };

  return (
    <button
      className={styles.button}
      onClick={onChangeHandler}
      disabled={isMissed}
    >
      {isCompleted && (
        <CheckCircle sx={style100} className={styles.iconChecked} />
      )}
      {inProgress && (
        <>
          <RadioButtonUnchecked
            sx={style100}
            className={cn(styles.iconUnchecked, {
              [styles.iconUnchecked_active]: isActive,
            })}
          />
          <CheckCircle
            sx={style100}
            className={cn({
              [styles.iconHovered]: true,
              [styles.iconHovered_active]: isActive,
            })}
          />
        </>
      )}
      {isMissed && <RemoveCircle sx={style100} />}
    </button>
  );
};

export { ButtonCheck }