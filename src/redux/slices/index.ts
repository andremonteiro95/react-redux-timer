import { combineReducers } from 'redux';
import timerReducer, { TimerState } from './timerSlice';

export interface RootState {
  timerState: TimerState;
}

const rootReducer = combineReducers({
  timerState: timerReducer,
});

export default rootReducer;
