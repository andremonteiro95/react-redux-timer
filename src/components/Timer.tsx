import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getTimerDuration, getTimerStart } from '../redux/selectors';

const Text = styled.span({
  fontSize: '30px',
});

const getCurrentTime = () => {
  return DateTime.now();
};

function Timer() {
  const duration = useSelector(getTimerDuration);
  const start = useSelector(getTimerStart);
  const [currentTime, setCurrentTime] = useState<DateTime | null>(
    getCurrentTime(),
  );

  useEffect(() => {
    if (!start) {
      setCurrentTime(null);
      return () => {};
    }

    let interval: NodeJS.Timeout;
    const timeoutms =
      (1000 + start.get('millisecond') - getCurrentTime().get('millisecond')) %
      1000;
    const timeout = setTimeout(() => {
      setCurrentTime(getCurrentTime());

      interval = setInterval(() => {
        setCurrentTime(getCurrentTime());
      }, 1000);
    }, timeoutms);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [start]);

  const getElapsedDuration = () => {
    if (!start) {
      return duration;
    }

    return (currentTime || getCurrentTime()).diff(start).plus(duration);
  };

  const elapsedDurationFormatted = getElapsedDuration().toFormat('hh:mm:ss');

  return <Text>{elapsedDurationFormatted}</Text>;
}

export default Timer;
