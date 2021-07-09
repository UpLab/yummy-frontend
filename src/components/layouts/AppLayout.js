import { Button, Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import paths from '../../router/paths';
import AuthManager from '../../services/AuthManager';
import logoSrc from '../../assets/logo.svg';

export default function AppLayout({ children }) {
  return (
    <>
      <Navbar bg="white" expand="lg">
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
              <Button
                variant="outline-primary"
                onClick={() => AuthManager.logout()}
              >
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
}
