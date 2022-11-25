import { createSlice } from "@reduxjs/toolkit"

import {
  getListItem,
  updateListItem,
  addListItem,
  deleteListItem,
} from '../thunks/listItemsThunk';

const initialState: ListItem[] = [];

const listItemsSlice = createSlice({
  name: 'listItems',
  initialState,
  reducers: {
    changeListItem: (state, action) => {
      const replacement = state.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
      return replacement;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListItem.fulfilled, (_, { payload }) => {
        return payload;
      })
      .addCase(getListItem.rejected, (_, { payload }) => {
        const message = payload ? payload.message : 'Todo list is empty';
        console.error(message);
      })
      .addCase(updateListItem.fulfilled, (state, { payload }) => {
        const newState = state.map((item) => {
          if (item.id === payload!.id) {
            return payload;
          }
          return item;
        });
        return newState;
      })
      .addCase(updateListItem.rejected, (_, { payload }) => {
        const message = payload ? payload.message : "Can't update data";
        console.error(message);
      })
      .addCase(addListItem.fulfilled, (state, { payload }) => {
        return [...state, payload];
      })
      .addCase(addListItem.rejected, (_, { payload }) => {
        const message = payload ? payload.message : "Can't add item";
        console.error(message);
      })
      .addCase(deleteListItem.fulfilled, (state, { payload }) => {
        return state.filter(item => item.id !== payload);
      })
      .addCase(deleteListItem.rejected, (_, { payload }) => {
        const message = payload ? payload.message : "Can't delete item";
        console.error(message);
      })
  }
});

export const { changeListItem } = listItemsSlice.actions;
export default listItemsSlice.reducer;