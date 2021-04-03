import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { isTimerRunning } from '../redux/selectors';

const Text = styled.span({
  fontSize: '30px',
});

const getCurrentTime = () => {
  return DateTime.now().toFormat('HH:mm:ss');
};

function Timer() {
  const running = useSelector(isTimerRunning);
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    if (!running) {
      return () => {};
    }

    setCurrentTime(getCurrentTime());
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [running]);

  return <Text>{currentTime}</Text>;
}

export default Timer;
