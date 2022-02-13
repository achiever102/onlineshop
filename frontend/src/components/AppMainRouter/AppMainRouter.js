import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Client from "../Client/Client";
import Admin from "../Admin/Admin";
import CouponsTable from "../CouponsTable/CouponsTable";
import SettingsTable from "../SettingsTable/SettingsTable";
import AdminItemsViewer from "../ItemsViewer/AdminItemsViewer";
import AppOrders from "../AppOrders/AppOrders";

class AppMainRouter extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Client />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/adminCoupons" element={<><Admin /><CouponsTable/></>} />
          <Route exact path="/adminSettings" element={<><Admin /><SettingsTable/></>} />
          <Route exact path="/adminItems" element={<><Admin /><AdminItemsViewer/></>} />
          <Route exact path="/adminOrders" element={<><Admin /><AppOrders/></>} />
        </Routes>
      </Router>
    );
  }
}

export default AppMainRouter;
