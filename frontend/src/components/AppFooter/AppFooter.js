import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";

import AppNewsletter from "../AppNewsletter/AppNewsletter";
import styled from 'styled-components';

const StyledDiv = styled.div`
    bottom: 0;
    position: relative;
    width: 100%;
    background: #282c34;
`;

class AppFooter extends Component {
  render() {
    return (
      <div>
            <AppNewsletter/>
      <div className="Jumbotron py-5">
        
         <Container>
           <StyledDiv>
         <Row className="text-white">
              <Col><h5><u>CONTACT</u></h5></Col>
              <Col><h5><u>CUSTOMER SERVICE</u></h5></Col>
              <Col><h5><u>CONTACT</u></h5></Col>
              <Col><h5><u>CONTACT</u></h5></Col>
          </Row>
          <Row className="mt-5">
            <Col className="text-center text-white">© 2022 LUDOS FOR VIDEO GAMES</Col>
          </Row>
          </StyledDiv>
         </Container>
        
      </div>
      </div>
    );
  }
}

export default AppFooter;
