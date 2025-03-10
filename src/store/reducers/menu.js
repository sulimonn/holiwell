// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  openItem: ['dashboard'],
  defaultId: 'dashboard',
  openComponent: 'buttons',
  drawerOpen: false,
  profileOpen: false,
  componentDrawerOpen: true,
  pages: [],
  code: null,
  email: null,
  isPasswordChanged: false,
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    activeItem(state, action) {
      state.openItem = action.payload.openItem;
    },

    activeComponent(state, action) {
      state.openComponent = action.payload.openComponent;
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload.drawerOpen;
    },

    openProfile(state, action) {
      state.profileOpen = action.payload;
    },

    openComponentDrawer(state, action) {
      state.componentDrawerOpen = action.payload.componentDrawerOpen;
    },
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    setCode: (state, action) => {
      state.code = action.payload.code;
      state.email = action.payload.email;
    },
    resetCode: (state, action) => {
      state.code = null;
      state.email = null;
    },
    setPasswordChanged: (state, action) => {
      state.isPasswordChanged = action.payload;
    },
  },
});

export default menu.reducer;

export const {
  activeItem,
  activeComponent,
  openDrawer,
  openProfile,
  openComponentDrawer,
  setPages,
  setCode,
  resetCode,
  setPasswordChanged,
} = menu.actions;
