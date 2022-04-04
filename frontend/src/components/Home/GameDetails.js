import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import UrlLocator from "../../helpers/UrlLocator";
import AppLogo from "../AppLogo/AppLogo";
import ClientNavbar from "../AppNavbar/ClientNavbar";
import HomeNavbar from "../AppNavbar/HomeNavbar";
import { Row, Col, Button, Badge } from "react-bootstrap";

import AuthContext from "../../context/AuthContext";


import {ImFire} from'react-icons/im';

export default function GameDetails() {

  const { setCartCount, setCartItems } = useContext(AuthContext);

  const { id } = useParams();
  const [itemCategory, setItemCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemImage, setItemImage] = useState("");
  const [itemId, setItemId] = useState(-1);
  const [itemPlatform, setItemPlatform] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemOnSale, setItemOnSale] = useState(false);
  const [itemSaleValue, setItemSaleValue] = useState(0);


  const handleAddToCart = (itemId) => {
    let cart;
    let newCart;
    if(Array.isArray(JSON.parse(localStorage.getItem("cart")))){
        cart = JSON.parse(localStorage.getItem("cart"));
        newCart = JSON.parse(localStorage.getItem("newCart"));
    } else {
        cart = [];
        newCart = [];
    }

    

    if(localStorage.getItem("isAuthenticated") === "true" && localStorage.getItem("username") !== "manager"){
        
        axios.post(`${UrlLocator.getApiUrl('CREATE_SINGLE_CART_RECORD')}/${localStorage.getItem("userId")}/${itemId}`,{}, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            })
              .then((res) => {setCartCount()})
              .catch((err) => {console.log(err)});




    } else {

      if(newCart.length > 0){
        let itemUpdated = false;
        for(let i = 0 ; i < newCart.length; i++){
          if(newCart[i].itemId === itemId){
            newCart[i].itemQuantity = newCart[i].itemQuantity + 1;
            itemUpdated = true;
          }
        }

        // if item does not exist in the original array
        if(itemUpdated === false){
          newCart.push({itemId: itemId, itemQuantity: 1});
        }
      } else {
        newCart.push({itemId: itemId, itemQuantity: 1});
      }
      localStorage.setItem("newCart", JSON.stringify(newCart));
        
            cart.push(itemId)
            cart = cart.filter((item, index) => cart.indexOf(item) === index);
            localStorage.setItem("cart", JSON.stringify(cart))
            setCartItems(cart);
            setCartCount();
    }

  };

  useEffect(() => {
    axios
      .get(`${UrlLocator.getApiUrl("HOME_GET_CUSTOM_ITEM_BY_ID")}/${id}`)
      .then((res) => {
        setItemId(res.data.id);
        setItemCategory(res.data.itemCategory);
        setItemName(res.data.itemName);
        setItemPrice(res.data.itemPrice);
        setItemQuantity(res.data.itemQuantity);
        setItemImage(res.data.itemImage);
        setItemPlatform(res.data.itemPlatform);
        setItemDescription(res.data.itemDescription);
        setItemOnSale(res.data.itemOnSale);
        setItemSaleValue(res.data.itemSaleValue);
      });
  }, []);

  return (
    <div>
      <AppLogo />
      {localStorage.getItem("username") &&
      localStorage.getItem("username") !== "" &&
      localStorage.getItem("username") !== "manager" &&
      localStorage.getItem("isAuthenticated") === "true" ? (
        <ClientNavbar />
      ) : (
        <HomeNavbar />
      )}


      <Row className="mt-5">
        <Col xl={6} className="d-flex justify-content-end">
          <img src={itemImage} alt="" width="400px" height="400px" />
        </Col>
        <Col xl={6}>
          <Row>
            <Col>
              {itemQuantity > 0 ? <b style={{color: "green"}}>Available now</b> : <b style={{color: "red"}}>Not available</b>}
              <Button
                      variant="dark"
                      className="mx-3"
                      size="sm"
                      onClick={() => handleAddToCart(itemId)}
                      disabled={itemQuantity > 0 ? false : true}
                    >
                      Add to Cart
                    </Button>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h3>{itemName}</h3>
            </Col>
          </Row>

          <Row>
            <Col>
              <p><b>Price:</b> {itemOnSale ? <div><s>${itemPrice}</s><div className="mr-4">${(itemPrice - itemSaleValue * itemPrice / 100).toFixed(2)} <ImFire size="1.5em" color="red"/> <Badge>{itemSaleValue}% Sale</Badge></div></div> : <>${itemPrice}</>}</p>
            </Col>             
          </Row>

          <Row>
            <Col>
              <p><b>Category:</b> {itemCategory}</p>
            </Col>
          </Row>

          <Row>
            <Col>
              <p><b>Platform:</b> {itemPlatform}</p>
            </Col>
          </Row>

          <Row>
            <Col>
              <p><b>Description:</b> {itemDescription}</p>
            </Col>
          </Row>

        </Col>
      </Row>
    </div>
  );
}
