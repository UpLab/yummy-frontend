import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import paths from '../../router/paths';
import logoSrc from '../../assets/logo.svg';

export default function AuthLayout({ children }) {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to={paths.home}>
            <img
              src={logoSrc}
              height={40}
              className="img-responsive"
              alt="YUMMY"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to={paths.login}>
                Login
              </Nav.Link>
              {/* <Nav.Link as={Link} to={paths.signUp}>
              Sign up
            </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
}
