import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'

class SideBar extends Component {
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
                        <h2>Admin</h2>
                    </div>
                </div>
                <div className="profile_name">
                    <h4>Admin</h4>
                </div>
                <br />

                <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                    <div className="menu_section">
                        <ul className="nav side-menu">
                            <li className={(pathCurrent[1] === 'profile' ? "current-page" : "")}>
                                <Link to="/profile">
                                    <i className="fa fa-user"></i>
                                    Profile
                                    </Link>
                            </li>
                        </ul>
                        <h3>General</h3>
                        <ul className="nav side-menu">
                            <li className={(pathCurrent[1] === 'index' ? "current-page" : "")}>
                                <Link to="/index">
                                    <i className="fa fa-book"></i>
                                    Explore
                                </Link>
                            </li>
                            <li className={(pathCurrent[1] === 'history' ? "current-page" : "")}>
                                <Link to="/history">
                                    <i className="fa fa-history"></i>
                                    History
                                    </Link>
                            </li>
                            <li onClick={() => this.setState({ condition: !condition })} className={this.state.condition ? "active" : ""}>
                                <a>
                                    <i className="fa fa-edit"></i> Manage <span className="fa fa-chevron-down"></span>
                                </a>
                                <ul className="nav child_menu" style={{ display: this.state.condition ? 'block' : 'none' }}>
                                    <li className={(pathCurrent[1] === 'manageUser' ? "current-page" : "")}>
                                        <Link to="/manageUser">
                                            User
                                        </Link>
                                    </li>
                                    <li className={(pathCurrent[1] === 'manageBook' ? "current-page" : "")}>
                                        <Link to="/manageBook">
                                            Book
                                        </Link>
                                    </li>
                                    <li className={(pathCurrent[1] === 'manageDonation' ? "current-page" : "")}>
                                        <Link to="/manageDonation">
                                            Donation
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="sidebar-footer hidden-small d-flex flex-row">
                    <a data-toggle="tooltip" data-placement="top" title="Logout" href="login.html">
                        <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
                    </a>
                </div>
            </div >
        )
    }
}
export default withRouter(SideBar);