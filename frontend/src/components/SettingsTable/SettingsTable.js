import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";

class SettingsTable extends Component {
  render() {
    return (
      <div className="container">
        <Button variant="outline-dark mt-5">Add New Parameter</Button>
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
