/**
 * Layout component that serves as the main layout for the application.
 * It includes a navigation bar with links to different sections of the app
 * and renders child components using the React Router's Outlet component.
 *
 * @component
 * @returns {JSX.Element} The rendered layout component.
 *
 */
import { Outlet } from 'react-router';
import './App.css'
import { Container, Nav, Navbar } from 'react-bootstrap'

function Layout() {

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Meliotech</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Our Products</Nav.Link>
              <Nav.Link href="/new-product">Add Product</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet/>
    </div>
  );
}

export default Layout
