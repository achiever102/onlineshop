import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {

    constructor(props){
        super(props);
        this.state= {
            fullName: "",
            username: "",
            email: "",
            password: "",
            role: ["ROLE_USER"]
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = () => {
        axios.post('http://localhost:8080/api/auth/signup', 
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
        })
    }

  render(){
    return (
        <form className="container my-5 p-5" style={{borderRadius: "20px", width: ""}}>
                <h3 className='my-3'>Sign Up</h3>
                <div className="form-group">
                    <div className='row my-1'>
                        <div className='col-6'>
                            <div className='row'>
                                <div className='col-3'><label>Full Name</label></div>
                                <div className='col-9'><input type="text" className="form-control" placeholder="Full name" name="fullName" onChange={this.handleChange}/></div>
                            </div>
                        </div>
                        <div className='col-6'></div>
                    </div>

                    <div className='row my-1'>
                        <div className='col-6'>
                            <div className='row'>
                                <div className='col-3'><label>Username</label></div>
                                <div className='col-9'><input type="text" className="form-control" placeholder="Username"  name="username" onChange={this.handleChange}/></div>
                            </div>
                        </div>
                        <div className='col-6'></div>
                    </div>

                    <div className='row my-1'>
                        <div className='col-6'>
                            <div className='row'>
                                <div className='col-3'><label>Email address</label></div>
                                <div className='col-9'><input type="email" className="form-control" placeholder="Enter email"  name="email" onChange={this.handleChange}/></div>
                            </div>
                        </div>
                        <div className='col-6'></div>
                    </div>
                    
                    <div className='row my-1'>
                        <div className='col-6'>
                            <div className='row'>
                                <div className='col-3'><label>Password</label></div>
                                <div className='col-9'><input type="password" className="form-control" placeholder="Enter password"  name="password" onChange={this.handleChange}/></div>
                            </div>
                        </div>
                        <div className='col-6'></div>
                    </div>

                    <div className='row  mt-2'>
                        <div className='col-6'>
                            <div className='row'>
                                <div className='col-3'></div>
                                <div className='col-4'><button type="button" className="btn btn-dark btn-block" onClick={this.handleSubmit}>Sign Up</button></div>
                                <div className='col-5 d-flex justify-content-end'><p className="forgot-password text-right">
                    Already registered <NavLink to="/signin" className="btn btn-dark" style={{display: "inline-block"}}>Sign In</NavLink>
                </p></div>
                            </div>
                        </div>
                        <div className='col-6'>
                            
                        </div>
                    </div>
                    
                </div>
                
            </form>
    );
  }
}

export default Signup;
