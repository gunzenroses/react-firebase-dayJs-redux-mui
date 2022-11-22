import { createSlice } from '@reduxjs/toolkit';

const initialState: ModeType = 'All';

const modeSlice = createSlice({
  name: 'modeSlice',
  initialState,
  reducers: {
    changeMode: (state, action) => {
      return action.payload
    },
  },
  extraReducers: () => {},
});

export const { changeMode } = modeSlice.actions;
export default modeSlice.reducer;