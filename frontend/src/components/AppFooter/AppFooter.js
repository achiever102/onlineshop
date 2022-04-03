import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";

class AppFooter extends Component {
  render() {
    return (
      <div className="Jumbotron bg-dark py-5">
        
         <Container style={{color: "white"}}>
         <Row>
              <Col><h5><u>CONTACT</u></h5></Col>
              <Col><h5><u>CUSTOMER SERVICE</u></h5></Col>
              <Col><h5><u>CONTACT</u></h5></Col>
              <Col><h5><u>CONTACT</u></h5></Col>
          </Row>
          <Row className="mt-5">
            <Col className="text-center">© 2022 LUDOS FOR VIDEO GAMES</Col>
          </Row>
         </Container>
        
      </div>
    );
  }
}

export default AppFooter;
