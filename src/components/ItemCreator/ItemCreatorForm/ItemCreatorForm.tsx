import { FC, useEffect, useRef, useState } from 'react';

import { ButtonClose, TodoItemText, MyDatePicker, FileAdder } from 'components';

import styles from './ItemCreatorForm.module.scss';

type Props = {
  onClick: () => void;
}

const ItemCreatorForm: FC<Props> = ({ onClick }) => {
  const component = useRef(null);

  useEffect(() => {
    const deactivateForm = (e: Event) => {
      const muiDialog = document.getElementsByClassName('MuiPaper-root')[0];
      if (muiDialog) return;
      const isInArea = e
        .composedPath()
        .some(element => element === component.current);
      if (!isInArea) onClick();
    };
    document.addEventListener('pointerup', deactivateForm);
    return () => {
      document.removeEventListener('pointerup', deactivateForm);
    }
  }, []);

  const [completed, setCompleted] = useState(false);

  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const changeTextHandler = (data: { title: string; description: string }) => {
    const { title, description } = data;
    setTitle(title);
    setDescription(description);
  };

  const closeHandler = () => {
    onClick();
  };

  const fileAdderHandler = () => {

  }

  return (
    <div className={styles.container} ref={component}>
      <TodoItemText
        completed={completed}
        isActive={true}
        title={title}
        description={description}
        onChange={changeTextHandler}
      />
      <MyDatePicker completed={completed} />
      <FileAdder isActive={true} onClick={fileAdderHandler} />
      <ButtonClose isActive={true} onClick={closeHandler} />
    </div>
  );
};

export { ItemCreatorForm };