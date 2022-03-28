import axios from "axios";
import React, { Component } from "react";
import { Table, Button, ButtonGroup, Form, Card } from "react-bootstrap";
import UrlLocator from "../../../helpers/UrlLocator";

class LicencesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      licenceId: "",
      status: "",
      orderId: "",
      itemId: this.props.itemId,
      licences: [],
      item: {}
    };
  }

  componentDidMount() {
    this.getAllLicences(this.state.itemId);
  }

  getAllLicences = (gameId) => {
    axios
      .get(`${UrlLocator.getApiUrl("GET_GAME_LICENCES")}/${gameId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ licences: response.data.licenceList, item: response.data.item, licenceId: "" });
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.clear();
          window.open("/signin", "_self");
        }
      });
  };

  handleDelete = (id) => {
    axios
      .delete(`${UrlLocator.getApiUrl("DELETE_LICENCE")}/${this.state.itemId}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) this.getAllLicences(this.props.itemId);
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSave = () => {
    axios
      .put(
        `${UrlLocator.getApiUrl("SAVE_LICENCE")}/${this.state.itemId}`,
        {
          itemId: this.state.itemId,
          licenceId: this.state.licenceId,
          status: "AVAILABLE",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          this.getAllLicences(this.state.itemId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <Card className="mt-5">
          <Card.Header className="text-center h3">{this.state.item.itemName}</Card.Header>
          <Card.Body>
            <div className="row">
              <div className="col-lg-8 col-sm-12">
                <Form.Group className="mt-3">
                  <Form.Control
                    type="text"
                    placeholder={`Enter a new licence ID for ${this.state.item.itemName}`}
                    onChange={this.handleChange}
                    name="licenceId"
                    value={this.state.licenceId}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-4 col-sm-12">
                <Button variant="outline-dark mt-3" onClick={this.handleSave}>
                  Add Licence
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Table striped bordered hover size="sm" className="mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Game Name</th>
              <th>Licence ID</th>
              <th>Status</th>
              <th>Order ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.licences.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{this.state.item.itemName}</td>
                <td>{element.licenceId}</td>
                <td>
                  {element.status === "AVAILABLE" ? (
                    <b className="text-success">{element.status}</b>
                  ) : (
                    <b className="text-danger">{element.status}</b>
                  )}
                </td>
                <td>
                  {element.status === "AVAILABLE" ? "-" : element.orderId}
                </td>
                <td>
                  <ButtonGroup>
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => this.handleDelete(element.id)}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default LicencesTable;
