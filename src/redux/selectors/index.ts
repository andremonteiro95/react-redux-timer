import { RootState } from '../slices';

export const isTimerRunning = (state: RootState) => state.timerState.running;
