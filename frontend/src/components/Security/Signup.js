import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import {Row, Col, Button} from 'react-bootstrap';
import UrlLocator from '../../helpers/UrlLocator';

class Signup extends Component {

    constructor(props){
        super(props);
        this.state= {
            fullName: "",
            username: "",
            email: "",
            password: "",
            role: ["ROLE_USER"],
            errors: {},
            showAlert: false,
            alertMessageContent: ''
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = () => {
        let validationErrors = {};

        let failed = false;
        if (this.state.fullName === "") {
          failed = true;
          validationErrors["fullName"] = "Cannot be empty";
        } else if(!this.state.fullName.match(/^[A-Za-z\s]+$/)){
          failed = true;
          validationErrors["fullName"] = "Letters only";
        }

        if (this.state.username === "") {
            failed = true;
            validationErrors["username"] = "Cannot be empty";
          } else if(!this.state.username.match(/^[A-Za-z0-9]+$/)){
            failed = true;
            validationErrors["username"] = "Letters and numbers only";
          }

          if (this.state.email === "") {
            failed = true;
            validationErrors["email"] = "Cannot be empty";
          } else if(!this.state.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            failed = true;
            validationErrors["email"] = "Invalid email address format";
          }
    
        if (this.state.password === "") {
          failed = true;
          validationErrors["password"] = "Cannot be empty";
        }
    
        if (failed === true) {
          this.setState({
            errors: validationErrors,
            showAlert: false,
            alertMessageContent: ''
          });
        } else {
            axios.post(UrlLocator.getApiUrl('SIGNUP_URL'), 
        {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            fullName: this.state.fullName,
            role: ["ROLE_USER"]
        }).then((res) => {
            if(res.status === 200){
                window.open("/signin", "_self");
            }
        }).catch((err) => {
            if (err.response.status === 401) {
              this.setState({
                showAlert: true, alertMessageContent: `ERR: Invalid username or password`, errors: validationErrors
              });
            } else {
              this.setState({
                showAlert: true,
                alertMessageContent: `ERR: Failed with error code ${err.response.status}`, errors: validationErrors
              });
            }
          });
    }
    }

  render(){
    return (
        <form className="container my-5 p-5" style={{borderRadius: "20px", width: ""}}>
            <Row>
            <Col xl={6} sm={12} md={6} lg={6}>
            
                <h3 className='my-3'>Sign Up</h3>
                <div className="form-group mt-2">
                    <label>Full Name</label>
                    <input type="text" className="form-control" placeholder="Full name" name="fullName" onChange={this.handleChange}
                    style={
                        this.state.errors["fullName"] !== undefined
                          ? {
                              borderWidth: "1px",
                              borderColor: "red",
                              borderStyle: "solid",
                            }
                          : null
                      }/>   
                      <span style={{ color: "red" }}>{this.state.errors["fullName"]}</span>      
                </div>



                <div className="form-group mt-2">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Username"  name="username" onChange={this.handleChange}
                    style={
                        this.state.errors["username"] !== undefined
                          ? {
                              borderWidth: "1px",
                              borderColor: "red",
                              borderStyle: "solid",
                            }
                          : null
                      }/>   
                      <span style={{ color: "red" }}>{this.state.errors["username"]}</span>      
                </div>

                <div className="form-group mt-2">
                    <label>Email Address</label>
                    <input type="email" className="form-control" placeholder="Enter email"  name="email" onChange={this.handleChange}
                    style={
                        this.state.errors["email"] !== undefined
                          ? {
                              borderWidth: "1px",
                              borderColor: "red",
                              borderStyle: "solid",
                            }
                          : null
                      }/>   
                      <span style={{ color: "red" }}>{this.state.errors["email"]}</span>      
                </div>

                <div className="form-group mt-2">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"  name="password" onChange={this.handleChange}
                    style={
                        this.state.errors["password"] !== undefined
                          ? {
                              borderWidth: "1px",
                              borderColor: "red",
                              borderStyle: "solid",
                            }
                          : null
                      }/>   
                      <span style={{ color: "red" }}>{this.state.errors["password"]}</span>      
                </div>

                <div className="form-group mt-2">
                      <div className='d-flex justify-content-between'>
                        <Button variant="dark" onClick={this.handleSubmit}>Sign Up</Button>
                        <NavLink to="/signin" className="btn btn-dark" style={{display: "inline-block"}}>Have an account? Sign In</NavLink>
                      </div>
                </div>

                            
                </Col>
                <Col xl={6} sm={12} md={6} lg={6}></Col>
                </Row>  

            </form>
    );
  }
}

export default Signup;
