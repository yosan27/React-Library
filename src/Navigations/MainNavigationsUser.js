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
import DetailPage from "../Screens/DetailPage/detailpage";
import Login from "../Screens/Login/Login";
import Register from "../Screens/Register/Register";
import Password from "../Screens/ForgotPassword/index";
import Donation from "../Screens/DonationUser/index";
import DonationForm from "../Screens/DonationUser/indexForm";

class MainNavigationsUser extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" exact component={Register}></Route>
          <Route path="/forgot-password" exact component={Password}></Route>

          <div className="main_container">

            <div className="top_nav">
              <Route path="/" component={HeaderUser}></Route>
            </div>

            <div className="col-md-3 left_col">
              <Route path="/" component={SideBarUser}></Route>
            </div>
            
            <Route path="/indexUser" component={Content}></Route>
            <Route path="/profileUser" component={ProfileUser}></Route>
            <Route path="/historyUser" component={HistoryUser}></Route>
            <Route path="/cart" component={Cart}></Route>
            <Route path="/wishlist" component={Wishlist}></Route>
            <Route path="/payment" component={Payment}></Route>
            <Route path="/catalog" component={Catalog}></Route>
            <Route path="/detailpage" component={DetailPage}></Route>
            <Route path="/donation-user" component={Donation}></Route>
            <Route path="/donation-form" component={DonationForm}></Route>

            <Route path="/" component={Footer}></Route>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default MainNavigationsUser;
