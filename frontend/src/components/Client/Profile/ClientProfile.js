import axios from "axios";
import React, { Component } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

import AuthContext from "../../../context/AuthContext";

class ClientProfile extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      username: "",
      email: "",
      cardName: "",
      cardNumber: "",
      cardExpDate: "",
      cardCcv: ""
    };
  }

  componentDidMount(){
    const { accessToken, username } = this.context;

    axios.get(`http://localhost:8080/api/profile/getAll/${username}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      this.setState({
        fullName: res.data.customUserObject.fullName, 
        username: res.data.customUserObject.username, 
        email: res.data.customUserObject.email,
        cardName: res.data.paymentMethod === null ? "" : res.data.paymentMethod.cardName,
        cardNumber: res.data.paymentMethod === null ? "" : res.data.paymentMethod.cardNumber,
        cardExpDate: res.data.paymentMethod === null ? "" : res.data.paymentMethod.cardExpDate,
        cardCcv: res.data.paymentMethod === null ? "" : res.data.paymentMethod.cardCcv
      })
      
    })
  }

  handleCardDetailsChanges = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handlePaymentMethodUpdate = () => {
    const { userId, accessToken } = this.context;

    axios.put(`http://localhost:8080/api/profile/updatePaymentMethod/${userId}`, {
      cardName: this.state.cardName,
      cardNumber: this.state.cardNumber,
      cardExpDate: this.state.cardExpDate,
      cardCcv: this.state.cardCcv
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
   
    })

  };

  handleUserDetailsUpdate = () => {

    const { userId, logout, accessToken } = this.context;

    axios.put(`http://localhost:8080/api/profile/updateUserDetails/${userId}`, {
      fullName: this.state.fullName,
      username: this.state.username,
      email: this.state.email
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
                      placeholder="Enter full name"
                      defaultValue={this.state.fullName}
                      onChange={this.handleCardDetailsChanges}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      name="username"
                      type="text"
                      placeholder="Enter username"
                      defaultValue={this.state.username}
                      onChange={this.handleCardDetailsChanges}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                      name="email"
                      type="text"
                      placeholder="Enter email"
                      defaultValue={this.state.email}
                      onChange={this.handleCardDetailsChanges}
                    />
                  </Form.Group>
                </Col>
                <Col></Col>
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

        <Card className="my-5">
          <Card.Header>Payment Method</Card.Header>
          <Card.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="cardName">
                    <Form.Label>Card Name</Form.Label>
                    <Form.Control
                      name="cardName"
                      type="text"
                      placeholder="Enter card name"
                      defaultValue={this.state.cardName}
                      onChange={this.handleCardDetailsChanges}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="cardNumber">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      name="cardNumber"
                      type="text"
                      placeholder="Enter card number"
                      defaultValue={this.state.cardNumber}
                      onChange={this.handleCardDetailsChanges}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="cardExpDate">
                    <Form.Label>Card Expiry Date (MM/YY)</Form.Label>
                    <Form.Control
                      name="cardExpDate"
                      type="text"
                      placeholder="Enter card expiration date"
                      defaultValue={this.state.cardExpDate}
                      onChange={this.handleCardDetailsChanges}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="cardCcv">
                    <Form.Label>CCV</Form.Label>
                    <Form.Control
                      name="cardCcv"
                      type="text"
                      placeholder="Enter card ccv"
                      defaultValue={this.state.cardCcv}
                      onChange={this.handleCardDetailsChanges}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="dark" onClick={this.handlePaymentMethodUpdate}>
              Save
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ClientProfile;
