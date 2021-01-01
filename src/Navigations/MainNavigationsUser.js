import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HeaderUser from "../components/HeaderUser";
import SideBarUser from "../components/SideBarUser";
import Content from "../components/Content";
import Footer from "../components/Footer";
import ProfileUser from "../Screens/ProfileUser/ProfileUser";
import HistoryUser from "../Screens/HistoryUser/HistoryUser";
import Cart from "../Screens/Cart/Cart";
import Wishlist from "../Screens/Wishlist/Wishlist";
import Payment from "../Screens/Payment/Index";
import Catalog from "../Screens/Catalog/Catalog";
import Login from "../Screens/Login/Login";
import Register from "../Screens/Register/Register";
import Password from "../Screens/ForgotPassword/index";
import Donation from "../Screens/DonationUser/index";
import DonationForm from "../Screens/DonationUser/indexForm";
import Profile from "../Screens/Profile/Profile";
import History from "../Screens/History/History";
import ExtendForm from "../Screens/Form/ExtendForm";
import ReturnForm from "../Screens/Form/ReturnForm";
import UserManagement from "../Screens/UserManagement/usermanagement";
import ManageDonation from "../Screens/ManageDonation/index";
import PublisherManagement from "../Screens/PublisherManagement/publishermanagement";
import BookManagement from "../Screens/BookManagement/bookmanagement";
import DetailPage from "../Screens/DetailPage/detailpage";
import FineManagement from "../Screens/FineManagement/fineManagement";
class MainNavigationsUser extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/forgot-password" exact>
            <Password />
          </Route>

          <div className="main_container">
            <Route path="/:id">
              <div className="top_nav">
                <HeaderUser />
              </div>
              <div className="col-md-3 left_col">
                <SideBarUser />
              </div>
            </Route>

            <Route exact path="/:id">
              <Content />
            </Route>

            <Route path="/page/indexUser">
              <Content />
            </Route>
            <Route path="/page/profileUser">
              <ProfileUser />
            </Route>
            <Route path="/page/historyUser">
              <HistoryUser />
            </Route>
            <Route path="/page/cart">
              <Cart />
            </Route>
            <Route path="/page/wishlist">
              <Wishlist />
            </Route>
            <Route path="/page/payment">
              <Payment />
            </Route>
            <Route path="/page/catalog">
              <Catalog />
            </Route>
            <Route path="/page/donation-user">
              <Donation />
            </Route>
            <Route path="/page/donation-form">
              <DonationForm />
            </Route>
            <Route path="/page/profile">
              <Profile />
            </Route>
            <Route path="/page/managePublisher">
              <PublisherManagement />
            </Route>
            <Route path="/page/manageBook">
              <BookManagement />
            </Route>
            <Route path="/page/manageUser">
              <UserManagement />
            </Route>
            <Route path="/page/detailpage">
              <DetailPage />
            </Route>
            <Route path="/page/manage-donation">
              <ManageDonation />
            </Route>
            <Route path="/page/history">
              <History />
            </Route>
            <Route path="/page/extendForm">
              <ExtendForm />
            </Route>
            <Route path="/page/returnForm">
              <ReturnForm />
            </Route>
            <Route path="/page/manageFine">
              <FineManagement />
            </Route>

            <Route path="/page/:id">
              <Footer />
            </Route>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default MainNavigationsUser;
