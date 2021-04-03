import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { isTimerRunning } from '../redux/selectors';
import { resetTimer } from '../redux/slices/timerSlice';

const Button = styled.button({
  fontSize: '18px',
  padding: '8px',
});

function TimerResetButton() {
  const dispatch = useDispatch();
  const running = useSelector(isTimerRunning);

  const onClick = () => {
    dispatch(resetTimer());
  };

  return (
    <Button onClick={onClick} disabled={running}>
      Reset
    </Button>
  );
}

export default TimerResetButton;
