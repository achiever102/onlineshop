import React, {useContext} from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import {NavLink, useNavigate} from 'react-router-dom';

import AuthContext from "../../context/AuthContext";


export default function AdminNavbar(){

  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  }

  const handleProfile = () => {
    navigate("/adminProfile");
  }

  const handleChangePassword = () => {
    navigate("/adminChangePassword");
  }

  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="lg" className="containerFluid">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
              <NavLink style={{fontSize: "18px"}}  to="/adminItems" className="nav-link">GAMES</NavLink>
              <NavLink style={{fontSize: "18px"}}  to="/adminCoupons" className="nav-link">COUPONS</NavLink>
              <NavLink style={{fontSize: "18px"}}  to="/adminSettings" className="nav-link">SETTINGS</NavLink>
              <NavLink style={{fontSize: "18px"}}  to="/adminCategories" className="nav-link">CATEGORIES</NavLink>
              <NavLink style={{fontSize: "18px"}}  to="/adminPlatforms" className="nav-link">PLATFORMS</NavLink>
              <NavLink style={{fontSize: "18px"}}  to="/adminOrders" className="nav-link">ORDERS</NavLink>
              <NavLink style={{fontSize: "18px"}}  to="/adminImagesCarousel" className="nav-link">CAROUSEL</NavLink>

              <NavLink style={{fontSize: "18px"}}  to="/adminUsersManagement" className="nav-link">USERS</NavLink>

              </Nav>
              
              <Nav>

            {/*<div>
              <img className="thumbnail-image" 
                  src={'https://wfisher-sw-project-image-upload-001.s3.us-east-2.amazonaws.com/399fe0cc-0155-43a0-a424-a5626ba1ee36/399fe0cc-0155-43a0-a424-a5626ba1ee36-07.jpg'} 
                  alt=""
                  style={{width: "40px", height: "40px", borderRadius: "10px"}}
              />
  </div>*/}
          

      <NavDropdown
        id="nav-dropdown"
        title= {localStorage.getItem('fullName').toUpperCase()}
        menuVariant="dark"
        style={{fontSize: "18px"}} 
      >
        
        <NavDropdown.Item onClick={handleProfile}><span  style={{fontSize: "18px"}} >PROFILE</span></NavDropdown.Item>
        <NavDropdown.Item onClick={handleChangePassword}>
                <span style={{ fontSize: "18px" }}>CHANGE PASSWORD</span>
              </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={handleLogout}><span  style={{fontSize: "18px"}} >LOGOUT</span></NavDropdown.Item>
      </NavDropdown>

    </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

}


