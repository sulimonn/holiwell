// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import { authApi } from './authApi';
import { apiSlice } from './apiSlice';
import courses from './courses';
import trainers from './trainers';
import subscription from './subscription';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  [authApi.reducerPath]: authApi.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [courses.reducerPath]: courses.reducer,
  [trainers.reducerPath]: trainers.reducer,
  subscription,
});

export default reducers;
