import { combineReducers } from 'redux';
import timerReducer from './timerSlice';

const rootReducer = combineReducers({
  timer: timerReducer,
});

export default rootReducer;
