import { createAsyncThunk } from "@reduxjs/toolkit";

import { ListItemsFirebase } from 'firebaseApp/ListItemsFirebase';
import { StorageFirebase } from "firebaseApp/StorageFirebase";

interface MyError {
  message: string;
}

const getListItem = createAsyncThunk<
  ListItem[],
  null, 
  { rejectValue: MyError; }
>('listItemsSlice/getListItem', async () => {
  try {
    const data = await new ListItemsFirebase().getListItem();
    return data;
  } catch (error) {
    const errorWithMessage =
      error instanceof Error ? error : new Error("Can't get list of items");
    return Promise.reject(errorWithMessage);
  }
});

const updateListItem = createAsyncThunk<
  ListItemPartial,
  ListItemUpdateData,
  { rejectValue: MyError }
>(
  'listItemsSlice/updateListItem',
  async (value: ListItemUpdateData, { rejectWithValue }) => {
    try {
      const newURL: string | null =
        typeof value.fileInfo === 'string'
          ? value.fileInfo
          : ( 
              typeof value.fileInfo === 'undefined'
                ? null
                : await new StorageFirebase().uploadFile(value.fileInfo)
            );

      const fileURLData = (typeof newURL === 'string') ? {
        fileURL: newURL
      } : null;
      
      const newData: ListItemPartial = {
        id: value.id,
        data: {
          ...value.data,
          ...fileURLData,
        },
      };

      const partialData = await new ListItemsFirebase().updateListItem(newData);
      return partialData;
    } catch (error) {
      const errorWithMessage =
        error instanceof Error ? error : new Error("Can't update item");
      return rejectWithValue(errorWithMessage);
    }
  }
);

const addListItem = createAsyncThunk<
  ListItem,
  ItemDataRaw,
  { rejectValue: MyError }
>(
  'listItemsSlice/addListItem',
  async (data: ItemDataRaw, { rejectWithValue }) => {
      return new StorageFirebase().uploadFile(data.file)
        .then((fileURL) =>  {
          const fullItem: ItemData = {
            status: data.status,
            title: data.title,
            description: data.description,
            fileURL: fileURL,
            date: data.date,
          };
          return fullItem;
        })
        .then((fullItem) => new ListItemsFirebase().addListItem(fullItem))
        .catch((error) => {
          const errorWithMessage = error instanceof Error 
            ? error 
            : new Error("Can't add new item");
          return rejectWithValue(errorWithMessage);
        })
  }
);

const deleteListItem = createAsyncThunk<
  string,
  { id: string, fileURL: string },
  { rejectValue: MyError }
>('listItemsSlice/deleteListItem', 
async (data: {id: string, fileURL: string }, { rejectWithValue }) => {
  try {
    if (data.fileURL !== '') await new StorageFirebase().deleteFile(data.fileURL);
    const deletedID = await new ListItemsFirebase().deleteItem(data.id);
    return deletedID;
  } catch (error) {
    const errorWithMessage =
      error instanceof Error ? error : new Error("Can't delete item");
    return rejectWithValue(errorWithMessage);
  }
});

export { getListItem, updateListItem, addListItem, deleteListItem };