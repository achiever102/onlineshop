import axios from "axios";
import React, { Component } from "react";
import { Modal, Button, Form,Row,Col } from "react-bootstrap";
import UrlLocator from "../../../helpers/UrlLocator";

import AuthContext from "../../../context/AuthContext";

class NewItemModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            itemName: "",
            itemPrice: 0,
            itemQuantity: 0,
            itemImage: "",
            itemCategory: -1,
            itemPlatform: -1,
            itemSaleValue: "0",
            itemOnSale: false,
            itemDescription: "",
            errors: {},
            showAlert: false,
            alertMessageContent: ''
          }
    }

    static contextType = AuthContext;

    handleChange = (event) => {
        if (event.target.name === "itemName") {
          this.setState({ itemName: event.target.value });
        } else if (event.target.name === "itemPrice") {
            this.setState({ itemPrice: event.target.value });
        } else if (event.target.name === "itemQuantity") {
            this.setState({ itemQuantity: event.target.value });
        } else if (event.target.name === "itemImage") {
            this.setState({ itemImage: event.target.files[0] });
        } else if (event.target.name === "itemCategory") {
            this.setState({ itemCategory: event.target.value });
        } else if (event.target.name === "itemOnSale") {
            this.setState({ itemOnSale: event.target.checked });
        } else if (event.target.name === "itemSaleValue") {
            this.setState({ itemSaleValue: event.target.value });
        } else if (event.target.name === "itemDescription") {
            this.setState({ itemDescription: event.target.value });
        } else if (event.target.name === "itemPlatform") {
            this.setState({ itemPlatform: event.target.value });
        } 
      };

    handleSave = () => {
        const {accessToken} = this.context;

        let validationErrors = {};

        let failed = false;
        if (this.state.itemName === "") {
          failed = true;
          validationErrors["itemName"] = "Cannot be empty";
        }

        if (this.state.itemPrice === "") {
            failed = true;
            validationErrors["itemPrice"] = "Cannot be empty";
          } else if (this.state.itemPrice === 0) {
            failed = true;
            validationErrors["itemPrice"] = "Cannot be zero";
          }

          if (this.state.itemImage === "") {
            failed = true;
            validationErrors["itemImage"] = "Cannot be empty";
          }
    
    
        if (failed === true) {
          this.setState({
            errors: validationErrors,
            showAlert: false,
            alertMessageContent: ''
          });
        } else 

        {const formData = new FormData();
        formData.append("itemImage", this.state.itemImage);
        formData.append("itemName", this.state.itemName);
        formData.append("itemPrice", this.state.itemPrice);
        formData.append("itemQuantity", this.state.itemQuantity);
        formData.append("itemCategory", this.state.itemCategory === -1 ? this.props.categories[0].id : this.state.itemCategory);
        formData.append("itemOnSale", this.state.itemOnSale);
        formData.append("itemSaleValue", this.state.itemOnSale ? this.state.itemSaleValue : 0);
        formData.append("itemDescription", this.state.itemDescription);
        formData.append("itemPlatform", this.state.itemPlatform === -1 ? this.props.platforms[0].id : this.state.itemPlatform);
    
    
    
        axios
          .post(UrlLocator.getApiUrl("SAVE_ADMIN_ITEM"), formData, {
            headers: {
              "Content-Type": "multipart/from-data",
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(() => {
            this.props.getAllItems();
          })
          .catch((err) => {
            console.log(err);
          });}



    
      };

  render() {
    return (
      <Modal
        show={this.props.showNewModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="hidden"
              placeholder="ID"
              name="id"
              defaultValue={this.state.id}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Label htmlFor="itemName">Name</Form.Label>
              <Form.Control
                type="text"
                id="itemName"
                name="itemName"
                onChange={this.handleChange}
                defaultValue={this.state.itemName}
                style={
                  this.state.errors["itemName"] !== undefined
                    ? {
                        borderWidth: "1px",
                        borderColor: "red",
                        borderStyle: "solid",
                      }
                    : null
                }/>
                <span style={{ color: "red" }}>{this.state.errors["itemName"]}</span>     
            </Col>
            <Col>
              <Form.Label htmlFor="itemPrice">Price</Form.Label>
              <Form.Control
                type="text"
                id="itemPrice"
                name="itemPrice"
                onChange={this.handleChange}
                defaultValue={this.state.itemPrice}
                style={
                  this.state.errors["itemPrice"] !== undefined
                    ? {
                        borderWidth: "1px",
                        borderColor: "red",
                        borderStyle: "solid",
                      }
                    : null
                }/>
                <span style={{ color: "red" }}>{this.state.errors["itemPrice"]}</span>  
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <Form.Label htmlFor="itemImage">Upload Image</Form.Label>
              <Form.Control
                type="file"
                className="custom-file-label"
                id="itemImage"
                name="itemImage"
                label="Image Uploader"
                onChange={this.handleChange}
                style={
                  this.state.errors["itemImage"] !== undefined
                    ? {
                        borderWidth: "1px",
                        borderColor: "red",
                        borderStyle: "solid",
                      }
                    : null
                }/>
                <span style={{ color: "red" }}>{this.state.errors["itemImage"]}</span>  
            </Col>
            <Col xs={6} md={6} sm={12}>
              <Form.Label htmlFor="itemCategory">Category</Form.Label>
              <Form.Select
                id="itemCategory"
                name="itemCategory"
                onChange={this.handleChange}
                defaultValue={this.state.itemCategory}
              >
                {this.props.categories.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.categoryName}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col xs={6} md={6} sm={12}>
              <Form.Label htmlFor="itemPlatform">Platform</Form.Label>

              <Form.Select
                id="itemPlatform"
                name="itemPlatform"
                onChange={this.handleChange}
                defaultValue={this.state.itemPlatform}
              >
                {this.props.platforms.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.platformName}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>

            <Col>
              <Form.Check
                type="switch"
                id="itemOnSale"
                name="itemOnSale"
                label="Item on Sale"
                onChange={this.handleChange}
                defaultChecked={
                    this.state.itemOnSale === true ? true : false
                }
                style={{ marginTop: "5px" }}
              />
              <Form.Control
                type="text"
                id="itemSaleValue"
                name="itemSaleValue"
                onChange={this.handleChange}
                defaultValue={this.state.itemSaleValue}
                disabled={this.state.itemOnSale === true ? false : true}
              />
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <Form.Label htmlFor="itemDescription">
                Item Description
              </Form.Label>
              <Form.Control
                id="itemDescription"
                name="itemDescription"
                as="textarea"
                onChange={this.handleChange}
                rows={3}
                defaultValue={this.state.itemDescription}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={() => {
              this.setState({errors: {},
                showAlert: false,
                alertMessageContent: ''}, () => this.props.hideModal())
            }}
          >
            Cancel
          </Button>

          <Button variant="dark" onClick={this.handleSave}>
            Save and Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default NewItemModal;
