import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./HeaderUser.style.css";
import Axios from "../Services/axios-instance";
import AuthService from "../Services/auth.service";
import swal from "sweetalert";

class HeaderUser extends Component {
  constructor() {
    super();
    this.state = {
      condition: false,
      username: "",
      userCode: "",
      userData: [],
      countCart: "0",
      statusUser: "",
      searchInput: "",
      category: [],
    };
  }

  componentDidMount() {
    this.setState({
      statusUser: AuthService.getStatusUser(),
      username: AuthService.getUsername(),
      userCode: AuthService.getUserCode(),
    });

    Axios.get("cart/usercode/" + AuthService.getUserCode())
      .then((resp) => {
        this.setState({
          countCart: resp.data.data.length,
        });
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });

    Axios.get("category")
      .then((e) => {
        this.setState({ category: e.data });
      })
      .catch(function (error) {
        swal("Failed", error.response.data.message, "error");
      });
  }

  handleChange = (e) => {
    this.setState({ searchInput: e });
  };

  handleSubmit = () => {
    if (window.location.pathname.includes("result")) {
      this.props.history.push(`${this.state.searchInput}`);
    }
    else if (window.location.pathname.includes("category")) {
      window.open(`/page/result/${this.state.searchInput}`, "_self");
    }
    else {
      this.props.history.push(`result/${this.state.searchInput}`);
    }
  };

  handleClick(e){
    if (window.location.pathname.includes("category")) {
      this.props.history.push(`${e}`);
    }
    else if (window.location.pathname.includes("result")) {
      window.open(`/page/category/${e}`, "_self")
    } 
    else if (window.location.pathname.includes("detailpage")) {
      window.open(`/page/category/${e}`, "_self")
    } 
    else if (window.location.pathname.includes("return")) {
      window.open(`/page/category/${e}`, "_self")
    } 
    else {
      this.props.history.push(`category/${e}`);
    }
  }

  render() {
    const { condition } = this.state;
    const mystyle = {
      color: "#495464 !important",
      cursor: "pointer",
    };
    const handleToggle = () => {
      if (condition) {
        document.body.classList.remove("nav-sm");
        document.body.classList.add("nav-md");
        document.getElementById("searchInput").style.display = "";
      } else {
        document.body.classList.remove("nav-md");
        document.body.classList.add("nav-sm");
        var x = window.matchMedia("(max-width: 320px)");
        if (x.matches) {
          document.getElementById("searchInput").style.display = "none";
        }
      }
      this.setState({ condition: !condition });
    };

    if (this.state.statusUser === "2") {
      return (
        <nav className="navbar navbar-expand navbar-dark nav_menu shadow">
          <ul className="navbar-nav">
            <li className="nav-item pr-3">
              <Link id="menu_toggle" onClick={handleToggle} style={mystyle}>
                <i className="fa fa-bars"></i>
              </Link>
            </li>
            <li className="nav-item dropdown open">
              <Link
                href=""
                className="dropdown-toggle info-number"
                id="navbarDropdown2"
                data-toggle="dropdown"
                aria-expanded="false"
                style={mystyle}
              >
                Categories
              </Link>
              <ul
                className="dropdown-menu list-unstyled msg_list"
                role="menu"
                aria-labelledby="navbarDropdown2"
              >
                {this.state.category.map((e) => {
                  return (
                    <li className="nav-item">
                      <Link className="dropdown-item" onClick={()=>this.handleClick(e.id)}>
                        <span className="message">{e.categoryName}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item" style={{ paddingLeft: "15px" }}>
              <Link to="/page/cart" className="nav-link">
                <i
                  className="fa fa-shopping-cart fa-lg"
                  style={{ fontSize: "17px" }}
                ></i>
                <span
                  id="cartCount"
                  className="badge badge-danger navbar-badge"
                >
                  {this.state.countCart}
                </span>
              </Link>
            </li>
            <li
              id="searchInput"
              className="nav-item"
              style={{ paddingLeft: "15px" }}
            >
                <div className="input-group input-group-sm pt-2">
                  <input
                    className="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    style={{
                      backgroundColor: "white",
                      border: 0,
                      borderTopLeftRadius: "25px",
                      borderBottomLeftRadius: "25px",
                    }}
                    value={this.state.searchInput}
                    onChange={(e) => this.handleChange(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-navbar m-0"
                      type="button"
                      style={{
                        backgroundColor: "white",
                        border: 0,
                        borderTopRightRadius: "25px",
                        borderBottomRightRadius: "25px",
                      }}
                      onClick={this.handleSubmit}
                    >
                      <i className="fa fa-search pr-2"></i>
                    </button>
                  </div>
                </div>
            </li>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav className="navbar navbar-expand navbar-dark nav_menu shadow">
          <ul className="navbar-nav">
            <li className="nav-item pr-3">
              <Link id="menu_toggle" onClick={handleToggle} style={mystyle}>
                <i className="fa fa-bars"></i>
              </Link>
            </li>
            <li className="nav-item dropdown open">
              <Link
                href=""
                className="dropdown-toggle info-number"
                id="navbarDropdown2"
                data-toggle="dropdown"
                aria-expanded="false"
                style={mystyle}
              >
                Categories
              </Link>
              <ul
                className="dropdown-menu list-unstyled msg_list"
                role="menu"
                aria-labelledby="navbarDropdown2"
              >
                {this.state.category.map((e) => {
                  return (
                    <li className="nav-item">
                      <Link className="dropdown-item" onClick={()=>this.handleClick(e.id)}>
                        <span className="message">{e.categoryName}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li
              id="searchInput"
              className="nav-item"
              style={{ paddingLeft: "15px" }}
            >
                <div className="input-group input-group-sm pt-2">
                  <input
                    className="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    style={{
                      backgroundColor: "white",
                      border: 0,
                      borderTopLeftRadius: "25px",
                      borderBottomLeftRadius: "25px",
                    }}
                    value={this.state.searchInput}
                    onChange={(e) => this.handleChange(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-navbar m-0"
                      type="button"
                      style={{
                        backgroundColor: "white",
                        border: 0,
                        borderTopRightRadius: "25px",
                        borderBottomRightRadius: "25px",
                      }}
                      onClick={this.handleSubmit}
                    >
                      <i className="fa fa-search pr-2"></i>
                    </button>
                  </div>
                </div>
            </li>
          </ul>
        </nav>
      );
    }
  }
}

export default withRouter(HeaderUser);
