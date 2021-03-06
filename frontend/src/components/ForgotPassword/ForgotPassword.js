import axios from 'axios';
import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import UrlLocator from '../../helpers/UrlLocator';
import AppFooter from '../AppFooter/AppFooter';

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
          <div>
            <form
      className="container my-5 p-5"
      style={{ borderRadius: "20px", width: "" }}
    >
      <Row>
        <Col xl={5} sm={12} md={6} lg={5}>
          <h3 className="my-2 text-white">Reset your password</h3>
          <div className="form-group">
            <label className='text-white'>Email Address</label>
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
          <div className="d-grid gap-2 mt-3">
          <button
            type="button"
            className="btn btn-outline-light btn-md"
            onClick={this.handleSubmit}
          >
            Send Email
          </button>
          </div>
          {this.state.showResponseMessage ? <p style={{ color: "green", marginTop: "10px" }}>You will receive a reset password link in your email if your email address exists in our system.</p> : null}
        </Col>
      </Row>
    </form>
<AppFooter />
    </div>
        )
    }
}

export default ForgotPassword;