import axios from "axios";
import React, { Component } from "react";
import { Row, Col, Card, InputGroup, Button, FormControl, Form } from "react-bootstrap";
import UrlLocator from "../../../helpers/UrlLocator";

import {IoReload} from 'react-icons/io5'

class AdminOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      orderIdSearchField: "",
      dateSearchField: "",
      clientNameSearchField: ""
    };
  }

  componentDidMount() {
    axios
      .get(
        UrlLocator.getApiUrl('GET_ADMIN_ORDERS'),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        this.setState({ items: res.data });
      });
  }

  handleSearchFieldChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  searchByDate = () => {
    axios
      .get(
        `${UrlLocator.getApiUrl('GET_ADMIN_ORDERS_BY_DATE')}/${this.state.dateSearchField}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        this.setState({ items: res.data });
      });
  }

  searchByOrderId = () => {
    axios
      .get(
        `${UrlLocator.getApiUrl('GET_ADMIN_ORDERS_BY_ORDER_ID')}/${this.state.orderIdSearchField}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        this.setState({ items: res.data });
      });
  }

  searchByClientName = () => {
    axios
    .get(
      `${UrlLocator.getApiUrl('GET_ADMIN_ORDERS_BY_CLIENT_NAME')}/${this.state.clientNameSearchField}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then((res) => {
      this.setState({ items: res.data });
    });
  }

  render() {
    return (
      <div className="container">

<Row className="mt-3">
            <Col lg={{ span: 4, offset: 0 }} className="mt-3">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search by order ID ..."
                  id="orderIdSearchField"
                  name="orderIdSearchField"
                  onChange={this.handleSearchFieldChange}
                  size={"sm"}
                />
                <Button variant="outline-light" className="mx-1" onClick={this.searchByOrderId}>
                  Search
                </Button>
                </InputGroup>
</Col>
<Col lg={{ span: 4, offset: 0 }} className="mt-3">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search by order Date ..."
                  id="dateSearchField"
                  name="dateSearchField"
                  onChange={this.handleSearchFieldChange}
                  size={"sm"}
                />

                {/*<Form.Select name="searchBySelectedValue" style={{width: "100px"}}>
                  <option value="1">Order ID</option>
                  <option value="2">Date</option>
                  <option value="3">Client Name</option>
    </Form.Select>*/}
                <Button variant="outline-light" className="mx-1"  onClick={this.searchByDate}>
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
                />
                <Button variant="outline-light" className="mx-1" onClick={this.searchByClientName}>
                  Search
                </Button>
                </InputGroup>
</Col>
</Row>
        {this.state.items.map((item) => {
          return (
            <Card key={item.orderId} className="my-3">
              <Card.Header>
                <Row>
                  <Col><p><b>Order ID:</b> {item.orderId}</p></Col>
                  <Col><p><b>Customer Name:</b> {item.username}</p></Col>
                  <Col><p><b>Order Date:</b> {item.orderDate}</p></Col>
                </Row>
                <Row>
                  
                  <Col><p><b>Total Amount:</b> ${parseFloat(item.orderTotalAmount).toFixed(2)}</p></Col>
                  <Col><p><b>Applied Coupons:</b> {item.appliedCoupons != null ? item.appliedCoupons : "-"}</p></Col>
                  <Col><p><b>Count:</b> {item.orderItemsCount}</p></Col>
                </Row>
                
              <Row>
              <Col>
                            <a href={item.licensesCsvFileDirectory} className="btn btn-sm btn-dark">Download Licenses CSV File</a>
                            </Col>
              </Row>
              </Card.Header>
              <Card.Body>
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
                            <Col><h3>{game.itemName}</h3></Col>
                          </Row>
                          <Row>
                            <Col><b>On Sale:</b> {game.itemOnSale ? game.itemSaleValue + "%" : "No"}</Col>
                          </Row>
                          <Row>
                            <Col><b>Quantity:</b> {game.itemQuantity}</Col>
                          </Row>
                          <Row>
                            <Col><b>Price:</b> ${game.itemPrice}</Col>
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
