import { Button, Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import paths from '../../router/paths';
import AuthManager from '../../services/AuthManager';

export default function AppLayout({ children }) {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to={paths.home}>
            Yummy
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Button onClick={() => AuthManager.logout()}>Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
}
