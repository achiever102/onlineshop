import axios from "axios";
import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import PlatformModal from "./PlatformModal";
import PlatformRecord from "./PlatformRecord";
import UrlLocator from "../../../helpers/UrlLocator";


class PlatformTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      editPlatform: {
        id: -1,
        platformName: "",
      },
      platforms: [],
    };
  }

  showModal = () => {
    this.setState({
      show: true,
      editPlatform: {
        id: -1,
        platformName: "",
        modalTitle: "Add New Platform",
      },
    });
  };

  hideModal = () => {
    this.setState({ show: false });
    this.getAllPlatforms();
  };

  componentDidMount() {
    this.getAllPlatforms();
  }

  getAllPlatforms = () => {
    axios
      .get(UrlLocator.getApiUrl("GET_PLATFORMS"), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ platforms: response.data });
        }
      }).catch((err) => {
        if (err.response.status === 401) {
          localStorage.clear()
          window.open("/signin", "_self");
        }
      });
  };

  handleDelete = (id) => {
    axios
      .delete(`${UrlLocator.getApiUrl("DELETE_PLATFORM")}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) this.getAllPlatforms();
      });
  };

  // fetch item from database and display contents in a modal
  handleEdit = (id) => {
    axios
      .get(`${UrlLocator.getApiUrl("GET_PLATFORM_BY_ID")}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data !== null) {
          const platform = {
            id: response.data.id,
            platformName: response.data.platformName,
            modalTitle: "Edit Platform",
          };
          this.setState({ show: true, editPlatform: platform });
        }
      });
  };

  render() {
    return (
      <div className="container">

{
        this.state.show === true ? (
          <PlatformModal
          show={this.state.show}
          hideModal={this.hideModal}
          platform={this.state.editPlatform}
        />
        )
      :
      null
      }
        
        

        <Button variant="outline-light mt-5" onClick={() => this.showModal()}>
          Add New Platform
        </Button>

        <Table striped bordered hover size="md" className="mt-3 bg-light">
          <thead>
            <tr>
              <th>#</th>
              <th>Platform Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.platforms.map((element) => (
              <PlatformRecord
                key={element.id}
                element={element}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default PlatformTable;
