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
        btn: ""
    }

    handleAjax = () => {

        this.setState({
            desc:
                "Kehadiranmu bisa memberi kesempatan semua insan dalam meraih informasi berkualitas",
            author: " #jendeladunia",
            image: don2,
            btn: document.getElementById('btn-gone').style.display = "none"
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
                        <img src={this.state.image} class="img-fluid" alt="Responsive image" />
                    </div>
                    <div class="row justify-content-md-center">
                        <h4 class="col-lg-8 text-center"><i> &quot;{this.state.desc}&quot; </i><b>{this.state.author}</b></h4>
                    </div>
                    <br /><br />
                    <div class="row justify-content-md-center center">
                        <button type="button" class="btn btn-info" id="btn-gone" onClick={this.handleAjax} >Kenali Lebih Dalam</button>
                        <Link to="/page/donation-form">
                            <button type="button" class="btn btn-outline-info">Donasi
                                Sekarang!</button>
                        </Link>

                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(DonationUser);