import { useState, useCallback, useEffect, memo } from 'react';
import classNames from 'classnames';

import { useListItems, useMyDispatch, useViewMode } from 'redux/hooks';
import { getListItem } from 'redux/thunks/listItemsThunk';
import { TodoItem } from "components";

import styles from './TodoList.module.scss';

const cn = classNames.bind(styles);

const TodoList = memo(() => {

  const dispatch = useMyDispatch();

  const mode: ModeType = useViewMode();

  useEffect(() => {
    dispatch(getListItem(mode));
  }, [mode]);

  const listOfItems: ListItem[] = useListItems();

  const [activeItem, setActiveItem] = useState<string | null>(null);

  const activateItemHandler = useCallback((id: string | null) => {
    setActiveItem(id);
  }, []);

  return (
    <ul className={styles.container}>
      {listOfItems.length > 0 &&
        listOfItems.map((item) => {
          return (
            <li
              key={item.id}
              className={cn(styles.listItem, {
                [styles.listItem_active]: activeItem === item.id,
              })}
            >
              <TodoItem
                id={item.id}
                item={item.data}
                isActive={activeItem === item.id}
                activateItem={activateItemHandler}
              />
            </li>
          );
        })}
      {listOfItems.length < 1 && <div>List is empty</div>}
    </ul>
  );
})

export { TodoList };