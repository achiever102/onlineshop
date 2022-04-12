import axios from "axios";
import React, { Component } from "react";
import UrlLocator from "../../../helpers/UrlLocator";
import AppLogo from "../../AppLogo/AppLogo";
import ClientNavbar from "../../AppNavbar/ClientNavbar";
import HomeNavbar from "../../AppNavbar/HomeNavbar";
import { Row, Col, Button, Container, Form, Badge } from "react-bootstrap";

import { FaOpencart } from "react-icons/fa";
import { ImFire } from "react-icons/im";

import AuthContext from "../../../context/AuthContext";
import Checkout from "../Checkout/Checkout";
import AppFooter from "../../AppFooter/AppFooter";

class Cart extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemsTotalPrice: 0,
      showMessage: false
    };
  }

  componentDidMount() {
    const { setCartItems } = this.context;
    if (
      !localStorage.getItem("username") ||
      localStorage.getItem("username") === "" ||
      localStorage.getItem("isAuthenticated") === "false"
    ) {
      let cart;
      if (Array.isArray(JSON.parse(localStorage.getItem("cart")))) {
        cart = JSON.parse(localStorage.getItem("cart"));
      } else {
        cart = [];
      }

      if (cart.length > 0) {
        const bodyFormData = new FormData();
        bodyFormData.append("cart", localStorage.getItem("cart"));

        axios
          .post(UrlLocator.getApiUrl("HOME_GET_ARRAY_OF_ITEMS"), bodyFormData)
          .then((res) => {
            let sum = 0;

            res.data.forEach((element) => {
              let itemsActualPrice = element.itemOnSale
                ? element.itemPrice * element.itemQuantity -
                  (element.itemPrice *
                    element.itemSaleValue *
                    element.itemQuantity) /
                    100
                : element.itemPrice * element.itemQuantity;
              sum = sum + itemsActualPrice;
            });

            

            this.setState({ items: res.data, itemsTotalPrice: sum }, () => {
              setCartItems(JSON.parse(localStorage.getItem("cart")));
            });
          });
      }
    } else if (
      localStorage.getItem("username") ||
      localStorage.getItem("username") !== "" ||
      localStorage.getItem("isAuthenticated") === "true"
    ) {
      axios
        .get(
          `${UrlLocator.getApiUrl('GET_USER_CART')}/${localStorage.getItem(
            "userId"
          )}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          let sum = 0;
          let cart = [];

          res.data.forEach((element) => {
            let itemsActualPrice = element.itemOnSale
              ? element.itemPrice * element.itemQuantity -
                (element.itemPrice *
                  element.itemSaleValue *
                  element.itemQuantity) /
                  100
              : element.itemPrice * element.itemQuantity;
            sum = sum + itemsActualPrice;
            cart.push({
              itemId: element.itemId,
              itemQuantity: element.itemQuantity,
            });
          });

          this.setState({ items: res.data, itemsTotalPrice: sum }, () => {
            setCartItems(cart);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  incrementQuantity = (itemId) => {
    const { setCartItems } = this.context;

    let cart;

    // if cart exists, parse it
    if (Array.isArray(JSON.parse(localStorage.getItem("cart")))) {
      cart = JSON.parse(localStorage.getItem("cart"));
    } else {
      // if not, create an empty cart
      cart = [];
    }

    if (
      !localStorage.getItem("isAuthenticated") ||
      localStorage.getItem("isAuthenticated") === "false"
    ) {
      if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].itemId === itemId) {
            cart[i].itemQuantity = cart[i].itemQuantity + 1;
          }
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        const bodyFormData = new FormData();
        bodyFormData.append("cart", localStorage.getItem("cart"));

        axios
          .post(UrlLocator.getApiUrl("HOME_GET_ARRAY_OF_ITEMS"), bodyFormData)
          .then((res) => {
            let sum = 0;

            res.data.forEach((element) => {
              let itemsActualPrice = element.itemOnSale
                ? element.itemPrice * element.itemQuantity -
                  (element.itemPrice *
                    element.itemSaleValue *
                    element.itemQuantity) /
                    100
                : element.itemPrice * element.itemQuantity;
              sum = sum + itemsActualPrice;
            });

            this.setState({ items: res.data, itemsTotalPrice: sum }, () => {
              setCartItems(cart);
            });
          });
      }
    } else if (
      // if authenticated and manager do nothing
      localStorage.getItem("isAuthenticated") === "true" &&
      localStorage.getItem("username") !== "manager"
    ) {
      axios
        .post(
          `${UrlLocator.getApiUrl(
            "INC_CART_ITEM_QUANTITY"
          )}/${localStorage.getItem("userId")}/${itemId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          let sum = 0;
          let cart = [];

          res.data.forEach((element) => {
            let itemsActualPrice = element.itemOnSale
              ? element.itemPrice * element.itemQuantity -
                (element.itemPrice *
                  element.itemSaleValue *
                  element.itemQuantity) /
                  100
              : element.itemPrice * element.itemQuantity;
            sum = sum + itemsActualPrice;
            cart.push({ itemId: itemId, itemQuantity: element.itemQuantity });
          });

          this.setState({ items: res.data, itemsTotalPrice: sum }, () => {
            setCartItems(cart);
          });
        });
    }
  };

  decrementQuantity = (itemId) => {
    const { setCartItems } = this.context;

    let cart;

    // if cart exists, parse it
    if (Array.isArray(JSON.parse(localStorage.getItem("cart")))) {
      cart = JSON.parse(localStorage.getItem("cart"));
    } else {
      // if not, create an empty cart
      cart = [];
    }

    if (
      // if authenticated and manager do nothing
      localStorage.getItem("isAuthenticated") === "true" &&
      localStorage.getItem("username") !== "manager"
    ) {
      axios
        .post(
          `${UrlLocator.getApiUrl(
            "DEC_CART_ITEM_QUANTITY"
          )}/${localStorage.getItem("userId")}/${itemId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          let sum = 0;
          let cart = [];

          res.data.forEach((element) => {
            let itemsActualPrice = element.itemOnSale
              ? element.itemPrice * element.itemQuantity -
                (element.itemPrice *
                  element.itemSaleValue *
                  element.itemQuantity) /
                  100
              : element.itemPrice * element.itemQuantity;
            sum = sum + itemsActualPrice;
            cart.push({ itemId: itemId, itemQuantity: element.itemQuantity });
          });

          this.setState({ items: res.data, itemsTotalPrice: sum }, () => {
            setCartItems(cart);
          });
        });
    } else if (
      !localStorage.getItem("isAuthenticated") ||
      localStorage.getItem("isAuthenticated") === "false"
    ) {
      if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].itemId === itemId) {
            if (cart[i].itemQuantity <= 1) {
              this.handleRemoveFromCart(itemId);
            } else {
              cart[i].itemQuantity = cart[i].itemQuantity - 1;

              localStorage.setItem("cart", JSON.stringify(cart));

              const bodyFormData = new FormData();
              bodyFormData.append("cart", localStorage.getItem("cart"));

              axios
                .post(
                  UrlLocator.getApiUrl("HOME_GET_ARRAY_OF_ITEMS"),
                  bodyFormData
                )
                .then((res) => {
                  let sum = 0;

                  res.data.forEach((element) => {
                    let itemsActualPrice = element.itemOnSale
                      ? element.itemPrice * element.itemQuantity -
                        (element.itemPrice *
                          element.itemSaleValue *
                          element.itemQuantity) /
                          100
                      : element.itemPrice * element.itemQuantity;
                    sum = sum + itemsActualPrice;
                  });

                  this.setState(
                    { items: res.data, itemsTotalPrice: sum },
                    () => {
                      setCartItems(cart);
                    }
                  );
                });
            }
          }
        }
      }
    }
  };

  updateCartAfterPlacingOrder = () => {
    const { setCartItems } = this.context;
    setCartItems([]);
  };

  handleRemoveFromCart = (itemId) => {
    const { setCartItems } = this.context;

    if (
      !localStorage.getItem("username") ||
      localStorage.getItem("username") === "" ||
      localStorage.getItem("isAuthenticated") === "false"
    ) {
      let oldCart = JSON.parse(localStorage.getItem("cart"));
      let cart = oldCart.filter(function (element, index, arr) {
        return element.itemId !== itemId;
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      const bodyFormData = new FormData();
      bodyFormData.append("cart", localStorage.getItem("cart"));

      if (cart.length > 0) {
        axios
          .post(UrlLocator.getApiUrl("HOME_GET_ARRAY_OF_ITEMS"), bodyFormData)
          .then((res) => {
            let sum = 0;
            let cart = [];

            res.data.forEach((element) => {
              let itemsActualPrice = element.itemOnSale
                ? element.itemPrice * element.itemQuantity -
                  (element.itemPrice *
                    element.itemSaleValue *
                    element.itemQuantity) /
                    100
                : element.itemPrice * element.itemQuantity;
              sum = sum + itemsActualPrice;
              cart.push({
                itemId: element.itemId,
                itemQuantity: element.itemQuantity,
              });
            });

            this.setState({ items: res.data, itemsTotalPrice: sum }, () => {
              setCartItems(cart);
            });
          });
      } else {
        this.setState({ items: [], itemsTotalPrice: 0 }, () => {
          localStorage.setItem("cart", JSON.stringify([]));
          setCartItems([]);
        });
      }
    } else {
      axios
        .delete(
          `${UrlLocator.getApiUrl('DELETE_USER_CART')}/${localStorage.getItem(
            "userId"
          )}/${itemId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          let sum = 0;
          let cart = [];

          res.data.forEach((element) => {
            let itemsActualPrice = element.itemOnSale
              ? element.itemPrice * element.itemQuantity -
                (element.itemPrice *
                  element.itemSaleValue *
                  element.itemQuantity) /
                  100
              : element.itemPrice * element.itemQuantity;
            sum = sum + itemsActualPrice;
            cart.push({
              itemId: element.itemId,
              itemQuantity: element.itemQuantity,
            });
          });

          this.setState({ items: res.data, itemsTotalPrice: sum }, () => {
            setCartItems(cart);
          });
        });
    }
  };

  handleCheckout = () => {
    console.log("checked out");
  };

  render() {
    const { cartCount } = this.context;

    return (
      <div>
        <AppLogo />
        {localStorage.getItem("username") &&
        localStorage.getItem("username") !== "" &&
        localStorage.getItem("username") !== "manager" &&
        localStorage.getItem("isAuthenticated") === "true" ? (
          <ClientNavbar />
        ) : (
          <HomeNavbar />
        )}

        <Container className="my-3" style={{color: "white"}}>


          {/*
            this.state.showMessage ? 
            (<Row>
            <Alert variant="danger">
              Due to limited inventory, the below items quantities were updated:
              if its has 0 remove it from cart 
              return responseentity.ok.body(items)
            </Alert>
          </Row>)
          :
          null
            */}

          {this.state.items.length > 0 ? (
            this.state.items.map((element) => (
              <Row key={element.itemId} style={{ padding: "20px" }}>
                <Col className="d-flex justify-content-end">
                  <img
                    src={element.itemImage}
                    alt=""
                    width="200px"
                    height="200px"
                  />
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <h3>{element.itemName}</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {element.itemOnSale ? (
                        <div>
                          <s>${element.itemPrice}</s>
                          <div className="mr-4">
                            $
                            {(
                              element.itemPrice -
                              (element.itemSaleValue * element.itemPrice) / 100
                            ).toFixed(2)}{" "}
                            <ImFire size="1.5em" color="red" />{" "}
                            <Badge>{element.itemSaleValue}% Sale</Badge>
                          </div>
                        </div>
                      ) : (
                        <>${element.itemPrice}</>
                      )}
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col>
                      <Button
                        style={{ display: "inline-block", width: "50px" }}
                        variant="dark"
                        onClick={() => this.decrementQuantity(element.itemId)}
                        size="md"
                      >
                        -
                      </Button>
                      <Form.Control
                        style={{
                          display: "inline-block",
                          width: "50px",
                          border: "none",
                        }}
                        className="mx-2 text-center bg-light"
                        type="text"
                        disabled
                        value={element.itemQuantity}
                      ></Form.Control>
                      <Button
                        style={{ display: "inline-block", width: "50px" }}
                        variant="dark"
                        onClick={() => this.incrementQuantity(element.itemId)}
                        size="md"
                        disabled={element.itemQuantity >= element.itemExistingQuantity ? true : false}
                      >
                        +
                      </Button>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col>
                      <Button
                        variant="dark"
                        onClick={() =>
                          this.handleRemoveFromCart(element.itemId)
                        }
                        size="sm"
                      >
                        Remove From Cart
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ))
          ) : (
            <div className="mt-5">
              <div className="text-center">
                <FaOpencart size="6em" style={{color: "white"}}/>
              </div>

              <h1 className="text-center mt-5" style={{color: "white"}}>YOUR CART IS EMPTY</h1>
            </div>
          )}
          <hr />
          {this.state.items.length > 0 ? (
            <Checkout
              updateCartAfterPlacingOrder={this.updateCartAfterPlacingOrder}
              itemsTotalPrice={this.state.itemsTotalPrice}
              count={cartCount}
            />
          ) : null}
        </Container>
        <AppFooter/>
      </div>
    );
  }
}

export default Cart;
