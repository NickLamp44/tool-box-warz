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
          <Card>
            <Card.Body>
              <div className="text-center mb-3">
                <h4>{isLogin ? "Login" : "Create an Account"}</h4>
              </div>

              {/* Toggle between Login and SignUp */}
              {isLogin ? (
                <Login onLoggedIn={(user, token) => console.log(user, token)} />
              ) : (
                <SignUp />
              )}

              <hr />

              <div className="text-center">
                <p className="mb-2">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </p>
                <Button variant="link" onClick={handleToggle}>
                  {isLogin ? "Sign up here" : "Log in here"}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
