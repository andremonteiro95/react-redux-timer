import React from 'react';
import styled from 'styled-components';

const Text = styled.span({
  fontSize: '30px',
});

function Timer() {
  return <Text>00:00:00</Text>;
}

export default Timer;
