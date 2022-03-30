import axios from "axios";
import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import UrlLocator from '../../../helpers/UrlLocator';

class CategoriesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      categoryName: "",
      errors: {},
      showAlert: false,
      alertMessageContent: ""
    };
  }

  componentDidMount(){
    this.setState({
      id: this.props.category.id,
      categoryName: this.props.category.categoryName,
      errors: {},
      showAlert: false,
      alertMessageContent: ""
    })
  }

  handleChange = (event) => {
    if (event.target.name === "categoryName") {
      this.setState({ categoryName: event.target.value });
    } 
  };

  handleSave = () => {
    let validationErrors = {};

    let failed = false;
    if (this.state.categoryName === "") {
      failed = true;
      validationErrors["categoryName"] = "Cannot be empty";
    } else if(!this.state.categoryName.match(/^[0-9A-Za-z\s\(\)]+$/)){
      failed = true;
      validationErrors["categoryName"] = "No special characters";
    }


    if (failed === true) {
      this.setState({
        errors: validationErrors,
        showAlert: false,
        alertMessageContent: "",
      });
    } else
    {
    axios.put(UrlLocator.getApiUrl('SAVE_CATEGORY'), {
      id: this.props.category.id,
      categoryName: this.state.categoryName === '' ? this.props.category.categoryName : this.state.categoryName
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then((response) => {
        if(response.status === 200){
          this.props.hideModal();
        }
    })
    .catch((error) => {
      validationErrors["categoryName"] = error.response.data;
          this.setState({
            errors: validationErrors,
          });
    });
  }
    
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.category.modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control type="hidden" placeholder="ID" name="id" defaultValue={this.props.category.id} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control type="text" placeholder="Enter category name" onChange={this.handleChange} name="categoryName" defaultValue={this.props.category.categoryName} 
              style={
                this.state.errors["categoryName"] !== undefined
                  ? {
                      borderWidth: "1px",
                      borderColor: "red",
                      borderStyle: "solid",
                    }
                  : null
              }
            />
            <span style={{ color: "red" }}>
              {this.state.errors["categoryName"]}
            </span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
              this.setState({errors: {},
                showAlert: false,
                alertMessageContent: ''}, () => this.props.hideModal())
            }}>Cancel</Button>
          <Button onClick={this.handleSave}>Save and Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CategoriesModal;
