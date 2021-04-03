import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { isTimerRunning } from '../redux/selectors';
import { startTimer, stopTimer } from '../redux/slices/timerSlice';

const Button = styled.button({
  fontSize: '18px',
  padding: '8px',
});

function TimerStartStopButton() {
  const dispatch = useDispatch();
  const running = useSelector(isTimerRunning);

  const onClick = () => {
    if (running) {
      dispatch(stopTimer());
    } else {
      dispatch(startTimer());
    }
  };

  return <Button onClick={onClick}>{running ? 'Stop' : 'Start'}</Button>;
}

export default TimerStartStopButton;
