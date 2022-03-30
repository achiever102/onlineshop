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
      errors: {},
      showAlert: false,
      alertMessageContent: "",
      id: -1
    };
  }

  hideModal = () => {
    this.setState({modalShow: false, errors: {}, showAlert: false, alertMessageContent: ''});
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
      console.log(response.data)
      this.setState({name: response.data.name, value: response.data.value, id: response.data.id, modalShow: true})
    }).catch((err) => {
      console.log(err)
    })
  }

  componentDidMount(){
    this.getAllSettings();
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  };

  handleSave = () => {
    let validationErrors = {};
    

    let failed = false;
    if (this.state.value === "") {
      failed = true;
      validationErrors["value"] = "Cannot be empty";
    } else if(isNaN(this.state.value)){
      failed = true;
      validationErrors["value"] = "Numbers only";
    }

    if (failed === true) {
      this.setState({
        errors: validationErrors,
        showAlert: false,
        alertMessageContent: "",
      });
    } else
    {
    axios.put(UrlLocator.getApiUrl('SAVE_SETTINGS'), {
      id: this.state.id,
      name: this.state.name === '' ? this.state.name : this.state.name,
      value: this.state.value === 0 ? this.state.value : this.state.value
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
      validationErrors["value"] = error.response.data;
          this.setState({
            errors: validationErrors,
          });
    });
  }
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
              <Form.Control type="hidden" placeholder="ID" name="id" defaultValue={this.state.id} />
            </Form.Group>
            <Row>
              <Col>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  onChange={this.handleChange}
                  defaultValue={this.state.name}
                  disabled
                />
              </Col>
            </Row>

            <Row className="mt-2">
            <Col>
                <Form.Label htmlFor="value">Value</Form.Label>
                <Form.Control
                  type="text"
                  id="value"
                  name="value"
                  onChange={this.handleChange}
                  defaultValue={this.state.value}
                  style={
                    this.state.errors["value"] !== undefined
                      ? {
                          borderWidth: "1px",
                          borderColor: "red",
                          borderStyle: "solid",
                        }
                      : null
                  }
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["value"]}
                </span>
              </Col>
            </Row>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal}>
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
