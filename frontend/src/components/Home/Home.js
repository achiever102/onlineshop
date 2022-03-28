import React, { Component } from "react";
import HomeNavbar from "../AppNavbar/HomeNavbar";
import UrlLocator from "../../helpers/UrlLocator";

import axios from "axios";
import {Row, Col, Card, Container, Button, InputGroup, FormControl, Badge} from 'react-bootstrap';
import AppCarousel from "../AppCarousel/AppCarousel";
import AppNewsletter from "../AppNewsletter/AppNewsletter";
import AppFooter from "../AppFooter/AppFooter";
import AppLogo from "../AppLogo/AppLogo";
import GameDetails from "./GameDetails";
import { Link } from "react-router-dom";

import {ImFire} from 'react-icons/im';

import {BiSortUp, BiSortDown} from 'react-icons/bi'

import AuthContext from "../../context/AuthContext";

class Home extends Component {
  //method 2
  static contextType = AuthContext;
  // and comment this out Home.contextType = AuthContext;

  constructor(props) {
    super();
    this.state = {
      modalShow: false,
      items: [],
      count: 0,
      searchField: "",
      sortDirection: ""
    };
  }

  componentDidMount() {
    this.getAllItems();
  }

  handleAddToCart = (itemId) => {

    const { setCartItems} = this.context;

    let cart;

    if (Array.isArray(JSON.parse(localStorage.getItem("cart")))) {
      cart = JSON.parse(localStorage.getItem("cart"));
    } else {
      cart = [];
    }

    if (
      localStorage.getItem("isAuthenticated") === "true" &&
      localStorage.getItem("username") !== "manager"
    ) {
      
    } else {

      if(cart.length > 0){
        let itemUpdated = false;
        for(let i = 0 ; i < cart.length; i++){
          if(cart[i].itemId === itemId){
            cart[i].itemQuantity = cart[i].itemQuantity + 1;
            itemUpdated = true;
          }
        }

        // if item does not exist in the original array
        if(itemUpdated === false){
          cart.push({itemId: itemId, itemQuantity: 1});
        }
      } else {
        cart.push({itemId: itemId, itemQuantity: 1});
      }
      localStorage.setItem("cart", JSON.stringify(cart));

      //cart.push(itemId);
      //cart = cart.filter((item, index) => cart.indexOf(item) === index);
      //localStorage.setItem("cart", JSON.stringify(cart));
      setCartItems(cart);


/*
      let filtered = tempAppliedCoupons.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) => t.id === value.id && t.couponId === value.couponId
          )
      );*/
    }

  };

  disableAddToCartButton = function(id, quantity) {

    if(quantity === 0){
      return (
        <Button
        variant="dark"
        className="mx-1"
        onClick={() => this.handleAddToCart(id)}
        size='sm'
        disabled={true}
      >
        Add to Cart
      </Button>
      );
    }

    let cart;

    if (Array.isArray(JSON.parse(localStorage.getItem("cart")))) {
      cart = JSON.parse(localStorage.getItem("cart"));
    } else {
      cart = [];
    }

    for(var i = 0; i < cart.length; i++){
      if(cart[i].itemId === id){
        if(cart[i].itemQuantity >= quantity){
          return (
            <Button
            variant="dark"
            className="mx-1"
            onClick={() => this.handleAddToCart(id)}
            size='sm'
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
        size='sm'
      >
        Add to Cart
      </Button>
      );
    
    
}

  getAllItems = () => {
    const {setCartCount} = this.context;
    axios
    .get(UrlLocator.getApiUrl("HOME_GET_ALL_ITEMS"))
    .then((response) => {
        this.setState({items: response.data.items.filter((item) => item.itemStatus === 'ACTIVE'), 
          platforms: response.data.platforms,
          categories: response.data.categories});
          setCartCount();
    });
  };

  showMoreDetails = (id) => {
    return <GameDetails />;
  };

  showPlatform = (itemPlatform) => {
    return this.state.platforms.filter((item) => itemPlatform === item.id )[0].platformName;
  }

  handleSearchFieldChange = (event) => {
    if (event.target.name === "searchField") {
      axios
      .get(UrlLocator.getApiUrl("HOME_GET_ALL_ITEMS"))
      .then((response) => {
        this.setState({items: response.data.items.filter((item) => (item.itemName.toLowerCase().includes(event.target.value.toLowerCase()) && item.itemStatus === 'ACTIVE')), 
          platforms: response.data.platforms,
          categories: response.data.categories,
          modalShow: false,
        searchField: event.target.value})
      });

    }
  }

  sortItemsByPice = () => {
    if(this.state.searchField === ""){
      if(this.state.sortDirection === "" || this.state.sortDirection === "DOWN"){
        axios
        .get(UrlLocator.getApiUrl("HOME_GET_ALL_ITEMS"))
        .then((response) => {
          this.setState({items: response.data.items.filter((item) => (item.itemStatus === 'ACTIVE')).sort((a, b) => { return b.itemPrice - a.itemPrice; }), 
            platforms: response.data.platforms,
            categories: response.data.categories,
            modalShow: false,
            sortDirection: "UP"})
        });
      }else {
        axios
      .get(UrlLocator.getApiUrl("HOME_GET_ALL_ITEMS"))
      .then((response) => {
        this.setState({items: response.data.items.filter((item) => (item.itemStatus === 'ACTIVE')).sort((a, b) => { return a.itemPrice - b.itemPrice; }), 
          platforms: response.data.platforms,
          categories: response.data.categories,
          modalShow: false,
          sortDirection: "DOWN"})
      });
      }
    } else {
      if(this.state.sortDirection === "" || this.state.sortDirection === "DOWN"){
        axios
        .get(UrlLocator.getApiUrl("HOME_GET_ALL_ITEMS"))
        .then((response) => {
          this.setState({items: response.data.items.filter((item) => (item.itemName.toLowerCase().includes(this.state.searchField.toLowerCase()) && item.itemStatus === 'ACTIVE')).sort((a, b) => { return b.itemPrice - a.itemPrice; }), 
            platforms: response.data.platforms,
            categories: response.data.categories,
            modalShow: false,
            sortDirection: "UP"})
        });
      }else {
        axios
      .get(UrlLocator.getApiUrl("HOME_GET_ALL_ITEMS"))
      .then((response) => {
        this.setState({items: response.data.items.filter((item) => (item.itemName.toLowerCase().includes(this.state.searchField.toLowerCase()) && item.itemStatus === 'ACTIVE')).sort((a, b) => { return a.itemPrice - b.itemPrice; }), 
          platforms: response.data.platforms,
          categories: response.data.categories,
          modalShow: false,
          sortDirection: "DOWN"})
      });
      }
    }
  }

  render() {
    //console.log(this.context)
    //const {username, isAuthenticated, login, logout} = this.context;
    return (
      <div>
        <AppLogo />

        <HomeNavbar />

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
                      Price {this.state.sortDirection === 'DOWN' || this.state.sortDirection === '' ? <BiSortUp size="1.5rem"/> : <BiSortDown size="1.5rem"/>}
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
                    <Col>{item.itemQuantity > 0 ? <b style={{color: "green"}}>Available now</b> : <b style={{color: "red"}}>Not available</b>}</Col>
                    <Col></Col>
                  </Row>

                  <Row className="mt-2">
                    <Col><b>Price:</b></Col>
                    <Col>{item.itemOnSale ? <div><s>${item.itemPrice}</s><div className="mr-4">${(item.itemPrice - item.itemSaleValue * item.itemPrice / 100).toFixed(2)} <ImFire size="1.5em" color="red"/> <Badge>{item.itemSaleValue}% Sale</Badge></div></div> : <>${item.itemPrice}</>}</Col>
                  </Row>

                  <Row className="mt-2">
                    <Col><b>Platform:</b></Col>
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

        {/*<h1>User: {username}</h1>
        <h1>Authenticated: {isAuthenticated ? "Authenticated" : "Not Authenticated"}</h1>
        <button onClick={() => login("Jim")}>Log In</button>
    <button onClick={logout}>Logout</button>*/}
      </div>
    );
  }
}

//Home.contextType = AuthContext;




// for method 3: the reason you would use this is that you can consume multiple contexts (nexted) and also providers can be nested
/*export class Home2 extends Component {
  render() {
    return (
      <div>
        <HomeNavbar />
        <AuthConsumer>
          {
            props => {
              const {username, isAuthenticated, login, logout} = props;
              return (
                <div>
                  <HomeNavbar />
                  <h1>User: {username}</h1>
                  <h1>Authenticated: {isAuthenticated ? "Authenticated" : "Not Authenticated"}</h1>
                  <button onClick={login}>Log In</button>
                  <button onClick={logout}>Logout</button>
                  </div>
              );
            }
          }
        </AuthConsumer>
      </div>
    );
  }
}*/







export default Home;
