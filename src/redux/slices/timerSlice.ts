import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateTime, Duration } from 'luxon';

export interface TimerState {
  duration: string;
  limit: string;
  start?: string;
}

const initialState: TimerState = {
  duration: Duration.fromMillis(0).toISO(),
  limit: Duration.fromMillis(0).toISO(),
  start: undefined,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    resetTimer: () => ({ ...initialState }),
    startTimer: (state) => {
      state.start = DateTime.now().toISO();
    },
    stopTimer: (state) => {
      if (state.start) {
        const newDuration = DateTime.fromISO(state.start).diffNow().negate();
        state.duration = Duration.fromISO(state.duration)
          .plus(newDuration)
          .toISO();
        state.start = undefined;
      }
    },
    setTimeLimit: (state, { payload }: PayloadAction<string>) => {
      state.limit = payload;
    },
  },
});

export const {
  resetTimer,
  startTimer,
  stopTimer,
  setTimeLimit,
} = timerSlice.actions;

const timerReducer = timerSlice.reducer;
export default timerReducer;
