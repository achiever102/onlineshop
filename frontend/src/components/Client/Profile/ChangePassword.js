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
      newPassword: "",
      errors: {},
      showAlert: false,
      alertMessageContent: ""
    };
  }

  handlePasswordChanges = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handlePasswordUpdate = () => {

    const { userId, logout, accessToken } = this.context;

    let validationErrors = {};
    

    let failed = false;
    if (this.state.newPassword === "") {
      failed = true;
      validationErrors["newPassword"] = "Cannot be empty";
    } 

    if (this.state.currentPassword === "") {
      failed = true;
      validationErrors["currentPassword"] = "Cannot be empty";
    } 


    if (failed === true) {
      this.setState({
        errors: validationErrors,
        showAlert: false,
        alertMessageContent: "",
      });
    } else
    {

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
      } 
    }).catch((error) => {
      this.setState({
        errors: validationErrors
      });
    })
  }
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
                      style={
                        this.state.errors["currentPassword"] !== undefined
                          ? {
                              borderWidth: "1px",
                              borderColor: "red",
                              borderStyle: "solid",
                            }
                          : null
                      }
                    />
                    <span style={{ color: "red" }}>
                      {this.state.errors["currentPassword"]}
                    </span>
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
                      style={
                        this.state.errors["newPassword"] !== undefined
                          ? {
                              borderWidth: "1px",
                              borderColor: "red",
                              borderStyle: "solid",
                            }
                          : null
                      }
                    />
                    <span style={{ color: "red" }}>
                      {this.state.errors["newPassword"]}
                    </span>
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
