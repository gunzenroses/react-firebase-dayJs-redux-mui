import { FC } from 'react';
import { HighlightOff } from '@mui/icons-material';
import classNames from 'classnames';

import styles from './ButtonClose.module.scss';

const cn = classNames.bind(styles);

type Props = {
  isActive: boolean;
  onClick: () => void;
}

const ButtonClose: FC<Props> = ({ isActive, onClick }) => {
  const onClickHandler = () => {
    onClick();
  };

  return (
    <button className={styles.button} onClick={onClickHandler}>
      <HighlightOff
        sx={{
          width: '100%',
          height: '100%',
        }}
        className={cn(styles.iconClose, {
          [styles.iconClose_active]: isActive,
        })}
      />
    </button>
  );
};

export { ButtonClose };