import axios from "axios";
import React, { Component } from "react";
import { Table, Button, Form, Card } from "react-bootstrap";
import UrlLocator from "../../../helpers/UrlLocator";

import AuthContext from "../../../context/AuthContext";

import styled from 'styled-components';

const StyledTable = styled.table`
  background: white;
  border-radius: 10px;
  width: 100%;
  text-align: center;
  margin-top: 10px;
`;

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
        imageUrl: "",
      items: [],
      errors: {},
            showAlert: false,
            alertMessageContent: ''
    };
  }

  static contextType = AuthContext;

  componentDidMount() {
    this.getAllImages();
  }

  getAllImages = () => {
    axios
      .get(`${UrlLocator.getApiUrl("GET_CAROUSEL_IMAGES")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            items: response.data,
            imageUrl: "",
            errors: {}
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
        `${UrlLocator.getApiUrl("DELETE_CAROUSEL_IMAGE")}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) this.getAllImages();
      });
  };

  handleChange = (event) => {
    this.setState({ imageUrl: event.target.files[0] });
  };

  handleSave = () => {
    const {accessToken} = this.context;
    let validationErrors = {};

    let failed = false;
    if (this.state.imageUrl === "") {
      failed = true;
      validationErrors["imageUrl"] = "Cannot be empty";
    }

    if (failed === true) {
      this.setState({
        errors: validationErrors
      });
    } else {

        const formData = new FormData();
        formData.append("imageUrl", this.state.imageUrl);

      axios
        .post(
          `${UrlLocator.getApiUrl("SAVE_CAROUSEL_IMAGE")}`, formData, {
            headers: {
              "Content-Type": "multipart/from-data",
              Authorization: `Bearer ${accessToken}`,
            },
          })
        .then((response) => {
          if (response.status === 200) {
            this.getAllImages();
          } else {
            console.log(response.data);
          }
        })
        .catch((error) => {
          validationErrors["imageUrl"] = "ERROR: " + error.response.status;
          this.setState({
            errors: validationErrors,
          });
        });
    }
  };

  render() {
    return (
      <div className="container">
        <Card className="mt-5" style={{borderRadius: "10px"}}>
          <Card.Header className="text-center h3">
            Carousel Images
          </Card.Header>
          <Card.Body>
            <div className="row">
              <div className="col-lg-8 col-sm-12">
                <Form.Group className="mt-3">
                
              <Form.Control
                type="file"
                className="custom-file-label"
                id="imageUrl"
                name="imageUrl"
                label="Image Uploader"
                onChange={this.handleChange}
                style={
                  this.state.errors["imageUrl"] !== undefined
                    ? {
                        borderWidth: "1px",
                        borderColor: "red",
                        borderStyle: "solid",
                      }
                    : null
                }/>
                <span style={{ color: "red" }}>{this.state.errors["imageUrl"]}</span>  
            
                </Form.Group>
              </div>
              <div className="col-lg-4 col-sm-12">
                <Button variant="outline-dark mt-3" onClick={this.handleSave}>
                  Add Image
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>

        <StyledTable>
        <Table striped bordered hover size="sm" className="mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Image URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.imageUrl}</td>
                
                <td>
                <Button
                      size="sm"
                      variant="warning"
                      onClick={() => this.handleDelete(element.id)}
                    >
                      Delete
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </StyledTable>
      </div>
    );
  }
}

export default Carousel;
