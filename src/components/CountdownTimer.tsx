import { DateTime, Duration } from 'luxon';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  getTimeLimit,
  getTimerDuration,
  getTimerStart,
} from '../redux/selectors';

const Text = styled.span({
  fontSize: '30px',
});

const getCurrentTime = () => {
  return DateTime.now();
};

function CountdownTimer() {
  const duration = useSelector(getTimerDuration);
  const start = useSelector(getTimerStart);
  const limit = useSelector(getTimeLimit);
  const [currentTime, setCurrentTime] = useState<DateTime | null>();
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (!start || ended) {
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
  }, [start, ended]);

  useEffect(() => {
    if (ended && duration.as('milliseconds') === 0) {
      setEnded(false);
    }
  }, [duration, ended]);

  const getElapsedDuration = () => {
    if (!start) {
      return duration;
    }

    return (currentTime || getCurrentTime()).diff(start).plus(duration);
  };

  const getRemainingDuration = () => {
    const elapsed = getElapsedDuration();
    let remaining = limit
      .minus(elapsed)
      .shiftTo('hours', 'minutes', 'seconds', 'milliseconds')
      .normalize();

    if (remaining.as('milliseconds') <= 0) {
      if (!ended && limit.as('milliseconds') !== 0) {
        setEnded(true);
      }
      return Duration.fromMillis(0);
    }

    console.log(remaining);

    if (remaining.get('milliseconds') > 0) {
      remaining = remaining.set({
        seconds: remaining.get('seconds') + 1,
        milliseconds: 0,
      });
    }

    return remaining;
  };

  const remainingDurationFormatted = getRemainingDuration().toFormat(
    'hh:mm:ss',
  );

  return <Text>{remainingDurationFormatted}</Text>;
}

export default CountdownTimer;
