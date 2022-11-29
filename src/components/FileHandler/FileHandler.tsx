import { FC, ChangeEvent, useState } from 'react';

import { StorageFirebase } from 'firebaseApp/StorageFirebase';
import { MyIcon } from 'components';
import { StatusEnum } from 'utils/constants';

import styles from './FileHandler.module.scss';

type Props = {
  status: TaskStatusType;
  fileURL: string;
  onUploadFile: (data: UploadItem<'file'>) => void;
};

const FileHandler: FC<Props> = ({ status, fileURL, onUploadFile }) => {
  const isEmptyURL = fileURL === '';
  const isActive = status === StatusEnum.progress;
  const [uploadText, setUploadText] = useState('set');

  const onUploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const uploaded = event.target.files;
    if (!uploaded) return;

    const file = uploaded[0];
    if (file) { 
      setUploadText('1');
      onUploadFile({
        name: 'file',
        value: file
      }); 
    }
  };

  const onDownloadHandler = async () => {
    if (isEmptyURL) return;
    await new StorageFirebase().downloadFile(fileURL);
  }

  return (
    <>
      { isEmptyURL 
      ?
        (<label className={styles.button}>
          <input
            type='file'
            onChange={onUploadHandler}
            className={styles.input}
            disabled={!isActive}
          />
          <MyIcon status={status} textTop='file' textBottom={uploadText} />
        </label>)
      : (<label className={styles.button}>
          <input
            type='button'
            onClick={onDownloadHandler}
            className={styles.input}
            disabled={!isActive}
          />
          <MyIcon status={status} textTop='file' textBottom='get' />
        </label>)
      }
    </>
  );
};

export { FileHandler };