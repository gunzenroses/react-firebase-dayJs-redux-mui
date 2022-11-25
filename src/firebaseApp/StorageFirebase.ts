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

  async loadFile(file: File) {
    const storageRef = ref(this.storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const imgURL = await getDownloadURL(uploadTask.snapshot.ref);
    return imgURL;
  }
}

export { StorageFirebase };
