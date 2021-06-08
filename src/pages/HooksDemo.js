import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useTheme, DARK_THEME, LIGHT_THEME } from '../contexts/ThemeContext';

const useRenderDuration = () => {
  const [date] = useState(new Date());
  const [renderDuration, setRenderDuration] = useState(0);

  useEffect(() => {
    function updateRenderDuration() {
      setRenderDuration(Math.floor((new Date() - date) / 1000));
    }
    // console.log('useEffect called');
    updateRenderDuration();
    const id = setInterval(() => {
      // console.log(`interval ${id}`);
      updateRenderDuration();
    }, 1000);
    // console.log(`initialized new interval with id ${id}`);
    return () => {
      clearInterval(id);
      // console.log(`cleared old interval with id ${id}`);
    };
  }, [date]);
  return renderDuration;
};

export default function HooksDemo() {
  // const [count, setCount] = useState(0);
  const [count, setCount] = useState(0);

  const incdec = (v) => {
    setCount((c) => c + v);
  };

  const [tickerVisible, setTickerVisible] = useState(true);

  // const renderDuration = useRenderDuration();
  const { theme } = useTheme();

  return (
    <div>
      {/* <h1>Hooks demo rendered for {renderDuration}</h1> */}
      <h1>Theme: {theme}</h1>
      <div>Count: {count}</div>
      <Button variant="outline-danger" onClick={() => incdec(-1)}>
        -1
      </Button>
      <Button variant="outline-primary" onClick={() => incdec(1)}>
        +1
      </Button>
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

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <p>
        Current theme: <b>{theme}</b>
      </p>
      <Button variant="outline-danger" onClick={() => setTheme(DARK_THEME)}>
        Dark theme
      </Button>
      <Button variant="outline-primary" onClick={() => setTheme(LIGHT_THEME)}>
        Light theme
      </Button>
    </div>
  );
}

function Ticker() {
  // const date = new Date();
  const renderDuration = useRenderDuration();
  return (
    <div>
      Our component is rendered for {renderDuration} seconds
      {/* <Button onClick={() => setDate(new Date())}>Reset date</Button> */}
    </div>
  );
}
