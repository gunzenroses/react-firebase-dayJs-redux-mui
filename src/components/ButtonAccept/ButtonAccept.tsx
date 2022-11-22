import { FC } from 'react';
import { AddCircleOutline } from '@mui/icons-material';


import styles from './ButtonAccept.module.scss';

type Props = {
  onClick: () => void;
}

const ButtonAccept: FC<Props> = ({ onClick }) => {
  const onClickHandler = () => {
    onClick();
  };

  return (
    <button className={styles.button} onClick={onClickHandler}>
      <AddCircleOutline
        sx={{
          width: '100%',
          height: '100%',
        }}
        className={styles.icon}
      />
    </button>
  );
}

export { ButtonAccept };