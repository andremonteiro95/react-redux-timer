import { Duration } from 'luxon';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TimeField from 'react-simple-timefield';
import styled from 'styled-components';
import { getTimeLimit, isTimerRunning } from '../redux/selectors';
import { setTimeLimit } from '../redux/slices/timerSlice';

const Input = styled.input({
  fontSize: '18px',
  padding: '8px',
  width: '70px',
});

function TimeLimitInput() {
  const dispatch = useDispatch();
  const running = useSelector(isTimerRunning);
  const limit = useSelector(getTimeLimit);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    const [hours, minutes, seconds] = value.split(':').map((s) => +s);
    const limit = Duration.fromObject({ hours, minutes, seconds });
    dispatch(setTimeLimit(limit.toISO()));
  };

  return (
    <TimeField
      onChange={onChange}
      value={limit.toFormat('hh:mm:ss')}
      showSeconds
      input={<Input disabled={running} />}
    />
  );
}

export default TimeLimitInput;
