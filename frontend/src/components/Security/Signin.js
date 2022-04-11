import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Alert, Row, Col } from "react-bootstrap";
import axios from "axios";

import AuthContext from "../../context/AuthContext";
import UrlLocator from "../../helpers/UrlLocator";

export default function Signin() {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [state, setState] = useState({
    username: "",
    password: "",
    showAlert: false,
    alertMessageContent: "",
    errors: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    let validationErrors = {};

    let failed = false;
    if (state.username === "") {
      failed = true;
      validationErrors["username"] = "Cannot be empty";
    } else if (!state.username.match(/^[a-zA-Z0-9]+$/)) {
      failed = true;
      validationErrors["username"] = "Numbers and letters only";
    }

    if (state.password === "") {
      failed = true;
      validationErrors["password"] = "Cannot be empty";
    }

    if (failed === true) {
      setState((prevState) => ({
        ...prevState,
        errors: validationErrors,
        showAlert: false,
        alertMessageContent: ''
      }));
    } else {
      axios
        .post(UrlLocator.getApiUrl('SIGNIN_URL'), {
          username: state.username,
          password: state.password,
        })
        .then((res) => {
         
          login(
            res.data.accessToken,
            res.data.username,
            res.data.fullName,
            res.data.id,
            res.data.roles[0],
            true
          );

          if (res.data.roles[0] === "ROLE_USER") {
            if (
              JSON.parse(
                localStorage.getItem("cart") &&
                  JSON.parse(localStorage.getItem("cart").length > 0)
              )
            ) {
              const bodyFormData = new FormData();
              bodyFormData.append("cart", localStorage.getItem("cart"));
              bodyFormData.append("userId", localStorage.getItem("userId"));
              localStorage.removeItem("cart");
              axios
                .post(
                  UrlLocator.getApiUrl('CREATE_CART_RECORD'),
                  bodyFormData,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                      )}`,
                    },
                  }
                )
                .then((res) => {});
            }
            navigate("/clientItems");
          }
          if (res.data.roles[0] === "ROLE_ADMIN") {
            navigate("/adminItems");
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setState((prevState) => ({
              ...prevState,
              showAlert: true, alertMessageContent: `ERR: Invalid username or password`, errors: validationErrors
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              showAlert: true,
              alertMessageContent: `ERR: Failed with error code ${err.response.status}`, errors: validationErrors
            }));
          }
        });
    }
  };

  return (
    <form
      className="container my-5 p-5"
      style={{ borderRadius: "20px", color: "white"}}
    >
      <Row>
        <Col xl={6} sm={12} md={6} lg={6}>
          <h3 className="my-2">Sign In</h3>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              name="username"
              onChange={handleChange}
              style={
                state.errors["username"] !== undefined
                  ? {
                      borderWidth: "1px",
                      borderColor: "red",
                      borderStyle: "solid",
                    }
                  : null
              }
            />
            <span style={{ color: "red" }}>{state.errors["username"]}</span>
          </div>
          <div className="form-group my-2">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              onChange={handleChange}
              style={
                state.errors["password"] !== undefined
                  ? {
                      borderWidth: "1px",
                      borderColor: "red",
                      borderStyle: "solid",
                    }
                  : null
              }
            />
            <span style={{ color: "red" }}>{state.errors["password"]}</span>
          </div>

          <button
            type="button"
            className="btn btn-dark  btn-md"
            onClick={handleSubmit}
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

          {state.showAlert ? (
            <Alert variant="danger" className="mt-3">
              {state.alertMessageContent}
            </Alert>
          ) : null}
        </Col>
        <Col xl={6} sm={12} md={6} lg={6}></Col>
      </Row>
    </form>
  );
}
