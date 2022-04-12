import axios from "axios";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import UrlLocator from "../../helpers/UrlLocator";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword(props) {

  let { resetPasswordTokenId } = useParams();

  const navigate = useNavigate();

  const [state, setState] = useState({
    newPassword: "",
    errors: {},
    showSuccessResponseMessage: false,
    showFailedResponseMessage: false,
    responseErrorMessage: {},
  });

  const handleChange = (event) => {
    setState({...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    let validationErrors = {};
    let failed = false;

    if (state.newPassword === "") {
      failed = true;
      validationErrors["newPassword"] = "Cannot be empty";
    }

    if (failed === true) {
      setState({...state,
        errors: validationErrors,
      });
    } else {
      const formData = new FormData();
      formData.append("newPassword", state.newPassword);
      formData.append("resetPasswordTokenId", resetPasswordTokenId);

      axios
        .post(UrlLocator.getApiUrl("RESET_PASSWORD"), formData)
        .then((res) => {
          if (res.status === 200) {
            setState({...state,
              showSuccessResponseMessage: true,
              errors: {},
              newPassword: "",
              showFailedResponseMessage: false,
              responseErrorMessage: {},
            }, 
              navigate("/signin")
           );
          }
        })
        .catch((err) => {
          let validationErrors = {};
          validationErrors["newPassword"] = err.response.data;

          setState({...state,
            showSuccessResponseMessage: false,
            showFailedResponseMessage: true,
            errors: {},
            responseErrorMessage: validationErrors,
            newPassword: "",
          });
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
            <h3 className="my-2">Reset Password</h3>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Your New Password"
                name="newPassword"
                onChange={handleChange}
                value={state.newPassword}
                style={
                  state.errors["newPassword"] !== undefined
                    ? {
                        borderWidth: "1px",
                        borderColor: "red",
                        borderStyle: "solid",
                      }
                    : null
                }
              />
              <span style={{ color: "red" }}>
                {state.errors["newPassword"]}
              </span>
            </div>

            <button
              type="button"
              className="btn btn-dark  btn-md mt-2"
              onClick={handleSubmit}
            >
              Reset Password
            </button>
            {state.showSuccessResponseMessage ? (
              <p style={{ color: "green", marginTop: "10px" }}>
                Your password was successfully reset!
              </p>
            ) : null}

            {state.showFailedResponseMessage ? (
              <p style={{ color: "red", marginTop: "10px" }}>
                {state.responseErrorMessage["newPassword"]}
              </p>
            ) : null}
          </Col>
          <Col xl={6} sm={12} md={6} lg={6}></Col>
        </Row>
      </form>
    );
  
}

