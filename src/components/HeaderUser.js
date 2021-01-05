import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import './HeaderUser.style.css';
import axios from "axios";

class HeaderUser extends Component {
    constructor() {
        super();
        this.state = {
            condition: false,
            username: "",
            userCode: "",
            userData: [],
            countCart: ""
        };
    }
  
    componentDidMount() {
        if (!sessionStorage.getItem('userCode')) {
            console.log("tidak ada userCode")
        } else {
            console.log("ada local storage")
            console.log(sessionStorage.getItem('userCode'));
            axios.get("http://localhost:8500/api/user-by-code/" + sessionStorage.getItem('userCode')).then((e) => {
                // console.log(e);
                this.setState({
                    // saldo: e.data.balance,
                    username: e.data.userName,
                    userCode: sessionStorage.getItem('userCode')
                })
            })
            axios.get('http://localhost:8500/api/cart-by-user/' + sessionStorage.getItem('userCode'))
                .then((res) => {
                    console.log(res)
                    console.log(res.data.length);
                    this.setState({
                        countCart: res.data.length
                    })
                })
        }
    }

    render() {
        const { condition, username } = this.state;
        const mystyle = {
            color: "#495464 !important",
            cursor: 'pointer',
        };
        const handleToggle = () => {
            if (condition) {
                document.body.classList.remove('nav-sm');
                document.body.classList.add('nav-md');
                document.getElementById('searchInput').style.display = "";
            } else {
                document.body.classList.remove('nav-md');
                document.body.classList.add('nav-sm');
                var x = window.matchMedia("(max-width: 320px)");
                if (x.matches) {
                    document.getElementById('searchInput').style.display = "none";
                }
            }
            this.setState({ condition: !condition })
        };

        if (this.state.userCode.substring(0, 2) == "UU") {
            return (
                <nav className="navbar navbar-expand navbar-dark nav_menu shadow">
                    <ul className="navbar-nav">
                        <li className="nav-item pr-3" >
                            <a id="menu_toggle" onClick={handleToggle} style={mystyle}><i className="fa fa-bars"></i></a>
                        </li>
                        <li className="nav-item dropdown open">
                            <a href="" className="dropdown-toggle info-number" id="navbarDropdown2" data-toggle="dropdown"
                                aria-expanded="false" style={mystyle}>
                                Categories
                                </a>
                            <ul className="dropdown-menu list-unstyled msg_list" role="menu" aria-labelledby="navbarDropdown2">
                                <li className="nav-item">
                                    <a className="dropdown-item">
                                        <span className="message">
                                            Action
                                            </span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="dropdown-item">
                                        <span className="message">
                                            Novel
                                            </span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="dropdown-item">
                                        <span className="message">
                                            Fiksi
                                            </span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <div className="text-center">
                                        <a className="dropdown-item">
                                            <strong>See All Categories</strong>
                                            <i className="fa fa-angle-right"></i>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item" style={{ paddingLeft: "15px" }}>
                            <Link to="/page/cart" className="nav-link">
                                <i className="fa fa-shopping-cart fa-lg" style={{ fontSize: '17px' }}></i>
                                <span id="cartCount" className="badge badge-danger navbar-badge">{this.state.countCart}</span>
                            </Link>
                        </li>
                        <li id="searchInput" className="nav-item" style={{ paddingLeft: '15px' }}>
                            <form className="form-inline pt-2">
                                <div className="input-group input-group-sm">
                                    <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search"
                                        style={{ backgroundColor: 'white', border: 0, borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px', }} />
                                    <div className="input-group-append">
                                        <button className="btn btn-navbar m-0" type="submit"
                                            style={{ backgroundColor: 'white', border: 0, borderTopRightRadius: '25px', borderBottomRightRadius: '25px', }}>
                                            <i className="fa fa-search pr-2"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </li>
                    </ul>
                </nav >
            );
        } else {
            return (
                <nav className="navbar navbar-expand navbar-dark nav_menu shadow">
                    <ul className="navbar-nav">
                        <li className="nav-item pr-3" >
                            <a id="menu_toggle" onClick={handleToggle} style={mystyle}><i className="fa fa-bars"></i></a>
                        </li>
                        <li className="nav-item dropdown open">
                            <a href="" className="dropdown-toggle info-number" id="navbarDropdown2" data-toggle="dropdown"
                                aria-expanded="false" style={mystyle}>
                                Categories
                                </a>
                            <ul className="dropdown-menu list-unstyled msg_list" role="menu" aria-labelledby="navbarDropdown2">
                                <li className="nav-item">
                                    <a className="dropdown-item">
                                        <span className="message">
                                            Action
                                            </span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="dropdown-item">
                                        <span className="message">
                                            Novel
                                            </span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="dropdown-item">
                                        <span className="message">
                                            Fiksi
                                            </span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <div className="text-center">
                                        <a className="dropdown-item">
                                            <strong>See All Categories</strong>
                                            <i className="fa fa-angle-right"></i>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li role="presentation" className="nav-item dropdown open" style={{ paddingLeft: '15px', paddingTop: '8px' }}>
                            <a href="" className="dropdown-toggle info-number" id="navbarDropdown1" data-toggle="dropdown"
                                aria-expanded="false" style={mystyle}>
                                <i className="fa fa-bell fa-lg"></i>
                            </a>
                            <ul className="dropdown-menu list-unstyled msg_list" role="menu" aria-labelledby="navbarDropdown1">
                                <li className="nav-item">
                                    <a className="dropdown-item">
                                        <span className="image"><img src="assets/images/user.png" alt="Profile Image" /></span>
                                        <span>
                                            <span>John Smith</span>
                                        </span>
                                        <span className="message">
                                            Film festivals used to be do-or-die moments for movie makers. They were where...
                                            </span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="dropdown-item">
                                        <span className="image"><img src="assets/images/user.png" alt="Profile Image" /></span>
                                        <span>
                                            <span>John Smith</span>

                                        </span>
                                        <span className="message">
                                            Film festivals used to be do-or-die moments for movie makers. They were where...
                                            </span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="dropdown-item">
                                        <span className="image"><img src="assets/images/user.png" alt="Profile Image" /></span>
                                        <span>
                                            <span>John Smith</span>

                                        </span>
                                        <span className="message">
                                            Film festivals used to be do-or-die moments for movie makers. They were where...
                                            </span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="dropdown-item">
                                        <span className="image"><img src="assets/images/user.png" alt="Profile Image" /></span>
                                        <span>
                                            <span>John Smith</span>

                                        </span>
                                        <span className="message">
                                            Film festivals used to be do-or-die moments for movie makers. They were where...
                                            </span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <div className="text-center">
                                        <a className="dropdown-item">
                                            <strong>See All Alerts</strong>
                                            <i className="fa fa-angle-right"></i>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li id="searchInput" className="nav-item" style={{ paddingLeft: '15px' }}>
                            <form className="form-inline pt-2">
                                <div className="input-group input-group-sm">
                                    <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search"
                                        style={{ backgroundColor: 'white', border: 0, borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px', }} />
                                    <div className="input-group-append">
                                        <button className="btn btn-navbar m-0" type="submit"
                                            style={{ backgroundColor: 'white', border: 0, borderTopRightRadius: '25px', borderBottomRightRadius: '25px', }}>
                                            <i className="fa fa-search pr-2"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </li>
                    </ul>
                </nav >
            );
        }
    }
}

export default withRouter(HeaderUser)