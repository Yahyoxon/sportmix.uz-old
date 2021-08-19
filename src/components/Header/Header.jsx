import React from "react";
import { Container, Navbar, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../sportmix-logo.png";

const Header = () => {
  const refreshPage = () => {
    window.location.replace('/')
    window.localStorage.removeItem('singleProductValue');
  }

  return (
    <div className="headerContent">
      <Container>
        <Row style={{ alignItems: "center" }}>
          <Col>
            <Navbar expand="lg">
              <Link to="/">
                <Navbar.Brand className="logoBox">
                  <img src={logo} alt="logo sportmix" onClick={refreshPage} />
                </Navbar.Brand>
              </Link>
            </Navbar>
          </Col>
          <Col>
            <div className="callButton">
              <a href="tel:+998712000226">
                <Button variant="outline-dark">+998 71 200-02-26</Button>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
