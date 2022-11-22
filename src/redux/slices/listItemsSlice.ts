import { createSlice } from "@reduxjs/toolkit"

const oldData = new Date(2022, 10, 18).toISOString();
const newData = new Date().toISOString();

const initialState: ItemData[] = [
  {
    id: 0,
    completed: false,
    title: 'Build a modern To do app',
    description: 'write some nice app',
    date: oldData,
  },
  {
    id: 1,
    completed: false,
    title: 'Build a modern To do app',
    description: 'write some nice app',
    date: newData,
  },
];

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
    },
    deleteListItem: (state, action) => {
      const replacement = state.filter(item => {
        return item.id !== action.payload;
      });
      return replacement;
    }
  },
});

export const { changeListItem, deleteListItem } = listItemsSlice.actions;
export default listItemsSlice.reducer;