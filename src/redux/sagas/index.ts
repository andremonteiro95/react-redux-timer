import { DateTime, Duration } from 'luxon';
import {
  call,
  delay,
  fork,
  put,
  race,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';
import { getTimeLimit, getTimerDuration, getTimerStart } from '../selectors';
import { startTimer, stopTimer } from '../slices/timerSlice';

function* showAlert() {
  yield call(alert, 'BEEP BEEP BEEP!!!');
}

function* timeout() {
  const duration: Duration = yield select(getTimerDuration);
  const limit: Duration = yield select(getTimeLimit);
  const start: DateTime = yield select(getTimerStart);

  const currentTime = DateTime.now();
  const elapsed = (start || currentTime)
    .diff(currentTime)
    .negate()
    .plus(duration);
  const ms = limit.minus(elapsed).as('milliseconds');

  if (ms <= 0) {
    return;
  }

  yield delay(ms);
  yield fork(showAlert);
  yield put(stopTimer());
}

function* scheduleTimeout() {
  yield race([call(timeout), take(stopTimer.type)]);
}

function* rootSaga() {
  yield takeLatest(startTimer.type, scheduleTimeout);
}

export default rootSaga;
