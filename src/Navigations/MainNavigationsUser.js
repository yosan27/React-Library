import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

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
import ReturnForm from "../Screens/Form/ReturnForm";
import UserManagement from "../Screens/UserManagement/usermanagement";
import ManageDonation from "../Screens/ManageDonation/index";
import PublisherManagement from "../Screens/PublisherManagement/publishermanagement";
import BookManagement from "../Screens/BookManagement/bookmanagement";
import BookDetailManagement from "../Screens/BookDetailManagement/bookdetailmanagement";
import DetailPage from "../Screens/DetailPage/detailpage";
import FineManagement from "../Screens/FineManagement/fineManagement";
import AuthorManagement from "../Screens/AuthorManagement/AuthorManagement";
import CategoryManagement from "../Screens/CategoryManagement/categoryManagement";
import AuthService from "../Services/auth.service";
import SeeMoreBooks from "../Screens/SeeMoreBooks/SeeMoreBooks";

const authGuard = (Component) => () => {
  return !localStorage.getItem('userFaraday') ? (
    <Redirect to="/" />
  ) : (
      <Component />
    );
};

const rememberMe = (Component) => () => {
  return !localStorage.getItem('userFaraday') ? (
      <Component />
    ) : (
      <Redirect to="/index" />
    );
};


const MainNavigationsUser = (props) => (
  <Router {...props}>
    <Switch>
      <Route render={rememberMe(Login)} path="/" exact>
        {/* <Login /> */}
      </Route>
      <Route render={rememberMe(Register)} path="/register" exact>
        {/* <Register /> */}
      </Route>
      <Route render={rememberMe(Password)} path="/forgot-password" exact>
        {/* <Password /> */}
      </Route>

      <div className="main_container">
        <div className="top_nav">
          <Route render={authGuard(HeaderUser)} path="/:id">
            {/* <HeaderUser /> */}
          </Route>
        </div>
        <div className="col-md-3 left_col">
          <Route render={authGuard(SideBarUser)} path="/:id">
            {/* <SideBarUser /> */}
          </Route>
        </div>

        <Route render={authGuard(Content)} exact path="/index">
          {/* <Content /> */}
        </Route>

        <Route render={authGuard(Content)} path="/page/indexUser">
          {/* <Content /> */}
        </Route>
        <Route render={authGuard(ProfileUser)} path="/page/profileUser">
          {/* <ProfileUser /> */}
        </Route>
        <Route render={authGuard(HistoryUser)} path="/page/historyUser">
          {/* <HistoryUser /> */}
        </Route>
        <Route render={authGuard(Cart)} path="/page/cart">
          {/* <Cart /> */}
        </Route>
        <Route render={authGuard(Wishlist)} path="/page/wishlist">
          {/* <Wishlist /> */}
        </Route>
        <Route render={authGuard(Payment)} path="/page/payment">
          {/* <Payment /> */}
        </Route>
        <Route render={authGuard(Catalog)} path="/page/catalog">
          {/* <Catalog /> */}
        </Route>
        <Route render={authGuard(Donation)} path="/page/donation-user">
          {/* <Donation /> */}
        </Route>
        <Route render={authGuard(DonationForm)} path="/page/donation-form">
          {/* <DonationForm /> */}
        </Route>
        <Route render={authGuard(Profile)} path="/page/profile">
          {/* <Profile /> */}
        </Route>
        <Route render={authGuard(PublisherManagement)} path="/page/managePublisher">
          {/* <PublisherManagement /> */}
        </Route>
        <Route render={authGuard(BookManagement)} path="/page/manageBook">
          {/* <BookManagement /> */}
        </Route>
        <Route render={authGuard(UserManagement)} path="/page/manageUser">
          {/* <UserManagement /> */}
        </Route>
        <Route render={authGuard(DetailPage)} path="/page/detailpage">
          {/* <DetailPage /> */}
        </Route>
        <Route render={authGuard(ManageDonation)} path="/page/manage-donation">
          {/* <ManageDonation /> */}
        </Route>
        <Route render={authGuard(History)} path="/page/history">
          {/* <History /> */}
        </Route>
        <Route render={authGuard(ReturnForm)} path="/page/return/:id">
          {/* <ReturnForm /> */}
        </Route>
        <Route render={authGuard(FineManagement)} path="/page/manageFine">
          {/* <FineManagement /> */}
        </Route>
        <Route render={authGuard(AuthorManagement)} path="/page/manageAuthor">
          {/* <AuthorManagement /> */}
        </Route>
        <Route render={authGuard(CategoryManagement)} path="/page/manageCategory">
          {/* <CategoryManagement /> */}
        </Route>
        <Route render={authGuard(SeeMoreBooks)} path="/page/more">
          {/* <SeeMoreBooks /> */}
        </Route>

        <Route render={authGuard(Footer)} path="/page/:id">
          {/* <Footer /> */}
        </Route>
      </div>
    </Switch>
  </Router>
);
export default MainNavigationsUser;
