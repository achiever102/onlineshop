import axios from "axios";
import React, { Component } from "react";
import { Row, Col, Card, InputGroup, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UrlLocator from "../../../helpers/UrlLocator";

import AppFooter from "../../AppFooter/AppFooter";

class ClientOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      orderIdSearchField: "",
      dateSearchField: ""
    };
  }

  componentDidMount() {
    axios
      .get(
        `${UrlLocator.getApiUrl('GET_USER_ORDERS')}/${localStorage.getItem("userId")}`,
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
      `${UrlLocator.getApiUrl('GET_USER_ORDERS_BY_DATE')}/${localStorage.getItem("userId")}/${this.state.dateSearchField}`,
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
      `${UrlLocator.getApiUrl('GET_USER_ORDERS_BY_ORDER_ID')}/${localStorage.getItem("userId")}/${this.state.orderIdSearchField}`,
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
                />
                <Button variant="outline-light" className="mx-1" onClick={this.searchByOrderId}>
                  Search
                </Button>
                </InputGroup>
</Col>
<Col lg={{ span: 6, offset: 0 }} className="mt-3">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search by order Date ..."
                  id="dateSearchField"
                  name="dateSearchField"
                  onChange={this.handleSearchFieldChange}
                  size={"sm"}
                />
                <Button variant="outline-light" className="mx-1" onClick={this.searchByDate}>
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
                  <Col><p><b>Order Date:</b> {item.orderDate}</p></Col>
                  <Col><p><b>Total Amount:</b> ${parseFloat(item.orderTotalAmount).toFixed(2)}</p></Col>
                </Row>
                <Row>
                  
                  <Col><p><b>Applied Coupons:</b> {item.appliedCoupons != null ? item.appliedCoupons : "-"}</p></Col>
                  <Col><p><b>Count:</b> {item.orderItemsCount}</p></Col>
                  
                  <Col><a href={item.licensesCsvFileDirectory} className="btn btn-dark btn-sm">Download Licenses File</a> |{' '} <Link to={{ pathname: `/orders/printInvoice/${item.orderId}` }} className="btn btn-dark btn-sm">Print Invoice</Link></Col>
               
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
      <AppFooter />
      </div>
    );
  }
}

export default ClientOrder;
