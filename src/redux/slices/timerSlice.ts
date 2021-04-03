import { createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

export interface TimerState {
  running: boolean;
  start?: string;
}

const initialState: TimerState = {
  running: false,
  start: undefined,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state) => {
      state.running = true;
      state.start = DateTime.now().toISO();
    },
    stopTimer: (state) => {
      state.running = false;
    },
  },
});

export const { startTimer, stopTimer } = timerSlice.actions;

const timerReducer = timerSlice.reducer;
export default timerReducer;
