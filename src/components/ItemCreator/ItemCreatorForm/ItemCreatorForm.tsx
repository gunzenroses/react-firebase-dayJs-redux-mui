import { FC, useRef, useState, useCallback, useEffect } from 'react';
import { HighlightOff, SaveAsOutlined } from '@mui/icons-material';

import { useMyDispatch } from 'redux/hooks';
import { addListItem } from 'redux/thunks/listItemsThunk';
import { FileHandler, MyButton, MyDatePicker, TodoItemText } from 'components';

import styles from './ItemCreatorForm.module.scss';

type Props = {
  onClick: () => void;
};

const newItemData: ItemDataRaw = {
  status: 'progress',
  title: '',
  description: '',
  date: null,
  file: null
}

const ItemCreatorForm: FC<Props> = ({ onClick }) => {
  const dispatch = useMyDispatch();

  const areaComponent = useRef(null);

  useEffect(() => {
    const deactivateItemHandler = (event: Event) => {
      const muiDialog = document.getElementsByClassName('MuiPaper-root')[0];
      if (muiDialog) return;

      const isInArea = event
        .composedPath()
        .some((element) => element === areaComponent.current);
      if (!isInArea) {
        onClick();
      }
    };

    document.addEventListener('pointerdown', deactivateItemHandler);

    return () => {
      document.removeEventListener('pointerdown', deactivateItemHandler);
    };
  }, []);

  const closeItemHandler = () => {
    onClick();
  };

  const [canUpload, setCanUpload] = useState(false);

  const [thisItem, setThisItem] = useState<ItemDataRaw>(newItemData);

  const changeItemHandler = useCallback((data: UploadItem<keyof ItemDataRaw>) => {
    setThisItem((oldData) => ({
      ...oldData,
      [data.name]: data.value,
    }));
  }, []);

  useEffect(() => {
    if (!canUpload) return;
    if (thisItem.title === '') { 
      setCanUpload(false);
      setThisItem(newItemData);
      onClick();
    } else {
      dispatch(addListItem(thisItem));
      setThisItem(newItemData);
    }
  }, [canUpload, thisItem]);

  return (
    <div ref={areaComponent} className={styles.container}>
      <div className={styles.form}>
        <MyButton
          IconTag={HighlightOff}
          isActive={false}
          theme='delete'
          onClick={closeItemHandler}
        />
        <TodoItemText
          status={thisItem.status}
          isActive={true}
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
          <FileHandler
            status={thisItem.status}
            fileURL={''}
            onUploadFile={changeItemHandler}
          />
        </div>
        <div className={styles.buttons}>
          <MyButton
            IconTag={SaveAsOutlined}
            isActive={true}
            status={thisItem.status}
            theme='accept'
            onClick={() => { setCanUpload(true) }}
          />
        </div>
      </div>
    </div>
  );
};

export { ItemCreatorForm };