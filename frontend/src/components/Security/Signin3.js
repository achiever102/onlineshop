import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Alert, Row, Col } from "react-bootstrap";
import axios from "axios";

import AuthContext from "../../context/AuthContext";

class Signin extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showAlert: false,
      alertMessage: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    let failed = false;
    if (this.state.username === "") {
      failed = true;
    }
    if (this.state.password === "") {
      failed = true;
    }

    if (failed === true) {
      this.setState({
        showAlert: true,
        alertMessage: `ERR: Fill all fields in red`,
      });
    } else {
      axios
        .post("http://localhost:8080/api/auth/signin", {
          username: this.state.username,
          password: this.state.password,
        })
        .then((res) => {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("fullName", res.data.fullName);
          localStorage.setItem("userId", res.data.id);
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("roles", res.data.roles[0]);

          if (res.data.roles[0] === "ROLE_USER") {
            //const {username, fullName, userId, accessToken, isAuthenticated, login, logout} = this.context;
            //login(res.data.username, res.data.fullName, res.data.id, res.data.accessToken, true);
            //console.log(this.context);

            const bodyFormData = new FormData();
            bodyFormData.append(
              "cart",
              JSON.parse(localStorage.getItem("cart"))
            );
            bodyFormData.append("userId", localStorage.getItem("userId"));
            localStorage.removeItem("cart");
            axios
              .post(
                "http://localhost:8080/api/cart/createCartRecords",
                bodyFormData,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "accessToken"
                    )}`,
                  },
                }
              )
              .then((res) => {
                
              });

              
            window.open("/clientItems", "_self");
          }
          if (res.data.roles[0] === "ROLE_ADMIN") {
            window.open("/adminItems", "_self");
          }
        })
        .catch((err) => {
          this.setState({
            showAlert: true,
            alertMessage: `ERR: Failed to Login with error code ${err.response.status}`,
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
        <h3 className="my-2">Sign In</h3>
        <div className="form-group my-4">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="username"
            onChange={this.handleChange}
            style={
              this.state.showAlert
                ? {
                    borderWidth: "1px",
                    borderColor: "red",
                    borderStyle: "solid",
                  }
                : null
            }
          />
        </div>
        <div className="form-group my-4">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            onChange={this.handleChange}
            style={
              this.state.showAlert
                ? {
                    borderWidth: "1px",
                    borderColor: "red",
                    borderStyle: "solid",
                  }
                : null
            }
          />
        </div>
       
        <button
          type="button"
          className="btn btn-dark  btn-md"
          onClick={this.handleSubmit}
        >
          Sign In
        </button>

        <div className="my-2">
        <NavLink
          to="/signin"
          style={{ display: "inline-block" }}
          className="btn btn-dark btn-md"
          
        >
          Forgot password?
        </NavLink>

        <NavLink
          to="/signup"
          style={{ display: "inline-block" }}
          className="btn btn-dark btn-md mx-2"
        >
          Create an account?
        </NavLink>
        </div>

        {this.state.showAlert ? (
          <Alert variant="danger" className="mt-3">
            {this.state.alertMessage}
          </Alert>
        ) : null}
        </Col>
        <Col xl={6} sm={12} md={6} lg={6}></Col>
      </Row>

      </form>
    );
  }
}

export default Signin;
