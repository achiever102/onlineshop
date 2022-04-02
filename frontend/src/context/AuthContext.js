import React, { Component } from "react";
import axios from "axios";

const AuthContext = React.createContext();

// for method 3
//export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends Component {
  //what data you want to share
  state = {
    cartCount: 0,
    appliedCoupons: [],
    licensesFileUrl: "",
    cartItems: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    accessToken: localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : "",
    username: localStorage.getItem("username") ? localStorage.getItem("username") : "",
    userId: localStorage.getItem("userId") ? localStorage.getItem("userId") : -1,
    fullName: localStorage.getItem("fullName") ? localStorage.getItem("fullName") : "",
    roles: localStorage.getItem("roles") ? localStorage.getItem("roles") : "",
    isAuthenticated: localStorage.getItem("isAuthenticated") ? (localStorage.getItem("isAuthenticated") === "true" ? true : false) : false
  };

  setCartItems = (cartItemsArray) => {
    let count = 0;
    for(let i = 0; i < cartItemsArray.length; i++){
      count = count + cartItemsArray[i].itemQuantity;
    }
    this.setState({cartItems: cartItemsArray, cartCount: count})
  }

  setAppliedCoupons = (appliedCoupons) => {
    this.setState({appliedCoupons: appliedCoupons})
  }

  resetCartItemAndCount = () => {
    this.setState({cartItems: [], cartCount: 0})
  }

  setLicensesURLAndResetCartItemAndCount = (licensesFileUrl) => {
    this.setState({cartItems: [], cartCount: 0, licensesFileUrl: licensesFileUrl, appliedCoupons: []})
  }

  login = (accessToken, username, fullName, id, roles, isAuthenticated) => {

    localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("username", username);
          localStorage.setItem("fullName", fullName);
          localStorage.setItem("userId", id);
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("roles", roles);

    this.setState({
      accessToken,
      username,
      userId: id,
      fullName,
      roles,
      isAuthenticated
    });
  };

  logout = () => {
    if(localStorage.getItem('username') === 'manager'){
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
      localStorage.removeItem('fullName');
      localStorage.removeItem('roles');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userId');
    }else {
      localStorage.clear();
    }
    
    this.setState({
      accessToken: "",
      username: "",
      userId: -1,
      fullName: "",
      roles: "",
      isAuthenticated: false
    });
  };

  updateUserProfileDetails = (username, fullName) => {

          localStorage.setItem("username", username);
          localStorage.setItem("fullName", fullName);

    this.setState({
      username,
      fullName
    });
  };

  setCartCount = () => {
    if (
      !localStorage.getItem("username") ||
      localStorage.getItem("username") === "" ||
      localStorage.getItem("isAuthenticated") === "false"
    ) {
      let cart;
      if (Array.isArray(JSON.parse(localStorage.getItem("cart")))) {
        cart = JSON.parse(localStorage.getItem("cart"));
      } else {
        cart = [];
      }

      let sum = 0;
      for(let i = 0; i < cart.length; i++){
        sum = sum + cart[i].itemQuantity;
      }

      this.setState({ cartCount: sum });
    } else if (
      localStorage.getItem("username") ||
      localStorage.getItem("username") !== "" ||
      localStorage.getItem("isAuthenticated") === "true"
    ) {
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
          let count = 0;
          res.data.forEach((element) => {
            count = count + element.itemQuantity;
          });

          this.setState({ cartCount: count });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    const { cartItems, cartCount, isAuthenticated, accessToken, username, fullName, userId, roles, appliedCoupons, licensesFileUrl } = this.state;
    const { setCartCount, login, logout, setCartItems, resetCartItemAndCount, setAppliedCoupons, updateUserProfileDetails, setLicensesURLAndResetCartItemAndCount } = this;
    return (
      <AuthContext.Provider
        value={{
          cartCount,
          isAuthenticated, accessToken, username, fullName, userId, roles, appliedCoupons, licensesFileUrl,cartItems,
          setCartCount,
          login,
          logout,
          setCartItems,
          resetCartItemAndCount,
          setAppliedCoupons,
          updateUserProfileDetails,
          setLicensesURLAndResetCartItemAndCount
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContext;
