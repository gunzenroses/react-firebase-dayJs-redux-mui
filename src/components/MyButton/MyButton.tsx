import { FC } from 'react';
import classNames from "classnames";

import { style100, StatusEnum } from 'utils/constants';

import styles from './MyButton.module.scss';

const cn = classNames.bind(styles);

enum Theme {
  delete = 'delete',
  accept = 'accept',
}

type Props = {
  IconTag: any; // temp
  isActive?: boolean;
  status?: TaskStatusType;
  theme?: string;
  onClick: () => void;
};

const MyButton: FC<Props> = ({ IconTag, isActive, status, theme, onClick }) => {
  const isMissed = status === StatusEnum.missed;
  const themeDelete = theme === Theme.delete;
  const themeAccept = theme === Theme.accept;

  const onClickHandler = () => {
    if (!isMissed) onClick();
  };

  return (
    <button
      className={styles.button}
      onClick={onClickHandler}
      disabled={isMissed}
    >
      <IconTag
        sx={style100}
        className={cn(styles.icon, {
          [styles.icon_delete]: themeDelete && !isMissed,
          [styles.icon_deleteActive]: isActive && themeDelete && !isMissed,
          [styles.icon_accept]: themeAccept && !isMissed,
          [styles.icon_acceptActive]: isActive && themeAccept && !isMissed,
          [styles.icon_disabled]: isMissed,
        })}
      />
    </button>
  );
};

export { MyButton };