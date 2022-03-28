import axios from "axios";
import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import UrlLocator from '../../../helpers/UrlLocator';

class PlatformModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      platformName: ""
    };
  }

  componentDidMount(){
    this.setState({
      id: this.props.platform.id,
      platformName: this.props.platform.platformName
    })
  }

  handleChange = (event) => {
    if (event.target.name === "platformName") {
      this.setState({ platformName: event.target.value });
    } 
  };

  handleSave = () => {

    axios.put(UrlLocator.getApiUrl('SAVE_PLATFORM'), {
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
              <Form.Control type="text" placeholder="Enter platform name" onChange={this.handleChange} name="platformName" defaultValue={this.props.platform.platformName} />
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

export default PlatformModal;
