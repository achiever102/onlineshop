import React, { useContext, useState, useEffect } from "react";
import ClientNavbar from "../components/AppNavbar/ClientNavbar";
import Signin from "../components/Security/Signin";
import ClientProfile from "../components/Client/Profile/ClientProfile";
import ClientOrder from "../components/Client/Order/ClientOrder";
import ClientItems from "../components/Client/Item/ClientItems";
import AdminNavbar from "../components/AppNavbar/AdminNavbar";
import CouponsTable from "../components/Admin/Coupon/CouponsTable";
import AdminItems from "../components/Admin/Item/AdminItems";
import AdminOrder from "../components/Admin/Order/AdminOrder";
import AdminProfile from "../components/Admin/Profile/AdminProfile";
import Settings from "../components/Admin/Settings/Settings";
import AppLogo from "../components/AppLogo/AppLogo";
import CategoriesTable from "../components/Admin/Categories/CategoriesTable";

import Carousel from '../components/Admin/Carousel/Carousel'

import AuthContext from "../context/AuthContext";
import HomeNavbar from "../components/AppNavbar/HomeNavbar";
import AppNewsletter from "../components/AppNewsletter/AppNewsletter";
import AppFooter from "../components/AppFooter/AppFooter";
import Home from "../components/Home/Home";
import PlatformTable from "../components/Admin/Platform/PlatformTable";

import FinalCheckout from "../components/Client/Checkout/FinalCheckout";
import ChangePassword from "../components/ChangePassword/ChangePassword";
import SuccessfulOrder from "../components/Client/Checkout/SuccessfulOrder";

import { useParams } from "react-router-dom";
import LicensesTable from "../components/Admin/Licenses/LicensesTable";
import PrintInvoice from "../components/Client/Invoice/PrintInvoice";
import UsersManagement from "../components/Admin/UsersManagement/UsersManagement";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ResetPassword from "../components/ForgotPassword/ResetPassword";

const Authenticator = (props) => {
  let { id, orderId, resetPasswordTokenId } = useParams();

  const { username, isAuthenticated } = useContext(AuthContext);

  const [state, setState] = useState({ isAuthenticated: false });

  useEffect(() => {
    if (
      (props.url.includes("admin") || props.url.includes("client")) &&
      isAuthenticated === true
    ) {
      setState({ isAuthenticated: true });
    }
  }, []);

  if (!isAuthenticated && props.url === "/resetPassword") {
    return (
      <>
        <AppLogo />
        <HomeNavbar />
        <ResetPassword resetPasswordTokenId={resetPasswordTokenId} />
        <AppNewsletter />
        <AppFooter />
      </>
    );
  }
  else if (!isAuthenticated && props.url !== "/") {
    return (
      <>
        <AppLogo />
        <HomeNavbar />
        {props.url === "/forgotPassword" ? <ForgotPassword /> : <Signin />}
        <AppNewsletter />
        <AppFooter />
      </>
    );
  } else if (!isAuthenticated && props.url === "/") {
    return <Home />;
  } else if (isAuthenticated && username === "manager") {
    switch (props.url) {
      case "/":
        return (
          <>
            <AppLogo />
            <AdminNavbar />
            <AdminItems />
          </>
        );
      case "/adminCoupons":
        return (
          <>
            <AppLogo />
            <AdminNavbar />
            <CouponsTable />
          </>
        );
      case "/adminSettings":
        return (
          <>
            <AppLogo />
            <AdminNavbar />
            <Settings />
          </>
        );
      case "/adminItems":
        return (
          <>
            <AppLogo />
            <AdminNavbar />
            <AdminItems />
          </>
        );
      case "/adminOrders":
        return (
          <>
            <AppLogo />
            <AdminNavbar />
            <AdminOrder />
          </>
        );
      case "/adminProfile":
        return (
          <>
            <AppLogo />
            <AdminNavbar />
            <AdminProfile />
          </>
        );
      case "/adminCategories":
        return (
          <>
            <AppLogo />
            <AdminNavbar />
            <CategoriesTable />
          </>
        );
      case "/adminPlatforms":
        return (
          <>
            <AppLogo />
            <AdminNavbar />
            <PlatformTable />
          </>
        );
      case "/adminChangePassword":
        return (
          <>
            <AppLogo />
            <AdminNavbar />
            <ChangePassword />
          </>
        );
      case "/adminLicenses":
         return (
          <>
            <AppLogo />
            <AdminNavbar />
            <LicensesTable itemId={id} />
          </>
        );

        case "/adminImagesCarousel":
         return (
          <>
            <AppLogo />
            <AdminNavbar />
            <Carousel />
          </>
        );

        case "/adminUsersManagement":
         return (
          <>
            <AppLogo />
            <AdminNavbar />
            <UsersManagement />
          </>
        );

      default:
        return null;
    }
  } else {
    switch (props.url) {
      case "/":
        return (
          <>
            <AppLogo />
            <ClientNavbar />
            <ClientItems />
          </>
        );
      case "/clientItems":
        return (
          <>
            <AppLogo />
            <ClientNavbar />
            <ClientItems />
          </>
        );

      case "/printInvoice":
        return (
          <>
            <AppLogo />
            <ClientNavbar />
            <PrintInvoice orderId={orderId} />
          </>
        );

      case "/clientOrders":
        return (
          <>
            <AppLogo />
            <ClientNavbar />
            <ClientOrder />
          </>
        );
      case "/clientProfile":
        return (
          <>
            <AppLogo />
            <ClientNavbar />
            <ClientProfile />
          </>
        );
      case "/clientChangePassword":
        return (
          <>
            <AppLogo />
            <ClientNavbar />
            <ChangePassword />
          </>
        );
      case "/clientCheckout":
        return (
          <>
            <AppLogo />
            <ClientNavbar />
            <FinalCheckout />
          </>
        );
      case "/placeOrder":
        return (
          <>
            <AppLogo />
            <ClientNavbar />
            <SuccessfulOrder />
          </>
        );
      default:
        return null;
    }
  }
};

export default Authenticator;
