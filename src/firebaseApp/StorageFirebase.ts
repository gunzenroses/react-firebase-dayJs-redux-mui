import dayjs from 'dayjs';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from 'firebase/storage';

import { fireApp } from './firebaseApp';

/**
 * Class representing a Firebase storage.
 * You can:
 * - upload new file;
 * - download file by its URL;
 * - delete file from storage.
 */
class StorageFirebase {
  private readonly storage;

  constructor() {
    this.storage = getStorage(fireApp);
  }

  /**
   * Upload file on storage.
   * @param {File} file - what should be uploaded on storage.
   * @returns {string} - returns data with file URL.
   */
  async uploadFile(file: File) {
    if (!file.name) return '';
    const name = `${dayjs().unix()}_${file.name}`;
    const storageRef = ref(this.storage, name);
    const imgURL = await uploadBytesResumable(storageRef, file).then(
      (uploadTask) => getDownloadURL(uploadTask.ref)
    );
    if (typeof imgURL === 'string') {
      return imgURL;
    }
    alert("Sorry, we can't upload the file");
    return '';
  }

  /**
   * Download file from storage to client computer
   * @param {srtign} url - address of the file.
   */
  async downloadFile(url: string) {
    const imgBlob = await fetch(url).then((response) => response.blob());
    const imgURL = URL.createObjectURL(imgBlob);
    const anchor = document.createElement('a');
    anchor.href = imgURL;
    anchor.download = 'your_file';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  /**
   * Delete file from storage
   * @param {string} url - address of the file.
   */
  async deleteFile(url: string) {
    const currentRef = ref(this.storage, url);
    deleteObject(currentRef);
  }
}

export { StorageFirebase };
