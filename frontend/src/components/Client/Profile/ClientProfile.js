import axios from "axios";
import React, { Component } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

import AuthContext from "../../../context/AuthContext";
import UrlLocator from "../../../helpers/UrlLocator";

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
      cardCcv: "",
      paymentMethodErrors: {},
      userDetailsErrors: {},
    };
  }

  componentDidMount() {
    const { accessToken, username } = this.context;

    axios
      .get(`${UrlLocator.getApiUrl('GET_ALL_USER_PROFILE')}/${username}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        this.setState({
          fullName: res.data.customUserObject.fullName,
          username: res.data.customUserObject.username,
          email: res.data.customUserObject.email,
          cardName:
            res.data.paymentMethod === null
              ? ""
              : res.data.paymentMethod.cardName,
          cardNumber:
            res.data.paymentMethod === null
              ? ""
              : res.data.paymentMethod.cardNumber,
          cardExpDate:
            res.data.paymentMethod === null
              ? ""
              : res.data.paymentMethod.cardExpDate,
          cardCcv:
            res.data.paymentMethod === null
              ? ""
              : res.data.paymentMethod.cardCcv,
          paymentMethodErrors: {},
          userDetailsErrors: {},
        });
      });
  }

  handleCardDetailsChanges = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handlePaymentMethodUpdate = () => {
    const { userId, accessToken } = this.context;
    let validationErrors = {};

    let failed = false;
    if (this.state.cardName === "") {
      failed = true;
      validationErrors["cardName"] = "Cannot be empty";
    } else if(!this.state.cardName.match(/^[A-Za-z\s]+$/)){
      failed = true;
      validationErrors["cardName"] = "Letters only";
    }

    if (this.state.cardNumber === "") {
      failed = true;
      validationErrors["cardNumber"] = "Cannot be empty";
    } else if(!this.state.cardNumber.match(/^\d{4}-?\d{4}-?\d{4}-?\d{4}$/)){
      failed = true;
      validationErrors["cardNumber"] = "16 digits credit card number";
    }

    if (this.state.cardExpDate === "") {
      failed = true;
      validationErrors["cardExpDate"] = "Cannot be empty";
    } else if(!this.state.cardExpDate.match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)){
      failed = true;
      validationErrors["cardExpDate"] = "Invalid expiration date format";
    }

    if (this.state.cardCcv === "") {
      failed = true;
      validationErrors["cardCcv"] = "Cannot be empty";
    } else if(!this.state.cardCcv.match(/^\d{3,4}$/)){
      failed = true;
      validationErrors["cardCcv"] = "Numbers only";
    }

    if (failed === true) {
      this.setState({
        paymentMethodErrors: validationErrors,
      });
    } else {
      axios
        .put(
          `${UrlLocator.getApiUrl('UPDATE_PAYMENT_METHOD')}/${userId}`,
          {
            cardName: this.state.cardName,
            cardNumber: this.state.cardNumber,
            cardExpDate: this.state.cardExpDate,
            cardCcv: this.state.cardCcv,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            this.setState({
              paymentMethodErrors: {},
            });
          }
        });
    }
  };

  handleUserDetailsUpdate = () => {
    const { userId, logout, accessToken } = this.context;

    let validationErrors = {};

    let failed = false;
    if (this.state.username === "") {
      failed = true;
      validationErrors["username"] = "Cannot be empty";
    } else if(!this.state.username.match(/^[A-Za-z0-9]+$/)){
      failed = true;
      validationErrors["username"] = "Letters and numbers only";
    }

    if (this.state.fullName === "") {
      failed = true;
      validationErrors["fullName"] = "Cannot be empty";
    } else if(!this.state.fullName.match(/^[A-Za-z\s]+$/)){
      failed = true;
      validationErrors["fullName"] = "Letters only";
    }

    if (this.state.email === "") {
      failed = true;
      validationErrors["email"] = "Cannot be empty";
    } else if(!this.state.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      failed = true;
      validationErrors["email"] = "Invalid email address format";
    }

    if (failed === true) {
      this.setState({
        userDetailsErrors: validationErrors,
      });
    } else {
      axios
        .put(
          `${UrlLocator.getApiUrl('UPDATE_USER_DETAILS')}/${userId}`,
          {
            fullName: this.state.fullName,
            username: this.state.username,
            email: this.state.email,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          //console.log("xxxxxxxxxxxxxxxxxxxx")
          //updateUserProfileDetails(this.state.username, this.state.fullName);
          if (res.status === 200) {
            this.setState({
              userDetailsErrors: {},
            }, () => {
              logout();
            });
          }
        });
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
                      placeholder="Enter full name"
                      value={this.state.fullName}
                      onChange={this.handleCardDetailsChanges}
                      style={
                        this.state.userDetailsErrors["fullName"] !== undefined
                          ? {
                              borderWidth: "1px",
                              borderColor: "red",
                              borderStyle: "solid",
                            }
                          : null
                      }
                    />
                    <span style={{ color: "red" }}>
                      {this.state.userDetailsErrors["fullName"]}
                    </span>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      name="username"
                      type="text"
                      placeholder="Enter username"
                      value={this.state.username}
                      onChange={this.handleCardDetailsChanges}
                      style={
                        this.state.userDetailsErrors["username"] !== undefined
                          ? {
                              borderWidth: "1px",
                              borderColor: "red",
                              borderStyle: "solid",
                            }
                          : null
                      }
                    />
                    <span style={{ color: "red" }}>
                      {this.state.userDetailsErrors["username"]}
                    </span>
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
                      value={this.state.email}
                      onChange={this.handleCardDetailsChanges}
                      style={
                        this.state.userDetailsErrors["email"] !== undefined
                          ? {
                              borderWidth: "1px",
                              borderColor: "red",
                              borderStyle: "solid",
                            }
                          : null
                      }
                    />
                    <span style={{ color: "red" }}>
                      {this.state.userDetailsErrors["email"]}
                    </span>
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
                      value={this.state.cardName}
                      onChange={this.handleCardDetailsChanges}
                      style={
                        this.state.paymentMethodErrors["cardName"] !== undefined
                          ? {
                              borderWidth: "1px",
                              borderColor: "red",
                              borderStyle: "solid",
                            }
                          : null
                      }
                    />
                    <span style={{ color: "red" }}>
                      {this.state.paymentMethodErrors["cardName"]}
                    </span>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="cardNumber">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      name="cardNumber"
                      type="text"
                      placeholder="Enter card number"
                      value={this.state.cardNumber}
                      onChange={this.handleCardDetailsChanges}
                      style={
                        this.state.paymentMethodErrors["cardNumber"] !==
                        undefined
                          ? {
                              borderWidth: "1px",
                              borderColor: "red",
                              borderStyle: "solid",
                            }
                          : null
                      }
                    />
                    <span style={{ color: "red" }}>
                      {this.state.paymentMethodErrors["cardNumber"]}
                    </span>
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
                      value={this.state.cardExpDate}
                      onChange={this.handleCardDetailsChanges}
                      style={
                        this.state.paymentMethodErrors["cardExpDate"] !==
                        undefined
                          ? {
                              borderWidth: "1px",
                              borderColor: "red",
                              borderStyle: "solid",
                            }
                          : null
                      }
                    />
                    <span style={{ color: "red" }}>
                      {this.state.paymentMethodErrors["cardExpDate"]}
                    </span>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="cardCcv">
                    <Form.Label>CCV</Form.Label>
                    <Form.Control
                      name="cardCcv"
                      type="text"
                      placeholder="Enter card ccv"
                      value={this.state.cardCcv}
                      onChange={this.handleCardDetailsChanges}
                      style={
                        this.state.paymentMethodErrors["cardCcv"] !== undefined
                          ? {
                              borderWidth: "1px",
                              borderColor: "red",
                              borderStyle: "solid",
                            }
                          : null
                      }
                    />
                    <span style={{ color: "red" }}>
                      {this.state.paymentMethodErrors["cardCcv"]}
                    </span>
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
