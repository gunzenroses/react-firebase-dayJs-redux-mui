import { FC } from 'react';
import { RadioButtonUnchecked, CheckCircle } from "@mui/icons-material";
import classNames from "classnames";

import styles from './ButtonCheck.module.scss';

const cn = classNames.bind(styles);

type Props = {
  completed: boolean;
  isActive: boolean;
  onClick: () => void;
};

const ButtonCheck: FC<Props> = ({ completed, isActive, onClick }) => {
  const onClickHandler = () => {
    onClick();
  };

  return (
    <button className={styles.button} onClick={onClickHandler}>
      {completed ? (
        <CheckCircle
          sx={{
            width: '100%',
            height: '100%',
          }}
          className={styles.iconChecked}
        />
      ) : (
        <>
          <RadioButtonUnchecked
            sx={{
              width: '100%',
              height: '100%',
            }}
            className={cn(styles.iconUnchecked, {
              [styles.iconUnchecked_active]: isActive,
            })}
          />
          <CheckCircle
            sx={{
              width: '100%',
              height: '100%',
            }}
            className={cn({
              [styles.iconHovered]: true,
              [styles.iconHovered_active]: isActive,
            })}
          />
        </>
      )}
    </button>
  );
}

export { ButtonCheck }