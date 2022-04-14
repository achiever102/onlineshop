import React, { Component } from "react";
import UrlLocator from "../../../helpers/UrlLocator";

import axios from "axios";
import {
  Row,
  Col,
  Card,
  Container,
  Button,
  InputGroup,
  FormControl,
  Badge,
  Form, Alert
} from "react-bootstrap";
import AppCarousel from "../../AppCarousel/AppCarousel";
import AppFooter from "../../AppFooter/AppFooter";
import GameDetails from "../../Home/GameDetails";
import { Link } from "react-router-dom";

import { ImFire } from "react-icons/im";

import { IoCaretDown, IoCaretUp } from "react-icons/io5";

import { BiSortUp, BiSortDown } from "react-icons/bi";

import AuthContext from "../../../context/AuthContext";

class ClientItems extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super();
    this.state = {
      items: [],
      categories: [],
      platforms: [],
      searchField: "",
      sortDirection: "",
      selectedPlatforms: [],
      selectedCategories: [],
      showAvailableItemsOnly: false
    };
  }

  componentDidMount() {
    this.getAllItems();
  }

  getAllItems = () => {
    const { setCartItems } = this.context;
    axios.get(UrlLocator.getApiUrl("HOME_GET_ALL_ITEMS")).then((response) => {
      axios
        .get(
          `${UrlLocator.getApiUrl('GET_USER_CART')}/${localStorage.getItem(
            "userId"
          )}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          let sum = 0;
          let cart = [];

          res.data.forEach((element) => {
            let itemsActualPrice = element.itemOnSale
              ? element.itemPrice * element.itemQuantity -
                (element.itemPrice *
                  element.itemSaleValue *
                  element.itemQuantity) /
                  100
              : element.itemPrice * element.itemQuantity;
            sum = sum + itemsActualPrice;
            cart.push({
              itemId: element.itemId,
              itemQuantity: element.itemQuantity,
            });
          });

          this.setState(
            {
              items: response.data.items.filter(
                (item) => item.itemStatus === "ACTIVE"
              ),
              platforms: response.data.platforms,
              categories: response.data.categories,
            },
            () => {
              setCartItems(cart);
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  handleAddToCart = (itemId) => {
    //let cart;

    const { setCartItems } = this.context;

    if (
      localStorage.getItem("isAuthenticated") === "true" &&
      localStorage.getItem("username") !== "manager"
    ) {
      axios
        .post(
          `${UrlLocator.getApiUrl('CREATE_SINGLE_CART_RECORD')}/${localStorage.getItem(
            "userId"
          )}/${itemId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          let cart = [];

          res.data.forEach((element) => {
            cart.push({
              itemId: element.gameId,
              itemQuantity: element.quantity,
            });
          });

          setCartItems(cart);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  showMoreDetails = (id) => {
    return <GameDetails />;
  };

  showPlatform = (itemPlatform) => {
    return this.state.platforms.filter((item) => itemPlatform === item.id)[0]
      .platformName;
  };

  sortItemsByPice = () => {
    //if (this.state.searchField === "") {
      if (
        this.state.sortDirection === "" ||
        this.state.sortDirection === "DOWN"
      ) {

        let sortedItems = this.state.items.filter((item) => item.itemStatus === "ACTIVE")
        .sort((a, b) => {
          return b.itemPrice - a.itemPrice;
        });

        this.setState({
          items: sortedItems,
          modalShow: false,
          sortDirection: "UP",
        });

      } else {
        let sortedItems = this.state.items
        .filter((item) => item.itemStatus === "ACTIVE")
        .sort((a, b) => {
          return a.itemPrice - b.itemPrice;
        });

        this.setState({
              items: sortedItems,
              modalShow: false,
              sortDirection: "DOWN",
            });
      }
    };

  disableAddToCartButton = function (id, quantity) {
    const { cartItems } = this.context;

    let cart = cartItems;

    if (quantity === 0) {
      return (
        <Button
          variant="dark"
          className="mx-1"
          onClick={() => this.handleAddToCart(id)}
          size="sm"
          disabled={true}
        >
          Add to Cart
        </Button>
      );
    }

    for (let j = 0; j < cart.length; j++) {
      if (id === cart[j].itemId) {
        if (cart[j].itemQuantity >= quantity) {
          return (
            <Button
              variant="dark"
              className="mx-1"
              onClick={() => this.handleAddToCart(id)}
              size="sm"
              disabled={true}
            >
              Add to Cart
            </Button>
          );
        }
      }
    }

    return (
      <Button
        variant="dark"
        className="mx-1"
        onClick={() => this.handleAddToCart(id)}
        size="sm"
      >
        Add to Cart
      </Button>
    );
  };



  handleSearchFieldChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  
  handleSearchFieldClick = () => {
    if (this.state.searchField != "") {
      axios.get(UrlLocator.getApiUrl("HOME_GET_ALL_ITEMS")).then((response) => {
        this.setState({
          items: response.data.items.filter(
            (item) =>
              item.itemName
                .toLowerCase()
                .includes(this.state.searchField.toLowerCase()) &&
              item.itemStatus === "ACTIVE"
          ),
          platforms: response.data.platforms,
          categories: response.data.categories,
          modalShow: false,
          showAdvancedSearchMenu: false
        });
      });
    } else {
      this.getAllItems();
    }
  };

  ShowAdvancedSearchMenu = () => {
    this.setState({
      showAdvancedSearchMenu: !this.state.showAdvancedSearchMenu,
    });
  };

  handleAdvancedSearchField = (event) => {
    if(event.target.name === "availableItemsOnlyCheckbox"){
      this.setState({showAvailableItemsOnly: event.target.checked})
    }

    if(event.target.name.includes("selectedPlatform-")){
      if(event.target.checked === true){
        let itemExists = false;
        for(let i = 0; i < this.state.selectedPlatforms.length; i++){
          if(this.state.selectedPlatforms[i] === event.target.id){
            itemExists = true;
          }
        }
        if(itemExists === false){
          let selectedPlatforms = this.state.selectedPlatforms;
          selectedPlatforms.push(event.target.id);
          this.setState({selectedPlatforms: selectedPlatforms});
        }
      }

      if(event.target.checked === false){
        let itemExists = -1;
        for(let i = 0; i < this.state.selectedPlatforms.length; i++){
          if(this.state.selectedPlatforms[i] === event.target.id){
            itemExists = i;
          }
        }

        if(itemExists > -1){
          let selectedPlatforms = this.state.selectedPlatforms;
          selectedPlatforms.splice(itemExists, 1);
          this.setState({selectedPlatforms: selectedPlatforms});
        }

        
      }
    }

    if(event.target.name.includes("selectedCategory-")){
      if(event.target.checked === true){
        let itemExists = false;
        for(let i = 0; i < this.state.selectedCategories.length; i++){
          if(this.state.selectedCategories[i] === event.target.id){
            itemExists = true;
          }
        }
        if(itemExists === false){
          let selectedCategories = this.state.selectedCategories;
          selectedCategories.push(event.target.id);
          this.setState({selectedCategories: selectedCategories});
        }
      }

      if(event.target.checked === false){
        let itemExists = -1;
        for(let i = 0; i < this.state.selectedCategories.length; i++){
          if(this.state.selectedCategories[i] === event.target.id){
            itemExists = i;
          }
        }

        if(itemExists > -1){
          let selectedCategories = this.state.selectedCategories;
          selectedCategories.splice(itemExists, 1);
          this.setState({selectedCategories: selectedCategories});
        }

        
      }
    }
  }

  handleAdvancedSearch = () => {

    const bodyFormData = new FormData();
    bodyFormData.append("selectedPlatforms", JSON.stringify(this.state.selectedPlatforms));
    bodyFormData.append("selectedCategories", JSON.stringify(this.state.selectedCategories));
    bodyFormData.append("showAvailableItemsOnly", this.state.showAvailableItemsOnly);

      axios
        .post(
          `${UrlLocator.getApiUrl('HOME_GET_ALL_ITEMS')}`,
          bodyFormData
        )
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              items: response.data.items.filter(
                (item) => item.itemStatus === "ACTIVE"
              ),
              platforms: response.data.platforms,
              categories: response.data.categories,
              searchField: ""
            });           
          }
        })
        .catch((err) => {
          console.log(err);
        });

  }

  showCategory = (itemCategory) => {
    return this.state.categories.filter((item) => itemCategory === item.id)[0]
      .categoryName;
  };

  render() {
    return (
      <div>
        

<Container>
          <Row>
            <Col lg={{ span: 12, offset: 0 }} className="mt-3">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search by name ..."
                  id="searchField"
                  name="searchField"
                  onChange={this.handleSearchFieldChange}
                  value={this.state.searchField}
                  size={"lg"}
                />
                <Button variant="outline-light" className="mx-1" onClick={this.handleSearchFieldClick}>
                  Search
                </Button>
                <Button
                  variant="outline-light" className="mx-1"
                  onClick={this.sortItemsByPice}
                >
                  Price{" "}
                  {this.state.sortDirection === "DOWN" ||
                  this.state.sortDirection === "" ? (
                    <BiSortUp size="1.5rem" />
                  ) : (
                    <BiSortDown size="1.5rem" />
                  )}
                </Button>

                <Button
                  variant="outline-light" className="mx-1"
                  onClick={this.ShowAdvancedSearchMenu}
                >
                  {this.state.showAdvancedSearchMenu ? (
                    <IoCaretUp style={{ fontSize: "1.5em" }} />
                  ) : (
                    <IoCaretDown
                      style={{ fontSize: "1.5em" }}
                    />
                  )}
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            {this.state.showAdvancedSearchMenu ? (
              <Alert variant="dark">
                <Row>
                  <Col>
                    <h5>
                      <u>PLATFORMS</u>
                    </h5>
                    {this.state.platforms.map((item) => {
                      return (
                        <Form.Check
                          key={item.id}
                          type="checkbox"
                          id={item.id}
                          label={item.platformName}
                          name={`selectedPlatform-${item.id}`}
                          onChange={this.handleAdvancedSearchField}
                        />
                      );
                    })}
                  </Col>

                  <Col>
                  <h5>
                      <u>Categories</u>
                    </h5>
                    {this.state.categories.map((item) => {
                      return (
                        <Form.Check
                          key={item.id}
                          type="checkbox"
                          id={item.id}
                          label={item.categoryName}
                          name={`selectedCategory-${item.id}`}
                          onChange={this.handleAdvancedSearchField}
                        />
                      );
                    })}
                  </Col>

                  <Col>
                    <Form.Check
                      type="checkbox"
                      name="availableItemsOnlyCheckbox"
                      label="Available items only"
                      onChange={this.handleAdvancedSearchField}
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Button variant="dark" onClick={this.handleAdvancedSearch}>
                      Search
                    </Button>
                  </Col>
                </Row>
              </Alert>
            ) : null}
          </Row>
        </Container>

        <Container>
          <AppCarousel />
        </Container>

        <div className="d-flex flex-wrap justify-content-center container mt-3">
          {this.state.items.map((item) => {
            return (
              <Card
                key={item.id}
                style={{
                  width: "18rem",
                  margin: "10px",
                }}
              >
                {/*<Card.Header>{item.itemName}</Card.Header>*/}
                {item.id ? (
                  <Card.Img
                    variant="top"
                    alt="Couldn't retrieve the file"
                    src={item.itemImage}
                    style={{ width: "17.9rem", height: "18rem" }}
                  />
                ) : null}

                <Card.Body>
                  <Card.Title>{item.itemName}</Card.Title>
                  <Card.Text
                    style={{
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    {item.description}
                  </Card.Text>

                  <Row>
                    <Col>
                      {item.itemQuantity > 0 ? (
                        <b style={{ color: "green" }}>Available now</b>
                      ) : (
                        <b style={{ color: "red" }}>Not available</b>
                      )}
                    </Col>
                    <Col></Col>
                  </Row>

                  <Row className="mt-2">
                    <Col>
                      <b>Price:</b>
                    </Col>
                    <Col>
                      {item.itemOnSale ? (
                        <div>
                          <s>${item.itemPrice}</s>
                          <div className="mr-4">
                            $
                            {(
                              item.itemPrice -
                              (item.itemSaleValue * item.itemPrice) / 100
                            ).toFixed(2)}{" "}
                            <ImFire size="1.5em" color="red" />{" "}
                            <Badge>{item.itemSaleValue}% Sale</Badge>
                          </div>
                        </div>
                      ) : (
                        <>${item.itemPrice}</>
                      )}
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col>
                      <b>Platform:</b>
                    </Col>
                    <Col>{this.showPlatform(item.itemPlatform)}</Col>
                  </Row>

                  <Row className="mt-2">
                    <Col>
                      <b>Category:</b>
                    </Col>
                    <Col>{this.showCategory(item.itemCategory)}</Col>
                  </Row>

                  <Row></Row>
                </Card.Body>
                <Card.Footer>
                  <div className="text-center">
                    <Link
                      className="btn btn-dark btn-sm"
                      to={`/gameDetails/${item.id}`}
                    >
                      Show More Details
                    </Link>

                    {this.disableAddToCartButton(item.id, item.itemQuantity)}
                  </div>
                </Card.Footer>
              </Card>
            );
          })}
        </div>
        <AppFooter/>
      </div>
    );
  }
}

export default ClientItems;
