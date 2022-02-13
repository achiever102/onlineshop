import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";

class CouponsTable extends Component {
  render() {
    return (
      <div className="container">
        <Button variant="outline-dark mt-5">Add New Coupon</Button>
        <Table striped bordered hover size="sm" className="mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Coupon ID</th>
              <th>Percentage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>CPN001</td>
              <td>10</td>
              <td>DELETE/UPDATE</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CouponsTable;
