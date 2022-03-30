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
      username: "",
      errors: {},
      showAlert: false,
      alertMessageContent: ""
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

    let validationErrors = {};
    

    let failed = false;
    if (this.state.fullName === "") {
      failed = true;
      validationErrors["fullName"] = "Cannot be empty";
    } else if(!this.state.fullName.match(/^[A-Za-z\s]+$/)){
      failed = true;
      validationErrors["fullName"] = "letters only";
    }


    if (failed === true) {
      this.setState({
        errors: validationErrors,
        showAlert: false,
        alertMessageContent: "",
      });
    } else
    {

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
      if(res.status === 200){
        logout();
      }
    }).catch((error) => {
      validationErrors["fullName"] = error.response.data;
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
                  value={this.state.fullName}
                  onChange={this.handleUserDetailsChanges}
                  style={
                    this.state.errors["fullName"] !== undefined
                      ? {
                          borderWidth: "1px",
                          borderColor: "red",
                          borderStyle: "solid",
                        }
                      : null
                  }
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["fullName"]}
                </span>
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
