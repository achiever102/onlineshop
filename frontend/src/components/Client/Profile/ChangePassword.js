import React, { Component } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

import AuthContext from "../../../context/AuthContext";

class ChangePassword extends Component {

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: ""
    };
  }

  handlePasswordChanges = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handlePasswordUpdate = () => {

    const { userId, logout, accessToken } = this.context;

    axios.put(`http://localhost:8080/api/profile/updateUserPassword/${userId}`, {
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      //console.log("xxxxxxxxxxxxxxxxxxxx")
      //updateUserProfileDetails(this.state.username, this.state.fullName);
      if(res.status === 200){
        
        logout();
      } else {
        console.log(res)
      }
    })

  };

  render() {
    return (
      <div className="container">

        <Card className="mt-5">
          <Card.Header>Change Password</Card.Header>
          <Card.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="currentPassword">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                    name="currentPassword"
                      type="password"
                      placeholder="Enter current password"
                      onChange={this.handlePasswordChanges}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="newPassword">
                    <Form.Label>New Password:</Form.Label>
                    <Form.Control
                    name="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      onChange={this.handlePasswordChanges}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="dark" onClick={this.handlePasswordUpdate}>Save</Button>
            </Form>
          </Card.Body>
        </Card>


       

      </div>
    );
  }
}

export default ChangePassword;
