import React, { Component } from "react"
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom"

import HeaderUser from '../components/HeaderUser';
import SideBarUser from '../components/SideBarUser';
import Content from '../components/Content';
import Footer from '../components/Footer';
import ProfileUser from '../Screens/ProfileUser/ProfileUser';
import HistoryUser from '../Screens/HistoryUser/HistoryUser';
import Cart from '../Screens/Cart/Cart';
import Wishlist from '../Screens/Wishlist/Wishlist';
import Payment from '../Screens/Payment/Payment';
import DetailPage from '../Screens/DetailPage/detailpage'

class MainNavigationsUser extends Component {
    render() {
        return (
            <Router>
                <div className="main_container">
                    <div className="col-md-3 left_col">
                        <Route path='/'>
                            <SideBarUser />
                        </Route>
                    </div>
                    <div className="top_nav">
                        <Route path='/'>
                            <HeaderUser />
                        </Route>
                    </div>
                    <Route path='/indexUser'>
                        <Content />
                    </Route>
                    <Route path='/profileUser'>
                        <ProfileUser />
                    </Route>
                    <Route path='/historyUser'>
                        <HistoryUser />
                    </Route>
                    <Route path='/cart'>
                        <Cart />
                    </Route>
                    <Route path='/wishlist'>
                        <Wishlist />
                    </Route>
                    <Route path='/payment'>
                        <Payment/>
                    </Route>
                    <Route path='/detailpage'>
                        <DetailPage />
                    </Route>
                    <Route path='/'>
                        <Footer />
                    </Route>
                </div>
            </Router>
        )
    }
}

export default MainNavigationsUser
