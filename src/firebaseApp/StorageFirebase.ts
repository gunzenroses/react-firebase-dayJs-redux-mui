import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';

import { fireApp } from './firebaseApp';

class StorageFirebase {
  private readonly storage;

  constructor() {
    this.storage = getStorage(fireApp);
  }

  async uploadFile(file: File) {
    if (!file.name) return '';
    const name = `${file.lastModified}_${file.name}`;
    const storageRef = ref(this.storage, name);
    const imgURL = await uploadBytesResumable(storageRef, file)
      .then((uploadTask) => getDownloadURL(uploadTask.ref));
    if (typeof imgURL === 'string') {
      return imgURL;
    };
    alert('Sorry, we can\'t upload the file');
    return '';
  }

  async getFileURL () {
    
  }

  async downloadBlob(url: string) {
    const imgBlob = await fetch(url).then((response) => response.blob());
    return imgBlob;
  }
}

export { StorageFirebase };
