import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class AppOrders extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleInput = (event, props) => {
    if(this.state.username === 'admin@a.com'){
      window.location.href = '/admin'
    } else {
      window.open('/client')
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className="Login container mt-5" style={{ width: 550 }}>
        <Form>
          <Form.Group className="mt-3" size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              placeholder="email"
              value={this.state.value}
              name="username"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group className="mt-3" size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="password" />
          </Form.Group>
          <Button
            className="mt-3"
            block
            size="md"
            onClick={this.handleInput}
          >
            Login
          </Button>

          <div className="mt-2">
            <p className="text-right inline-block">
              Forgot password? Dont have an account?
            </p>
          </div>
        </Form>
      </div>
    );
  }
}

export default AppOrders;
