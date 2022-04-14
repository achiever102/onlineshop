import React, { Component } from "react";
import { Container, Navbar, Nav, Badge } from "react-bootstrap";
import {NavLink} from 'react-router-dom';

import AuthContext from "../../context/AuthContext";

class HomeNavbar extends Component {
  
  static contextType = AuthContext;

  render() {

    const {cartCount} = this.context;

    return (
      <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
          <NavLink to="/" style={{fontSize: "18px"}}  className="nav-link">HOME</NavLink>
          <NavLink to="/cart" style={{fontSize: "18px"}}   className="nav-link">CART <Badge bg="light" text="dark">{cartCount}</Badge></NavLink>
          </Nav>
          <Nav className="ms-auto">
          
              <NavLink to="/signin" style={{fontSize: "18px"}}   className="nav-link">SIGN IN</NavLink>
              <NavLink to="/signup"  style={{fontSize: "18px"}}  className="nav-link">SIGN UP</NavLink>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default HomeNavbar;
