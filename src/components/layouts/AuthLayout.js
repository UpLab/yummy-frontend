import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import paths from '../../router/paths';
import AuthManager from '../../services/AuthManager';

export default function AuthLayout({ children }) {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to={paths.home}>
          Yummy (auth)
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link as={Link} to={paths.login}>
              Login
            </Nav.Link>
            <Nav.Link as={Link} to={paths.signUp}>
              Sign up
            </Nav.Link> */}
            <Button onClick={() => AuthManager.login('hardcoded_token')}>
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
}
