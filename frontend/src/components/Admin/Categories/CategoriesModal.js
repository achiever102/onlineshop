import axios from "axios";
import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import UrlLocator from '../../../helpers/UrlLocator';

class CategoriesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      categoryName: ""
    };
  }

  componentDidMount(){
    this.setState({
      id: this.props.category.id,
      categoryName: this.props.category.categoryName
    })
  }

  handleChange = (event) => {
    if (event.target.name === "categoryName") {
      this.setState({ categoryName: event.target.value });
    } 
  };

  handleSave = () => {

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
      console.log(error);
    });
    
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
              <Form.Control type="text" placeholder="Enter category name" onChange={this.handleChange} name="categoryName" defaultValue={this.props.category.categoryName} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.hideModal}>Cancel</Button>
          <Button onClick={this.handleSave}>Save and Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CategoriesModal;
