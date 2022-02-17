import React, { Component } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import {NavLink} from 'react-router-dom';

class ClientNavbar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">CLIENT MENU</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
              <NavLink to="/clientItems" className={isActive => "nav-link" + (!isActive ? " unselected" : "")}>Items</NavLink>
              <NavLink to="/clientCart" className={isActive => "nav-link" + (!isActive ? " unselected" : "")}>Cart</NavLink>
              <NavLink to="/clientOrders" className={isActive => "nav-link" + (!isActive ? " unselected" : "")}>Orders</NavLink>
              <NavLink to="/profile" className={isActive => "nav-link" + (!isActive ? " unselected" : "")}>Profile</NavLink>
              <NavLink to="/" className={isActive => "nav-link" + (!isActive ? " unselected" : "")}>Logout</NavLink>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default ClientNavbar;
