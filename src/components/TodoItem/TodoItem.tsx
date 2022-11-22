import { FC, useState, useRef, useEffect } from 'react';
import classNames from "classnames";

import { useMyDispatch } from 'redux/hooks';
import { changeListItem, deleteListItem } from 'redux/slices/listItemsSlice';
import { ButtonCheck, ButtonClose, TodoItemText, MyDatePicker } from 'components';

import styles from './TodoItem.module.scss';

const cn = classNames.bind(styles);

type Props = {
  item: ItemData;
  activateItem: (id: number) => void;
};

const TodoItem: FC<Props> = ({ item, activateItem }) => {
  const { id, completed, title, date, description, files } = item;

  const dispatch = useMyDispatch();

  const [isActive, setIsActive] = useState(false);

  const openComponent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activateItemHandler = (event: Event) => {
      const isInArea = event
        .composedPath()
        .some((element) => element === openComponent.current);

      if (isInArea) setIsActive(true);
    };

    document.addEventListener('pointerdown', activateItemHandler);

    return () => {
      document.removeEventListener('pointerdown', activateItemHandler);
    };
  }, []);

  useEffect(() => {
    if (isActive) activateItem(item.id);
  }, [isActive]);

  const closeComponent = useRef(null);

  useEffect(() => {
    const deactivateItemHandler = (event: Event) => {
      const muiDialog = document.getElementsByClassName('MuiPaper-root')[0];
      if (muiDialog) return;

      const isInArea = event
        .composedPath()
        .some((element) => element === closeComponent.current);

      if (!isInArea) setIsActive(false);
    };

    document.addEventListener('pointerDown', deactivateItemHandler);

    return () => {
      document.addEventListener('pointerdown', deactivateItemHandler);
    };
  }, []);

  const changeCompleteHandler = () => {
    const newItem = { ...item, completed: !completed };
    dispatch(changeListItem(newItem));
  };

  const changeTextHandler = (data: { title: string; description: string }) => {
    const newItem = {
      ...item,
      title: data.title,
      description: data.description,
    };
    dispatch(changeListItem(newItem));
  };

  const deleteItemHandler = () => {
    dispatch(deleteListItem(id));
  };

  const expireDateHandler = () => {
    const newItem = { ...item, completed: true };
    dispatch(changeListItem(newItem));
  };

  return (
    <div
      ref={closeComponent}
      className={cn(styles.container, {
        [styles.container_active]: isActive,
      })}
    >
      <ButtonCheck
        completed={completed}
        isActive={isActive}
        onClick={changeCompleteHandler}
      />
      <TodoItemText
        ref={openComponent}
        completed={completed}
        isActive={isActive}
        title={title}
        description={description}
        onChange={changeTextHandler}
      />
      <MyDatePicker
        completed={completed || !isActive}
        date={date}
        onExpire={expireDateHandler}
      />
      <ButtonClose isActive={isActive} onClick={deleteItemHandler} />
    </div>
  );
};

export { TodoItem };