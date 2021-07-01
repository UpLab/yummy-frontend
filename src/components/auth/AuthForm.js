import { useReducer } from 'react';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Button from '../common/Button';

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
};
const actionType = {
  CHANGE_EMAIL: 'CHANGE_EMAIL',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  CHANGE_CONFIRM_PASSWORD: 'CHANGE_CONFIRM_PASSWORD',
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.CHANGE_EMAIL: {
      return { ...state, email: action.value };
    }
    case actionType.CHANGE_PASSWORD: {
      return { ...state, password: action.value };
    }
    case actionType.CHANGE_CONFIRM_PASSWORD: {
      return { ...state, confirmPassword: action.value };
    }
    default:
      throw new Error(`No action type ${action.type}`);
  }
};
export default function AuthForm({ onSubmit, isSubmitting, isLoginForm }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChangeEmail = (e) =>
    dispatch({ type: actionType.CHANGE_EMAIL, value: e.target.value });
  const onChangePassword = (e) =>
    dispatch({ type: actionType.CHANGE_PASSWORD, value: e.target.value });
  const onChangeConfirmPassword = (e) =>
    dispatch({
      type: actionType.CHANGE_CONFIRM_PASSWORD,
      value: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = state;
    if (!isLoginForm) {
      if (password !== confirmPassword) {
        toast.error('Password and Confirm Password should match');
        return;
      }
    }
    onSubmit({ email, password });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={state.email}
          onChange={onChangeEmail}
          type="email"
          placeholder="Enter email"
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={state.password}
          onChange={onChangePassword}
          type="password"
          placeholder="Password"
          required
        />
      </Form.Group>
      {!isLoginForm ? (
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            value={state.confirmPassword}
            onChange={onChangeConfirmPassword}
            type="password"
            placeholder="Confirm Password"
            required
          />
        </Form.Group>
      ) : null}
      <Button variant="primary" type="submit" block loading={isSubmitting}>
        Submit
      </Button>
    </Form>
  );
}
