import React, { Component } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import {NavLink} from 'react-router-dom';

class AdminNavbar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" className="containerFluid">
        <Container fluid>
          <Navbar.Brand href="#home">ADMIN MENU</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <NavLink to="/adminItems" className={isActive => "nav-link" + (!isActive ? " unselected" : "")}>Items</NavLink>
                <NavLink to="/adminCoupons" className={isActive => "nav-link" + (!isActive ? " unselected" : "")}>Coupons</NavLink>
                <NavLink to="/adminSettings" className={isActive => "nav-link" + (!isActive ? " unselected" : "")}>Settings</NavLink>
                <NavLink to="/adminOrders" className={isActive => "nav-link" + (!isActive ? " unselected" : "")}>Orders</NavLink>
                <NavLink to="/profile" className={isActive => "nav-link" + (!isActive ? " unselected" : "")}>Profile</NavLink>
              <NavLink to="/" className={isActive => "nav-link" + (!isActive ? " unselected" : "")}>Logout</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default AdminNavbar;
