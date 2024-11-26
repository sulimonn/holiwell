// store/reducers/subscriptionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSubscribed: false,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    subscribe(state) {
      state.isSubscribed = true;
    },
    unsubscribe(state) {
      state.isSubscribed = false;
    },
  },
});

export const { subscribe, unsubscribe } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
