import { FC, ChangeEvent, useState, memo } from 'react';
import classNames from 'classnames';
import { StorageFirebase } from 'firebaseApp/StorageFirebase';
import { MyIcon } from 'components';

import styles from './FileAdder.module.scss';

const cn = classNames.bind(styles);

type Props = {
  status: TaskStatusType;
  file?: string | null;
  onClick: (url: string) => void;
};

const FileAdder: FC<Props> = memo(({ status, file, onClick }) => {
  const inProgress = status === 'progress';

  const [isUploaded, setIsUploaded] = useState( file ? 1 : 0)

  const handleInput = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const uploaded = event.target.files;
    if (!uploaded) return;
  
    const file = uploaded[0];
    const newURL = await new StorageFirebase().loadFile(file);

    setIsUploaded(uploaded.length); 
    onClick(newURL);
  };

  return (
    <label className={styles.button}>
      { 
        file 
        ? (<a download href={file} />)
        : (<input
            type='file'
            onChange={handleInput}
            className={styles.input}
            disabled={!inProgress}
          />)
      }
      <MyIcon status={status} textTop='files' textBottom={String(isUploaded)} />
    </label>
  );
})

export { FileAdder }