import { DateTime } from 'luxon';
import { createSelector } from 'reselect';
import { RootState } from '../slices';

export const isTimerRunning = (state: RootState) => state.timerState.running;
export const getTimerStart = createSelector(
  (state: RootState) => state.timerState.start,
  (start) => (start ? DateTime.fromISO(start) : null),
);
