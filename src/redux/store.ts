import { configureStore } from '@reduxjs/toolkit';

import modeSlice from './slices/modeSlice';
import listItemsSlice from './slices/listItemsSlice';

const MyStore = configureStore({
  reducer: {
    mode: modeSlice,
    listItems: listItemsSlice,
  }
});

export { MyStore };