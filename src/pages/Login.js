import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import AuthManager from '../services/AuthManager';
import paths from '../router/paths';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  onSubmit = () => {
    const { email } = this.state;
    console.log(`Logging in as email ${email}`);
    AuthManager.login();
  };

  render() {
    const { email, password } = this.state;
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
              <Form onSubmit={this.onSubmit}>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={this.onChangeEmail}
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={password}
                    onChange={this.onChangePassword}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" block>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}
