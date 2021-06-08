import { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function Counter() {
  const [count, setCount] = useState(0);

  const incdec = (v) => {
    setCount((c) => c + v);
  };
  return (
    <>
      <div>Count: {count}</div>
      <Button variant="outline-danger" onClick={() => incdec(-1)}>
        -1
      </Button>
      <Button variant="outline-primary" onClick={() => incdec(1)}>
        +1
      </Button>
    </>
  );
}
