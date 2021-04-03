import { DateTime, Duration } from 'luxon';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getTimerStart, isTimerRunning } from '../redux/selectors';

const Text = styled.span({
  fontSize: '30px',
});

const getCurrentTime = () => {
  return DateTime.now();
};

function Timer() {
  const running = useSelector(isTimerRunning);
  const start = useSelector(getTimerStart);
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

  const getElapsedDuration = () => {
    if (!start) {
      return Duration.fromMillis(0);
    }

    return currentTime.diff(start);
  };

  const elapsedDurationFormatted = getElapsedDuration().toFormat('hh:mm:ss');

  return <Text>{elapsedDurationFormatted}</Text>;
}

export default Timer;
