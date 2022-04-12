import axios from 'axios';
import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import UrlLocator from '../../helpers/UrlLocator';

class ForgotPassword extends Component{
constructor(props){
    super(props);
    this.state = {
        email: "",
        errors: {},
        showResponseMessage: false
    }
}

handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
}

handleSubmit = () => {
    let validationErrors = {};
    let failed = false;

    if (this.state.email === "") {
        failed = true;
        validationErrors["email"] = "Cannot be empty";
      } else if(!this.state.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        failed = true;
        validationErrors["email"] = "Invalid email address format";
      }

      if (failed === true) {
        this.setState({
          errors: validationErrors
        });
      } else {
        axios.post(`${UrlLocator.getApiUrl('FORGOT_PASSWORD')}/${this.state.email}`).then((res) => {
            this.setState({showResponseMessage: true, errors: {}, email: ""})
        })
      }
}


    render(){
        return(
            <form
      className="container my-5 p-5"
      style={{ borderRadius: "20px", width: "" }}
    >
      <Row>
        <Col xl={6} sm={12} md={6} lg={6}>
          <h3 className="my-2">Send Password Reset Email</h3>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email Address"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
              style={
                this.state.errors["email"] !== undefined
                  ? {
                      borderWidth: "1px",
                      borderColor: "red",
                      borderStyle: "solid",
                    }
                  : null
              }
            />
            <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
            
          </div>

          <button
            type="button"
            className="btn btn-dark  btn-md mt-2"
            onClick={this.handleSubmit}
          >
            Send Email
          </button>
          {this.state.showResponseMessage ? <p style={{ color: "green", marginTop: "10px" }}>You will receive a reset password link in your email if your email address exists in our system.</p> : null}
        </Col>
        <Col xl={6} sm={12} md={6} lg={6}></Col>
      </Row>
    </form>
        )
    }
}

export default ForgotPassword;