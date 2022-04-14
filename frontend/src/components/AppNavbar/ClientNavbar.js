import React, { useContext } from "react";
import { Container, Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

export default function ClientNavbar() {
  const { logout, cartCount } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/clientProfile");
  };

  const handleChangePassword = () => {
    navigate("/clientChangePassword");
  }

  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              to="/clientItems"
              style={{ fontSize: "18px" }}
              className="nav-link"
            >
              HOME
            </NavLink>
            <NavLink
              to="/cart"
              style={{ fontSize: "18px" }}
              className="nav-link"
            >
              CART{" "}
              <Badge bg="light" text="dark">
                {cartCount}
              </Badge>
            </NavLink>
            <NavLink
              to="/clientOrders"
              style={{ fontSize: "18px" }}
              className="nav-link"
            >
              ORDERS
            </NavLink>
          </Nav>

          <Nav>
            {/*<div>
              <img
                className="thumbnail-image"
                src={
                  "https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/399fe0cc-0155-43a0-a424-a5626ba1ee36/399fe0cc-0155-43a0-a424-a5626ba1ee36-07.jpg"
                }
                alt=""
                style={{ width: "40px", height: "40px", borderRadius: "10px" }}
              />
              </div>*/}

            <NavDropdown
              id="nav-dropdown-dark-example"
              title={localStorage.getItem("fullName").toUpperCase()}
              menuVariant="dark"
              style={{ fontSize: "18px" }}
            >
              <NavDropdown.Item onClick={handleProfile}>
                <span style={{ fontSize: "18px" }}>PROFILE</span>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleChangePassword}>
                <span style={{ fontSize: "18px" }}>CHANGE PASSWORD</span>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                <span style={{ fontSize: "18px" }}>LOGOUT</span>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
