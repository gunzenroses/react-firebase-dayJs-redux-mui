import { useState, forwardRef, Ref, ChangeEvent, useEffect, memo, useMemo } from 'react';
import classNames from 'classnames';

import styles from './TodoItemText.module.scss';

const cn = classNames.bind(styles);

type Props = {
  isActive: boolean;
  completed: boolean;
  title: string;
  description: string;
  onChange: (data: { title: string, description: string}) => void;
};

const TodoItemText = memo(
  forwardRef<HTMLDivElement, Props>(
    (
      { isActive, completed, title, description, onChange },
      ref?: Ref<HTMLDivElement>
    ) => {
      const [currentTitle, setCurrentTitle] = useState(title);

      const [currentDescription, setCurrentDescription] = useState(description);

      const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value = event.target.value;
        setCurrentTitle(value);
      };

      const [rows, setRows] = useState(1);

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

      useEffect(() => {
        if (!isActive) {
          onChange({
            title: currentTitle,
            description: currentDescription,
          });
        }
      }, [isActive, newTitle, newDescription]);

      return (
        <div className={styles.text} ref={ref}>
          <input
            type='text'
            className={cn(styles.title, {
              [styles.title_active]: isActive,
              [styles.title_completed]: completed,
            })}
            placeholder='What do you plan?'
            value={currentTitle}
            readOnly={completed}
            onChange={onTitleChange}
          />
          {isActive && (
            <textarea
              className={cn(styles.description, {
                [styles.description_completed]: completed,
              })}
              placeholder='Add some details...'
              value={currentDescription}
              readOnly={completed}
              rows={rows}
              onChange={onDescriptionChange}
            />
          )}
        </div>
      );
    }
  )
);

export { TodoItemText };