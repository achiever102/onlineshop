import axios from "axios";
import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import CategoriesModal from "./CategoriesModal";
import CategoriesRecord from "./CategoriesRecord";
import UrlLocator from "../../../helpers/UrlLocator";

import styled from 'styled-components';

const StyledTable = styled.table`
  background: white;
  border-radius: 10px;
  width: 100%;
  text-align: center;
  margin-top: 10px;
`;

class CategoriesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      editCategory: {
        id: -1,
        categoryName: "",
      },
      categories: [],
    };
  }

  showModal = () => {
    this.setState({
      show: true,
      editCategory: {
        id: -1,
        categoryName: "",
        modalTitle: "Add New Category",
      },
    });
  };

  hideModal = () => {
    this.setState({ show: false });
    this.getAllCategories();
  };

  componentDidMount() {
    this.getAllCategories();
  }

  getAllCategories = () => {
    axios
      .get(UrlLocator.getApiUrl("GET_CATEGORIES"), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ categories: response.data });
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
      .delete(`${UrlLocator.getApiUrl("DELETE_CATEGORY")}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) this.getAllCategories();
      });
  };

  // fetch item from database and display contents in a modal
  handleEdit = (id) => {
    axios
      .get(`${UrlLocator.getApiUrl("GET_CATEGORY_BY_ID")}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data !== null) {
          const category = {
            id: response.data.id,
            categoryName: response.data.categoryName,
            modalTitle: "Edit Category",
          };
          this.setState({ show: true, editCategory: category });
        }
      });
  };

  render() {
    return (
      <div className="container">
        
        {
        this.state.show === true ? (
          <CategoriesModal
          show={this.state.show}
          hideModal={this.hideModal}
          category={this.state.editCategory}
        />
        )
      :
      null
      }

        <Button variant="outline-light mt-5" onClick={() => this.showModal()}>
          Add New Category
        </Button>

        <StyledTable>
        <Table striped bordered hover size="sm" className="mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.categories.map((element) => (
              <CategoriesRecord
                key={element.id}
                element={element}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
              />
            ))}
          </tbody>
        </Table>
        </StyledTable>
      </div>
    );
  }
}

export default CategoriesTable;
