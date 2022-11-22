import { FC, SyntheticEvent } from 'react';
import { AddCircleOutline } from '@mui/icons-material';

import styles from './ItemCreatorButton.module.scss';

type Props = {
  onClick: () => void;
}

const ItemCreatorButton: FC<Props> = ({ onClick }) => {
  const onClickHandler = (e: SyntheticEvent) => {
    onClick();
  };

  return (
    <button className={styles.container} onClick={onClickHandler}>
      <span className={styles.button}>
        <AddCircleOutline
          sx={{
            width: '100%',
            height: '100%',
          }}
          className={styles.icon}
        />
      </span>
      <p className={styles.text}>Create New Item</p>
    </button>
  );
};

export { ItemCreatorButton };
