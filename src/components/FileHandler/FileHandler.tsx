import { FC, ChangeEvent, useState, useEffect } from 'react';

import { StorageFirebase } from 'firebaseApp/StorageFirebase';
import { MyIcon } from 'components';
import { StatusEnum } from 'utils/constants';

import styles from './FileHandler.module.scss';

type Props = {
  status: TaskStatusType;
  fileURL: string;
  onUploadFile: ( file: File) => void;
};

const FileHandler: FC<Props> = ({ status, fileURL, onUploadFile }) => {
  const isEmptyURL = fileURL === '';
  const [uploadedNumber, setUploadedNumber] = useState(0);

  const isActive = status === StatusEnum.progress;
  const textTop = isEmptyURL ? 'files' : 'get';
  const textBottom = isEmptyURL ? String(uploadedNumber) : 'file';

  const onUploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const uploaded = event.target.files;
    if (!uploaded) return;

    const file = uploaded[0];
    if (file) {
      setUploadedNumber(1);
      onUploadFile(file);
    }
  };

  const onDownloadHandler = async () => {
    const imgPath = await new StorageFirebase().downloadBlob(fileURL);
    
    const imgURL = URL.createObjectURL(imgPath);
    const anchor = document.createElement('a');
    anchor.href = imgURL;
    anchor.download = 'your_file';

    document.body.appendChild(anchor)
    anchor.click();
    document.body.removeChild(anchor);
  }

  return (
    <label className={styles.button}>
      {
        isEmptyURL 
      ? (
        <input
          type='file'
          onChange={onUploadHandler}
          className={styles.input}
          disabled={!isActive}
        />
      )
      :(
        <input
          type='button'
          onClick={onDownloadHandler}
          className={styles.input}
          disabled={!isActive}
        />
      )
      }
      <MyIcon status={status} textTop={textTop} textBottom={textBottom} />
    </label>
  );
};

export { FileHandler };