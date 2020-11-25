import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'

class SideBarUser extends Component {
    constructor() {
        super();
        this.state = {
            condition: false,
        };
    }


    render() {
        const { condition } = this.state;
        const pathCurrent = window.location.pathname.split('/');

        // console.log(pathCurrent[1])
        // console.log(condition)
        return (
            <div className="left_col scroll-view">
                <div className="navbar nav_title" style={{ border: 0 }}>
                    <a href="index.html" className="site_title">
                        <img src="assets/images/1.png" alt="" />
                        <span>Faraday E-Library</span>
                    </a>
                </div>

                <div className="clearfix"></div>

                <div className="profile clearfix">
                    <div className="profile_pic">
                        <img src="assets/images/user.png" alt="..." className="img-circle profile_img" />
                    </div>
                    <div className="profile_info">
                        <span>Welcome,</span>
                        <h2>User</h2>
                    </div>
                </div>
                <div className="profile_name">
                    <h4>User</h4>
                </div>
                <br />

                <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                    <div className="menu_section">
                        <ul className="nav side-menu">
                            <li className={(pathCurrent[1] === 'profileUser' ? "current-page" : "")}>
                                <Link to="/profileUser">
                                    <i className="fa fa-user"></i>
                                    Profile
                                    </Link>
                            </li>
                        </ul>
                        <h3>General</h3>
                        <ul className="nav side-menu">
                            <li className={(pathCurrent[1] === 'indexUser' ? "current-page" : "")}>
                                <Link to="/indexUser">
                                    <i className="fa fa-book"></i>
                                    Explore
                                </Link>

                            </li>
                            <li className={(pathCurrent[1] === 'historyUser' ? "current-page" : "")}>

                                <Link to="/historyUser">
                                    <i className="fa fa-history"></i>
                                    History
                                </Link>

                            </li>
                            <li className={(pathCurrent[1] === 'catalog' ? "current-page" : "")}>

                                <Link to="/catalog">
                                    <i className="fa fa-plus"></i>
                                    Catalog
                                    </Link>

                            </li>
                            <li onClick={() => this.setState({ condition: !condition })} className={this.state.condition || pathCurrent[1] === 'cart' || pathCurrent[1] === 'wishlist' ? "active" : ""}>
                                <a>
                                    <i className="fa fa-edit"></i> Rent <span className="fa fa-chevron-down"></span>
                                </a>
                                <ul className="nav child_menu" style={{ display: this.state.condition || pathCurrent[1] === 'cart' || pathCurrent[1] === 'wishlist' ? 'block' : 'none' }}>
                                    <li className={(pathCurrent[1] === 'cart' ? "current-page" : "")}>
                                        <Link to="/cart">
                                            Cart
                                        </Link>
                                    </li>
                                    <li className={(pathCurrent[1] === 'wishlist' ? "current-page" : "")}>
                                        <Link to="/wishlist">
                                            Wishlist
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={(pathCurrent[1] === 'payment' ? "current-page" : "")}>

                                <Link to="/payment">
                                    <i className="fa fa-money"></i>
                                    payment
                                </Link>

                            </li>
                            <li className={(pathCurrent[1] === 'donation' ? "current-page" : "")}>

                                <Link to="/donation">
                                    <i className="fa fa-gift"></i>
                                    donation
                                </Link>

                            </li>
                        </ul>
                    </div>
                </div>

                <div className="sidebar-footer hidden-small d-flex flex-row">
                    <a data-toggle="tooltip" data-placement="top" title="Logout" href="login.html">
                        <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
                    </a>
                </div>
            </div>
        )
    }
}
export default withRouter(SideBarUser);