import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  severity: '',
  message: '',
  open: false,
};

const testSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar: (state, action) => {
      state.severity = action.payload.severity;
      state.message = action.payload.message;
      state.open = true;
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { openSnackbar, closeSnackbar } = testSlice.actions;

export default testSlice.reducer;
