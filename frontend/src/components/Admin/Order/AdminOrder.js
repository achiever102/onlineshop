import axios from "axios";
import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  InputGroup,
  Button,
  FormControl,
  Form,
} from "react-bootstrap";
import UrlLocator from "../../../helpers/UrlLocator";

import Datepicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");

class AdminOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      orderIdSearchField: "",
      dateSearchField: "",
      clientNameSearchField: "",
    };
  }

  componentDidMount() {
    this.getAdminOrders();
  }

  getAdminOrders = () => {
    axios
      .get(UrlLocator.getApiUrl("GET_ADMIN_ORDERS"), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        this.setState({
          items: res.data,
          orderIdSearchField: "",
          dateSearchField: "",
          clientNameSearchField: "",
        });
      });
  };

  handleSearchFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  searchByDate = () => {
    if (this.state.dateSearchField) {
      axios
        .get(
          `${UrlLocator.getApiUrl("GET_ADMIN_ORDERS_BY_DATE")}/${
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
          this.setState({
            items: res.data,
            orderIdSearchField: "",
            clientNameSearchField: "",
          });
        });
    } else {
      this.getAdminOrders();
    }
  };

  searchByOrderId = () => {
    if (this.state.orderIdSearchField) {
      axios
        .get(
          `${UrlLocator.getApiUrl("GET_ADMIN_ORDERS_BY_ORDER_ID")}/${
            this.state.orderIdSearchField
          }`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          this.setState({
            items: res.data,
            dateSearchField: "",
            clientNameSearchField: "",
          });
        });
    } else {
      this.getAdminOrders();
    }
  };

  searchByClientName = () => {
    if (this.state.clientNameSearchField) {
      axios
        .get(
          `${UrlLocator.getApiUrl("GET_ADMIN_ORDERS_BY_CLIENT_NAME")}/${
            this.state.clientNameSearchField
          }`,
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
    } else {
      this.getAdminOrders();
    }
  };

  selectDate = (e) => {
    this.setState({ dateSearchField: e });
  };

  render() {
    return (
      <div className="container">
        <Row className="mt-3 text-center">
          <Col lg={{ span: 4, offset: 0 }} className="mt-3">
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
          <Col lg={{ span: 4, offset: 0 }} className="mt-3">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search by client name ..."
                id="clientNameSearchField"
                name="clientNameSearchField"
                onChange={this.handleSearchFieldChange}
                size={"sm"}
                value={this.state.clientNameSearchField}
              />
              <Button
                variant="outline-light"
                className="mx-1"
                onClick={this.searchByClientName}
              >
                Search
              </Button>
            </InputGroup>
          </Col>
          <Col lg={{ span: 4, offset: 0 }} className="mt-3">
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
                      <b>Customer Name:</b> {item.username}
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
                      {item.appliedCoupons != null ? item.appliedCoupons : "-"}
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
                      className="btn btn-sm btn-dark"
                    >
                      Download Licenses CSV File
                    </a>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="ordersBodyBgColor">
                {item.itemsList.map((game) => {
                  return (
                    <Row className="mt-2" key={game.itemId}>
                      <Col className="col-4">
                        <img
                          src={game.itemImage}
                          alt=""
                          width="200px"
                          height="200px"
                        />
                      </Col>
                      <Col className="col-8">
                        <Row>
                          <Col>
                            <h3>{game.itemName}</h3>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <b>On Sale:</b>{" "}
                            {game.itemOnSale ? game.itemSaleValue + "%" : "No"}
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
    );
  }
}

export default AdminOrder;
