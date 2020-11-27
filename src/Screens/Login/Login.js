import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Login-style.css";

class Login extends Component {
    render() {
        return (
            <section className="Form my-5 mx-5 card-login">
                <div className="container">
                    <div className="no-gutters">
                        <div class="col-lg-5">
                            <img src="assets/images/cover2.png" className="img-fluid img-login" alt="" />
                        </div>
                        <div class="col-lg-7 px-5 pt-3">
                            <img className="img-right" src="assets/images/book.png" alt="" />
                            <h1 className="font-weight-bold py-2 white">Login</h1>
                            <h4 className="txt-2 white">Welcome Back, Please Login to your account</h4>
                            <form action="">
                                <div className="form-row">
                                    <div className="col-lg-7">
                                        <input type="email" placeholder="Email Address" className="form-control my-2 p-4 box email"
                                            required />
                                        <span id="wrong-user" className="hide">Email is not registered!</span>
                                        <input type="password" placeholder="Password" className="form-control my-2 p-4 box password"
                                            required />
                                        <span id="wrong-pass" className="hide">Wrong password!</span>
                                    </div>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="gridCheck1" />
                                    <label class="form-check-label grey" for="gridCheck1">
                                        Remember Me
                                    </label>
                                </div>
                                <div class="form-row">
                                    <div class="col-lg-3">
                                        <Link to="/indexUser">
                                            <button type="button" class="btn-login mt-3 loginBtn">Login</button>
                                        </Link>
                                    </div>
                                    <div class="col-lg-3">
                                        <Link to="/register">
                                            <a href="register.html"><button type="button" class="btn-sign-up mt-3 mb-2">Sign
                                                Up</button></a>
                                        </Link>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <Link to="/forgot-password">
                                        <a href="forgotPass.html" class="forgot mb-5 grey">Forgot Password?</a>
                                    </Link>
                                </div>

                                <p class="txt-3 mg-0">By signing up, you agree to E-Perpus's</p>
                                <p class="txt-3"><a class="txt-3"
                                    href="https://web.kominfo.go.id/sites/default/files/users/4761/UU%2019%20Tahun%202016.pdf"
                                    target="blank"><b>Terms and Conditions & Privacy Policy</b></a></p>
                            </form>
                        </div>
                    </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Login);
