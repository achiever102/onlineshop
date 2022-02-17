import React, { Component } from "react";
import { Table, Button, Modal } from "react-bootstrap";

class SettingsTable extends Component {
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
        <Button variant="outline-dark mt-5" onClick={() => this.showModal()}>Add New Parameter</Button>

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

        <Table striped bordered hover size="sm" className="mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>SaleEnabled</td>
              <td>10</td>
              <td>DELETE/UPDATE</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default SettingsTable;
