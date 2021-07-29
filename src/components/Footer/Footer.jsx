import React from "react";
import cardImage from "../../assets/card.png";
import cartPasport from "../../assets/passport.jpg";
import { Container, Row, Col } from "react-bootstrap";
import "./footer.scss";
import logo from "../../sportmix-logo.png";

const Footer = () => {
  return (
    <div className="footerSection">
      <Container>
        <Row className="footer-row">
          <Col lg="4" md="4" sm="12">
            <div className="logoBox">
              <img src={logo} alt="logo sportmix" />
            </div>
          </Col>
          <Col  lg="4" md="4" sm="12"><div className="bezperviynachalnovo-vzos"><span>0 сум</span> - Без первоначального взноса</div></Col>
          <Col lg="4" md="4" sm="12">
            <div className="left-footer-box">
              <div className="footerCardImg">
                <img src={cardImage} alt="" />
              </div>
              <div className="footerCardImg2">
              <img src={cartPasport} alt="" />  
              </div>
              <div className="footerText">
              Для оформления договора требуется копия паспорта и пластиковой карты.
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
