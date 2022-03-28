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
  Form,
  FormControl,
  Modal,
  Row,
  Col,
  Badge
} from "react-bootstrap";


import AuthContext from "../../../context/AuthContext";

export default function AdminItems() {

  const navigate = useNavigate();

  const { accessToken } = useContext(AuthContext);

  const [state, setState] = useState(
    {
      modalShow: false,
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
        modalTitle: "Edit Item",
        itemSaleValue: "0",
        itemOnSale: false,
        itemDescription: ""
      }
    }
  );

  const showModal = () => {
    setState({ ...state, modalShow: true, editItem: {
      id: -1,
      itemPrice: 0,
      itemName: "",
      itemQuantity: 0,
      itemCategory: -1,
      itemPlatform: -1,
      modalTitle: "Add New Item",
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
          modalShow: false})
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

  const updateGameLicences = (id) => {
    navigate(`/adminItems/${id}/licences`);
  }

  const handleChange = (event) => {
    if (event.target.name === "itemName") {
      setState({ ...state, itemName: event.target.value });
    } else if (event.target.name === "itemPrice") {
      setState({ ...state, itemPrice: event.target.value });
    } else if (event.target.name === "itemQuantity") {
      setState({ ...state, itemQuantity: event.target.value });
    } else if (event.target.name === "itemImage") {
      setState({ ...state, itemImage: event.target.files[0] });
    } else if (event.target.name === "itemCategory") {
      setState({ ...state, itemCategory: event.target.value });
    } else if (event.target.name === "itemOnSale") {
      setState({ ...state, itemOnSale: event.target.checked });
    } else if (event.target.name === "itemSaleValue") {
      setState({ ...state, itemSaleValue: event.target.value });
    } else if (event.target.name === "itemDescription") {
      setState({ ...state, itemDescription: event.target.value });
    } else if (event.target.name === "itemPlatform") {
      setState({ ...state, itemPlatform: event.target.value });
    } 
  };

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
          setState({...state, items: response.data.items.filter((item) => (item.itemName.toLowerCase().includes(this.state.searchField.toLowerCase()))).sort((a, b) => { return (b.itemOnSale ? b.itemPrice : b.itemPrice) - (a.itemOnSale ? a.itemPrice : a.itemPrice); }), 
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
        setState({...state, items: response.data.items.filter((item) => (item.itemName.toLowerCase().includes(this.state.searchField.toLowerCase()))).sort((a, b) => { return (a.itemOnSale ? a.itemPrice : a.itemPrice) - (b.itemOnSale ? b.itemPrice : b.itemPrice); }), 
          platforms: response.data.platforms,
          categories: response.data.categories,
          modalShow: false,
          sortDirection: "DOWN"})
      });
      }
    }
  }

  const handleSave = () => {
    const formData = new FormData();
    formData.append("itemImage", state.itemImage);
    formData.append("itemName", state.itemName);
    formData.append("itemPrice", state.itemPrice);
    formData.append("itemQuantity", state.itemQuantity);
    formData.append("itemCategory", state.itemCategory);
    formData.append("itemOnSale", state.itemOnSale);
    formData.append("itemSaleValue", state.itemOnSale ? state.itemSaleValue : 0);
    formData.append("itemDescription", state.itemDescription);
    formData.append("itemPlatform", state.itemPlatform);



    axios
      .post(UrlLocator.getApiUrl("SAVE_ADMIN_ITEM"), formData, {
        headers: {
          "Content-Type": "multipart/from-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        getAllItems();
      })
      .catch((err) => {
        console.log(err);
      });

  };

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
            itemDescription: response.data.itemDescription,
            modalTitle: "Edit Item"
          };
          setState({ ...state, modalShow: true, editItem: item });
        }
      });
  };

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

      <Modal
        show={state.modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {state.editItem.modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="hidden"
              placeholder="ID"
              name="id"
              defaultValue={state.editItem.id}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Label htmlFor="itemName">Name</Form.Label>
              <Form.Control
                type="text"
                id="itemName"
                name="itemName"
                onChange={handleChange}
                defaultValue={state.editItem.itemName}
              />
            </Col>
            <Col>
              <Form.Label htmlFor="itemPrice">Price</Form.Label>
              <Form.Control
                type="text"
                id="itemPrice"
                name="itemPrice"
                onChange={handleChange}
                defaultValue={state.editItem.itemPrice}
              />
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <Form.Label htmlFor="itemImage">Upload Image</Form.Label>
              <Form.Control
                type="file"
                className="custom-file-label"
                id="itemImage"
                name="itemImage"
                label="Image Uploader"
                onChange={handleChange}
              />
            </Col>
            <Col xs={6} md={6} sm={12}>
              <Form.Label htmlFor="itemCategory">Category</Form.Label>
              <Form.Select
                id="itemCategory"
                name="itemCategory"
                onChange={handleChange}
                defaultValue={state.editItem.itemCategory}
              >
                {state.categories.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.categoryName}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
          </Row>
          <Row className="mt-2">
            
            <Col xs={6} md={6} sm={12}>
              <Form.Label htmlFor="itemPlatform">Platform</Form.Label>

              <Form.Select
                id="itemPlatform"
                name="itemPlatform"
                onChange={handleChange}
                defaultValue={state.editItem.itemPlatform}
              >
                {state.platforms.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.platformName}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>

            <Col>
              <Form.Check
                type="switch"
                id="itemOnSale"
                name="itemOnSale"
                label="Item on Sale"
                onChange={handleChange}
                defaultChecked={state.editItem.itemOnSale === true ? true : false}
                style={{marginTop: "5px"}}
              />
              <Form.Control
                type="text"
                id="itemSaleValue"
                name="itemSaleValue"
                onChange={handleChange}
                defaultValue={state.editItem.itemSaleValue}
                disabled={state.itemOnSale === true ? false : true}
              />
            </Col>

          </Row>


          <Row className="mt-2">
            <Col>
              <Form.Label htmlFor="itemDescription">
                Item Description
              </Form.Label>
              <Form.Control
                id="itemDescription"
                name="itemDescription"
                as="textarea"
                onChange={handleChange}
                rows={3}
                defaultValue={state.editItem.itemDescription}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setState({ ...state, modalShow: false })}>
            Cancel
          </Button>

          <Button variant="dark" onClick={handleSave}>Save and Close</Button>
        </Modal.Footer>
      </Modal>

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
                  disabled={item.itemStatus === 'DELETED' ? true : false}
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
                  onClick={() => updateGameLicences(item.id)}
                >
                  Update Licences
                </Button>
              </Card.Footer>
            </Card>
          );
        })}
      </div>
    </div>
  );

}