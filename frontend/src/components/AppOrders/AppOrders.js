import React, { Component } from "react";
import { Table } from "react-bootstrap";

class AppOrders extends Component {
  render() {
    return (
      <div className="container">
        <Table striped bordered hover size="sm" className="mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Client ID</th>
              <th>Date</th>
              <th>Items</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>84938</td>
              <td>1/1/2022</td>
              <td>10</td>
              <td>SHIPPED</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default AppOrders;
