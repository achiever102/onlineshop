import axios from "axios";
import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import UrlLocator from "../../helpers/UrlLocator";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      errors: {},
      showSuccessResponseMessage: false,
      showFailedResponseMessage: false,
      responseErrorMessage: {},
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    let validationErrors = {};
    let failed = false;

    if (this.state.newPassword === "") {
      failed = true;
      validationErrors["newPassword"] = "Cannot be empty";
    }

    if (failed === true) {
      this.setState({
        errors: validationErrors,
      });
    } else {
      const formData = new FormData();
      formData.append("newPassword", this.state.newPassword);
      formData.append("resetPasswordTokenId", this.props.resetPasswordTokenId);

      axios
        .post(UrlLocator.getApiUrl("RESET_PASSWORD"), formData)
        .then((res) => {
          if (res.status === 200) {
            this.setState({
              showSuccessResponseMessage: true,
              errors: {},
              newPassword: "",
              showFailedResponseMessage: false,
              responseErrorMessage: {},
            });
          }
        })
        .catch((err) => {
          let validationErrors = {};
          validationErrors["newPassword"] = err.response.data;

          this.setState({
            showSuccessResponseMessage: false,
            showFailedResponseMessage: true,
            errors: {},
            responseErrorMessage: validationErrors,
            newPassword: "",
          });
        });
    }
  };

  render() {
    return (
      <form
        className="container my-5 p-5"
        style={{ borderRadius: "20px", width: "" }}
      >
        <Row>
          <Col xl={6} sm={12} md={6} lg={6}>
            <h3 className="my-2">Reset Password</h3>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Your New Password"
                name="newPassword"
                onChange={this.handleChange}
                value={this.state.newPassword}
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
            </div>

            <button
              type="button"
              className="btn btn-dark  btn-md mt-2"
              onClick={this.handleSubmit}
            >
              Reset Password
            </button>
            {this.state.showSuccessResponseMessage ? (
              <p style={{ color: "green", marginTop: "10px" }}>
                Your password was successfully reset!
              </p>
            ) : null}

            {this.state.showFailedResponseMessage ? (
              <p style={{ color: "red", marginTop: "10px" }}>
                {this.state.responseErrorMessage["newPassword"]}
              </p>
            ) : null}
          </Col>
          <Col xl={6} sm={12} md={6} lg={6}></Col>
        </Row>
      </form>
    );
  }
}

export default ResetPassword;
