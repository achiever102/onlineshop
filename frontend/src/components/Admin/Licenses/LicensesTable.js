import axios from "axios";
import React, { Component } from "react";
import { Table, Button, Form, Card } from "react-bootstrap";
import UrlLocator from "../../../helpers/UrlLocator";

class LicensesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      licenseId: "",
      status: "",
      orderId: "",
      itemId: this.props.itemId,
      licenses: [],
      item: {},
      errors: {},
      showAlert: false,
      alertMessageContent: ""
    };
  }

  componentDidMount() {
    this.getAllLicenses(this.state.itemId);
  }

  getAllLicenses = (gameId) => {
    axios
      .get(`${UrlLocator.getApiUrl("GET_GAME_LICENSES")}/${gameId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            licenses: response.data.licenseList,
            item: response.data.item,
            licenseId: "",
            errors: {},
            showAlert: false,
            alertMessageContent: "",
          });
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
      .delete(
        `${UrlLocator.getApiUrl("DELETE_LICENSE")}/${this.state.itemId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) this.getAllLicenses(this.props.itemId);
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSave = () => {
    let validationErrors = {};

    let failed = false;
    if (this.state.licenseId === "") {
      failed = true;
      validationErrors["licenseId"] = "Cannot be empty";
    } else if(!this.state.licenseId.match(/^[0-9A-Za-z\-]+$/)){
      failed = true;
      validationErrors["licenseId"] = "Numbers, letters and hyphen only";
    }

    if (failed === true) {
      this.setState({
        errors: validationErrors,
        showAlert: false,
        alertMessageContent: "",
      });
    } else {
      axios
        .put(
          `${UrlLocator.getApiUrl("SAVE_LICENSE")}/${this.state.itemId}`,
          {
            itemId: this.state.itemId,
            licenseId: this.state.licenseId,
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
            this.getAllLicenses(this.state.itemId);
          } else {
            console.log(response.data);
          }
        })
        .catch((error) => {
          validationErrors["licenseId"] = error.response.data;
          this.setState({
            errors: validationErrors,
          });
        });
    }
  };

  render() {
    return (
      <div className="container">
        <Card className="mt-5">
          <Card.Header className="text-center h3">
            {this.state.item.itemName} Licenses
          </Card.Header>
          <Card.Body>
            <div className="row">
              <div className="col-lg-8 col-sm-12">
                <Form.Group className="mt-3">
                  <Form.Control
                    type="text"
                    placeholder={`Enter a new license ID for ${this.state.item.itemName}`}
                    onChange={this.handleChange}
                    name="licenseId"
                    value={this.state.licenseId}
                    style={
                      this.state.errors["licenseId"] !== undefined
                        ? {
                            borderWidth: "1px",
                            borderColor: "red",
                            borderStyle: "solid",
                          }
                        : null
                    }
                  />
                  <span style={{ color: "red" }}>
                    {this.state.errors["licenseId"]}
                  </span>
                </Form.Group>
              </div>
              <div className="col-lg-4 col-sm-12">
                <Button variant="outline-dark mt-3" onClick={this.handleSave}>
                  Add License
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
              <th>License ID</th>
              <th>Status</th>
              <th>Order ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.licenses.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{this.state.item.itemName}</td>
                <td>{element.licenseId}</td>
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
                  {element.status === "AVAILABLE" ? (
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => this.handleDelete(element.id)}
                    >
                      Delete
                    </Button>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default LicensesTable;
