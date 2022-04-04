import axios from "axios";
import React, { Component } from "react";
import { Button, Row, Col, Form, Container, Modal } from "react-bootstrap";
import UrlLocator from "../../helpers/UrlLocator";

class AppNewsletter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: "",
      showModal: false,
      errors: {}
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubsribe = () => {
    let validationErrors = {};

    let failed = false;

    if (this.state.emailAddress === "") {
      failed = true;
      validationErrors["emailAddress"] = "Cannot be empty";
    } else if (
      !this.state.emailAddress.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      failed = true;
      validationErrors["emailAddress"] = "Invalid email address format";
    }

    if (failed === true) {
      this.setState({
        errors: validationErrors,
      });
    } else {
      axios
        .post(UrlLocator.getApiUrl('SAVE_NEWLETTER'), {
          emailAddress: this.state.emailAddress,
        })
        .then((res) => {
          if (res.status === 200) {
            this.setState({ showModal: true, emailAddress: "", errors: {} });
          }
        });
    }
  };

  render() {
    return (
      <div className="Jumbotron bg-dark py-5">
        <Modal
          show={this.state.showModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              You successfully subscribed!
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={() => this.setState({ showModal: false })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="container">
          <Row>
            <Col>
              <h3 style={{ color: "white" }} className="text-center">
                Interested in our newsletter, recommendations, and sales? Enter
                your email and subscribe.
              </h3>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="text-center">
              <Form>
                <Container>
                  <Row>
                    <Col className="d-flex justify-content-center mt-2">
                      <div style={{ width: "450px" }}>
                        <Form.Control
                          id="emailAddress"
                          name="emailAddress"
                          type="email"
                          onChange={this.handleChange}
                          value={this.state.emailAddress}
                          placeholder="Enter your email address"
                          style={
                            this.state.errors["emailAddress"] !== undefined
                              ? {
                                  borderWidth: "1px",
                                  borderColor: "red",
                                  borderStyle: "solid",
                                }
                              : null
                          }
                        />
                        <span style={{ color: "red" }}>
                          {this.state.errors["emailAddress"]}
                        </span>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="d-flex justify-content-center mt-2">
                      <div>
                        <Button variant="light" onClick={this.handleSubsribe}>
                          Subscribe
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default AppNewsletter;
