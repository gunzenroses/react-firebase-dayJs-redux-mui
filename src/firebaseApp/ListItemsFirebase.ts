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

import { ModeToType } from 'utils/constants';

import { fireApp } from './firebaseApp';
 

class ListItemsFirebase {
  private readonly db;

  constructor() {
    this.db = getFirestore(fireApp);
  }

  // async getList() {
  //   const todoListRef = collection(this.db, 'todoList');
  //   const listSnapshot = await getDocs(todoListRef);
  //   if (!listSnapshot.empty) {
  //     const listIds: { id: string }[] = [];
  //     listSnapshot.forEach((doc) => {
  //       listIds.push({
  //         id: doc.id,
  //       });
  //     });
  //     return listIds;
  //   }
  //   throw new Error('Todo list is empty');
  // }

  // async getListItem(id: string) {
  //   const todoItemRef = doc(this.db, 'todoList', id);
  //   const todoSnap = await getDoc(todoItemRef);
  //   if (todoSnap.exists()) {
  //     return todoSnap.data();
  //   }
  //   throw new Error('Todo list is empty');
  // }

  async getListItem(type: ModeType) {
    const mode: string = ModeToType[type];
    const todoListRef = collection(this.db, 'todoList');
    const todoModListRef = query(todoListRef, where('status', '==', mode));

    const listSnapshot = (mode === 'all') 
      ? await getDocs(todoListRef)
      : await getDocs(todoModListRef);

    if (listSnapshot.empty) return [];
    if (!listSnapshot.empty) {
      const list: ListItem[] = [];
      listSnapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          data: doc.data() as ItemData,
        });
      });
      return list;
    }
    throw new Error('Todo list is empty');
  }

  async updateListItem(value: { id: string; data: Partial<ItemData> }) {
    const { id, data } = value;
    const todoItemRef = doc(this.db, 'todoList', id);
    try {
      await updateDoc(todoItemRef, data);
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
