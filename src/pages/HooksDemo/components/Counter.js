import { useReducer } from 'react';
import { Button } from 'react-bootstrap';

const initialState = {
  count: 0,
  clickCounter: 0,
};

const actionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET_COUNT: 'RESET_COUNT',
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        clickCounter: state.clickCounter + 1,
      };
    case actionTypes.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        clickCounter: state.clickCounter + 1,
      };
    case actionTypes.RESET_COUNT:
      return {
        ...state,
        count: initialState.count,
      };
    default:
      throw new Error(`Unknown action type "${action.type}"`);
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div>Count: {state.count}</div>
      <div>Clicked {state.clickCounter} times</div>
      <Button
        variant="outline-danger"
        onClick={() => dispatch({ type: actionTypes.DECREMENT })}
      >
        -1
      </Button>
      <Button
        variant="outline-primary"
        onClick={() => dispatch({ type: actionTypes.INCREMENT })}
      >
        +1
      </Button>
      <Button
        variant="outline-primary"
        onClick={() => dispatch({ type: actionTypes.RESET_COUNT })}
      >
        RESET COUNT
      </Button>
      <Button
        variant="outline-primary"
        onClick={() => dispatch({ type: 'asdf' })}
      >
        ERROR
      </Button>
    </>
  );
}
