import axios from "axios";
import React, { Component } from "react";

import { Badge, Button, Card, Col, Row, Form } from "react-bootstrap";

import AuthContext from "../../../context/AuthContext";

import { ImFire } from "react-icons/im";

class FinalCheckout extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      subtotalAmount: 0,
      taxValue: 0,
      totalAmount: 0,
      cardName: "",
      cardNumber: "",
      cardExpDate: "",
      cardCcv: "",
      editPaymentMethod: false
    };
  }

  componentDidMount() {
    const { appliedCoupons, userId } = this.context;

    axios
      .get(
        `http://localhost:8080/api/cart/checkoutUserCart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {

        let sum = 0;

          res.data.itemList.forEach((element) => {
            let itemsActualPrice = (element.itemOnSale ? (element.itemPrice - element.itemPrice*element.itemSaleValue/100) : element.itemPrice)
            sum = sum + itemsActualPrice;
          })

          let couponsSum = 0;

          appliedCoupons.forEach((element) => {
            couponsSum = couponsSum + element.percentage;
          })

          let subtotalAmount = (sum - sum * couponsSum / 100).toFixed(2);

          let taxesAmount = (subtotalAmount * res.data.taxValue/100).toFixed(2);

          let totalAmount = (parseFloat(subtotalAmount) + parseFloat(taxesAmount)).toFixed(2);

      this.setState({ items: res.data.itemList, subtotalAmount: subtotalAmount, taxValue: taxesAmount, totalAmount: totalAmount,
        cardName: res.data.paymentMethod === null ? "" : res.data.paymentMethod.cardName,
        cardNumber: res.data.paymentMethod === null ? "" : res.data.paymentMethod.cardNumber,
        cardExpDate: res.data.paymentMethod === null ? "" : res.data.paymentMethod.cardExpDate,
        cardCcv: res.data.paymentMethod === null ? "" : res.data.paymentMethod.cardCcv,
      editPaymentMethod: res.data.paymentMethod === null ? true: false });
        
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleCheckout = () => {

    const { accessToken, resetCartItemAndCount, userId } = this.context;

    if (
      localStorage.getItem("username") ||
      localStorage.getItem("username") !== "" ||
      localStorage.getItem("isAuthenticated") === "true"
    ) {
      axios.post(`http://localhost:8080/api/orders/placeAnOrder/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        if(res.status === 200){
          resetCartItemAndCount();
        }
      }).catch((err) => {
        console.log(err)
      })

    }
  };

  setEditPaymentDetailsToTrue = () => {
    this.setState({editPaymentMethod: true})
  }

  handlePaymentMethodUpdate = () => {
    const { userId, accessToken } = this.context;

    axios.put(`http://localhost:8080/api/profile/updatePaymentMethod/${userId}`, {
      cardName: this.state.cardName,
      cardNumber: this.state.cardNumber,
      cardExpDate: this.state.cardExpDate,
      cardCcv: this.state.cardCcv
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      
      this.setState({editPaymentMethod: false})

    })

  };

  handleCardDetailsChanges = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { appliedCoupons } = this.context;

    return (
      <div className="container">

<Card className="my-2">
          <Card.Header>Cart Items</Card.Header>
          <Card.Body>
          {this.state.items.map((item) => (
          <div className="row py-2" key={item.id}>
            <div className="col-lg-3 col-xl-3 col-md-3 col-sm-12">
              <img src={item.itemImage} alt="" width="150px" height="150px" />
            </div>
            <div className="col-lg-9 col-xl-9 col-md-9 col-sm-12">
              <div className="row">
                <div className="col">
                  <h3>{item.itemName}</h3>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  {item.itemOnSale ? (
                    <div>
                      <s>${item.itemPrice}</s>
                      <div className="mr-4">
                        $
                        {(
                          item.itemPrice -
                          (item.itemSaleValue * item.itemPrice) / 100
                        ).toFixed(2)}{" "}
                        <ImFire size="1.5em" color="red" />{" "}
                        <Badge>{item.itemSaleValue}% Sale</Badge>
                      </div>
                    </div>
                  ) : (
                    <>${item.itemPrice}</>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
          </Card.Body>
        </Card>








              
          
              <Card className="my-2">
          <Card.Header>Payment Method</Card.Header>
          <Card.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="cardName">
                    <Form.Label>Card Name</Form.Label>
                    <Form.Control
                      name="cardName"
                      type="text"
                      placeholder="Enter email"
                      defaultValue={this.state.cardName}
                      onChange={this.handleCardDetailsChanges}
                      disabled={!this.state.editPaymentMethod ? true : false}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="cardNumber">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      name="cardNumber"
                      type="text"
                      placeholder="Enter email"
                      defaultValue={this.state.cardNumber}
                      onChange={this.handleCardDetailsChanges}
                      disabled={!this.state.editPaymentMethod ? true : false}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="cardExpDate">
                    <Form.Label>Card Expiry Date (MM/YY)</Form.Label>
                    <Form.Control
                      name="cardExpDate"
                      type="text"
                      placeholder="Enter email"
                      defaultValue={this.state.cardExpDate}
                      onChange={this.handleCardDetailsChanges}
                      disabled={!this.state.editPaymentMethod ? true : false}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="cardCcv">
                    <Form.Label>CCV</Form.Label>
                    <Form.Control
                      name="cardCcv"
                      type="text"
                      placeholder="Enter email"
                      defaultValue={this.state.cardCcv}
                      onChange={this.handleCardDetailsChanges}
                      disabled={!this.state.editPaymentMethod ? true : false}
                    />
                  </Form.Group>
                </Col>
              </Row>

            <Row>
              <Col>
              {!this.state.editPaymentMethod ? (<Button
          variant="dark"
          style={{ width: "" }}
          size="md"
          onClick={this.setEditPaymentDetailsToTrue}
        >
          Edit Your Card Details
        </Button>) : (<Button
          variant="dark"
          style={{ width: "" }}
          size="md"
          onClick={this.handlePaymentMethodUpdate}
        >
          Save
        </Button>)}
        </Col>
            </Row>
              

            </Form>

            

          </Card.Body>
        </Card>





        <Card className="my-2 mb-4">
          <Card.Header>Cart Totals</Card.Header>
          <Card.Body>
          
          <div className="row">
            <div className="col-3"></div>
            <div className="col-3 d-flex justify-content-end">
              <h5 className="text-center">
                <b>Applied Coupons:</b>
              </h5>
            </div>
            <div className="col-3">
              {appliedCoupons.map((item) => {
                return (
                  <Badge
                    key={item.id}
                    bg="success"
                    style={{ marginRight: "5px" }}
                  >
                    {item.couponId}: {item.percentage}%
                  </Badge>
                );
              })}
            </div>
            <div className="col-3"></div>
          </div>

          <div className="row">
            <div className="col-3"></div>
            <div className="col-3 d-flex justify-content-end">
              <h5 className="text-center">
                <b>Subtotal:</b>
              </h5>
            </div>
            <div className="col-3">
              ${this.state.subtotalAmount}
            </div>
            <div className="col-3"></div>
          </div>

          <div className="row">
            <div className="col-3"></div>
            <div className="col-3 d-flex justify-content-end">
              <h5 className="text-center">
                <b>Taxes:</b>
              </h5>
            </div>
            <div className="col-3">
              ${this.state.taxValue}
            </div>
            <div className="col-3"></div>
          </div>

          <div className="row">
            <div className="col-3"></div>
            <div className="col-3 d-flex justify-content-end">
              <h5 className="text-center">
                <b>Total Amount:</b>
              </h5>
            </div>
            <div className="col-3">
              ${this.state.totalAmount}
            </div>
            <div className="col-3"></div>
          </div>
      
          <div className="row">
            <div className="col-3"></div>
            <div className="col-3 d-flex justify-content-end">
              <h5 className="text-center">
                <b>Items Count:</b>
              </h5>
            </div>
            <div className="col-3">
              {this.state.items.length}
            </div>
            <div className="col-3"></div>
          </div>

          <div className="text-center mt-3">
        <Button
          variant="dark"
          style={{ width: "" }}
          size="md"
          onClick={this.handleCheckout}
        >
          Place Your Order
        </Button>
      </div>
          </Card.Body>
        </Card>



        
      </div>
    );
  }
}

export default FinalCheckout;

