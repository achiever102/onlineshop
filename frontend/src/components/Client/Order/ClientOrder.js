import axios from "axios";
import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import UrlLocator from "../../../helpers/UrlLocator";

import AppFooter from "../../AppFooter/AppFooter";

import Datepicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");

class ClientOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      orderIdSearchField: "",
      dateSearchField: "",
    };
  }

  componentDidMount() {
    this.getClientOrders();
  }

  getClientOrders = () => {
    axios
      .get(
        `${UrlLocator.getApiUrl("GET_USER_ORDERS")}/${localStorage.getItem(
          "userId"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        this.setState({
          items: res.data,
          orderIdSearchField: "",
          dateSearchField: "",
        });
      });
  };

  handleSearchFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  searchByDate = () => {
    if (this.state.dateSearchField !== "") {
      axios
        .get(
          `${UrlLocator.getApiUrl(
            "GET_USER_ORDERS_BY_DATE"
          )}/${localStorage.getItem("userId")}/${
            String(this.state.dateSearchField.getMonth() + 1).padStart(2, "0") +
            "-" +
            this.state.dateSearchField.getDate() +
            "-" +
            this.state.dateSearchField.getFullYear()
          }`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          this.setState({ items: res.data, orderIdSearchField: "" });
        });
    } else {
      this.getClientOrders();
    }
  };

  searchByOrderId = () => {
    if (this.state.orderIdSearchField !== "") {
      axios
        .get(
          `${UrlLocator.getApiUrl(
            "GET_USER_ORDERS_BY_ORDER_ID"
          )}/${localStorage.getItem("userId")}/${
            this.state.orderIdSearchField
          }`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          this.setState({ items: res.data, dateSearchField: "" });
        });
    } else {
      this.getClientOrders();
    }
  };

  selectDate = (e) => {
    this.setState({ dateSearchField: e });
  };

  render() {
    return (
      <div>
        <div className="container">
          <Row className="mt-3">
            <Col lg={{ span: 6, offset: 0 }} className="mt-3">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search by order ID ..."
                  id="orderIdSearchField"
                  name="orderIdSearchField"
                  onChange={this.handleSearchFieldChange}
                  size={"sm"}
                  value={this.state.orderIdSearchField}
                />
                <Button
                  variant="outline-light"
                  className="mx-1"
                  onClick={this.searchByOrderId}
                >
                  Search
                </Button>
              </InputGroup>
            </Col>
            <Col lg={{ span: 6, offset: 0 }} className="mt-3">
              <InputGroup className="mb-3">
                <div style={{ display: "inline-block" }}>
                  <Datepicker
                    placeholderText="Search by order date"
                    id="dateSearchField"
                    name="dateSearchField"
                    className="form-control"
                    selected={this.state.dateSearchField}
                    dateFormat="MM-dd-yyyy"
                    onSelect={this.selectDate}
                    todayButton="Today"
                    wrapperClassName="date-picker"
                  ></Datepicker>
                </div>
                <div style={{ display: "inline-block" }}>
                  <Button
                    variant="outline-light"
                    className="mx-1"
                    onClick={this.searchByDate}
                  >
                    Search
                  </Button>
                </div>
              </InputGroup>
            </Col>
          </Row>

          {this.state.items.map((item) => {
            return (
              <Card key={item.orderId} className="my-3 cardHoverStyling">
                <Card.Header className="ordersHeaderBgColor">
                  <Row>
                    <Col sm={12} md={6} lg={4}>
                      <p>
                        <b>Order ID:</b> {item.orderId}
                      </p>
                    </Col>
                    <Col sm={12} md={6} lg={4}>
                      <p>
                        <b>Order Date:</b> {item.orderDate}
                      </p>
                    </Col>
                    <Col sm={12} md={6} lg={4}>
                      <p>
                        <b>Total Amount:</b> $
                        {parseFloat(item.orderTotalAmount).toFixed(2)}
                      </p>
                    </Col>

                    <Col sm={12} md={6} lg={4}>
                      <p>
                        <b>Applied Coupons:</b>{" "}
                        {item.appliedCoupons != null
                          ? item.appliedCoupons
                          : "-"}
                      </p>
                    </Col>
                    <Col sm={12} md={6} lg={4}>
                      <p>
                        <b>Count:</b> {item.orderItemsCount}
                      </p>
                    </Col>

                    <Col sm={12} md={6} lg={4}>
                      <a
                        href={item.licensesCsvFileDirectory}
                        className="btn btn-dark btn-sm"
                      >
                        Download Licenses File
                      </a>{" "}
                      |{" "}
                      <Link
                        to={{
                          pathname: `/orders/printInvoice/${item.orderId}`,
                        }}
                        className="btn btn-dark btn-sm"
                      >
                        Print Invoice
                      </Link>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body className="ordersBodyBgColor">
                  {item.itemsList.map((game) => {
                    return (
                      <Row className="mt-2" key={game.itemId}>
                        <Col sm={12} md={4}>
                          <img
                            src={game.itemImage}
                            alt=""
                            width="200px"
                            height="200px"
                          />
                        </Col>
                        <Col sm={12} md={8}>
                          <Row>
                            <Col>
                              <h3>{game.itemName}</h3>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <b>On Sale:</b>{" "}
                              {game.itemOnSale
                                ? game.itemSaleValue + "%"
                                : "No"}
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <b>Quantity:</b> {game.itemQuantity}
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <b>Price:</b> ${game.itemPrice}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    );
                  })}
                </Card.Body>
              </Card>
            );
          })}
        </div>
        <AppFooter />
      </div>
    );
  }
}

export default ClientOrder;
