import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './donation-styles.css'

class DonationUser extends Component {

    render() {
        return (
            <div class="right_col" role="main">
                <div class="container history">
                    <h3 class="">Donation</h3>
                </div>
                <div class="container" id="demo">
                    <div class="row justify-content-md-center">
                        <img src="assets/images/donation1.png" class="img-fluid" alt="Responsive image" />
                    </div>
                    <div class="row justify-content-md-center">
                        <h4 class="col-lg-8 text-center"><i>"Indonesia menempati peringkat 60 dari 61 negara dengan
                            level literasi baca" </i> <b> Unesco(2019)</b> </h4>
                    </div>
                    <br /><br />
                    <div class="row justify-content-md-center">
                        <div class="col-lg-2">
                            <button type="button" class="btn btn-info" onclick=
                                "loadDoc()">Kenali lebih dalam</button>
                        </div>
                        <div class="col-lg-2">
                            <Link to="/donation-form">
                                <button type="button" class="btn btn-outline-info">Donasi
                                Sekarang!</button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(DonationUser);