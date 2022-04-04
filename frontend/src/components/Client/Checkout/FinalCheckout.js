import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

import {Alert, Badge, Button, Card, Col, Row, Form, Container } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import AuthContext from "../../../context/AuthContext";

import { ImFire } from "react-icons/im";
import UrlLocator from "../../../helpers/UrlLocator";

export default function FinalCheckout() {
  const { setCartItems, appliedCoupons, accessToken, setLicensesURLAndResetCartItemAndCount, userId } = useContext(AuthContext);

  const navigate = useNavigate();

  const [state, setState] = useState({
    items: [],
    itemsCount: 0,
    subtotalAmount: 0,
    taxValue: 0,
    totalAmount: 0,
    cardName: "",
    cardNumber: "",
    cardExpDate: "",
    cardCcv: "",
    editPaymentMethod: false,
    showErrorMessage: false,
    updatedItemsMessages: [],
    paymentMethodErrors: {},
  });

  useEffect(() => {

    axios
      .get(`${UrlLocator.getApiUrl('CHECKOUT_USER_CART')}/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {

        let couponsSum = 0;

        appliedCoupons.forEach((element) => {
          couponsSum = couponsSum + element.percentage;
        });

        let subtotalAmount = (res.data.subTotal).toFixed(2);

        let taxesAmount = (res.data.subTotalTaxValue).toFixed(2);

        let totalAmount = (res.data.totalAmount - res.data.totalAmount * couponsSum / 100).toFixed(2);

        let itemsCount = res.data.itemsCount;

        if(res.data.updatedItems.length > 0){
          let cart = [];
          res.data.itemList.forEach((element) => {
            cart.push({ itemId: element.itemId, itemQuantity: element.itemQuantity });
          });
          setCartItems(cart);
        }

        setState({
          ...state,
          items: res.data.itemList,
          subtotalAmount: subtotalAmount,
          taxValue: taxesAmount,
          totalAmount: totalAmount,
          itemsCount: itemsCount,
          cardName:
            res.data.paymentMethod === null
              ? ""
              : res.data.paymentMethod.cardName,
          cardNumber:
            res.data.paymentMethod === null
              ? ""
              : res.data.paymentMethod.cardNumber,
          cardExpDate:
            res.data.paymentMethod === null
              ? ""
              : res.data.paymentMethod.cardExpDate,
          cardCcv:
            res.data.paymentMethod === null
              ? ""
              : res.data.paymentMethod.cardCcv,
          editPaymentMethod: res.data.paymentMethod === null ? true : false,
          showErrorMessage: res.data.updatedItems.length > 0 ? true : false,
          updatedItemsMessages: res.data.updatedItems.length > 0 ? res.data.updatedItems : [],
          paymentMethodErrors: {},
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCheckout = () => {
    if (
      localStorage.getItem("username") ||
      localStorage.getItem("username") !== "" ||
      localStorage.getItem("isAuthenticated") === "true"
    ) {

      const bodyFormData = new FormData();
        bodyFormData.append("coupons", JSON.stringify(appliedCoupons));

      axios
        .post(
          `${UrlLocator.getApiUrl('PLACE_ORDER')}/${userId}`,
          bodyFormData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setLicensesURLAndResetCartItemAndCount(res.data);
            navigate(`/placeOrder`);           
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function setEditPaymentDetailsToTrue(){
    setState({ ...state, editPaymentMethod: true });
  };

  function handlePaymentMethodUpdate() {
    let validationErrors = {};

    let failed = false;
    if (state.cardName === "") {
      failed = true;
      validationErrors["cardName"] = "Cannot be empty";
    } else if(!state.cardName.match(/^[A-Za-z\s]+$/)){
      failed = true;
      validationErrors["cardName"] = "Letters only";
    }

    if (state.cardNumber === "") {
      failed = true;
      validationErrors["cardNumber"] = "Cannot be empty";
    } else if(!state.cardNumber.match(/^\d{4}-?\d{4}-?\d{4}-?\d{4}$/)){
      failed = true;
      validationErrors["cardNumber"] = "16 digits credit card number";
    }

    if (state.cardExpDate === "") {
      failed = true;
      validationErrors["cardExpDate"] = "Cannot be empty";
    } else if(!state.cardExpDate.match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)){
      failed = true;
      validationErrors["cardExpDate"] = "Invalid expiration date format";
    }

    if (state.cardCcv === "") {
      failed = true;
      validationErrors["cardCcv"] = "Cannot be empty";
    } else if(!state.cardCcv.match(/^\d{3,4}$/)){
      failed = true;
      validationErrors["cardCcv"] = "Numbers only";
    }

    if (failed === true) {
      setState({
        ...state, paymentMethodErrors: validationErrors,
      });
    } else 
    {axios
      .put(
        `${UrlLocator.getApiUrl('UPDATE_PAYMENT_METHOD')}/${userId}`,
        {
          cardName: state.cardName,
          cardNumber: state.cardNumber,
          cardExpDate: state.cardExpDate,
          cardCcv: state.cardCcv,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setState({ ...state, editPaymentMethod: false });
      });}
  };

  const handleCardDetailsChanges = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <Container>

      {
        state.showErrorMessage ? 
        (<Alert variant="danger" className="mt-2">
        Due to limited inventoy, your cart was updated:
        {
          state.updatedItemsMessages.map((item, index) => {
            return <div key={index}>{item}</div>
          })
        }
        </Alert>)
        :
        (null)
      }

      <Card className="my-2">
        <Card.Header>Cart Items</Card.Header>
        <Card.Body>
          {state.items.map((item) => 
            <div className="row py-2" key={item.itemId}>
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
                  Price: {item.itemOnSale ? (
                      <>
                        <s>${item.itemPrice}</s>
                        <>
                          ${(
                            item.itemPrice -
                            (item.itemSaleValue * item.itemPrice) / 100
                          ).toFixed(2)}{" "}
                          <ImFire size="1.5em" color="red" />{" "}
                          <Badge>{item.itemSaleValue}% Sale</Badge>
                        </>
                      </>
                    ) : (
                      <>${item.itemPrice}</>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                  Quantity: {item.itemQuantity}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                  Subtotal: ${(item.cartItemTotalAmount).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}
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
                    placeholder="Enter card name"
                    value={state.cardName}
                    onChange={handleCardDetailsChanges}
                    disabled={!state.editPaymentMethod ? true : false}
                    style={
                      state.paymentMethodErrors["cardName"] !== undefined
                        ? {
                            borderWidth: "1px",
                            borderColor: "red",
                            borderStyle: "solid",
                          }
                        : null
                    }
                  />
                  <span style={{ color: "red" }}>
                    {state.paymentMethodErrors["cardName"]}
                  </span>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="cardNumber">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    name="cardNumber"
                    type="text"
                    placeholder="Enter card number"
                    value={state.cardNumber}
                    onChange={handleCardDetailsChanges}
                    disabled={!state.editPaymentMethod ? true : false}
                    style={
                      state.paymentMethodErrors["cardnumber"] !== undefined
                        ? {
                            borderWidth: "1px",
                            borderColor: "red",
                            borderStyle: "solid",
                          }
                        : null
                    }
                  />
                  <span style={{ color: "red" }}>
                    {state.paymentMethodErrors["cardNumber"]}
                  </span>
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
                    placeholder="Enter card expiration date"
                    value={state.cardExpDate}
                    onChange={handleCardDetailsChanges}
                    disabled={!state.editPaymentMethod ? true : false}
                    style={
                      state.paymentMethodErrors["cardExpDate"] !== undefined
                        ? {
                            borderWidth: "1px",
                            borderColor: "red",
                            borderStyle: "solid",
                          }
                        : null
                    }
                  />
                  <span style={{ color: "red" }}>
                    {state.paymentMethodErrors["cardExpDate"]}
                  </span>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="cardCcv">
                  <Form.Label>CCV</Form.Label>
                  <Form.Control
                    name="cardCcv"
                    type="text"
                    placeholder="Enter card ccv"
                    value={state.cardCcv}
                    onChange={handleCardDetailsChanges}
                    disabled={!state.editPaymentMethod ? true : false}
                    style={
                      state.paymentMethodErrors["cardCcv"] !== undefined
                        ? {
                            borderWidth: "1px",
                            borderColor: "red",
                            borderStyle: "solid",
                          }
                        : null
                    }
                  />
                  <span style={{ color: "red" }}>
                    {state.paymentMethodErrors["cardCcv"]}
                  </span>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                {!state.editPaymentMethod ? (
                  <Button
                    variant="dark"
                    style={{ width: "" }}
                    size="md"
                    onClick={setEditPaymentDetailsToTrue}
                  >
                    Edit Your Card Details
                  </Button>
                ) : (
                  <Button
                    variant="dark"
                    style={{ width: "" }}
                    size="md"
                    onClick={handlePaymentMethodUpdate}
                  >
                    Save
                  </Button>
                )}
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
              {appliedCoupons.length > 0 ?
              appliedCoupons.map((item) => 
                
                  <Badge
                    key={item.id}
                    bg="success"
                    style={{ marginRight: "5px" }}
                  >
                    {item.couponId}: {item.percentage}%
                  </Badge>
                
              )
            : "-"}
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
            <div className="col-3">${state.subtotalAmount}</div>
            <div className="col-3"></div>
          </div>

          <div className="row">
            <div className="col-3"></div>
            <div className="col-3 d-flex justify-content-end">
              <h5 className="text-center">
                <b>Taxes:</b>
              </h5>
            </div>
            <div className="col-3">${state.taxValue}</div>
            <div className="col-3"></div>
          </div>

          <div className="row">
            <div className="col-3"></div>
            <div className="col-3 d-flex justify-content-end">
              <h5 className="text-center">
                <b>Total Amount:</b>
              </h5>
            </div>
            <div className="col-3">${state.totalAmount}</div>
            <div className="col-3"></div>
          </div>

          <div className="row">
            <div className="col-3"></div>
            <div className="col-3 d-flex justify-content-end">
              <h5 className="text-center">
                <b>Items Count:</b>
              </h5>
            </div>
            <div className="col-3">{state.itemsCount}</div>
            <div className="col-3"></div>
          </div>

          <div className="text-center mt-3">
            <Button
              variant="dark"
              style={{ width: "" }}
              size="md"
              onClick={handleCheckout}
            >
              Place Your Order
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
