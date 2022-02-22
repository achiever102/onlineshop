import axios from "axios";
import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Helper from '../../../helpers/Helper';

class CouponModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      couponId: "",
      percentage: 0,
    };
  }

  handleChange = (event) => {
    if (event.target.name === "couponId") {
      this.setState({ couponId: event.target.value });
    } else if (event.target.name === "percentage") {
      this.setState({ percentage: event.target.value });
    }
  };

  handleSave = (couponId, percentage) => {
    axios
      .post(Helper.getApiUrl('SAVE_COUPON'), {
        couponId: this.state.couponId,
        percentage: this.state.percentage
      })
      .then((response) => {
          if(response.status === 200){
            this.props.hideModal();
          }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Coupon
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Coupon ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter coupon ID"
                onChange={this.handleChange}
                name="couponId"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Percentage Value</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter percentage"
                onChange={this.handleChange}
                name="percentage"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.hideModal}>Cancel</Button>
          <Button onClick={this.handleSave}>Save and Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CouponModal;
