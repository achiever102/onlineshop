import axios from "axios";
import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import CouponModal from './CouponModal'
import CouponRecord from "./CouponRecord";
import Helper from '../../../helpers/Helper';

class CouponsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      editCoupon: {
        id: -1,
        couponId: "",
        percentage: 0
      },
      coupons: []
    };
  }

  showModal = () => {
    this.setState({ show: true });
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

  handleDelete = (id) => {
    axios.delete(`${Helper.getApiUrl('DELETE_COUPON')}/${id}`).then((response) => {
      if(response.status === 200)
        this.getAllCoupons();
    })
  }

  handleEdit = (id) => {
    axios.get(`${Helper.getApiUrl('GET_COUPON_BY_ID')}/${id}`).then((response) => {
      if(response.status === 200 && response.data !== null){
        const coupon = {
          id: response.data.id,
          couponId: response.data.couponId,
          percentage: response.data.percentage
        }
        console.log(coupon)
        this.setState({show: true, editCoupon: coupon});
      }
    })
  }

  render() {
    return (
      <div className="container">
        <CouponModal show={this.state.show} hideModal={this.hideModal} coupon={this.state.editCoupon} />

        <Button variant="outline-dark mt-5" onClick={() => this.showModal()}>Add New Coupon</Button>

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
                <CouponRecord key={element.id} element={element} handleDelete={this.handleDelete} handleEdit={this.handleEdit}/>
              )
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CouponsTable;
