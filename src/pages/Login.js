import { Link } from 'react-router-dom';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import paths from '../router/paths';

export default function Login() {
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
            <Form>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form>
            <Button variant="primary" type="submit" block>
              Submit
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
