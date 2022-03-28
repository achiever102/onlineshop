import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Alert, Row, Col } from "react-bootstrap";
import axios from "axios";

import AuthContext from "../../context/AuthContext";


export default function Signin() {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");


  const handleSubmit = () => {
    let failed = false;
    if (username === "") {
      failed = true;
    }
    if (password === "") {
      failed = true;
    }

    if (failed === true) {
      setShowAlert(true);
      setAlertMessage(`ERR: Fill all fields in red`);
    } else {
      axios
        .post("http://localhost:8080/api/auth/signin", {
          username: username,
          password: password,
        })
        .then((res) => {
          
          /*localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("fullName", res.data.fullName);
          localStorage.setItem("userId", res.data.id);
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("roles", res.data.roles[0]);*/

          login(res.data.accessToken, res.data.username, res.data.fullName, res.data.id, res.data.roles[0], true);

          if (res.data.roles[0] === "ROLE_USER") {

            if(JSON.parse(localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart").length > 0))){
              const bodyFormData = new FormData();
            bodyFormData.append(
              "cart",
              localStorage.getItem("cart")
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
            }
              navigate("/clientItems")
          }
          if (res.data.roles[0] === "ROLE_ADMIN") {
            navigate("/adminItems")
          }
        })
        .catch((err) => {
          setShowAlert(true);
          console.log(err)
          setAlertMessage(`ERR: Failed to Login with error code `);
          
        });
    }
  };

    return (
      <form
        className="container my-5 p-5"
        style={{ borderRadius: "20px", width: "" }}
      >
        
      <Row>
        <Col xl={6} sm={12} md={6} lg={6}>
        <h3 className="my-2">Sign In</h3>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="username"
            onChange={e => setUsername(e.target.value)}
            style={
              showAlert
                ? {
                    borderWidth: "1px",
                    borderColor: "red",
                    borderStyle: "solid",
                  }
                : null
            }
          />
        </div>
        <div className="form-group my-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            onChange={e => setPassword(e.target.value)}
            style={
              showAlert
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
          onClick={e => handleSubmit(e.target.value)}
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

        {showAlert ? (
          <Alert variant="danger" className="mt-3">
            {alertMessage}
          </Alert>
        ) : null}
        </Col>
        <Col xl={6} sm={12} md={6} lg={6}></Col>
      </Row>

      </form>
    );
  
}
