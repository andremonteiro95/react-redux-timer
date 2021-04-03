import { createSlice } from '@reduxjs/toolkit';

export interface TimerState {
  running: boolean;
}

const initialState: TimerState = {
  running: false,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state) => {
      state.running = true;
    },
    stopTimer: (state) => {
      state.running = false;
    },
  },
});

export const { startTimer, stopTimer } = timerSlice.actions;

const timerReducer = timerSlice.reducer;
export default timerReducer;
