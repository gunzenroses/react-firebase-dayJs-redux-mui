import { useState, forwardRef, Ref, ChangeEvent, memo, useMemo } from 'react';
import classNames from 'classnames';

import styles from './TodoItemText.module.scss';

const cn = classNames.bind(styles);

type Props = {
  isActive: boolean;
  status: TaskStatusType;
  title: string;
  description: string;
  onChange: (data: { title: string; description: string }) => void;
};

const TodoItemText = memo(
  forwardRef<HTMLDivElement, Props>(
    (
      { isActive, status, title, description, onChange },
      ref?: Ref<HTMLDivElement>
    ) => {
      const [currentTitle, setCurrentTitle] = useState(title);

      const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value = event.target.value;
        setCurrentTitle(value);
      };

      const [rows, setRows] = useState(1);

      const [currentDescription, setCurrentDescription] = useState(description);

      const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        const that = event.target;
        const value = that.value;
        const lines = value.split(/\r|\r\n|\n/).length;
        setRows(lines);
        setCurrentDescription(value);
      };

      const newTitle = useMemo(() => {
        return title !== currentTitle;
      }, [currentTitle]);

      const newDescription = useMemo(() => {
        return description !== currentDescription;
      }, [currentDescription])

      const onChangeHandler = () => {
        onChange({
          title: currentTitle,
          description: currentDescription,
        });
      };

      return (
        <div className={styles.text} ref={ref}>
          <input
            type='text'
            className={cn(styles.title, {
              [styles.title_active]: isActive,
              [styles.title_completed]: status === 'completed',
              [styles.title_missed]: status === 'missed',
            })}
            placeholder='What do you plan?'
            value={currentTitle}
            readOnly={status !== 'progress'}
            onChange={onTitleChange}
            onBlur={onChangeHandler}
          />
          {isActive && (
            <textarea
              className={cn(styles.description, {
                [styles.description_completed]: status === 'completed',
                [styles.description_missed]: status === 'missed',
              })}
              placeholder='Add some details...'
              value={currentDescription}
              readOnly={status !== 'progress'}
              rows={rows}
              onChange={onDescriptionChange}
              onBlur={onChangeHandler}
            />
          )}
        </div>
      );
    }
  )
);

export { TodoItemText };