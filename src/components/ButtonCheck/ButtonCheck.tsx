import { FC } from 'react';
import { RadioButtonUnchecked, CheckCircle, RemoveCircle } from "@mui/icons-material";
import classNames from "classnames";

import { style100 } from 'utils/constants';
import { checkTimestampInPast } from 'utils/utils';

import styles from './ButtonCheck.module.scss';

const cn = classNames.bind(styles);

type Props = {
  status: TaskStatusType;
  date: number | null;
  isActive: boolean;
  onChange: (newStatus: TaskStatusType) => void;
};

const ButtonCheck: FC<Props> = ({ status, date, isActive, onChange }) => {
  const inProgress = status === 'progress';
  const isCompleted = status === 'completed';
  const isMissed = status === 'missed';

  const isPast = checkTimestampInPast(date);
  if (isPast && !isMissed) onChange('missed');

  const onChangeHandler = () => {
    onChange(status === 'completed' ? 'progress' : 'completed');
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