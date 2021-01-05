import axios from "axios";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import NumberFormat from 'react-number-format';

class SideBarUser extends Component {
  constructor() {
    super();
    this.state = {
      condition: false,
      username: "",
      userData: [],
      saldo: "",
      userCode: "",
      profilePict: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBG685vI07-3MsuqJxjCfzIabfFJJG-8yM-ppvjjNpD5QNtWNE4A"
    };
  }

  componentDidMount() {
    if (!sessionStorage.getItem('userCode')) {
      console.log("tidak ada userCode")
    } else {
      axios.get("http://localhost:8500/api/user-by-code/"+ sessionStorage.getItem('userCode')).then((e) => {
          this.setState({
              saldo: e.data.balance,
              username: e.data.userName,
              userCode : sessionStorage.getItem('userCode')
          })
      })
    }
  }

  removesessionStorage = () => {
    sessionStorage.clear();
  };

  render() {
    const { condition} = this.state;
    const pathCurrent = window.location.pathname.split("/");

    if (this.state.userCode.substring(0, 2) === "UU") {
      return (
        <div className="left_col scroll-view">
          <div className="navbar nav_title" style={{ border: 0 }}>
            <Link to="/page/indexUser" className="site_title">
              <img src="assets/images/1.png" alt="" />
              <span>Faraday E-Library</span>
            </Link>
          </div>

          <div className="clearfix"></div>

          <div className="profile clearfix">
            <div className="profile_pic">
              <img
                src={this.state.profilePict}
                alt="..."
                className="img-circle profile_img"
              />
            </div>
            <div className="profile_info">
              <span>Welcome,</span>
              <h2>{this.state.username}</h2>
              <div>
                <Link to="/page/payment">
                  <h2 className="profile_saldo pt-2">Rp <NumberFormat value={this.state.saldo} displayType={'text'} thousandSeparator="&#8228;" className="profile_saldo"/></h2>
                </Link>
              </div>
            </div>
          </div>

          <div className="profile_name">
            <img
              src="assets/images/user.png"
              alt="..."
              className="img-circle profile_img"
            />
            <div className="text-center">
              <h5>{this.state.username}</h5>
              <div>
                <Link to="/page/payment">
                  <h5 className="profile_saldo pt-2">Rp <NumberFormat value={this.state.saldo} displayType={'text'} thousandSeparator="&#8228;" className="profile_saldo"/></h5>
                </Link>
              </div>
            </div>
          </div>

          <div
            id="sidebar-menu"
            className="main_menu_side hidden-print main_menu"
          >
            <div className="menu_section">
              <ul className="nav side-menu">
                <li
                  className={
                    pathCurrent[1] === "profileUser" ? "current-page" : ""
                  }
                >
                  <Link to="/page/profileUser">
                    <i className="fa fa-user"></i>
                    Profile
                  </Link>
                </li>
                <li
                  className={
                    pathCurrent[1] === "indexUser" ? "current-page" : ""
                  }
                >
                  <Link to="/page/indexUser">
                    <i className="fa fa-book"></i>
                    Explore
                  </Link>
                </li>
                <li
                  className={
                    pathCurrent[1] === "historyUser" ? "current-page" : ""
                  }
                >
                  <Link to="/page/historyUser">
                    <i className="fa fa-history"></i>
                    History
                  </Link>
                </li>
                <li
                  className={pathCurrent[1] === "catalog" ? "current-page" : ""}
                >
                  <Link to="/page/catalog">
                    <i className="fa fa-plus"></i>
                    Catalog
                  </Link>
                </li>
                <li
                  onClick={() => this.setState({ condition: !condition })}
                  className={
                    this.state.condition ||
                      pathCurrent[1] === "cart" ||
                      pathCurrent[1] === "wishlist"
                      ? "active"
                      : ""
                  }
                >
                  <Link>
                    <i className="fa fa-edit"></i> Rent{" "}
                    <span className="fa fa-chevron-down"></span>
                  </Link>
                  <ul
                    className="nav child_menu"
                    style={{
                      display:
                        this.state.condition ||
                          pathCurrent[1] === "cart" ||
                          pathCurrent[1] === "wishlist"
                          ? "block"
                          : "none",
                    }}
                  >
                    <li
                      className={
                        pathCurrent[1] === "cart" ? "current-page" : ""
                      }
                    >
                      <Link to="/page/cart">Cart</Link>
                    </li>
                    <li
                      className={
                        pathCurrent[1] === "wishlist" ? "current-page" : ""
                      }
                    >
                      <Link to="/page/wishlist">Wishlist</Link>
                    </li>
                  </ul>
                </li>
                <li
                  className={pathCurrent[1] === "payment" ? "current-page" : ""}
                >
                  <Link to="/page/payment">
                    <i className="fa fa-money"></i>
                    Payment
                  </Link>
                </li>
                <li
                  className={
                    pathCurrent[1] === "donation" ? "current-page" : ""
                  }
                >
                  <Link to="/page/donation-user">
                    <i className="fa fa-gift"></i>
                    Donation
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="sidebar-footer hidden-small d-flex flex-row">
            <Link to="/" onClick={() => this.removesessionStorage()}>
              <span
                className="glyphicon glyphicon-off"
                aria-hidden="true"
              ></span>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="left_col scroll-view">
          <div className="navbar nav_title" style={{ border: 0 }}>
            <Link to="/page/indexUser" className="site_title">
              <img src="assets/images/1.png" alt="" />
              <span>Faraday E-Library</span>
            </Link>
          </div>

          <div className="clearfix"></div>

          <div className="profile clearfix">
            <div className="profile_pic">
              <img
                src={this.state.profilePict}
                alt="..."
                className="img-circle profile_img admin"
              />
            </div>
            <div className="profile_info">
              <span>Welcome,</span>
              <h2>{this.state.username}</h2>
            </div>
          </div>
          <div className="profile_name">
            <img
              src="assets/images/user.png"
              alt="..."
              className="img-circle profile_img"
            />
            <div className="text-center">
              <h5>{this.state.username}</h5>
            </div>
          </div>

          <div
            id="sidebar-menu"
            className="main_menu_side hidden-print main_menu"
          >
            <div className="menu_section">
              <ul className="nav side-menu">
                <li
                  className={pathCurrent[1] === "profile" ? "current-page" : ""}
                >
                  <Link to="/page/profile">
                    <i className="fa fa-user profile-space"></i>
                    Profile
                  </Link>
                </li>
                <li
                  className={pathCurrent[1] === "index" ? "current-page" : ""}
                >
                  <Link to="/page/indexUser">
                    <i className="fa fa-book"></i>
                    Explore
                  </Link>
                </li>
                <li
                  className={pathCurrent[1] === "history" ? "current-page" : ""}
                >
                  <Link to="/page/history">
                    <i className="fa fa-history"></i>
                    History
                  </Link>
                </li>
                <li
                  onClick={() => this.setState({ condition: !condition })}
                  className={this.state.condition ? "active" : ""}
                >
                  <Link>
                    <i className="fa fa-edit"></i> Manage{" "}
                    <span className="fa fa-chevron-down"></span>
                  </Link>
                  <ul
                    className="nav child_menu"
                    style={{ display: this.state.condition ? "block" : "none" }}
                  >
                    <li
                      className={
                        pathCurrent[1] === "manageUser" ? "current-page" : ""
                      }
                    >
                      <Link to="/page/manageUser">User</Link>
                    </li>
                    <li className={(pathCurrent[1] === 'managePublisher' ? "current-page" : "")}>
                      <Link to="/page/managePublisher">
                        Publisher
                        </Link>
                    </li>
                    <li className={pathCurrent[1] === "manageBook" ? "current-page" : ""}>
                      <Link to="/page/manageBook">
                        Book
                      </Link>
                    </li>
                    <li
                      className={
                        pathCurrent[1] === "manageDonation"
                          ? "current-page"
                          : ""
                      }
                    >
                      <Link to="/page/manage-donation">Donation</Link>
                    </li>
                    <li
                      className={
                        pathCurrent[1] === "manageFine" ? "current-page" : ""
                      }
                    >
                      <Link to="/page/manageFine">Fine</Link>
                    </li>
                    <li
                      className={
                        pathCurrent[1] === "manageAuthor" ? "current-page" : ""
                      }
                    >
                      <Link to="/page/manageAuthor">Author</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div className="sidebar-footer hidden-small d-flex flex-row">
            <Link to="/" onClick={() => this.removesessionStorage()}>
              <span
                className="glyphicon glyphicon-off"
                aria-hidden="true"
              ></span>
            </Link>
          </div>
        </div>
      );
    }
  }
}
export default withRouter(SideBarUser);
