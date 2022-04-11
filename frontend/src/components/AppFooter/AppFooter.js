import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";
import AppNewsletter from "../AppNewsletter/AppNewsletter";
import styled from 'styled-components';

const StyledDiv = styled.div`
    color: white;
    bottom: 0;
    min-height: 445.43px;
    position: absolute;
    width: 100%;
`;

class AppFooter extends Component {
  render() {
    return (
        <StyledDiv>
            <AppNewsletter/>
      <div className="Jumbotron bg-dark py-5">
        
         <Container>
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
        </StyledDiv>
    );
  }
}

export default AppFooter;
