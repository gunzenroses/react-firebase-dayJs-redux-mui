import { useState, useEffect } from 'react';
import classNames from 'classnames';

import { ItemCreatorButton } from './ItemCreatorButton/ItemCreatorButton';
import { ItemCreatorForm } from './ItemCreatorForm/ItemCreatorForm';
import styles from './ItemCreator.module.scss';

const cn = classNames.bind(styles);

const ItemCreator = () => {
  const [isActive, setIsActive] = useState(false);

  const activationHandler = () => {
    setIsActive(true);
  };

  const deactivationHandler = () => {
    setIsActive(false);
  };

  return (
    <div
      className={cn(styles.container, {
        [styles.container_form]: isActive,
        [styles.container_button]: !isActive,
      })}
    >
      {isActive ? (
        <ItemCreatorForm onClick={deactivationHandler} />
      ) : (
        <ItemCreatorButton onClick={activationHandler} />
      )}
    </div>
  );
};

export { ItemCreator };
