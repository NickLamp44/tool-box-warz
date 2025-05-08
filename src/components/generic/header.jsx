import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./header.scss";

export default function Header() {
  const [user, setUser] = useState(null); // simulate auth state for now

  return (
    <header className="header">
      <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            LOGO
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/blogs">
              Blogs
            </Nav.Link>
            <Nav.Link as={Link} to="/showcase">
              ShowCASE
            </Nav.Link>
            <Nav.Link as={Link} to="/merch">
              Merch
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
          </Nav>

          <Form className="d-flex search-form">
            <Form.Control type="search" placeholder="Search" />
            <Button variant="outline-success">Search</Button>
          </Form>

          {user ? (
            <>
              <span className="me-2">👤 {user.name}</span>
              <Button variant="outline-danger">Logout</Button>
            </>
          ) : (
            <>
              <Button variant="outline-primary" as={Link} to="/login">
                Login
              </Button>
              <Button variant="primary" as={Link} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Container>
      </Navbar>
    </header>
  );
}
