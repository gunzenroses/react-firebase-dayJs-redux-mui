import { FC, memo, useState, useRef, useEffect, useCallback } from 'react';
import { HighlightOff } from '@mui/icons-material';
import classNames from "classnames";

import { useMyDispatch } from 'redux/hooks';
import { updateListItem, deleteListItem } from 'redux/thunks/listItemsThunk';
import { StorageFirebase } from 'firebaseApp/StorageFirebase';
import {
  ButtonCheck,
  TodoItemText,
  MyDatePicker,
  MyButton,
  FileHandler,
} from 'components';

import styles from './TodoItem.module.scss';

const cn = classNames.bind(styles);

type Props = {
  id: string,
  item: ItemData;
  isActive: boolean;
  activateItem: (id: string | null) => void;
};

const TodoItem: FC<Props> = memo(({ id, item, isActive, activateItem }) => {
  const { status, title, date, description, fileURL } = item;

  const activateItemHandler = () => {
    if (!isActive) activateItem(id);
  };

  const dispatch = useMyDispatch();

  const [thisStatus, setStatus] = useState(status);

  const changeStatusHandler = useCallback((newStatus: TaskStatusType) => {
    setStatus(newStatus);
  }, []);

  const [thisText, setText] = useState<{ title: string; description: string }>({
    title,
    description,
  });

  const changeTextHandler = useCallback(
    (data: { title: string; description: string }) => {
      setText(data);
    },
    []
  );

  const [thisDate, setDate] = useState<number | null>(date);

  const changeDateHandler = useCallback((day: number) => {
    setDate(day);
  }, []);

  const [thisFile, setThisFile] = useState<File | null>(null); 

  const onFileUploadHandler = useCallback((file: File) => {
    setThisFile(file);
  }, []);

  const [updateItem, setUpdateItem] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    collectItemData();
  }, [thisFile, thisStatus, thisDate, thisText, updateItem]);

  const collectItemData = async () => {
    const thisFileURL = fileURL 
      ? fileURL
      : (thisFile 
          ? await new StorageFirebase().uploadFile(thisFile)
          : '');

    const currentItem: ItemData = {
      date: thisDate,
      status: thisStatus,
      title: thisText.title,
      description: thisText.description,
      fileURL: thisFileURL,
    };

    if (updateItem) {
      console.log('after all', currentItem);
    } else console.log('after all kwakwakwa');
  };

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
        setUpdateItem(true);
        activateItem(null);
      }
    };

    document.addEventListener('pointerdown', deactivateItemHandler);

    return () => {
      document.removeEventListener('pointerdown', deactivateItemHandler);
    };
  }, [isActive]);

  const deleteItemHandler = useCallback(() => {
    dispatch(deleteListItem(id));
  }, []);

  return (
    <div
      ref={closeComponent}
      className={cn(styles.container, {
        [styles.container_active]: isActive,
      })}
      onClick={activateItemHandler}
    >
      <ButtonCheck
        date={thisDate}
        status={thisStatus}
        isActive={isActive}
        onChange={changeStatusHandler}
      />
      <TodoItemText
        status={thisStatus}
        isActive={isActive}
        title={thisText.title}
        description={thisText.description}
        onChange={changeTextHandler}
      />
      <div className={styles.icons}>
        <MyDatePicker
          status={thisStatus}
          date={thisDate}
          onChange={changeDateHandler}
        />
        {isActive && (
          <FileHandler
            status={thisStatus}
            fileURL={fileURL}
            onUploadFile={onFileUploadHandler}
          />
        )}
      </div>
      <div className={styles.buttons}>
        <MyButton
          IconTag={HighlightOff}
          isActive={false}
          theme='delete'
          onClick={deleteItemHandler}
        />
      </div>
    </div>
  );
});

export { TodoItem };