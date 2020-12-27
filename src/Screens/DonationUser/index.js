import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './donation-styles.css'
import don1 from "./donation1.png";
import don2 from "./donation2.png";

class DonationUser extends Component {
    state = {
        desc:
            "Indonesia menempati peringkat 60 dari 61 negara dengan level literasi baca",
        author: "Unesco(2019)",
        image: don1,
    }

    handleAjax = () => {

        this.setState({
            desc:
                "Kehadiranmu bisa memberi kesempatan semua insan dalam meraih informasi berkualitas",
            author: " #jendeladunia",
            image: don2,
        })
    }



    render() {
        return (
            <div class="right_col" role="main">
                <div class="container history">
                    <h3 class="">Donation</h3>
                </div>
                <div class="container" id="demo">
                    <div class="row justify-content-md-center">
<<<<<<< HEAD
                        <img src={this.state.image} class="img-fluid" alt="Responsive image" />
=======
                        <img src="assets/images/donation1.png" className="img-fluid" alt="Responsive image"/>
>>>>>>> b0d33ec5d7dab66894d8281d9464cddc0d939811
                    </div>
                    <div class="row justify-content-md-center">
                        <h4 class="col-lg-8 text-center"><i> &quot;{this.state.desc}&quot; </i><b>{this.state.author}</b></h4>
                    </div>
                    <br /><br />
                    <div class="row justify-content-md-center">
                        <div class="col-lg-2">
                            <button type="button" class="btn btn-info" onClick={this.handleAjax}>Kenali lebih dalam</button>
                        </div>
                        <div class="col-lg-2">
                            <Link to="/page/donation-form">
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