import {
  updateDoc,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  collection,
  getFirestore
} from 'firebase/firestore';

import { fireApp } from './firebaseApp';

/**
 * Class representing Firestore instance.
 * You can manipulate data of Todo Items list:
 * - get list data;
 * - add new item;
 * - delete item;
 * - change item data;
 */
class ListItemsFirebase {
  private readonly db;

  constructor() {
    this.db = getFirestore(fireApp);
  }

  /**
   * Get data of Todo Items list (as list of documents in 'todoList' collection Firestore).
   * @returns {ListItem[]}.
   */
  async getListItem() {
    const todoListRef = collection(this.db, 'todoList');
    const listSnapshot = await getDocs(todoListRef);

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
    return [] as ListItem[];
  }

  /**
   * Update Todo Item's data (can be done partially) at Firestore collection.
   * @param {ListItemPartial} value - includes 'id' of Todo Item and 'data' that should be changed.
   * @returns {ListItemPartial}.
   */
  async updateListItem(value: ListItemPartial) {
    const { id, data } = value;
    const todoItemRef = doc(this.db, 'todoList', id);
    try {
      await updateDoc(todoItemRef, data);
      return value;
    } catch (error) {
      throw new Error("Can't update data");
    }
  }

  /**
   * Add new Todo Item and create its unique ID in Firestore collection.
   * @param {ItemData} data - new Todo Item information.
   * @returns {ListItem} - returns Todo Item 'ID' and 'data'.
   */
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

  /**
   * Delete Todo Item by it's unique ID from Firestore collection.
   * @param {string} id - containing ID which helps to find a document that has to be removed.
   * @returns {string}.
   */
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

export { ListItemsFirebase };
