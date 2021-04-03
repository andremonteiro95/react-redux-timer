import { createSlice } from '@reduxjs/toolkit';
import { DateTime, Duration } from 'luxon';

export interface TimerState {
  duration: string;
  running: boolean;
  start?: string;
}

const initialState: TimerState = {
  duration: Duration.fromMillis(0).toISO(),
  running: false,
  start: undefined,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    resetTimer: () => ({ ...initialState }),
    startTimer: (state) => {
      state.running = true;
      state.start = DateTime.now().toISO();
    },
    stopTimer: (state) => {
      state.running = false;
      if (state.start) {
        const newDuration = DateTime.fromISO(state.start).diffNow().negate();
        state.duration = Duration.fromISO(state.duration)
          .plus(newDuration)
          .toISO();
        state.start = undefined;
      }
    },
  },
});

export const { resetTimer, startTimer, stopTimer } = timerSlice.actions;

const timerReducer = timerSlice.reducer;
export default timerReducer;
