import React, { Component } from "react"
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom"

import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Content from '../components/Content';
import Footer from '../components/Footer';
import Profile from '../Screens/Profile/Profile';
import ProfileUser from '../Screens/ProfileUser/ProfileUser';
import BookManagement from '../Screens/BookManagement/bookmanagement';

class MainNavigation extends Component {
    render() {
        return (
            <Router>
                <div className="main_container">
                    <div className="col-md-3 left_col">
                        <Route path='/'>
                            <SideBar />
                        </Route>
                    </div>
                    <div className="top_nav">
                        <Route path='/'>
                            <Header />
                        </Route>
                    </div>
                    <Route path='/index'>
                        <Content />
                    </Route>
                    <Route path='/profile'>
                        <Profile />
                    </Route>
                    <Route path='/profileuser'>
                        <ProfileUser />
                    </Route>
                    <Route path='/manageBook'>
                        <BookManagement />
                    </Route>
                    <Route path='/'>
                        <Footer />
                    </Route>
                </div>
            </Router>
        )
    }
}

export default MainNavigation
