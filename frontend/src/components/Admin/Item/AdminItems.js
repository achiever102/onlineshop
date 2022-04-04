import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import {BiSortUp, BiSortDown} from 'react-icons/bi'

import UrlLocator from "../../../helpers/UrlLocator";

import { useNavigate } from "react-router-dom";

import {ImFire} from'react-icons/im';

import { IoCaretDown, IoCaretUp } from "react-icons/io5";

import {
  Card,
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
  Badge, Alert, Form
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
      sortDirection: "",
      selectedPlatforms: [],
      selectedCategories: [],
      showAvailableItemsOnly: false,
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
    setState({ ...state, showNewModal: true });
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
          itemPlatform: response.data.platforms ? (response.data.platforms.length > 0 ? response.data.platforms[0].id : -1) : -1,
          itemCategory: response.data.categories ? (response.data.categories.length > 0 ? response.data.categories[0].id : -1) : -1,
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

  const ShowAdvancedSearchMenu = () => {
    setState({...state, 
      showAdvancedSearchMenu: !state.showAdvancedSearchMenu,
    });
  };

  const handleAdvancedSearchField = (event) => {
    if(event.target.name === "availableItemsOnlyCheckbox"){
      setState({...state, showAvailableItemsOnly: event.target.checked})
    }

    if(event.target.name.includes("selectedPlatform-")){
      if(event.target.checked === true){
        let itemExists = false;
        for(let i = 0; i < state.selectedPlatforms.length; i++){
          if(state.selectedPlatforms[i] === event.target.id){
            itemExists = true;
          }
        }
        if(itemExists === false){
          let selectedPlatforms = state.selectedPlatforms;
          selectedPlatforms.push(event.target.id);
          setState({...state, selectedPlatforms: selectedPlatforms});
        }
      }

      if(event.target.checked === false){
        let itemExists = -1;
        for(let i = 0; i < state.selectedPlatforms.length; i++){
          if(state.selectedPlatforms[i] === event.target.id){
            itemExists = i;
          }
        }

        if(itemExists > -1){
          let selectedPlatforms = state.selectedPlatforms;
          selectedPlatforms.splice(itemExists, 1);
          setState({...state, selectedPlatforms: selectedPlatforms});
        }

        
      }
    }

    if(event.target.name.includes("selectedCategory-")){
      if(event.target.checked === true){
        let itemExists = false;
        for(let i = 0; i < state.selectedCategories.length; i++){
          if(state.selectedCategories[i] === event.target.id){
            itemExists = true;
          }
        }
        if(itemExists === false){
          let selectedCategories = state.selectedCategories;
          selectedCategories.push(event.target.id);
          setState({...state, selectedCategories: selectedCategories});
        }
      }

      if(event.target.checked === false){
        let itemExists = -1;
        for(let i = 0; i < state.selectedCategories.length; i++){
          if(state.selectedCategories[i] === event.target.id){
            itemExists = i;
          }
        }

        if(itemExists > -1){
          let selectedCategories = state.selectedCategories;
          selectedCategories.splice(itemExists, 1);
          setState({...state, selectedCategories: selectedCategories});
        }

        
      }
    }
  }

  const handleAdvancedSearch = () => {

    const bodyFormData = new FormData();
    bodyFormData.append("selectedPlatforms", JSON.stringify(state.selectedPlatforms));
    bodyFormData.append("selectedCategories", JSON.stringify(state.selectedCategories));
    bodyFormData.append("showAvailableItemsOnly", state.showAvailableItemsOnly);

      axios
        .post(
          `${UrlLocator.getApiUrl('HOME_GET_ALL_ITEMS')}`,
          bodyFormData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          })
        .then((response) => {
          if (response.status === 200) {
            setState({...state, 
              items: response.data.items.filter(
                (item) => item.itemStatus === "ACTIVE"
              ),
              platforms: response.data.platforms,
              categories: response.data.categories
            });           
          }
        })
        .catch((err) => {
          console.log(err);
        });

  }

  return (
    <div className="container">
      
          <Row className="mt-3">
            <Col lg={{ span: 12, offset: 0 }} className="mt-3">
              <InputGroup className="mb-3">
              <Button variant="dark" onClick={showModal} className="mx-2">
            Add New Item
          </Button>
                <FormControl
                  placeholder="Search by name ..."
                  aria-label="searchField"
                  id="searchField"
                  name="searchField"
                  onChange={handleSearchFieldChange}
                  size={"lg"}
                />
                <Button variant="dark">
                  Search
                </Button>
                <Button
                  variant="dark"
                  className="mx-2"
                  onClick={sortItemsByPice}
                >
                  Price{" "}
                  {state.sortDirection === "DOWN" ||
                  state.sortDirection === "" ? (
                    <BiSortUp size="1.5rem" />
                  ) : (
                    <BiSortDown size="1.5rem" />
                  )}
                </Button>

                <Button
                  variant="dark"
                  className="mx-2"
                  onClick={ShowAdvancedSearchMenu}
                >
                  {state.showAdvancedSearchMenu ? (
                    <IoCaretUp style={{ color: "white", fontSize: "1.5em" }} />
                  ) : (
                    <IoCaretDown
                      style={{ color: "white", fontSize: "1.5em" }}
                    />
                  )}
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            {state.showAdvancedSearchMenu ? (
              <Alert variant="light">
                <Row>
                  <Col>
                    <h5>
                      <u>PLATFORMS</u>
                    </h5>
                    {state.platforms.map((item) => {
                      return (
                        <Form.Check
                          key={item.id}
                          type="checkbox"
                          id={item.id}
                          label={item.platformName}
                          name={`selectedPlatform-${item.id}`}
                          onChange={handleAdvancedSearchField}
                        />
                      );
                    })}
                  </Col>

                  <Col>
                  <h5>
                      <u>Categories</u>
                    </h5>
                    {state.categories.map((item) => {
                      return (
                        <Form.Check
                          key={item.id}
                          type="checkbox"
                          id={item.id}
                          label={item.categoryName}
                          name={`selectedCategory-${item.id}`}
                          onChange={handleAdvancedSearchField}
                        />
                      );
                    })}
                  </Col>

                  <Col>
                    <Form.Check
                      type="checkbox"
                      name="availableItemsOnlyCheckbox"
                      label="Available items only"
                      onChange={handleAdvancedSearchField}
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Button variant="dark" onClick={handleAdvancedSearch}>
                      Search
                    </Button>
                  </Col>
                </Row>
              </Alert>
            ) : null}
          </Row>


      


{
        state.showNewModal ?
        (
          <NewItemModal 
      showNewModal={state.showNewModal} 
      platforms={state.platforms} 
      categories={state.categories} 
      hideModal={hideModal}
      getAllItems={getAllItems}/>
        )
        :
        null
      }

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
