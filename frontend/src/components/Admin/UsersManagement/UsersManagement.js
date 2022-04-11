import axios from 'axios';
import React, {Component} from 'react';
import {Container, Table, ButtonGroup, Button, Modal, Form} from 'react-bootstrap';
import UrlLocator from '../../../helpers/UrlLocator';
import AuthContext from "../../../context/AuthContext";
import styled from "styled-components";
const StyledTable = styled.table`
  background: white;
  border-radius: 10px;
  width: 100%;
  text-align: center;
  margin-top: 10px;
`;

class UsersManagement extends Component{

    static contextType = AuthContext;

    constructor(props){
        super(props);
        this.state = {
            users: [],
            username: "",
            fullName: "",
            email: "",
            userId: -1,
            showModal: false,
            errors:{}
        }
    }

    componentDidMount = () => {
        this.getAllRecords();
    }

    getAllRecords = () => {
        axios.get(UrlLocator.getApiUrl('GET_ALL_USERS'), {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }).then((res) => {
            if(res.status === 200){
                this.setState({users: res.data});
            }
        })
    }

    handleEditButton = (username) => {

    axios
      .get(`${UrlLocator.getApiUrl('GET_ALL_USER_PROFILE')}/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => {
          console.log(res.data.customUserObject)
          this.setState({userId:res.data.customUserObject.userId, username: res.data.customUserObject.username, fullName: res.data.customUserObject.fullName, email: res.data.customUserObject.email, showModal: true})
      })
    }

    handleSave = (id) => {
        const { accessToken } = this.context;
    
        let validationErrors = {};
    
        let failed = false;
        if (this.state.username === "") {
          failed = true;
          validationErrors["username"] = "Cannot be empty";
        } else if(!this.state.username.match(/^[A-Za-z0-9]+$/)){
          failed = true;
          validationErrors["username"] = "Letters and numbers only";
        }
    
        if (this.state.fullName === "") {
          failed = true;
          validationErrors["fullName"] = "Cannot be empty";
        } else if(!this.state.fullName.match(/^[A-Za-z\s]+$/)){
          failed = true;
          validationErrors["fullName"] = "Letters only";
        }
    
        if (this.state.email === "") {
          failed = true;
          validationErrors["email"] = "Cannot be empty";
        } else if(!this.state.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
          failed = true;
          validationErrors["email"] = "Invalid email address format";
        }
    
        if (failed === true) {
          this.setState({
            errors: validationErrors,
          });
        } else {
          axios
            .put(
              `${UrlLocator.getApiUrl('UPDATE_USER_DETAILS')}/${id}`,
              {
                fullName: this.state.fullName,
                username: this.state.username,
                email: this.state.email,
              },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            .then((res) => {
              if (res.status === 200) {
                this.setState({
                  errors: {}, showModal: false
                }, () => {
                    this.getAllRecords();
                });
              }
            });
        }
      };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    hideModal = () => {
        this.setState({showModal: false, errors: {}})
    }

    handleDeleteButton = (username) => {
        const { accessToken } = this.context;
        
        axios
            .delete(`${UrlLocator.getApiUrl('DELETE_USER_DETAILS')}/${username}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            ).then((res) => {
                if(res.status === 200){
                    console.log('deleted successfully')
                }
            })
    }

    render(){
        return(
            <Container>

<Modal
        show={this.state.showModal}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit User Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control type="hidden" placeholder="ID" name="userId" defaultValue={this.state.userId} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" onChange={this.handleChange} name="username" defaultValue={this.state.username} 
              style={
                this.state.errors["username"] !== undefined
                  ? {
                      borderWidth: "1px",
                      borderColor: "red",
                      borderStyle: "solid",
                    }
                  : null
              }
            />
            <span style={{ color: "red" }}>
              {this.state.errors["username"]}
            </span>
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter fiull name" onChange={this.handleChange} name="fullName" defaultValue={this.state.fullName} 
              style={
                this.state.errors["fullName"] !== undefined
                  ? {
                      borderWidth: "1px",
                      borderColor: "red",
                      borderStyle: "solid",
                    }
                  : null
              }
            />
            <span style={{ color: "red" }}>
              {this.state.errors["fullName"]}
            </span>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="text" placeholder="Enter email address" onChange={this.handleChange} name="email" defaultValue={this.state.email} 
              style={
                this.state.errors["email"] !== undefined
                  ? {
                      borderWidth: "1px",
                      borderColor: "red",
                      borderStyle: "solid",
                    }
                  : null
              }
            />
            <span style={{ color: "red" }}>
              {this.state.errors["email"]}
            </span>
            </Form.Group>



           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
              this.setState({errors: {},
                showAlert: false,
                alertMessageContent: ''}, () => this.hideModal())
            }}>Cancel</Button>
          <Button onClick={() => this.handleSave(this.state.userId)}>Save and Close</Button>
        </Modal.Footer>
      </Modal>

                <StyledTable>
                <Table striped bordered hover size="sm" className="mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Username</th>
              <th>Email Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
                this.state.users.map((item) => {
                    return <tr key={item.userId}>
                        <td>{item.userId}</td>
                        <td>{item.fullName}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>
                        <ButtonGroup>
                            <Button size="sm" variant="primary" onClick={() => this.handleEditButton(item.username)}>Edit</Button>
                            <Button size="sm" variant="warning" onClick={() => this.handleDeleteButton(item.username)}>Delete</Button>
                        </ButtonGroup>
                    </td>
            </tr>
                })
            }
          </tbody>
        </Table>
                </StyledTable>
            </Container>
        )
    }
}

export default UsersManagement;