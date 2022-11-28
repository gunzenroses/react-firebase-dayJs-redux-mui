import { createAsyncThunk } from "@reduxjs/toolkit";
import { _ActionCreatorWithPreparedPayload } from "@reduxjs/toolkit/dist/createAction";

import ListItemsFirebase from 'firebaseApp/ListItemsFirebase';

interface MyError {
  message: string;
}

const getListItem = createAsyncThunk<
  ListItem[],
  ModeType, 
  { rejectValue: MyError; }
>('listItemsSlice/getListItem', async (mode: ModeType, { rejectWithValue }) => {
  try {
    const data = await new ListItemsFirebase().getListItem(mode);
    return data;
  } catch (error) {
    const errorWithMessage =
      error instanceof Error ? error : new Error("Can't get list of items");
    return rejectWithValue(errorWithMessage);
  }
});

const updateListItem = createAsyncThunk<
  ListItemPartial,
  ListItemPartial,
  { rejectValue: MyError }
>(
  'listItemsSlice/updateListItem',
  async (
    value: ListItemPartial,
    { rejectWithValue }
  ) => {
    try {
      const partialData = await new ListItemsFirebase().updateListItem(value);
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
  ItemData,
  { rejectValue: MyError }
>(
  'listItemsSlice/addListItem', 
  async(data: ItemData, { rejectWithValue }) => {
    try {
      const newItem = await new ListItemsFirebase().addListItem(data);
      return newItem;
    } catch (error) {
      const errorWithMessage =
        error instanceof Error ? error : new Error("Can't add new item");
      return rejectWithValue(errorWithMessage);
    }
});

const deleteListItem = createAsyncThunk<
  string,
  string,
  { rejectValue: MyError }
>('listItemsSlice/deleteListItem', 
async (id: string, { rejectWithValue }) => {
  try {
    const deletedID = await new ListItemsFirebase().deleteItem(id);
    return deletedID;
  } catch (error) {
    const errorWithMessage =
      error instanceof Error ? error : new Error("Can't delete item");
    return rejectWithValue(errorWithMessage);
  }
});

export { getListItem, updateListItem, addListItem, deleteListItem };