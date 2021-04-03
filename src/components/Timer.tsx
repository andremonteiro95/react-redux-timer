import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  getTimerDuration,
  getTimerStart,
  isTimerRunning,
} from '../redux/selectors';

const Text = styled.span({
  fontSize: '30px',
});

const getCurrentTime = () => {
  return DateTime.now();
};

function Timer() {
  const duration = useSelector(getTimerDuration);
  const running = useSelector(isTimerRunning);
  const start = useSelector(getTimerStart);
  const [currentTime, setCurrentTime] = useState<DateTime | null>(
    getCurrentTime(),
  );

  useEffect(() => {
    if (!running) {
      setCurrentTime(null);
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
    if (!running || !start) {
      return duration;
    }

    return (currentTime || getCurrentTime()).diff(start).plus(duration);
  };

  const elapsedDurationFormatted = getElapsedDuration().toFormat('hh:mm:ss');

  return <Text>{elapsedDurationFormatted}</Text>;
}

export default Timer;
