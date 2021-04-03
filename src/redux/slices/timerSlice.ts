import { createSlice } from '@reduxjs/toolkit';

export interface TimerState {}

const initialState: TimerState = {};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {},
});

const timerReducer = timerSlice.reducer;
export default timerReducer;
