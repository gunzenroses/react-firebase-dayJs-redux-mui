import { FC, memo } from 'react';
import classNames from 'classnames';

import styles from './ModeItem.module.scss';

const cn = classNames.bind(styles);

type Props = {
  name: string,
  active: boolean,
  onClick: (name: string) => void;
}

const ModeItem: FC<Props> = memo(({ name, active, onClick }) => {

  const onClickHandler = () => {
    onClick(name);
  }

  return (
    <div
      className={cn(styles.item, {
        [styles.item_active]: active,
      })}
      onClick={onClickHandler}
    >
      {name}
    </div>
  );
})

export { ModeItem };