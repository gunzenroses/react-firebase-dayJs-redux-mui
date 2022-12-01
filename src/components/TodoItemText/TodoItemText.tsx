import {
  FC,
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  memo,
  FocusEvent,
} from 'react';
import classNames from 'classnames';

import { StatusEnum } from 'utils/constants';

import styles from './TodoItemText.module.scss';

const cn = classNames.bind(styles);

/** 
 * @description Properties required for TodoItemText component
 * @type {Props}
*/
type Props = {
  isActive: boolean;
  status: TaskStatusType;
  title: string;
  description: string;
  onChange: (data: UpdateItem<'title' | 'description'>) => void;
};

/**
 * @component
 * @description Component represents 'Title' and 'Description' fields of TodoItem.
 * @param {Props} TodoItemTextProps
 * @returns {ReactElement}
 * 
 * @example 
 * return (
 *     <TodoItemText 
 *       isActive=true 
 *       status='progress' 
 *       title='Main task' 
 *       description='small steps' 
 *       onClick={()=>{}} 
 *     />
 * )
 * 
*/

const TodoItemText: FC<Props> = memo( 
  ({ isActive, status, title, description, onChange }) => {
      const [rows, setRows] = useState(1);

      const linesInDescription = (element: HTMLTextAreaElement) => {
        const value = element.value;
        const lines = value.split(/\r|\r\n|\n/).length;
        return lines;
      }

      const descRef = useRef(null);

      useEffect(() => {
        if (!isActive) return;
        if (descRef.current) setRows(linesInDescription(descRef.current));
      }, [descRef, isActive]);

      const [currentTitle, setCurrentTitle] = useState(title);

      const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value = event.target.value;
        setCurrentTitle(value);
      };

      const [currentDescription, setCurrentDescription] = useState(description);

      const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        const that = event.target;
        setRows(linesInDescription(that));
        setCurrentDescription(that.value);
      };

      const onChangeHandler = (
        event: FocusEvent<HTMLTextAreaElement> | FocusEvent<HTMLInputElement>
      ) => {
        if (event.target.name === 'title') {
          if (title !== currentTitle) {
            onChange({
              name: 'title',
              value: currentTitle
            })
          }
        } else if (event.target.name === 'description') {
          if (description !== currentDescription) {
            onChange({
              name: 'description',
              value: currentDescription
            })
          }
        }
      };

      return (
        <div className={styles.text}>
          <input
            type='text'
            className={cn(styles.title, {
              [styles.title_active]: isActive,
              [styles.title_completed]: status === StatusEnum.completed,
              [styles.title_missed]: status === StatusEnum.missed,
            })}
            placeholder='What do you plan?'
            value={currentTitle}
            name='title'
            readOnly={status !== 'progress'}
            onChange={onTitleChange}
            onBlur={onChangeHandler}
          />
          {isActive && (
            <textarea
              ref={descRef}
              className={cn(styles.description, {
                [styles.description_completed]: status === StatusEnum.completed,
                [styles.description_missed]: status === StatusEnum.missed,
              })}
              placeholder='Add some details...'
              value={currentDescription}
              name='description'
              readOnly={status !== 'progress'}
              rows={rows}
              onChange={onDescriptionChange}
              onBlur={onChangeHandler}
            />
          )}
        </div>
      );
    }
);

export { TodoItemText };