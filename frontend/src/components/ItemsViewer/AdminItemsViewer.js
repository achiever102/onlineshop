import React, { Component } from "react";
import {
  CardGroup,
  Card,
  Button,
  InputGroup,
  Form,
  FormControl,
  Modal
} from "react-bootstrap";

class AdminItemsViewer extends Component {
  constructor(props) {
    super();
    this.state = {
      modalShow: false,
    };
  }

  showModal() {
    this.setState({ modalShow: true });
  }

  render() {
    return (
      <div className="container">
        <InputGroup className="mt-3">
          <FormControl
            placeholder="Search for item..."
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <Form>
          <Form.Check
            className=""
            type={`checkbox`}
            id={`default-hhh`}
            label={`Sort by price`}
          />
        </Form>

        <Button variant="outline-dark mt-5" onClick={() => this.showModal()}>
          Add New Item
        </Button>

        <Modal
          show={this.state.modalShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Add new item
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Item Detials</h4>
            <p>
              Your form fields are here!
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ modalShow: false })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <CardGroup className="mt-5">
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This will include: images, price, quantity, EDIT/DELETE buttons,
                and sale flag and amount.
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
                This will include: images, price, quantity, EDIT/DELETE buttons,
                and sale flag and amount.
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
                This will include: images, price, quantity, EDIT/DELETE buttons,
                and sale flag and amount.
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

export default AdminItemsViewer;
