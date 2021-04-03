import React from 'react';
import styled from 'styled-components';

const Button = styled.button({
  fontSize: '18px',
  padding: '8px',
});

function TimerStartStopButton() {
  return <Button>Start</Button>;
}

export default TimerStartStopButton;
