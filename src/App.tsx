import React from 'react';
import styled from 'styled-components';
import Timer from './components/Timer';
import TimerStartStopButton from './components/TimerStartStopButton';

const Page = styled.div({
  minHeight: '100vh',
  color: 'white',
  backgroundColor: '#282c34',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
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
        <Timer />
        <TimerStartStopButton />
      </Container>
    </Page>
  );
}

export default App;
