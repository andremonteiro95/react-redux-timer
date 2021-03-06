import { DateTime, Duration } from 'luxon';
import { createSelector } from 'reselect';
import { RootState } from '../slices';

export const isTimerRunning = (state: RootState) => !!state.timerState.start;
export const getTimerStart = createSelector(
  (state: RootState) => state.timerState.start,
  (start) => (start ? DateTime.fromISO(start) : null),
);
export const getTimerDuration = createSelector(
  (state: RootState) => state.timerState.duration,
  Duration.fromISO,
);
export const getTimeLimit = createSelector(
  (state: RootState) => state.timerState.limit,
  Duration.fromISO,
);
