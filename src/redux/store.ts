import { configureStore } from '@reduxjs/toolkit';

import modeSlice from './slices/modeSlice';
import listItemsSlice from './slices/listItemsSlice';
// import storageSlice from './slices/storageSlice';

const MyStore = configureStore({
  reducer: {
    mode: modeSlice,
    listItems: listItemsSlice,
    // storage: storageSlice,
  }
});

export { MyStore };