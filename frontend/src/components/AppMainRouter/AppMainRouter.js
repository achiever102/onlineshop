import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CouponsTable from "../Coupons/Admin/CouponsTable";
import SettingsTable from "../SettingsTable/SettingsTable";
import AdminItemsViewer from "../ItemsViewer/AdminItemsViewer";
import AppOrders from "../AppOrders/AppOrders";
import Login from "../Login/Login";
import ClientItemsViewer from "../ItemsViewer/ClientItemsViewer";
import ClientCart from "../ClientCart/ClientCart";
import AdminNavbar from "../AppNavbar/AdminNavbar";
import ClientNavbar from "../AppNavbar/ClientNavbar";

class AppMainRouter extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />

          <Route exact path="/admin" element={<AdminNavbar />} />
          <Route exact path="/adminCoupons" element={<><AdminNavbar /><CouponsTable/></>} />
          <Route exact path="/adminSettings" element={<><AdminNavbar /><SettingsTable/></>} />
          <Route exact path="/adminItems" element={<><AdminNavbar /><AdminItemsViewer/></>} />
          <Route exact path="/adminOrders" element={<><AdminNavbar /><AppOrders/></>} />

          <Route exact path="/client" element={<ClientNavbar />} />
          <Route exact path="/clientItems" element={<><ClientNavbar /><ClientItemsViewer/></>} />
          <Route exact path="/clientOrders" element={<><ClientNavbar /><AppOrders/></>} />
          <Route exact path="/clientCart" element={<><ClientNavbar /><ClientCart/></>} />
        </Routes>
      </Router>
    );
  }
}

export default AppMainRouter;
