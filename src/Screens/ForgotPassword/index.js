import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../Login/Login-style.css'

class ForgotPassword extends Component {

    render() {
        return (
            <section class="Form my-5 mx-5">
                <div class="container">
                    <div class="row no-gutters">
                        <div class="col-lg-5">
                            <img src="assets/images/cover2.png" class="img-fluid" alt="" />
                        </div>
                        <div class="col-lg-7 px-5 pt-3">
                            <img class="img-right" src="assets/images/book.png" alt="" />
                            <h1 class="font-weight-bold py-2 bl-2">Forgot your Password?</h1>
                            <h4 class="txt-2 bl-2">Please submit your register E-mail. Thankyou!</h4>
                            <form action="">
                                <div class="form-row">
                                    <div class="col-lg-7">
                                        <input type="email" placeholder="Email Address" class="form-control my-2 p-4 box email"
                                            required />
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-lg-3">
                                        <button type="button" class="btn-login mt-3 loginBtn">Submit</button>
                                    </div>
                                    <div class="col-lg-3">
                                        <Link to="/">
                                            <button type="button" class="btn-sign-up mt-3 mb-2">Sign
                                            In</button>
                                        </Link>
                                    </div>
                                </div>
                                <p class="txt-3"><a class="txt-3"
                                    href="https://web.kominfo.go.id/sites/default/files/users/4761/UU%2019%20Tahun%202016.pdf"
                                    target="blank"><b>Terms and Conditions & Privacy Policy</b></a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default withRouter(ForgotPassword);