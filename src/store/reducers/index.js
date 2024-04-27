// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import team from './team';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, team });

export default reducers;
