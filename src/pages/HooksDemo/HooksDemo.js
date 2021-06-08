import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Counter from './components/Counter';
import Ticker from './components/Ticker';
import ThemeSwitcher from './components/ThemeSwitcher';

export default function HooksDemo() {
  const [tickerVisible, setTickerVisible] = useState(true);

  return (
    <div>
      <Counter />

      <div>
        <Button
          variant="outline-primary"
          onClick={() => setTickerVisible((v) => !v)}
        >
          Toggle ticker
        </Button>
      </div>

      {tickerVisible ? <Ticker /> : null}
      <ThemeSwitcher />
      {/* <ThemeContext.Consumer>
        {(ctx) => {
          console.log('Context consumer', ctx);
          return null;
        }}
      </ThemeContext.Consumer> */}
    </div>
  );
}
