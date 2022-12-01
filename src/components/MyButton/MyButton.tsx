import { FC, memo } from 'react';
import classNames from "classnames";
import { SvgIconComponent } from '@mui/icons-material';

import { style100, StatusEnum } from 'utils/constants';

import styles from './MyButton.module.scss';

const cn = classNames.bind(styles);

enum Theme {
  delete = 'delete',
  accept = 'accept',
}

/** 
 * @description Properties required for MyButton component
 * @type {Props}
*/

type Props = {
  IconTag: SvgIconComponent;
  isActive?: boolean;
  status?: TaskStatusType;
  theme?: string;
  onClick: () => void;
};

/**
 * @component
 * @description Component represents a button, which serves to accept or delete TodoItem.
 * @param {Props} MyButtonProps
 * @returns {ReactElement}
 * 
 * @example 
 * import { SaveAsOutlined } from '@mui/icons-material';
 * return (
 *     <MyButton IconTag={SaveAsOutlined} isActive={false} status='missed' theme='accept' onClick={()=>{}} />
 * )
 * 
*/

const MyButton: FC<Props> = memo(({ IconTag, isActive, status, theme, onClick }) => {
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
});

export { MyButton };