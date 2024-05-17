// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
import reducers from './reducers';
import { apiSlice } from './reducers/apiSlice';
import authApi from './reducers/authApi';
import courses from './reducers/courses';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, authApi.middleware, courses.middleware),
  devTools: true,
});

const { dispatch } = store;

export { store, dispatch };
