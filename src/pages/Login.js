import { useReducer } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AuthManager from '../services/AuthManager';
import paths from '../router/paths';
import useAPIMethod from '../hooks/useAPIMethod';
import APIService from '../services/APIService';

const initialState = {
  email: '',
  password: '',
};
const actionType = {
  CHANGE_EMAIL: 'CHANGE_EMAIL',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.CHANGE_EMAIL: {
      return { ...state, email: action.value };
    }
    case actionType.CHANGE_PASSWORD: {
      return { ...state, password: action.value };
    }
    default:
      throw new Error(`No action type ${action.type}`);
  }
};
export default function Login() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChangeEmail = (e) =>
    dispatch({ type: actionType.CHANGE_EMAIL, value: e.target.value });
  const onChangePassword = (e) =>
    dispatch({ type: actionType.CHANGE_PASSWORD, value: e.target.value });

  const [login, isLoggingIn] = useAPIMethod({
    call: APIService.login,
    onError: toast.error,
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;
    login({ email, password });
  };
  return (
    <Row className="mt-5">
      <Col
        lg={{ span: 6, offset: 3 }}
        md={{ span: 8, offset: 2 }}
        sm={{ span: 12 }}
      >
        <Card>
          <Card.Body>
            <Link to={paths.signUp} className="float-right">
              <Button type="button" variant="outline-primary">
                Sign up
              </Button>
            </Link>
            <Card.Title>Sign in</Card.Title>
            <Form onSubmit={onSubmit}>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={state.email}
                  onChange={onChangeEmail}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={state.password}
                  onChange={onChangePassword}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                block
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : null}{' '}
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
