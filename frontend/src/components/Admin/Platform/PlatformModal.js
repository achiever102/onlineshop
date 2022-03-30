import axios from "axios";
import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import UrlLocator from '../../../helpers/UrlLocator';

class PlatformModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      platformName: "",
      errors: {},
      showAlert: false,
      alertMessageContent: ""
    };
  }

  componentDidMount(){
    this.setState({
      id: this.props.platform.id,
      platformName: this.props.platform.platformName,
      errors: {},
      showAlert: false,
      alertMessageContent: ""
    })
  }

  handleChange = (event) => {
    if (event.target.name === "platformName") {
      this.setState({ platformName: event.target.value });
    } 
  };

  handleSave = () => {

    let validationErrors = {};

    let failed = false;
    if (this.state.platformName === "") {
      failed = true;
      validationErrors["platformName"] = "Cannot be empty";
    } else if(!this.state.platformName.match(/^[0-9A-Za-z\s]+$/)){
      failed = true;
      validationErrors["platformName"] = "Numbers and letters only";
    }

    if (failed === true) {
      this.setState({
        errors: validationErrors,
        showAlert: false,
        alertMessageContent: "",
      });
    } else
    {axios.put(UrlLocator.getApiUrl('SAVE_PLATFORM'), {
      id: this.props.platform.id,
      platformName: this.state.platformName === '' ? this.props.platform.platformName : this.state.platformName
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
      validationErrors["platformName"] = error.response.data;
          this.setState({
            errors: validationErrors,
          });
    });}
    
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
            {this.props.platform.modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control type="hidden" placeholder="ID" name="id" defaultValue={this.props.platform.id} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Platform Name</Form.Label>
              <Form.Control type="text" placeholder="Enter platform name" onChange={this.handleChange} name="platformName" defaultValue={this.props.platform.platformName} 
              style={
                this.state.errors["platformName"] !== undefined
                  ? {
                      borderWidth: "1px",
                      borderColor: "red",
                      borderStyle: "solid",
                    }
                  : null
              }
            />
            <span style={{ color: "red" }}>
              {this.state.errors["platformName"]}
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

export default PlatformModal;
