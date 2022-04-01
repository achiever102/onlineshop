import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import {BiSortUp, BiSortDown} from 'react-icons/bi'

import UrlLocator from "../../../helpers/UrlLocator";

import { useNavigate } from "react-router-dom";

import {ImFire} from'react-icons/im';

import {
  Card,
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
  Badge
} from "react-bootstrap";


import AuthContext from "../../../context/AuthContext";
import NewItemModal from "./NewItemModal";
import EditItemModal from "./EditItemModal";

export default function AdminItems() {

  const navigate = useNavigate();

  const { accessToken } = useContext(AuthContext);

  const [state, setState] = useState(
    {
      showNewModal: false,
      showEditModal: false,
      items: [],
      categories: [],
      platforms: [],
      itemName: "",
      itemPrice: 0,
      itemQuantity: 0,
      itemImage: "",
      itemCategory: -1,
      itemPlatform: -1,
      itemSaleValue: "0",
      itemOnSale: false,
      itemDescription: "",
      searchField: "",
      editItem: {
        id: -1,
        itemPrice: 0,
        itemName: "",
        itemQuantity: 0,
        itemCategory: -1,
        itemPlatform: -1,
        itemSaleValue: "0",
        itemOnSale: false,
        itemDescription: ""
      }
    }
  );

  const showModal = () => {
    setState({ ...state, showNewModal: true, editItem: {
      id: -1,
      itemPrice: 0,
      itemName: "",
      itemQuantity: 0,
      itemCategory: -1,
      itemPlatform: -1,
      itemSaleValue: "0",
      itemOnSale: false,
      itemDescription: ""
    } });
  }

  useEffect(() => {
    getAllItems();
  }, [])

  const getAllItems = () => {
    axios
      .get(UrlLocator.getApiUrl("GET_ADMIN_ITEMS"), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setState({...state, items: response.data.items, 
          platforms: response.data.platforms,
          categories: response.data.categories,
          itemPlatform: response.data.platforms[0].id,
          itemCategory: response.data.categories[0].id,
          showNewModal: false,
        showEditModal: false})
    });
  };

  const handleDelete = (id) => {
    axios
      .put(`${UrlLocator.getApiUrl("DELETE_ADMIN_ITEM")}/${id}`,{}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) getAllItems();
      });
  };

  const activateRecord = (id) => {
    axios
      .put(`${UrlLocator.getApiUrl("ACTIVATE_ADMIN_ITEM")}/${id}`,{}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) getAllItems();
      });
  };

  const updateGameLicenses = (id) => {
    navigate(`/adminItems/${id}/licenses`);
  }

  const handleSearchFieldChange = (event) => {
    if (event.target.name === "searchField") {
      axios
      .get(UrlLocator.getApiUrl("GET_ADMIN_ITEMS"), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
          setState({...state, items: response.data.items.filter((item) => item.itemName.toLowerCase().includes(event.target.value.toLowerCase())), 
            platforms: response.data.platforms,
            categories: response.data.categories,
            modalShow: false,
            searchField: event.target.value})
      });

    }
  }

  const sortItemsByPice = () => {
    if(state.searchField === ""){
      if(state.sortDirection === "" || state.sortDirection === "DOWN"){
        axios
        .get(UrlLocator.getApiUrl("GET_ADMIN_ITEMS"), {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then((response) => {
          setState({...state, items: response.data.items.sort((a, b) => { return (b.itemOnSale ? b.itemPrice : b.itemPrice) - (a.itemOnSale ? a.itemPrice : a.itemPrice); }), 
            platforms: response.data.platforms,
            categories: response.data.categories,
            modalShow: false,
            sortDirection: "UP"})
        });
      }else {
        axios
        .get(UrlLocator.getApiUrl("GET_ADMIN_ITEMS"), {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then((response) => {
        setState({...state, items: response.data.items.sort((a, b) => { return (a.itemOnSale ? a.itemPrice : a.itemPrice) - (b.itemOnSale ? b.itemPrice : b.itemPrice); }), 
          platforms: response.data.platforms,
          categories: response.data.categories,
          modalShow: false,
          sortDirection: "DOWN"})
      });
      }
    } else {
      if(state.sortDirection === "" || state.sortDirection === "DOWN"){
        axios
        .get(UrlLocator.getApiUrl("GET_ADMIN_ITEMS"), {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then((response) => {
          setState({...state, items: response.data.items.filter((item) => (item.itemName.toLowerCase().includes(state.searchField.toLowerCase()))).sort((a, b) => { return (b.itemOnSale ? b.itemPrice : b.itemPrice) - (a.itemOnSale ? a.itemPrice : a.itemPrice); }), 
            platforms: response.data.platforms,
            categories: response.data.categories,
            modalShow: false,
            sortDirection: "UP"})
        });
      }else {
        axios
        .get(UrlLocator.getApiUrl("GET_ADMIN_ITEMS"), {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then((response) => {
        setState({...state, items: response.data.items.filter((item) => (item.itemName.toLowerCase().includes(state.searchField.toLowerCase()))).sort((a, b) => { return (a.itemOnSale ? a.itemPrice : a.itemPrice) - (b.itemOnSale ? b.itemPrice : b.itemPrice); }), 
          platforms: response.data.platforms,
          categories: response.data.categories,
          modalShow: false,
          sortDirection: "DOWN"})
      });
      }
    }
  }



  const handleEdit = (id) => {
    axios
      .get(`${UrlLocator.getApiUrl("GET_ITEM_BY_ID")}/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data !== null) {
          const item = {
            id: response.data.id,
            itemPrice: response.data.itemPrice,
            itemName: response.data.itemName,
            itemQuantity: response.data.itemQuantity,
            itemCategory: response.data.itemCategory,
            itemPlatform: response.data.itemPlatform,
            itemSaleValue: response.data.itemSaleValue,
            itemOnSale: response.data.itemOnSale,
            itemDescription: response.data.itemDescription
          };
          setState({ ...state, showEditModal: true, editItem: item });        
        }
      });
  };

  

  const hideModal = () => {
    setState({...state, showNewModal: false, showEditModal: false})
  }

  return (
    <div className="container">
      <Row className="mt-3">
        <Col lg={{ span: 8, offset: 0 }} className="mt-3">
          <InputGroup>
            <FormControl
              placeholder="Search for item..."
              aria-label="searchField"
              id="searchField"
              name="searchField"
              aria-describedby="basic-addon1"
              onChange={handleSearchFieldChange}
            />
          </InputGroup>
        </Col>
        <Col className="d-flex align-items-center mt-3">
          <Button
                    variant="dark"
                    className="mx-3"
                    size="md"
                    onClick={sortItemsByPice}
                  >
                    Price {state.sortDirection === 'DOWN' || state.sortDirection === '' ? <BiSortUp size="1.5rem"/> : <BiSortDown size="1.5rem"/>}
                  </Button>
        </Col>
        <Col className="d-flex justify-content-end mt-3">
          <Button variant="outline-dark" onClick={showModal}>
            Add New Item
          </Button>
        </Col>
      </Row>

      <NewItemModal 
      showNewModal={state.showNewModal} 
      platforms={state.platforms} 
      categories={state.categories} 
      hideModal={hideModal}
      getAllItems={getAllItems}/>

      {
        state.showEditModal ?
        (
          <EditItemModal 
  showEditModal={true} 
  platforms={state.platforms} 
  categories={state.categories} 
  editItem={state.editItem}
  hideModal={hideModal}
getAllItems={getAllItems}/>
        )
        :
        null
      }
      

      <div className="d-flex flex-wrap justify-content-center my-4">
        {state.items.map((item) => {
          return (
            <Card
              key={item.id}
              style={{
                width: "100%",
                margin: "10px",
              }}
            >
              <Card.Header className="text-center">
                {/*<Card.Header>{item.itemName}</Card.Header>*/}
              {item.id ? (
                <Card.Img
                  variant="top"
                  alt="Couldn't retrieve the file"
                  src={item.itemImage}
                  style={{ width: "17.9rem", height: "18rem" }}
                />
              ) : null}
              </Card.Header>

              <Card.Body>
                <Card.Title>{item.itemName}</Card.Title>
                <Card.Text> </Card.Text>

                <Row className="my-2">
                  <Col xl={3} sm={3}><b>Price:</b></Col>
                  <Col xl={9} sm={9}>{item.itemOnSale ? <div><s>${item.itemPrice}</s><div className="mr-4">${(item.itemPrice - item.itemSaleValue * item.itemPrice / 100).toFixed(2)} <ImFire size="1.5em" color="red"/> <Badge>{item.itemSaleValue}% Sale</Badge></div></div> : <>${item.itemPrice}</>}</Col>
                </Row>
                <Row className="my-2">
                  <Col xl={3} sm={3}><b>Quanitiy:</b></Col>
                  <Col xl={9} sm={9}>{item.itemQuantity}</Col>
                </Row>
                <Row className="my-2">
                  <Col xl={3} sm={3}><b>Category:</b></Col>
                  <Col xl={9} sm={9}>{state.categories.filter((element) => item.itemCategory === element.id )[0].categoryName}</Col>
                </Row>
                <Row className="my-2">
                  <Col xl={3} sm={3}><b>Platform:</b></Col>
                  <Col xl={9} sm={9}>{state.platforms.filter((element) => item.itemPlatform === element.id )[0].platformName}</Col>
                </Row>
                <Row className="my-2">
                  <Col xl={3} sm={3}><b>Status:</b></Col>
                  <Col xl={9} sm={9} style={{color: item.itemStatus === 'DELETED' ? 'red' : 'green'}}>{item.itemStatus === 'DELETED' ? <b>Inactive</b> : <b>Active</b>}</Col>
                </Row>
                <Row className="my-2">
                  <Col xl={3} sm={3}><b>Description:</b></Col>
                  <Col xl={9} sm={9}>{item.itemDescription}</Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="dark"
                  size="md"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="dark"
                  size="md"
                  className="mx-1"
                  onClick={() => handleDelete(item.id)}
                  disabled={item.itemStatus === 'DELETED' ? true : false}
                >
                  Delete
                </Button>
                {item.itemStatus === 'DELETED' ? (
                  <Button
                  variant="dark"
                  size="md"
                  className="mx-1"
                  onClick={() => activateRecord(item.id)}
                >
                  Activate
                </Button>
                ) : null}

                <Button
                  variant="dark"
                  size="md"
                  className="mx-1"
                  onClick={() => updateGameLicenses(item.id)}
                >
                  Update Licenses
                </Button>
              </Card.Footer>
            </Card>
          );
        })}
      </div>
    </div>
  );

}
