import React, { Component } from "react";
import {  Form, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

import AuthContext from "../../../context/AuthContext";

class AdminProfile extends Component {
  static contextType = AuthContext;


  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      username: ""
    };
  }

  componentDidMount(){
    const { accessToken, username } = this.context;

    axios.get(`http://localhost:8080/api/profile/getAdminUserDetails/${username}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      this.setState({
        fullName: res.data.fullName,
        username: res.data.username
      })
      
    })
  }

  handleUserDetailsChanges = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleUserDetailsUpdate = () => {
    const { userId, logout, accessToken } = this.context;

    axios.put(`http://localhost:8080/api/profile/updateUserDetails/${userId}`, {
      fullName: this.state.fullName,
      username: this.state.username
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      //console.log("xxxxxxxxxxxxxxxxxxxx")
      //updateUserProfileDetails(this.state.username, this.state.fullName);
      logout();
    })

  };

  render() {
    return (
      <div className="container">
<Card className="mt-5">
          <Card.Header>User Details</Card.Header>
          <Card.Body>
          <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="fullName">
                <Form.Label>Full Name:</Form.Label>
                <Form.Control
                name="fullName"
                  type="text"
                  placeholder="Enter you full name"
                  defaultValue={this.state.fullName}
                  onChange={this.handleUserDetailsChanges}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                name="username"
                  type="text"
                  placeholder="Enter email"
                  defaultValue={this.state.username}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="dark" onClick={this.handleUserDetailsUpdate}>
          Save
        </Button>
          <Form.Text className="text-muted d-block">
                Updating your user details will log you out of the system.
              </Form.Text>
        </Form>
          </Card.Body>
        </Card>
        
      </div>
    );
  }
}

export default AdminProfile;
