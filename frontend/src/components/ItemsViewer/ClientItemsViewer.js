import React, { Component } from "react";
import { CardGroup, Card, Button, InputGroup, FormControl } from "react-bootstrap";

class ClientItemsViewer extends Component {
  render() {
    return (
    <div className="container">
        <InputGroup className="mt-3">
            <FormControl
                placeholder="Search for items and sort results checkboxes"
                aria-describedby="basic-addon1"
            />
        </InputGroup>
        <Button variant="outline-dark mt-5">Add New Item</Button>
        <CardGroup className="mt-5">
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                  This will include: images, price, quantity, EDIT/DELETE buttons, and sale flag and amount.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This will include: images, price, quantity, EDIT/DELETE buttons, and sale flag and amount.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
              This will include: images, price, quantity, EDIT/DELETE buttons, and sale flag and amount.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        </CardGroup>
      </div>
    );
  }
}

export default ClientItemsViewer;
