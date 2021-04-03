import React from 'react';
import styled from 'styled-components';
import CountdownTimer from './components/CountdownTimer';
import TimeLimitInput from './components/TimeLimitInput';
import Timer from './components/Timer';
import TimerResetButton from './components/TimerResetButton';
import TimerStartStopButton from './components/TimerStartStopButton';

const Page = styled.div({
  minHeight: '100vh',
  color: 'white',
  backgroundColor: '#282c34',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '30px',
});

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
});

function App() {
  return (
    <Page>
      <Container>
        <TimerResetButton />
        <Timer />
        <TimerStartStopButton />
      </Container>
      <Container>
        <TimeLimitInput />
        <CountdownTimer />
      </Container>
    </Page>
  );
}

export default App;
