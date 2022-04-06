import React, {Component} from 'react';
import {Row, Col, Card, Container, Button} from 'react-bootstrap';
import axios from 'axios';
import UrlLocator from '../../../helpers/UrlLocator';

class PrintInvoice extends Component{
    constructor(props){
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount(){
        console.log(this.props.orderId)

        axios
    .get(
      `${UrlLocator.getApiUrl('GET_USER_ORDERS_BY_ORDER_ID')}/${localStorage.getItem("userId")}/${this.props.orderId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then((res) => {
      this.setState({ items: res.data }, () => {
          window.print();
      });
    });

    }

    printInvoiceHandler = () => {
        window.print();
    }

    render(){
        return(
            <Container>
                {
                    this.state.items.map((item) => {
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
                                <Col><Button size='sm' variant='dark' onClick={this.printInvoiceHandler}>Print Invoice</Button></Col>
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
                      })
                }
            </Container>
        )
    }
}

export default PrintInvoice;