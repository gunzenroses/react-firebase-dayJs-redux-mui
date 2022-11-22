import { FC, ChangeEvent, useState } from 'react';
import { AttachFile, CloudUpload } from '@mui/icons-material';
import classNames from 'classnames';

import { MyIcon } from 'components';

import styles from './FileAdder.module.scss';

const cn = classNames.bind(styles);

type Props = {
  isActive: boolean;
  onClick: () => void;
}

const FileAdder: FC<Props> = ({ isActive, onClick }) => {
  const [isUploaded, setIsUploaded] = useState(0)

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const uploaded = event.target.files;
    if (uploaded) {
      setIsUploaded(uploaded.length);
    }
    onClick();
  };

  return (
    <label className={styles.button}>
      <input
        type='file'
        onChange={handleInput}
        className={styles.input}
        readOnly={!isActive}
      />
      <MyIcon
        completed={!isActive}
        textTop='files'
        textBottom={String(isUploaded)}
      />
    </label>
  );
}

export { FileAdder }