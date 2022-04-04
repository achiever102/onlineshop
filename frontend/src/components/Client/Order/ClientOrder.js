import axios from "axios";
import React, { Component } from "react";
import {Row, Col, Card, Container} from "react-bootstrap";
import UrlLocator from "../../../helpers/UrlLocator";
import AppFooter from "../../AppFooter/AppFooter";

class ClientOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
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

  render() {
    return (
      <div>
        <Container>
        {this.state.items.map((item) => {
          return (
            <Card key={item.orderId} className="my-3">
              <Card.Header>
                <Row>
                <Col><p><b>Order ID:</b> {item.orderId}</p></Col>
                  <Col><p><b>Order Date:</b> {item.orderDate}</p></Col>
                </Row>
                <Row>
                  <Col><p><b>Total Amount:</b> ${parseFloat(item.orderTotalAmount).toFixed(2)}</p></Col>
                  <Col><p><b>Applied Coupons:</b> {item.appliedCoupons != null ? item.appliedCoupons : "-"}</p></Col>
                </Row>
                <Row>
                  <Col><p><b>Count:</b> {item.orderItemsCount}</p></Col>
                  <Col><p><b>Licenses File:</b> <a href={item.licensesCsvFileDirectory} className="link-success">Download Licenses CSV File</a></p></Col>
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
        </Container>
        <AppFooter/>
      </div>
    );
  }
}

export default ClientOrder;
