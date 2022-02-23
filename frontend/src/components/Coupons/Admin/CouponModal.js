import axios from "axios";
import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Helper from '../../../helpers/Helper';

class CouponModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      couponId: "",
      percentage: 0
    };
  }

  componentDidMount(){
    this.setState({
      id: this.props.coupon.id,
      couponId: this.props.coupon.couponId,
      percentage: this.props.coupon.percentage
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

    axios.put(Helper.getApiUrl('SAVE_COUPON'), {
      id: this.props.coupon.id,
      couponId: this.state.couponId === '' ? this.props.coupon.couponId : this.state.couponId,
      percentage: this.state.percentage === '' ? this.props.coupon.percentage : this.state.percentage
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
              <Form.Control type="text" placeholder="Enter coupon ID" onChange={this.handleChange} name="couponId" defaultValue={this.props.coupon.couponId} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Percentage</Form.Label>
              <Form.Control type="text" placeholder="Enter percentage" onChange={this.handleChange} name="percentage" defaultValue={this.props.coupon.percentage} />
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
