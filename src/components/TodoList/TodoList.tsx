import { useState } from 'react';
import classNames from 'classnames';

import { useListItems } from 'redux/hooks';
import { TodoItem } from "components";

import styles from './TodoList.module.scss';

const cn = classNames.bind(styles);

const TodoList = () => {

  const listOfItems = useListItems();

  const [activeItem, setActiveItem] = useState<number | null>(null);

  const activateItemHandler = (id: number) => {
    setActiveItem(id);
  };

  return (
    <ul className={styles.container}>
      {
        listOfItems.map(item => {
          return (
            <li
              key={item.id}
              className={cn(styles.listItem, {
                [styles.listItem_active]: activeItem === item.id,
              })}
            >
              <TodoItem item={item} activateItem={activateItemHandler} />
            </li>
          );
        })
      }
    </ul>
  )
}

export { TodoList };