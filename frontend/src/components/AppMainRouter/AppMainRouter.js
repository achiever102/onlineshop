import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "../Security/Signin";
import Signup from "../Security/Signup";
import Authenticator from "../../helpers/Authenticator";
import GameDetails from "../Home/GameDetails";
import Cart from '../Client/Cart/Cart'
import HomeNavbar from "../AppNavbar/HomeNavbar";
import AppLogo from "../AppLogo/AppLogo";

class AppMainRouter extends Component {
      render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Authenticator url="/" />} />
          <Route exact path="/signin" element={<><AppLogo/><HomeNavbar /><Signin/></>} />
          <Route exact path="/signup" element={<><AppLogo/><HomeNavbar /><Signup/></>} />

          <Route exact path="/adminCoupons" element={<Authenticator url="/adminCoupons" />} />
          <Route exact path="/adminSettings" element={<Authenticator url="/adminSettings" />} />
          <Route exact path="/adminItems" element={<Authenticator url="/adminItems" />} />
          <Route exact path="/adminOrders" element={<Authenticator url="/adminOrders" />} />
          <Route exact path="/adminProfile" element={<Authenticator url="/adminProfile" />} />
          <Route exact path="/adminCategories" element={<Authenticator url="/adminCategories" />} />
          <Route exact path="/adminPlatforms" element={<Authenticator url="/adminPlatforms" />} />

          <Route exact path="/adminImagesCarousel" element={<Authenticator url="/adminImagesCarousel" />} />

          <Route exact path="/clientItems" element={<Authenticator url="/clientItems" />} />
          <Route exact path="/clientOrders" element={<Authenticator url="/clientOrders" />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/clientProfile" element={<Authenticator url="/clientProfile" />} />
          <Route exact path="/clientChangePassword" element={<Authenticator url="/clientChangePassword" />} />

          <Route exact path="/placeOrder" element={<Authenticator url="/placeOrder" />} />

          <Route exact path="/adminChangePassword" element={<Authenticator url="/adminChangePassword" />} />

          <Route exact path="/gameDetails/:id" element={<GameDetails />} />

          <Route exact path="/clientCheckout" element={<Authenticator url="/clientCheckout" />} />

          <Route exact path="/adminItems/:id/licenses" element={<Authenticator url="/adminLicenses" />} />

          <Route exact path="/orders/printInvoice/:orderId" element={<Authenticator url="/printInvoice" />} />

          <Route exact path="/adminUsersManagement" element={<Authenticator url="/adminUsersManagement" />} />
          
          <Route exact path="/forgotPassword" element={<Authenticator url="/forgotPassword" />} />

          <Route exact path="/resetPassword/:resetPasswordTokenId" element={<Authenticator url="/resetPassword" />} />

        </Routes>
      </Router>
    );
  }
}

export default AppMainRouter;
