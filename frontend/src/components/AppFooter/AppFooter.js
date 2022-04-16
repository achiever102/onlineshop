import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";

import AppNewsletter from "../AppNewsletter/AppNewsletter";
import styled from 'styled-components';

import {BsFacebook, BsInstagram} from 'react-icons/bs';
import {FiTwitter} from 'react-icons/fi';
import {AiOutlinePhone, AiOutlineMail} from 'react-icons/ai';

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
              <Col sm={12} md={4} lg={4} className="text-left"><h5><u>CONTACT</u></h5></Col>
              <Col sm={12} md={4} lg={4} className="text-left"><h5><u>CUSTOMER SERVICE</u></h5></Col>
              <Col sm={12} md={4} lg={4} className="d-flex justify-content-start"><h5><u>Help & Policies</u></h5></Col>
          </Row>

          <Row className="text-white">
              <Col sm={12} md={4} lg={4} className="text-left"><p className="text-white" style={{cursor: "pointer"}}><BsFacebook /> Facebook</p></Col>
              <Col sm={12} md={4} lg={4} className="text-left"><p><AiOutlinePhone /> 1-800-888-8888</p></Col>
              <Col sm={12} md={4} lg={4} className="d-flex justify-content-start"><p>Terms and Conditions</p></Col>
          </Row>
          <Row className="text-white">
              <Col sm={12} md={4} lg={4} className="text-left"><p className="text-white" style={{cursor: "pointer"}}><FiTwitter /> Twitter</p></Col>
              <Col sm={12} md={4} lg={4} className="text-left"><p><AiOutlineMail /> Sales: ludos-sales@ludos.com</p></Col>
              <Col sm={12} md={4} lg={4} className="d-flex justify-content-start"><p>Terms of Use</p></Col>
          </Row>
          <Row className="text-white">
              <Col sm={12} md={4} lg={4} className="text-left"><p className="text-white" style={{cursor: "pointer"}}><BsInstagram /> Instagram</p></Col>
              <Col sm={12} md={4} lg={4} className="text-left"><p><AiOutlineMail /> Support: ludos-support@ludos.com</p></Col>
              <Col sm={12} md={4} lg={4} className="d-flex justify-content-start"><p>Copyrights</p></Col>
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
