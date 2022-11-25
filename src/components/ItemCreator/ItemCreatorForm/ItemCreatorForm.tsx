import { FC, useRef, useState, useCallback, useEffect } from 'react';
import { HighlightOff, SaveAsOutlined } from '@mui/icons-material';

import { useMyDispatch } from 'redux/hooks';
import { addListItem } from 'redux/thunks/listItemsThunk';
import { FileAdder, MyButton, MyDatePicker, TodoItemText } from 'components';

import styles from './ItemCreatorForm.module.scss';

type Props = {
  isActive: boolean,
  onClick: () => void;
};

const ItemCreatorForm: FC<Props> = ({ isActive, onClick }) => {
  const dispatch = useMyDispatch();

  const thisStatus = 'progress';

  const closeComponent = useRef(null);

  useEffect(() => {
    const deactivateItemHandler = (event: Event) => {
      const muiDialog = document.getElementsByClassName('MuiPaper-root')[0];
      if (muiDialog) return;

      const isInArea = event
        .composedPath()
        .some((element) => element === closeComponent.current);
      if (!isInArea) {
        onClick();
      }
    };

    document.addEventListener('pointerdown', deactivateItemHandler);

    return () => {
      document.removeEventListener('pointerdown', deactivateItemHandler);
    };
  }, []);

  const [thisText, setThisText] = useState({ title: '', description: '' });

  const changeTextHandler = useCallback(
    (data: { title: string; description: string }) => {
      setThisText(data);
    }, []
  );

  const [thisDate, setThisDate] = useState<number | null>(null);

  const dateChangeHandler = useCallback((day: number | null) => {
    setThisDate(day);
  }, []);

  const [thisFile, setThisFile] = useState<string | null>(null);

  const fileAdderHandler = useCallback((imgURL: string) => {
    setThisFile(imgURL);
  }, []);

  const closeItemHandler = () => {
    onClick();
  };

  const addNewItem = () => {
    const newItem: ItemData = {
      status: thisStatus,
      title: thisText.title,
      description: thisText.description,
      date: thisDate,
      file: thisFile,
    };

    dispatch(addListItem(newItem));

    setThisDate(null);
    setThisFile(null);
    setThisText({
      title: '',
      description: '',
    });

    onClick();
  };

  return (
    <div
      ref={closeComponent}
      className={styles.container}
    >
      <div className={styles.form}>
        <MyButton
          IconTag={HighlightOff}
          isActive={false}
          theme='delete'
          onClick={closeItemHandler}
        />
        <TodoItemText
          status={thisStatus}
          isActive={true}
          title={thisText.title}
          description={thisText.description}
          onChange={changeTextHandler}
        />
        <div className={styles.icons}>
          <MyDatePicker
            status={thisStatus}
            date={thisDate}
            onChange={dateChangeHandler} 
          />
          <FileAdder 
            status={thisStatus}
            onClick={fileAdderHandler} 
          />
        </div>
        <div className={styles.buttons}>
          <MyButton
            IconTag={SaveAsOutlined}
            isActive={true}
            status={thisStatus}
            theme='accept'
            onClick={addNewItem}
          />
        </div>
      </div>
    </div>
  );
};

export { ItemCreatorForm };