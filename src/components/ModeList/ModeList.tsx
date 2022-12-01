import { memo, useState, useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { MoreHoriz, Clear } from '@mui/icons-material';

import { useMyDispatch, useViewMode } from 'redux/hooks';
import { changeMode } from 'redux/slices/modeSlice';
import { modes } from 'utils/constants';

import { ModeItem } from './ModeItem/ModeItem';
import styles from './ModeList.module.scss';

const cn = classNames.bind(styles);

/**
 * @component
 * @description Component represents a menu with list of modes.
 * In dependance with mode different items are rendered.
 * 
 * @returns {ReactElement}
 * 
 * @example 
 * return (
 *     <ModeList />
 * )
 * 
*/

const ModeList = memo(() => {
  const component = useRef(null);

  const dispatch = useMyDispatch();

  const modeActive = useViewMode();

  const [listActivity, setListActivity] = useState(false);

  useEffect(() => {
    const closeModeList = (event: Event): void => {
      const isInArea = event
        .composedPath()
        .some((targetParent) => targetParent === component.current);
      if (!isInArea) setListActivity(false);
    };

    document.addEventListener('pointerdown', closeModeList);

    return () => {
      document.removeEventListener('pointerdown', closeModeList);
    };
  }, []);

  const toggleModeList = () => {
    setListActivity(!listActivity);
  };

  const changeModeActive = useCallback((name: string) => {
    dispatch(changeMode(name));
  }, [dispatch]);

  return (
    <div className={styles.container} ref={component}>
      <button
        onClick={toggleModeList}
        className={cn(styles.button, {
          [styles.button_active]: listActivity,
        })}
      >
        {listActivity ? (
          <Clear className={styles.buttonClose} />
        ) : (
          <MoreHoriz className={styles.buttonOpen} />
        )}
      </button>
      <div
        className={cn(styles.list, {
          [styles.list_active]: listActivity,
        })}
      >
        {modes.map((mode) => {
          return (
            <ModeItem
              key={mode}
              name={mode}
              active={mode === modeActive}
              onClick={changeModeActive}
            />
          );
        })}
      </div>
    </div>
  );
});

export { ModeList };