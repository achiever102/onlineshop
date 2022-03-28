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
} from "react-bootstrap";
import AppCarousel from "../../AppCarousel/AppCarousel";
import AppNewsletter from "../../AppNewsletter/AppNewsletter";
import AppFooter from "../../AppFooter/AppFooter";
import GameDetails from "../../Home/GameDetails";
import { Link } from "react-router-dom";

import { ImFire } from "react-icons/im";

import { BiSortUp, BiSortDown } from "react-icons/bi";

import AuthContext from "../../../context/AuthContext";

class ClientItems extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super();
    this.state = {
      items: [],
      searchField: ""
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
          `http://localhost:8080/api/cart/getUserCart/${localStorage.getItem(
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
          `http://localhost:8080/api/cart/createSingleCartRecord/${localStorage.getItem(
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

  handleSearchFieldChange = (event) => {
    if (event.target.name === "searchField") {
      axios.get(UrlLocator.getApiUrl("HOME_GET_ALL_ITEMS")).then((response) => {
        this.setState({
          items: response.data.items.filter(
            (item) =>
              item.itemName
                .toLowerCase()
                .includes(event.target.value.toLowerCase()) &&
              item.itemStatus === "ACTIVE"
          ),
          platforms: response.data.platforms,
          categories: response.data.categories,
          modalShow: false,
          searchField: event.target.value,
        });
      });
    }
  };

  sortItemsByPice = () => {
    if (this.state.searchField === "") {
      if (
        this.state.sortDirection === "" ||
        this.state.sortDirection === "DOWN"
      ) {
        axios
          .get(UrlLocator.getApiUrl("HOME_GET_ALL_ITEMS"))
          .then((response) => {
            this.setState({
              items: response.data.items
                .filter((item) => item.itemStatus === "ACTIVE")
                .sort((a, b) => {
                  return b.itemPrice - a.itemPrice;
                }),
              platforms: response.data.platforms,
              categories: response.data.categories,
              modalShow: false,
              sortDirection: "UP",
            });
          });
      } else {
        axios
          .get(UrlLocator.getApiUrl("HOME_GET_ALL_ITEMS"))
          .then((response) => {
            this.setState({
              items: response.data.items
                .filter((item) => item.itemStatus === "ACTIVE")
                .sort((a, b) => {
                  return a.itemPrice - b.itemPrice;
                }),
              platforms: response.data.platforms,
              categories: response.data.categories,
              modalShow: false,
              sortDirection: "DOWN",
            });
          });
      }
    } else {
      if (
        this.state.sortDirection === "" ||
        this.state.sortDirection === "DOWN"
      ) {
        axios
          .get(UrlLocator.getApiUrl("HOME_GET_ALL_ITEMS"))
          .then((response) => {
            this.setState({
              items: response.data.items
                .filter(
                  (item) =>
                    item.itemName
                      .toLowerCase()
                      .includes(this.state.searchField.toLowerCase()) &&
                    item.itemStatus === "ACTIVE"
                )
                .sort((a, b) => {
                  return b.itemPrice - a.itemPrice;
                }),
              platforms: response.data.platforms,
              categories: response.data.categories,
              modalShow: false,
              sortDirection: "UP",
            });
          });
      } else {
        axios
          .get(UrlLocator.getApiUrl("HOME_GET_ALL_ITEMS"))
          .then((response) => {
            this.setState({
              items: response.data.items
                .filter(
                  (item) =>
                    item.itemName
                      .toLowerCase()
                      .includes(this.state.searchField.toLowerCase()) &&
                    item.itemStatus === "ACTIVE"
                )
                .sort((a, b) => {
                  return a.itemPrice - b.itemPrice;
                }),
              platforms: response.data.platforms,
              categories: response.data.categories,
              modalShow: false,
              sortDirection: "DOWN",
            });
          });
      }
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

  render() {
    return (
      <div>
        <Container>
          <AppCarousel />
        </Container>

        <Container>
          <Row className="mt-3">
            <Col lg={{ span: 8, offset: 0 }} className="mt-3">
              <InputGroup>
                <FormControl
                  placeholder="Search for item..."
                  aria-label="searchField"
                  id="searchField"
                  name="searchField"
                  aria-describedby="basic-addon1"
                  onChange={this.handleSearchFieldChange}
                />
              </InputGroup>
            </Col>
            <Col className="d-flex align-items-center mt-3">
              <Button
                variant="dark"
                className="mx-3"
                size="md"
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
            </Col>
          </Row>
        </Container>

        <div className="d-flex flex-wrap justify-content-center container my-4">
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

        <AppNewsletter />

        <AppFooter />
      </div>
    );
  }
}

export default ClientItems;
