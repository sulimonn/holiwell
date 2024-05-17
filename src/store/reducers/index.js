// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import team from './team';
import auth from './auth';
import { authApi } from './authApi';
import { apiSlice } from './apiSlice';
import courses from './courses';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  team,
  auth,
  [authApi.reducerPath]: authApi.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [courses.reducerPath]: courses.reducer,
});

export default reducers;
