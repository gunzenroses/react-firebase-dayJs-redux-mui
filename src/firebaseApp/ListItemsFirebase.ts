import {
  updateDoc,
  doc,
  where,
  addDoc,
  getDocs,
  deleteDoc,
  collection,
  getFirestore,
  query,
} from 'firebase/firestore';

import { StatusEnum } from 'utils/constants';
import { ModeToType } from 'utils/constants';

import { fireApp } from './firebaseApp';
 

class ListItemsFirebase {
  private readonly db;

  constructor() {
    this.db = getFirestore(fireApp);
  }

  async getListItem(type: ModeType) {
    const mode: string = ModeToType[type];
    const todoListRef = collection(this.db, 'todoList');
    const todoModListRef = query(todoListRef, where('status', '==', mode));

    const listSnapshot =
      mode === StatusEnum.all
        ? await getDocs(todoListRef)
        : await getDocs(todoModListRef);
   
    if (!listSnapshot.empty) {
      const list: ListItem[] = [];
      listSnapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          data: doc.data() as ItemData,
        });
      });
      return list;
    };
    return [] as ListItem[];
  }

  async updateListItem(value: { id: string; data: Partial<ItemData> }) {
    console.log(1, value);
    const { id, data } = value;
    const todoItemRef = doc(this.db, 'todoList', id);
    try {
      const smth = await updateDoc(todoItemRef, data);
      console.log(2, smth);
      return value;
    } catch (error) {
      throw new Error("Can't update data");
    }
  }

  async addListItem(data: ItemData) {
    const todoListRef = collection(this.db, 'todoList');
    try {
      const newItem = await addDoc(todoListRef, data);
      return {
        id: newItem.id,
        data: data,
      };
    } catch (error) {
      throw new Error("Can't add new item");
    }
  }

  async deleteItem(id: string) {
    const todoListRef = collection(this.db, 'todoList');
    try {
      await deleteDoc(doc(todoListRef, id));
      return id;
    } catch (error) {
      throw new Error("Can't delete item");
    }
  }
}

export default ListItemsFirebase;
