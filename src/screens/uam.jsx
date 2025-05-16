// login or signup modal options which loads respective page also use google facebook or apple AUTH

// Frameworks & Libraries
import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

// Pages & Components
import Login from "../components/uam/login";
import SignUp from "../components/uam/signup";

// Styling

export default function UserAccess() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <>
            {/* Toggle between Login and SignUp */}
            {isLogin ? (
              <Login onLoggedIn={(user, token) => console.log(user, token)} />
            ) : (
              <SignUp />
            )}
          </>
        </Col>
      </Row>
    </Container>
  );
}
