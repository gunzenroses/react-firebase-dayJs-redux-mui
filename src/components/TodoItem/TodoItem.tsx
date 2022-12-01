import { FC, memo, useState, useRef, useEffect, useCallback } from 'react';
import { HighlightOff, SaveAsOutlined } from '@mui/icons-material';
import classNames from "classnames";

import { useMyDispatch } from 'redux/hooks';
import { updateListItem, deleteListItem } from 'redux/thunks/listItemsThunk';
import {
  ButtonCheck,
  TodoItemText,
  MyDatePicker,
  MyButton,
  FileHandler,
} from 'components';
import { checkTimestampInPast } from 'utils/utils';

import styles from './TodoItem.module.scss';

const cn = classNames.bind(styles);

/** 
 * @description Properties required for TodoItem component
 * @type {Props}
*/
type Props = {
  id: string,
  item: ItemData;
  isActive: boolean;
  activateItem: (id: string | null) => void;
};

/**
 * @component
 * @description Component renders TodoItem
 * @param {Props} TodoItemProps
 * @returns {ReactElement}
 * 
 * @example 
 * return (
 *     <TodoItem 
 *        id='123123' 
 *        item={
 *          status: 'completed',
 *          title: 'todoItem title',
 *          description: 'done!',
 *          date: null,
 *          fileURL: 'https://mock-url'
 *        } 
 *        isActive='true' 
 *        activateItem={('122122')=>{}} 
 *      />
 * )
 * 
*/

const TodoItem: FC<Props> = memo(({ id, item, isActive, activateItem }) => {
  const dispatch = useMyDispatch();

  const activateItemHandler = () => {
    if (!isActive) activateItem(id);
  };

  const { status, date, fileURL } = item;

  const isPast = checkTimestampInPast(date);

  if (isPast && status !== 'missed') {
    dispatch(updateListItem({ 
      id, 
      data: { status: 'missed' }
    }));
  }

  const [canUpload, setCanUpload] = useState(false);

  const [thisItem, setThisItem] = useState<ItemData & { file?: File | null }>(
    item
  );

  const changeItemHandler = (
    data: UpdateItem<keyof ItemData> | UploadItem<keyof ItemDataRaw>
  ) => {
    setThisItem((oldData) => ({
      ...oldData,
      [data.name]: data.value,
    }));
  };

  useEffect(() => {
    if (!canUpload) return;
    if (thisItem.title === '') {
      activateItem(null);
    } else {
      const fileInfo = fileURL ? fileURL : thisItem.file;
      dispatch(
        updateListItem({
          id,
          data: {
            status: thisItem.status,
            title: thisItem.title,
            description: thisItem.description,
            date: thisItem.date,
          },
          fileInfo: fileInfo,
        })
      );
    }
    setCanUpload(false);
  }, [dispatch, thisItem, canUpload]);

  const closeComponent = useRef(null);

  useEffect(() => {
    const deactivateItemHandler = async (event: Event) => {
      if (!isActive) {
        return;
      }
      const muiDialog = document.getElementsByClassName('MuiPaper-root')[0];
      if (muiDialog) return;

      const isInArea = event
        .composedPath()
        .some((element) => element === closeComponent.current);
      if (!isInArea) {
        setCanUpload(true);
        activateItem(null);
      }
    };

    document.addEventListener('pointerdown', deactivateItemHandler);

    return () => {
      document.removeEventListener('pointerdown', deactivateItemHandler);
    };
  }, [isActive]);

  const deleteItemHandler = useCallback(async () => {
    dispatch(deleteListItem({ id, fileURL }))
  }, [dispatch, fileURL, id]);

  return (
    <div
      ref={closeComponent}
      className={cn(styles.container, {
        [styles.container_active]: isActive,
      })}
      onClick={activateItemHandler}
    >
      <ButtonCheck
        status={thisItem.status}
        isActive={isActive}
        onChange={changeItemHandler}
      />
      <TodoItemText
        status={thisItem.status}
        isActive={isActive}
        title={thisItem.title}
        description={thisItem.description}
        onChange={changeItemHandler}
      />
      <div className={styles.icons}>
        <MyDatePicker
          status={thisItem.status}
          date={thisItem.date}
          onChange={changeItemHandler}
        />
        {isActive && (
          <FileHandler
            status={thisItem.status}
            fileURL={fileURL}
            onUploadFile={changeItemHandler}
          />
        )}
      </div>
      <div className={styles.buttons}>
        <MyButton
          IconTag={HighlightOff}
          isActive={isActive}
          theme='delete'
          onClick={deleteItemHandler}
        />
        {isActive && (
          <MyButton
            IconTag={SaveAsOutlined}
            isActive={isActive}
            status={thisItem.status}
            theme='accept'
            onClick={() => {
              setCanUpload(true);
            }}
          />
        )}
      </div>
    </div>
  );
});

export { TodoItem };