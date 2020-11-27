import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Profile from "../Screens/Profile/Profile";
import ProfileUser from "../Screens/ProfileUser/ProfileUser";
import BookManagement from "../Screens/BookManagement/bookmanagement";
import DetailPage from "../Screens/DetailPage/detailpage";
import UserManagement from "../Screens/UserManagement/usermanagement";
import ManageDonation from "../Screens/ManageDonation/index";
import Login from "../Screens/Login/Login";
import Register from "../Screens/Register/Register";
import Password from "../Screens/ForgotPassword/index";

class MainNavigation extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/forgot-password" exact>
            <Password />
          </Route>
          <div className="main_container">
            <div className="col-md-3 left_col">
              <Route path="/">
                <SideBar />
              </Route>
            </div>
            <div className="top_nav">
              <Route path="/">
                <Header />
              </Route>
            </div>
            <Route path="/index">
              <Content />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/profileuser">
              <ProfileUser />
            </Route>
            <Route path="/manageBook">
              <BookManagement />
            </Route>
            <Route path="/manageUser">
              <UserManagement />
            </Route>
            <Route path="/detailpage">
              <DetailPage />
            </Route>
            <Route path="/manage-donation">
              <ManageDonation />
            </Route>
            <Route path="/">
              <Footer />
            </Route>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default MainNavigation;
