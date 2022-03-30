import axios from "axios";
import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import UrlLocator from '../../../helpers/UrlLocator';

class CouponModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      couponId: "",
      percentage: 0,
      errors: {},
      showAlert: false,
      alertMessageContent: ""
    };
  }

  componentDidMount(){
    this.setState({
      id: this.props.coupon.id,
      couponId: this.props.coupon.couponId,
      percentage: this.props.coupon.percentage,
      errors: {},
      showAlert: false,
      alertMessageContent: ""
    })
  }

  handleChange = (event) => {
    if (event.target.name === "couponId") {
      this.setState({ couponId: event.target.value });
    } else if (event.target.name === "percentage") {
      this.setState({ percentage: event.target.value });
    }
  };

  handleSave = (id, couponId, percentage) => {
    let validationErrors = {};

    let failed = false;
    if (this.state.couponId === "") {
      failed = true;
      validationErrors["couponId"] = "Cannot be empty";
    } else if(!this.state.couponId.match(/^[0-9A-Za-z]+$/)){
      failed = true;
      validationErrors["couponId"] = "Numbers and letters only";
    }

    if (this.state.percentage === "") {
      failed = true;
      validationErrors["percentage"] = "Cannot be empty";
    } else if(this.state.percentage < 1){
      failed = true;
      validationErrors["percentage"] = "Improper percentage value";
    } else if(isNaN(this.state.percentage)){
      failed = true;
      validationErrors["percentage"] = "Numbers only";
    }

    if (failed === true) {
      this.setState({
        errors: validationErrors,
        showAlert: false,
        alertMessageContent: "",
      });
    } else
    {axios.put(UrlLocator.getApiUrl('SAVE_COUPON'), {
      id: this.props.coupon.id,
      couponId: this.state.couponId === '' ? this.props.coupon.couponId : this.state.couponId,
      percentage: this.state.percentage === '' ? this.props.coupon.percentage : this.state.percentage
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then((response) => {
        if(response.status === 200){
          this.props.hideModal();
        }
    })
    .catch((error) => {
      validationErrors["couponId"] = error.response.data;
          this.setState({
            errors: validationErrors,
          });
    });}
    
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.coupon.modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control type="hidden" placeholder="ID" name="id" defaultValue={this.props.coupon.id} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Coupon ID</Form.Label>
              <Form.Control type="text" placeholder="Enter coupon ID" onChange={this.handleChange} name="couponId" defaultValue={this.props.coupon.couponId} 
              style={
                this.state.errors["couponId"] !== undefined
                  ? {
                      borderWidth: "1px",
                      borderColor: "red",
                      borderStyle: "solid",
                    }
                  : null
              }
            />
            <span style={{ color: "red" }}>
              {this.state.errors["couponId"]}
            </span>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Percentage</Form.Label>
              <Form.Control type="text" placeholder="Enter percentage" onChange={this.handleChange} name="percentage" defaultValue={this.props.coupon.percentage} 
              style={
                this.state.errors["percentage"] !== undefined
                  ? {
                      borderWidth: "1px",
                      borderColor: "red",
                      borderStyle: "solid",
                    }
                  : null
              }
            />
            <span style={{ color: "red" }}>
              {this.state.errors["percentage"]}
            </span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
              this.setState({errors: {},
                showAlert: false,
                alertMessageContent: ''}, () => this.props.hideModal())
            }}>Cancel</Button>
          <Button onClick={this.handleSave}>Save and Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CouponModal;
