import axios from "axios";
import React, { Component } from "react";
import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import UrlLocator from "../../../helpers/UrlLocator";

class SettingsTable extends Component {
  constructor(props) {
    super();
    this.state = {
      modalShow: false,
      records:[],
      name: "",
      value: 0,
      editItem: {
        id: -1,
        value: 0,
        name: ""
      }
    };
  }

  hideModal = () => {
    this.setState({ modalShow: false });
    this.getAllSettings();
  };

  getAllSettings = () => {
    axios.get(UrlLocator.getApiUrl("GET_SETTINGS"), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((response) => {
      this.setState({records: response.data})
    }).catch((err) => {
      console.log(err)
    })
  }

  handleEdit(id) {
    axios.get(`${UrlLocator.getApiUrl('GET_SETTING_BY_ID')}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((response) => {
      this.setState({editItem: response.data, modalShow: true})
    }).catch((err) => {
      console.log(err)
    })
  }

  componentDidMount(){
    this.getAllSettings();
  }




  handleChange = (event) => {
    if (event.target.name === "name") {
      this.setState({ name: event.target.value });
    } else if (event.target.name === "value") {
      this.setState({ value: event.target.value });
    }
  };

  handleSave = () => {

    axios.put(UrlLocator.getApiUrl('SAVE_SETTINGS'), {
      id: this.state.editItem.id,
      name: this.state.name === '' ? this.state.editItem.name : this.state.name,
      value: this.state.value === 0 ? this.state.editItem.value : this.state.value
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then((response) => {
        if(response.status === 200){
          this.hideModal();
        }
    })
    .catch((error) => {
      console.log(error);
    });
    
  };

  render() {
    return (
      <div className="container">
                





                <Modal
          show={this.state.modalShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Settings Record
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group className="mb-3">
              <Form.Control type="hidden" placeholder="ID" name="id" defaultValue={this.state.editItem.id} />
            </Form.Group>
            <Row>
              <Col>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  onChange={this.handleChange}
                  defaultValue={this.state.editItem.name}
                  disabled
                />
              </Col>
              <Col>
                <Form.Label htmlFor="value">Price</Form.Label>
                <Form.Control
                  type="text"
                  id="value"
                  name="value"
                  onChange={this.handleChange}
                  defaultValue={this.state.editItem.value}
                />
              </Col>
            </Row>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ modalShow: false })}>
              Cancel
            </Button>

            <Button onClick={this.handleSave}>Save and Close</Button>
          </Modal.Footer>
        </Modal>





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
          
              {
                this.state.records.map((record) => {
                  return(
                    <tr key={record.id}>
                    <td>{record.id}</td>
              <td>{record.name}</td>
              <td>{record.value}</td>
              <td><Button variant="primary" size="sm" onClick={() => this.handleEdit(record.id)}>Edit</Button></td>
              </tr>
                  )
                })
              }
            
          </tbody>
        </Table>
      </div>
    );
  }
}

export default SettingsTable;
