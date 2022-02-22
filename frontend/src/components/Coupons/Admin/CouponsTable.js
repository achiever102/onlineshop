import axios from "axios";
import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import CouponModal from './CouponModal'
import CouponRecod from "./CouponRecord";
import Helper from '../../../helpers/Helper';

class CouponsTable extends Component {
  constructor(props) {
    super();
    this.state = {
      show: false,
      coupons: []
    };
  }

  showModal = () => {
    this.setState({ show: true });
    this.getAllCoupons();
  };

  hideModal = () => {
    this.setState({ show: false });
    this.getAllCoupons();
  };

  componentDidMount(){
    this.getAllCoupons();
  }

  getAllCoupons = () => {
    axios.get(Helper.getApiUrl('GET_COUPONS')).then((response) => {
      console.log(response.data)
      this.setState({coupons: response.data})
    });
  }

  render() {
    return (
      <div className="container">
        <Button variant="outline-dark mt-5" onClick={() => this.showModal()}>Add New Coupon</Button>

        <CouponModal show={this.state.show} hideModal={this.hideModal} />

        <Table striped bordered hover size="sm" className="mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Coupon ID</th>
              <th>Percentage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.coupons.map((element) => 
                <CouponRecod key={element.id} element={element} />
              )
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CouponsTable;
